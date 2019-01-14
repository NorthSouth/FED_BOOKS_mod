bookTestArr=items;

switch (initSortVal){
  case "Author" :
    bookTestArr.sort(compareAuthor2);
    break;
  case "Title" :
    bookTestArr.sort(compareTitle2);
    break;
  default :
    bookTestArr.sort(compareAuthor2);
}


var booksAtoM = bookTestArr.filter(function(value, index, arr){

  var author = arr[index].volumeInfo.authors[0].toUpperCase();
  var arr = author.split(" ");  
  var lengthAuthor = arr.length - 1;
  
  author=arr[lengthAuthor];  

  firstChar=author.substring(0, 1);  
  if (firstChar < "N") {    
    return value;
  };
});

var booksNtoZ = bookTestArr.filter(function(value, index, arr){

  var author = arr[index].volumeInfo.authors[0].toUpperCase();
  var arr = author.split(" ");  
  var lengthAuthor = arr.length - 1;
  
  author=arr[lengthAuthor];  

  firstChar=author.substring(0, 1); 
  if (firstChar > "M") { 
    return value;
  };
});

element=document.getElementsByClassName("showMore1Class");
element[0].id=0;
element[0].style.display = "block";
element=document.getElementsByClassName("showLess1Class");
element[0].id=0;
element[0].style.display = "none";
element=document.getElementsByClassName("showMore2Class");
element[0].id=0;
element[0].style.display = "block";
element=document.getElementsByClassName("showLess2Class");
element[0].id=0;
element[0].style.display = "none";


element=document.getElementById("buy-hide");
element.style.display="block";
element=document.getElementById("buy-hide2");
element.style.display="block";

document.getElementById("h4atom").innerHTML="Authors A-M";
document.getElementById("h4ntoz").innerHTML="Authors N-Z";

buyableArrAtoM=new Array(booksAtoM.length).fill(true);
buyableArrNtoZ=new Array(booksNtoZ.length).fill(true);