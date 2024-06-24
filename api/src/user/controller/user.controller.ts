import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';
import {from, Observable, of} from 'rxjs';
import {catchError, map} from "rxjs/operators";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User | Object> {
    return this.userService.create(user).pipe(
        map((user: User) => user),
        catchError(err => of({ error: err.message })) // Correct error handling
    );
  }

  @Post('login')
  login(@Body()user:User){
    return this.userService.login(user).pipe(
        map((jwt:string)=>{
          return {access_token:jwt}
        })
    )
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Object> {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.userService.deleteOne(id);
  }
  @Patch(':id')
  updateOne(@Param('id') id: number, @Body() user: User): Observable<any> {
    return this.userService.updateOne(id, user);
  }
}
