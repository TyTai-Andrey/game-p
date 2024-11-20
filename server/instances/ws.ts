import expressWs from 'express-ws';

type WebSocket = Parameters<expressWs.WebsocketRequestHandler>[0] & {
  clientId?: string
  gameId?: string
  friendId?: string
}

type WebSocketServer = ReturnType<expressWs.Instance['getWss']>
type WebSocketServerWithPatchClient = Omit<WebSocketServer, 'clients'> & { clients: Set<WebSocket> }

class ExpressWs {
  static instance: ExpressWs;

  expressWsApp: expressWs.Instance | undefined = undefined;

  constructor(app?: any) {
    if (ExpressWs.instance) {
      return ExpressWs.instance;
    }

    const expressWsApp = expressWs(app);
    this.expressWsApp = expressWsApp;

    ExpressWs.instance = this;

    return ExpressWs.instance;
  }

  getExpressWsApp() {
    return ExpressWs.instance.expressWsApp as expressWs.Instance;
  }

  getWss(): WebSocketServerWithPatchClient {
    return ExpressWs.instance.expressWsApp?.getWss() as WebSocketServerWithPatchClient;
  }

  getWs() {
    return ExpressWs.instance.expressWsApp?.app;
  }

  getClientsThisGame(gameId: string, onlyOnline?: boolean) {
    const clients = new Set<WebSocket>();
    ExpressWs.instance.getWss().clients.forEach((client) => {
      if (client.gameId === gameId && (!onlyOnline || client.readyState === client.OPEN)) {
        clients.add(client);
      }
    });
    return clients;
  }

  sendForClientByFuncCondition(func: (client: WebSocket) => boolean, data: any) {
    ExpressWs.instance.getWss().clients.forEach((client) => {
      if (func(client)) {
        client.send(JSON.stringify(data));
      }
    });
  }

  sendForAllClient(ws: WebSocket, data: any) {
    ExpressWs.instance.getWss().clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  sendForThisClient(ws: WebSocket, data: any) {
    ExpressWs.instance.getWss().clients.forEach((client) => {
      if (client === ws && client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  sendForClientById(ws: WebSocket, data: any, id: string) {
    ExpressWs.instance.getWss().clients.forEach((client) => {
      if (client.clientId === id && client.gameId === ws.gameId) {
        client.send(JSON.stringify(data));
      }
    });
  }

  getClientHelpers(ws: WebSocket) {
    return {
      sendForThisClient: (data: any) => ExpressWs.instance.sendForThisClient(ws, data),
      sendForClientById: (data: any, id: string) => ExpressWs.instance.sendForClientById(ws, data, id),
      sendForClientByFuncCondition: (func: (client: WebSocket) => boolean, data: any) => ExpressWs.instance.sendForClientByFuncCondition(func, data),
      sendForAllClient: (data: any) => ExpressWs.instance.sendForAllClient(ws, data),
    };
  }
}

export type { WebSocket, WebSocketServerWithPatchClient };
export default ExpressWs;
