import expressWs from 'express-ws';
import { WebSocketServerWithPatchClient } from '../utils/ws-operations.js';

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

    return this;
  }

  getWss(): WebSocketServerWithPatchClient | undefined {
    return this.expressWsApp?.getWss();
  }

  getWs() {
    return this.expressWsApp?.app;
  }
}

export default ExpressWs;
