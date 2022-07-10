import { Express, RequestHandler } from 'express';
import { registerRouteFromModule } from 'src/application/express/actions/register-route';
import { IHttpAdapter } from 'src/core/adapters/http.adapter';
import { IModule } from 'src/core/interfaces/module.interface';

export default class ExpressHttpAdapter extends IHttpAdapter<Express, RequestHandler> {
  constructor(instance: Express) {
    super(instance);
  }

  public get(path: string, handler: RequestHandler): void {
    this.instance.get(path, handler);
  }

  public post(path: string, handler: RequestHandler): void {
    this.instance.post(path, handler);
  }

  public put(path: string, handler: RequestHandler): void {
    this.instance.put(path, handler);
  }

  public delete(path: string, handler: RequestHandler): void {
    this.instance.delete(path, handler);
  }

  public listen(port: string | number, callback?: () => void): void {
    this.instance.listen(port, callback);
  }

  public useModule(module: object): void {
    const router = registerRouteFromModule(module);
    this.instance.use('/', router);
  }
}
