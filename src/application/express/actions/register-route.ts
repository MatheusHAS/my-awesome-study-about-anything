import { RequestHandler, Router } from 'express';
import { IModule } from 'src/core/interfaces/module.interface';
import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  METHOD_METADATA,
  MODULE_METADATA,
  PATH_METADATA,
  ROUTE_WATERMARK,
} from 'src/core/tokens';
import { routePathSanitize } from 'src/utils';

export const registerRouteFromModule = (module: any): Router => {
  const { controllers, modules }: IModule = getModuleMetadata(module);
  let allControllers: any[] = controllers || [];

  // Only for 1st depth - for tests
  modules?.forEach(internalModule => {
    const metadata = getModuleMetadata(internalModule);
    if (metadata.controllers) {
      allControllers = [...allControllers, ...metadata.controllers];
    }
  });

  const router = Router();

  allControllers.forEach(controller => {
    const baseRoutePath = Reflect.getMetadata(PATH_METADATA, controller);
    const functions = getFunctionsFromClass(controller);

    // try get route to all controller methods
    functions.forEach((functionName: string) => {});
    for (const functionName of functions) {
      const handler = controller.prototype[functionName];
      console.log('functionName', functionName);
      const isRoute = Reflect.getMetadata(ROUTE_WATERMARK, handler);
      if (!isRoute) {
        return;
      }

      const routePathMetadata = Reflect.getMetadata(PATH_METADATA, handler);
      const methodMetadata = Reflect.getMetadata(METHOD_METADATA, handler);

      const routePath = baseRoutePath
        ? routePathSanitize(`/${baseRoutePath}/${routePathMetadata}`)
        : routePathSanitize(routePathMetadata);

      console.log('routePathMetadata', routePathMetadata);

      const routeRequestHandler: RequestHandler = (req: any, res: any) => {
        res.send(handler());
      };

      if (methodMetadata === HTTP_METHOD_GET) {
        console.log('registering get', routePath);
        router.get(routePath, routeRequestHandler);
      } else if (methodMetadata === HTTP_METHOD_POST) {
        console.log('registering post', routePath);
        router.post(routePath, routeRequestHandler);
      }
    }
  });

  return router;
};

const getFunctionsFromClass = (classElement: any): string[] => {
  const functions = Reflect.ownKeys(classElement.prototype);
  return functions.filter(name => name !== 'constructor').map(name => name.toString());
};

const getModuleMetadata = (target: any): IModule => {
  const metadata: IModule = Reflect.getMetadata(MODULE_METADATA, target);
  return metadata;
};
