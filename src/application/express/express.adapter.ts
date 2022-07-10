import { Express, RequestHandler } from 'express';
import { createRouterFromModule } from 'src/application/express/actions/register-route';
import { IHttpAdapter } from 'src/core/adapters/http.adapter';

export default class ExpressHttpAdapter extends IHttpAdapter<Express, RequestHandler> {
  constructor(instance: Express) {
    super(instance);
  }

  public useMiddleware(middleware: any) {
    this.instance.use(middleware);
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
    const router = createRouterFromModule(module);
    this.instance.use('/', router);
  }
}
