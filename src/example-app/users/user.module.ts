import { Module } from 'src/core';
import UserController from 'src/example-app/users/user.controller';

@Module({
  controllers: [UserController],
})
export default class UserModule {}
