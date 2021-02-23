/*
  제네릭: 특정 타입만이 아닌 다양한 타입으로 범용적으로 재사용할 수 있도록 하는 기법.
        : 클래스의 선언 시점이 아니라 인스턴스의 생성 시점에 타입을 명시.
        : 함수의 선언 시점이 아니라 실행 시점에 타입을 명시.
  => 한번의 선언으로 다양한 타입의 매개변수와 리턴값을 사용가능해짐.

 1) 클래스/함수에서 Type Variable(T, U, V 등)을 설정하여 매개변수/반환 타입에 활용.
    - 함수<T>(~): ~ {}
 2) 클래스/함수를 호용할 때 Type Variable에 값을 대입하면서 실행.
    - 함수<number>(~)  // T = number 타입을 직접 지정하면서 함수 실행. (권장)
    - 함수(~)  // 컴파일러에서 인자의 타입에 따라 자동으로 T에 타입 대입. (에러 가능)
*/
function reverse<T>(items: T[]): T[] {
  return items.reverse();
}

// 인수에 의해 타입 매개변수가 결정됨.
const numArg = [1, 2, 3, 4, 5];
console.log(reverse<number>(numArg)); // [ 5, 4, 3, 2, 1 ]
console.log(reverse(numArg)); // [ 5, 4, 3, 2, 1 ]

const objArg = [{ name: "Lee" }, { name: "Kim" }];
console.log(reverse<object>(objArg)); // [ { name: 'Kim' }, { name: 'Lee' } ]
console.log(reverse(objArg)); // [ { name: 'Kim' }, { name: 'Lee' } ]

// =========================================================================
function identityAny(arg: any): any {
  return arg;
} // 대입된 인자가 어떤 타입이었는지에 대한 정보는 return 시점에 사라지게 됨. 두 가지 any는 서로 관련 없음.

function identityGeneric<T>(arg: T): T {
  return arg;
} // T = type variable. 값이 아닌 타입에 적용되는 변수.

// 두 가지 사용 방법: 직접 타입 지정하는 것을 권장.
const stringOutput1 = identityGeneric<string>("myString"); // T = string으로 직접 지정하면서 함수 실행.
const stringOutput2 = identityGeneric("myString"); // 컴파일러가 T = 인자 타입 자동 대입.

// =========================================================================
// [mail.service.spec.ts]
describe('MailService', () => {
  let service: MailService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MailService],
    }).compile();
    service = module.get<MailService>(MailService); // TInput = MailService 대입.
    // get<TInput = any, TResult = TInput>(~)~
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
}

// =========================================================================
