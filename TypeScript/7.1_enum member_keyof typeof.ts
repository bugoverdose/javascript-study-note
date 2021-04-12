/*
  enum 타입
  - role 필드에 3가지 값들만 들어올 수 있도록 제한을 두는 방법
  - Client, Owner, Delivery. 기본적으로 문자열이 아니라 그 자체로 하나의 타입으로 사용.
  1) 디폴트로 DB에는 0, 1, 2라는 값으로만 전달.
  2) Client = 'Client'처럼 값 대입하여 사용 가능.
     => keyof typeof를 통해 대입된 각 값들 접근 가능.

  주의: class validation으로 @IsEnum(enum타입) 설정 필요.
*/
// [role.decorator.ts]
type AllowedRoles = keyof typeof UserRole | "Any";
// type AllowedRoles = 'Client' | 'Owner' | 'Delivery' | 'Any'

export const Role = (roles: AllowedRoles[]) => SetMetadata("roles", roles);

// ======================================================
// [user.entity.ts]
enum UserRole {
  Client = "Client",
  Owner = "Owner",
  Delivery = "Delivery", // TypeORM용 필드타입.
} // Client='Client'처럼 값 대입 안하는 경우, 기본적으로 DB에는 각각 0, 1 ,2라는 값이 전달됨.

registerEnumType(UserRole, { name: "UserRole" }); // GraphQL용 필드타입. Client, Owner, Delivery 그대로 사용됨.

@InputType("UserInputType", { isAbstract: true }) // MappedTypes를 통해 해당 GraphQL 엔티티로 dto 생성하기 위해 필요. isAbstract:  GraphQL 스키마에서 @InputType의 엔티티 생성 방지.
@ObjectType() // GraphQL 스키마마
@Entity() // TypeORM
export class UserEntity extends CoreEntity {
  // ~~
  @Field((type) => UserRole) // GraphQL
  @Column({ type: "enum", enum: UserRole }) // TypeORM => Client, Owner, Delivery 대입
  @IsEnum(UserRole)
  role: UserRole; // Client, Owner, Delivery
}

// ===================================================================
// ===================================================================
// [user.entity.ts]
enum UserRole {
  Client,
  Owner,
  Delivery, // TypeORM용 필드타입. DB에는 각각 0, 1 ,2라는 값으로 대입됨.
} // Client, Owner, Delivery. 문자열이 아니라 그 자체로 하나의 타입으로 사용.

registerEnumType(UserRole, { name: "UserRole" }); // GraphQL용 필드타입. Client, Owner, Delivery 그대로 사용됨.

@InputType("UserInputType", { isAbstract: true }) // MappedTypes를 통해 해당 GraphQL 엔티티로 dto 생성하기 위해 필요. isAbstract:  GraphQL 스키마에서 @InputType의 엔티티 생성 방지.
@ObjectType() // GraphQL 스키마마
@Entity() // TypeORM
export class UserEntity extends CoreEntity {
  // ~~
  @Field((type) => UserRole) // GraphQL
  @Column({ type: "enum", enum: UserRole }) // TypeORM => 0, 1, 2 대입
  @IsEnum(UserRole)
  role: UserRole; // Client, Owner, Delivery
}
// ======================================================
