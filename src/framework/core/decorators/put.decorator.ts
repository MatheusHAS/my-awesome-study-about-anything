import { HTTP_METHOD_PUT, METHOD_METADATA, PATH_METADATA, ROUTE_WATERMARK } from '../tokens';

const Put = (routePath?: string): MethodDecorator => {
  return (target, propertyKey: any, descriptor) => {
    Reflect.defineMetadata(ROUTE_WATERMARK, true, descriptor.value as any);
    Reflect.defineMetadata(METHOD_METADATA, HTTP_METHOD_PUT, descriptor.value as any);
    Reflect.defineMetadata(PATH_METADATA, routePath, descriptor.value as any);
  };
};

export default Put;
export { Put };
