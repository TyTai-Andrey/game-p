// react
import { useContext } from 'react';

// local imports
// components
import { SocketContext } from '@components/providers/SocketProvider';

const useSocket = () => {
  const values = useContext(SocketContext);

  return values;
};

export default useSocket;
