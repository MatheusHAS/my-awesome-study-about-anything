export abstract class IHttpAdapter<TServerInstance, TRequestHandler> {
  protected readonly instance: TServerInstance;

  constructor(instance: TServerInstance) {
    this.instance = instance;
  }

  public getInstance(): TServerInstance {
    return this.instance;
  }

  public abstract get(path: string, handler: TRequestHandler): void;
  public abstract post(path: string, handler: TRequestHandler): void;
  public abstract put(path: string, handler: TRequestHandler): void;
  public abstract delete(path: string, handler: TRequestHandler): void;

  public abstract listen(port: string | number, callback?: () => void): void;

  public abstract useModule(module: object): void;
  public abstract useMiddleware(middleware: object): void;
}
