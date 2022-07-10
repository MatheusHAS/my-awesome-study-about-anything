import { Controller, Get, Post } from 'src/core';

@Controller('users')
export default class UserController {
  @Get('list')
  list() {
    console.log('listing users here');
    return {
      test: true,
    };
  }

  @Post('list')
  create() {
    return { createTest: true };
  }
}
