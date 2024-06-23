import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    create(@Body()user: User): Observable<User>{
        return this.userService.create(user);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<User>{
        return this.userService.findOne(id);
    }

    @Get()
    findAll(): Observable<User[]>{
        return this.userService.findAll()
    }


    @Delete(':id')
    deleteOne(@Param('id') id: number): Observable<any> {
        return this.userService.deleteOne(id);
    }
    @Patch(':id')
    updateOne(@Param('id') id: number, @Body()user: User): Observable<any>{
        return this.userService.updateOne(id, user)
    }
}
