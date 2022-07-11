import { Module } from 'src/framework/core';
import UserController from 'src/app/users/user.controller';

@Module({
  controllers: [UserController],
})
export default class UserModule {}
