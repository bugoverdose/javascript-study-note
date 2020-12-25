/*
  fetch 함수 + 커링함수 활용
  - url을 받아 해당 url에 HTTP 요청을 하는 함수 (서버에 정보를 요청하는 함수)
  - baseUrl 등 공통적인 요소는 미리 기억해놓고, 특정한 값만으로 서버를 요청.
*/
var getInformation = (baseUrl) => (path) => (id) =>
  fetch(baseUrl + path + "/" + id);

var imageUrl = "http://imageAddress.com/";

var getImage = getInformation(ImageUrl);
var getBackground = getImage("background"); // "http://imageAddress.com/background"
var getIcon = getImage("icon"); // "http://imageAddress.com/icon"

var background1 = getBackground(101); // "http://imageAddress.com/background/101"
var background2 = getBackground(102); // "http://imageAddress.com/background/102"
var icon1 = getIcon(301); // "http://imageAddress.com/icon/301"
var icon2 = getIcon(302); // "http://imageAddress.com/icon/302"
