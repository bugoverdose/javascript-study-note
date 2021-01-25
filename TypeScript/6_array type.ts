/*
  Class[]
  : 해당 Class들로만 구성가능한 배열 타입
  : === [Class]
*/

class Block {
  public index: number;
  public hash: string;
  constructor(index: number, hash: string) {
    this.index = index;
    this.hash = hash;
  } // constructor: 해당 클래스로부터 인스턴스 객체를 생성할 때 자동실행되는 메서드
}

const genesisBlock: Block = new Block(0, "23242345134123");

let blockchain: Block[] = [genesisBlock];
// Block[] === [Block]
// Block 클래스들로 구성된 배열. Block들로만 구성될 수 있도록 지정.

const getBlockchain = (): Block[] => blockchain;

blockchain.push("not a Block"); // 에러. 배열에 Block 클래스가 아닌 것 추가 불가.

console.log(blockchain);
