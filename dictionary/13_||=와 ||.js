/*
  Logical OR assignment (||=)
  
   x ||= y 
    - x가 참이면 x를 그대로 둠.
    - x가 거짓이면 x에 y값 대입. 즉, x값이 존재하지 않으면 y값 대입.
*/

const a = { duration: 50, title: "" };

a.duration ||= 10;
console.log(a.duration);
// 50
// a.duration이 50으로 존재하기 때문에 그대로 내버려 둠.

a.title ||= "title is empty.";
console.log(a.title);
// "title is empty"
// a.title의 값이 존재하지 않기 때문에 a.title에 ||= 뒤의 값을 대입.

// -------------------------------------------------------
/*
   x || y 
    - x가 참이면 x 반환. (즉, x가 존재하면 x를 값으로 return)
    - x가 거짓이면 y 반환. (즉, x가 존재하지 않으면 y를 값으로 return)
*/

const b = { duration: 50, title: "" };

b.duration || 10;
console.log(b.duration || 10);
// 50
// b.duration이 50으로 존재하기 때문에 그대로 return.

b.title || "title is empty.";
console.log(b.title || "title is empty.");
// "title is empty"
// b.title의 값이 존재하지 않기 때문에 || 뒤의 값 반환.
