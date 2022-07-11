import { Express, RequestHandler } from 'express';
import ExpressRegisterModule from 'src/framework/application/express/express-register-module';
import { IHttpAdapter } from 'src/framework/core/adapters/http.adapter';

export default class ExpressHttpAdapter extends IHttpAdapter<Express, RequestHandler> {
  constructor(instance: Express) {
    super(instance, new ExpressRegisterModule());
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
    const router = this.registrationModule.loadModule(module);
    this.instance.use('/', router);
  }
}
