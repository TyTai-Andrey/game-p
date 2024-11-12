const createGameSocket = (uuid: string) => new WebSocket(
  `ws://${process.env.REACT_APP_API_BASE_DOMAIN}/game/${uuid}`,
);

export default createGameSocket;
