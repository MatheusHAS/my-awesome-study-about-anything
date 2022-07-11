import RegisterModuleAbstraction from 'src/framework/application/register-module.abstract';

export abstract class IHttpAdapter<TServerInstance, TRequestHandler> {
  protected readonly instance: TServerInstance;
  readonly registrationModule: RegisterModuleAbstraction;

  constructor(instance: TServerInstance, registrationModule: RegisterModuleAbstraction) {
    this.instance = instance;
    this.registrationModule = registrationModule;
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
