import { json, urlencoded } from 'express';
import 'reflect-metadata';
import ExpressHttpServer from 'src/framework/application/express';
import RootModule from 'src/app/root.module';
import KoaHttpServer from 'src/framework/application/koa';

const port = process.env.PORT || 3000;

(async () => {
  const application = new ExpressHttpServer({
    port,
    middlewares: [json(), urlencoded()],
    rootModule: RootModule,
  });

  // const application = new KoaHttpServer({
  //   port,
  //   middlewares: [],
  //   rootModule: RootModule,
  // });

  application.start(() => {
    console.log(`Listening server on http://localhost:${port}`);
  });
})();
