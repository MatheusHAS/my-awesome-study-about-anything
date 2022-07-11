import { RequestHandler, Router } from 'express';
import { isValidController, isValidModule, isValidRoute } from 'src/framework/core';
import { IModule } from 'src/framework/core/interfaces/module.interface';
import {
  HTTP_METHOD_DELETE,
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
  HTTP_METHOD_PUT,
  METHOD_METADATA,
  MODULE_METADATA,
  PATH_METADATA,
} from 'src/framework/core/tokens';
import { Logger, routePathSanitize } from 'src/framework/utils';

const getPath = (basePath: string | undefined, routePath: string) => {
  if (!routePath && !basePath) {
    routePath = '/';
  } else if (basePath && !routePath) {
    routePath = '';
  }

  return basePath ? routePathSanitize(`/${basePath}/${routePath}`) : routePathSanitize(routePath);
};

const updateRouterUsingController = (router: Router, basePath: string, controllerClass: any) => {
  if (!isValidController(controllerClass)) {
    Logger(controllerClass, 'Cant load a INVALID CONTROLLER');
    return;
  }

  const functions = getFunctionsFromClass(controllerClass);

  if (!functions.length) {
    Logger(controllerClass, 'Without routes to load, skipped.');
    return;
  }

  functions.forEach(functionName => {
    const handler = controllerClass.prototype[functionName];
    const methodMetadata = Reflect.getMetadata(METHOD_METADATA, handler);
    if (!isValidRoute(handler)) {
      Logger(controllerClass, 'Cant load a not is valid route, skipped.');
      return;
    }

    if (!methodMetadata) {
      Logger(controllerClass, `The method ${functionName} dont have a verbs (GET, POST, PUT or DELETE), skipping.`);
      return;
    }

    let pathMetadata = Reflect.getMetadata(PATH_METADATA, handler);

    const routePath = getPath(basePath, pathMetadata);
    const routeRequestHandler: RequestHandler = (req: any, res: any) => {
      return res.send(handler(req.body));
    };

    if (methodMetadata === HTTP_METHOD_GET) {
      Logger(controllerClass, `[GET] ${routePath}`);
      router.get(routePath, routeRequestHandler);
    } else if (methodMetadata === HTTP_METHOD_POST) {
      Logger(controllerClass, `[POST] ${routePath}`);
      router.post(routePath, routeRequestHandler);
    } else if (methodMetadata === HTTP_METHOD_PUT) {
      Logger(controllerClass, `[PUT] ${routePath}`);
      router.put(routePath, routeRequestHandler);
    } else if (methodMetadata === HTTP_METHOD_DELETE) {
      Logger(controllerClass, `[DELETE] ${routePath}`);
      router.delete(routePath, routeRequestHandler);
    }
  });
};

export const createRouterFromModule = (moduleClass: object, initialRouter?: any): Router => {
  const { controllers, modules }: IModule = getModuleMetadata(moduleClass);

  const mainRouter = initialRouter || Router();

  // First - Setup controllers
  if (controllers) {
    controllers.forEach((controller: any) => {
      let basePathMetadata = Reflect.getMetadata(PATH_METADATA, controller);
      if (!basePathMetadata) {
        basePathMetadata = '/';
      }
      updateRouterUsingController(mainRouter, basePathMetadata, controller);
    });
  }

  // Recursive module loader
  if (modules) {
    modules.forEach((module: any) => {
      if (!isValidModule(module)) {
        Logger(module, 'Cant load a invalid module.');
        return;
      }

      const moduleRouter = Router();
      createRouterFromModule(module, moduleRouter);
      mainRouter.use(moduleRouter);
    });
  }

  return mainRouter;
};

const getFunctionsFromClass = (classElement: any): string[] => {
  const functions = Reflect.ownKeys(classElement.prototype);
  return functions.filter(name => name !== 'constructor').map(name => name.toString());
};

const getModuleMetadata = (target: any): IModule => {
  const metadata: IModule = Reflect.getMetadata(MODULE_METADATA, target);
  return metadata;
};
