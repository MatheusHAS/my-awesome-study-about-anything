import { Controller, Get, Post } from 'src/framework/core';

@Controller('users')
export default class UserController {
  @Get('list')
  list() {
    console.log('Listing users! NICE JOB!');
    return [
      {
        id: 1,
        name: 'Matheus Azambuja',
      },
    ];
  }

  @Post('create')
  create(body: any) {
    console.log('This is awesome!');
    return { created: true, body };
  }
}
