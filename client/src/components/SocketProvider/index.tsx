// react
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

// store
import useStore from '@store/index';

// utils
import createWebSocketMessage, {
  MyWebSocketEvents,
  createGameSocket,
} from '@utils/ws-operations';

export interface SocketComponentProps {
  handleClose: () => void;
  isOpen: boolean;
}

type ISocketContextProps = {
  openSocket: (uuid: string) => void;
  closeSocket: () => void;
  connected: boolean;
  error: boolean;
};

const SocketContext = React.createContext<ISocketContextProps>({
  closeSocket: () => { },
  openSocket: () => { },
  connected: false,
  error: false,
});

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const userId = useStore(state => state.userId);
  const setState = useStore(state => state.setState);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketUuid, setSocketUuid] = useState<string | null>(null);

  const openSocket = useCallback((uuid: string) => {
    if (isAuthenticated) {
      setSocketUuid(uuid);
    }
  }, [isAuthenticated]);

  const closeSocket = useCallback(() => {
    if (socket) {
      socket?.close?.();
      setState({ isOnline: false });
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
  }, [socketUuid, userId]);

  useEffect(() => {
    const getInitialState = () => {
      if (socket) {
        socket.onerror = () => {
          setConnected(false);
          setError(true);
        };

        socket.onclose = () => {
          setConnected(false);
        };

        socket.onmessage = (e: MessageEvent) => {
          const socketMessage = JSON.parse(e.data);
          const { event } = socketMessage || {};
          const { data: socketData } = socketMessage || {};
          console.log(socketData);

          if (event === MyWebSocketEvents.CONNECTION) {
            const { success } = socketData || {};
            setConnected(Boolean(success));
            setError(!success);
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
            setState(socketData);
          }

          if (event === MyWebSocketEvents.CONNECT_FRIEND) {
            setState(socketData);
          }

          if (event === MyWebSocketEvents.DISCONNECT) {
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
    error,
  }), [openSocket, closeSocket, connected, error]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };
export default SocketProvider;
