import express, { Express, Router } from 'express';
import { registerRouteFromModule } from 'src/application/express/actions/register-route';

export default class ExpressApplicationAdapter {
  protected readonly _instance: Express;
  protected readonly _port: number | string;

  constructor(port: number | string) {
    this._port = port;
    this._instance = express();
  }

  useModule(module: any) {
    const router: Router = registerRouteFromModule(module);
    this._instance.use('/', router);
  }

  listen() {
    this._instance.listen(this._port, () => {
      console.log(`Listening server on port ${this._port}`);
    });
  }
}
