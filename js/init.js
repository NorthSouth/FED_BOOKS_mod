
function init(){
  bookTestArr=items;

  // initially, conceal the display area from view
  // until user chooses how to sort books
  elementDisplay=document.getElementById("result-container");
  elementDisplay.style.visibility = "hidden";    
  
  // set an image to display as default before
  // user chooses how to sort books
  elementDisplay=document.getElementsByClassName("book-container");
  elementDisplay[0].style.backgroundImage = 'url("./images/open_book_icon-150-02.svg")';     
  
}

function toggleButtonDisabled(btnClassName){
  elementMore=document.getElementsByClassName(btnClassName);
  elementMore[0].id=0;      
  elementMore[0].classList.toggle("disabled");
}

function compareTitle2(a, b){
  var titleA = a.volumeInfo.title[0].toUpperCase();
  var titleB = b.volumeInfo.title[0].toUpperCase();

  let comparison = 0;
  
  if (titleA > titleB) {
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }
  return comparison;
}

function compareAuthor2(a, b){
  var authorA = a.volumeInfo.authors[0].toUpperCase();
  var authorB = b.volumeInfo.authors[0].toUpperCase();

  var arrA = authorA.split(" ");
  var arrB = authorB.split(" ");
  
  var lengthA = arrA.length - 1;
  var lengthB = arrB.length - 1;
  
  authorA=arrA[lengthA];  
  authorB=arrB[lengthB];   
  
  let comparison = 0;
  
  if (authorA > authorB) {
    comparison = 1;
  } else if (authorA < authorB) {
    comparison = -1;
  }
  return comparison;
}


var bookData = [];
var items = [];
var obj = [];

var truncateNameVal=45;
var authors=new Array();
var titles=new Array();
var thumbnails=new Array();


// Initialize settings
bkIndex=0;
bkDispMaxVal=5;  // number of books to display at a time
showMoreInc=1;
/*var initSortVal="Choose..."; */
var initSortVal="Author"; //default sort parameter for book data


