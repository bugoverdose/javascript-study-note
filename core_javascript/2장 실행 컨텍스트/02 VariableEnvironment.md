## VariableEnvironment vs LexicalEnvironment

1. 실행 컨텍스트를 생성할 때 VariableEnvironment에 정보를 먼저 담고, 이를 그대로 복사해서 LexicalEnvironment를 만듬. 이후에는 LexicalEnvironment를 주로 활용하게 됨.

2. 초기화 과정 중에는 VariableEnvironment와 LexicalEnvironment는 서로 완전히 동일. 이후 코드 진행에 따라 서로 달라지게 됨.

공통점: 서로 완전히 같은 내용(environmentRecord와 outerEnvironmentReference)을 담음.

차이점

- `VariableEnvironment는 최초 실행 시점의 snapshot을 유지`.
- `LexicalEnvironment에는 변경사항이 반영`됨.

---

VariableEnvironment

- environmentRecord (snapshot)
- outerEnvironmentReference (snapshot)

LexicalEnvironment

- environmentRecord
- outerEnvironmentReference

ThisBinding
