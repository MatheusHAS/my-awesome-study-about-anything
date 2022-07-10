import { CONTROLLER_WATERMARK, PATH_METADATA } from '../tokens';

const Controller = (routePrefix?: string): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(CONTROLLER_WATERMARK, true, target);
    Reflect.defineMetadata(PATH_METADATA, routePrefix, target);
  };
};

export default Controller;
export { Controller };
