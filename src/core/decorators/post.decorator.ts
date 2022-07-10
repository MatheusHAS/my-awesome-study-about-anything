import { HTTP_METHOD_POST, METHOD_METADATA, PATH_METADATA, ROUTE_WATERMARK } from '../tokens';

const Post = (routePath?: string): MethodDecorator => {
  return (target, propertyKey: any, descriptor) => {
    Reflect.defineMetadata(ROUTE_WATERMARK, true, descriptor.value as any);
    Reflect.defineMetadata(METHOD_METADATA, HTTP_METHOD_POST, descriptor.value as any);
    Reflect.defineMetadata(PATH_METADATA, routePath, descriptor.value as any);
  };
};

export default Post;
export { Post };
