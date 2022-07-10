import 'reflect-metadata';
import Server from 'src/application/express';
import RootModule from 'src/example-app/root.module';

(async () => {
  const PORT = process.env.PORT || 3000;
  const application = new Server(PORT);

  application.start(() => {
    console.log(`Listening server on ${PORT} port`);
  });

  application.httpServer.useModule(RootModule);
})();
