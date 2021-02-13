/*
private : 외부의 다른 클래스에서 접근불가. make the property private so no other class can access it
readonly: 내부의 다른 메서드가 수정불가. make the property read only so no method inside the class can override it 
*/
import { Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {} // UsersService 접근가능하도록 constructor에서 usersService 생성.

  @Query((returns) => Boolean)
  hello() {
    return true;
  }
}
