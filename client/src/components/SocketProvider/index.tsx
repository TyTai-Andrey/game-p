/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

// store
import useStore from '@store/index';

// utils
import createWebSocketMessage, { MyWebSocketEvents } from '@utils/ws';
import createGameSocket from '@utils/createSocket';

// types
import { State } from '@store/types';

export interface SocketComponentProps {
  handleClose: () => void;
  isOpen: boolean;
}

type ISocketContextProps = {
  openSocket: (uuid: string) => void;
  closeSocket: () => void;
  connected: boolean;
};

const SocketContext = React.createContext<ISocketContextProps>({
  closeSocket: () => { },
  openSocket: () => { },
  connected: false,
});

const parsedSocketMessage = (socketData: any): Partial<State> => {
  const {
    history: historyStr,
    settings: settingsStr,
    isOwner,
    turnSymbol,
    finishedIndexes,
    position,
    isFinished,
  } = socketData;
  const history = historyStr ? JSON.parse(historyStr) : [];
  const settings = settingsStr ? JSON.parse(settingsStr) : {};

  const { dashboardSize, itemsForWin, unfairPlay, firstTurnSymbol: ownerTurnSymbol } = settings;

  const guestTurnSymbol = ownerTurnSymbol === 'X' ? 'O' : 'X';
  const firstTurnSymbol = isOwner ? ownerTurnSymbol : guestTurnSymbol;

  return {
    ...(turnSymbol !== undefined ? { turnSymbol } : {}),
    ...(isFinished !== undefined ? { isFinished } : {}),
    ...(finishedIndexes !== undefined ? { finishedIndexes } : {}),
    ...(position !== undefined ? { position } : {}),
    ...(history !== undefined ? { history } : {}),
    ...(dashboardSize !== undefined ? { dashboardSize } : {}),
    ...(itemsForWin !== undefined ? { itemsForWin } : {}),
    ...(firstTurnSymbol !== undefined && isOwner !== undefined ? { firstTurnSymbol } : {}),
    ...(unfairPlay !== undefined ? { unfairPlay } : {}),
    isOnline: true,
  };
};

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const userId = useStore(state => state.userId);
  const setState = useStore(state => state.setState);
  const [connected, setConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketUuid, setSocketUuid] = useState<string | null>(null);

  const openSocket = useCallback((uuid: string) => {
    if (isAuthenticated) {
      setSocketUuid(uuid);
    }
  }, [isAuthenticated]);

  const closeSocket = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
      setSocketUuid(null);
      setConnected(false);
    }
  }, [socket]);

  useEffect(() => {
    const closePreviousSocket = () => {
      if (socket && connected) {
        socket.close();
        setConnected(false);
      }
    };

    const createSocket = () => {
      if (socketUuid) {
        const socket = createGameSocket(socketUuid);
        setSocket(socket);
      }
    };

    closePreviousSocket();
    createSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketUuid]);

  useEffect(() => {
    const getInitialState = () => {
      if (socket) {
        socket.onmessage = (e: MessageEvent) => {
          const socketMessage = JSON.parse(e.data);
          const { event } = socketMessage || {};
          const { data: socketData } = socketMessage || {};

          if (event === MyWebSocketEvents.CONNECTION) {
            const { success } = socketData || {};
            setConnected(Boolean(success));
            setState({ isOnline: success });
            if (success) {
              socket.send(createWebSocketMessage({
                event: MyWebSocketEvents.CONNECT,
              }));
            }
          }

          if (event === MyWebSocketEvents.CONNECT) {
            setState(socketData);
          }

          if (event === MyWebSocketEvents.TURN) {
            console.log(socketData);

            setState(socketData);
          }
        };
      }
    };

    getInitialState();

    return () => {
      socket?.close?.();
    };
  }, [socket]);

  useEffect(() => {
    const unsubscribe = useStore.subscribe((state, prevState) => {
      const isRestart = (state.maxTurnCount === -1 && state.turnCount === -1);
      const hasTurn = (state.maxTurnCount > prevState.maxTurnCount) ||
        (state.history.length < prevState.history.length);
      const isMyTurn = state.firstTurnSymbol === prevState.turnSymbol;
      if (hasTurn && (isMyTurn || isRestart) && socket) {
        socket.send(createWebSocketMessage({
          event: MyWebSocketEvents.TURN,
          data: state,
        }));
      }
    });

    return () => unsubscribe();
  }, [socket]);

  const value = useMemo(() => ({
    openSocket,
    closeSocket,
    connected,
  }), [openSocket, closeSocket, connected]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };
export default SocketProvider;
