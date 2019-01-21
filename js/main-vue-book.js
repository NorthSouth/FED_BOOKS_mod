var bk = new Vue({
  el: '#book-index',
  data: {    
    books: booksAtoM,
    books2: booksNtoZ,
    seenAtoM:buyableArrAtoM,
    seenNtoZ:buyableArrNtoZ,
    btnPress: false,
    bookURL:"",
    bookIMG:"",
    bkIndex:0,
    bkModal:[],
    modalInfo:[]
  },
  mounted(){    
    this.fetchData(); // load local JSON file
  },
  methods: { 
    fetchData: function (){
      // use axios to handle JSON loading
      axios 
      .get('./js/FED_Books.json').then(function(response) {
        items=response.data.items;
        init(); // prep interface
      }, function(error) {
      /*  console.error("Failed!", error);*/
      })
    },
    sendInfo: function (e){
      this.selectedBook = e;
    },
    showModal: function (e,i) {
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
      modalWindow.modalInfo = {
        id: 1,
        index:i,
        book: e
      };
    },
    nameI: function (e) {
      var truncateNameVal=45;
      var bkTitle="";      
      if (e.volumeInfo.title.length > truncateNameVal) {
        bkTitle=e.volumeInfo.title.substring(0,truncateNameVal)+" ...";  
      } else {
        bkTitle=e.volumeInfo.title.substring(0,truncateNameVal);        
      }
      return bkTitle;
    },
    url: function (e) {
      return e.volumeInfo.imageLinks.thumbnail;
    },
    itemWrapper: function (e) {
      return ("itemWrapper-item-" + e.refNum);
    },
    itemNum: function (e) {
      return ("item-" + e.refNum);
    },
    sortValI: function (e) {
      var sortState=document.getElementById("inputState").value;
      document.getElementById("h4atom").innerHTML=sortState+"s A-M";
      document.getElementById("h4ntoz").innerHTML=sortState+"s N-Z";
      return sortState;
    },
    srcI: function (e) {
      return e.volumeInfo.imageLinks.thumbnail;
    },
    overlayContainer: function (e) {
      return ("overlayContainer-item-" + e.refNum);
    },
    overlayPurchase: function (e) {
      return ("purchaseOverlay-item-" + e.refNum);
    },
    resetButtons (){
      elementLess1=document.getElementsByClassName("showLess1Class");
      elementMore1=document.getElementsByClassName("showMore1Class");
      if (elementLess1[0].style.display = "block") {
        elementLess1[0].style.display = "none";   
        if (elementMore1[0].classList.contains("disabled")) {
          elementMore1[0].classList.toggle("disabled");
        }
        elementMore1[0].id=0;
      };
      elementLess2=document.getElementsByClassName("showLess2Class");
      elementMore2=document.getElementsByClassName("showMore2Class");
      if (elementLess2[0].style.display = "block") {
        elementLess2[0].style.display = "none"; 
        if (elementMore2[0].classList.contains("disabled")) {
          elementMore2[0].classList.toggle("disabled");
        }
        elementMore2[0].id=0;
      };
    },
    showMore1: function () {
      this.btnPress=true;
      elementMore=document.getElementsByClassName("showMore1Class");
      elIsDisabled=elementMore[0].classList.contains("disabled");
      if (!elIsDisabled) {
        elementLess=document.getElementsByClassName("showLess1Class");
        elementLess[0].style.display="block";
        elementMore[0].id=1;
        elementMore[0].classList.toggle("disabled");
        sortVal=document.getElementById("inputState").value;
        if (sortVal == "Choose...") {
          document.getElementById("inputState").value=initSortVal;
        }
        this.filterItems();
      };
    },
    showLess1: function (){
      this.btnPress=true;
      elementLess=document.getElementsByClassName("showLess1Class");
      elementLess[0].style.display = "none";
      elementMore=document.getElementsByClassName("showMore1Class");
      elementMore[0].id=0;      
      elementMore[0].classList.toggle("disabled");
      this.filterItems();
    },
    showMore2: function () {
      this.btnPress=true;
      elementMore=document.getElementsByClassName("showMore2Class");
      elIsDisabled=elementMore[0].classList.contains("disabled");
      if (!elIsDisabled) {
        elementLess=document.getElementsByClassName("showLess2Class");
        elementLess[0].style.display="block";
        elementMore[0].id=1;
        elementMore[0].classList.toggle("disabled");
        sortVal=document.getElementById("inputState").value;
        if (sortVal == "Choose...") {
          document.getElementById("inputState").value="Author";
        }
        this.filterItems();
      };
    },
    showLess2: function (){
      this.btnPress=true;
      elementLess=document.getElementsByClassName("showLess2Class");
      elementLess[0].style.display = "none";
      elementMore=document.getElementsByClassName("showMore2Class");
      elementMore[0].id=0;      
      elementMore[0].classList.toggle("disabled");
      this.filterItems();
    },
    getDispVal1: function (e){
      maxDisp=2;
      element=document.getElementsByClassName("showMore1Class");
      return ((element[0].id + 1) * maxDisp);
    },
    getDispVal2: function (e){
      maxDisp=2;
      element=document.getElementsByClassName("showMore2Class");
      return ((element[0].id + 1) * maxDisp);
    },
    filterItems: function () {
      let isValidSort=true;
      let sortVal = document.getElementById("inputState").value;      
      switch (sortVal) {
        case "Title":
          {
            bookTestArr.sort(function (a, b) {
              var titleA = a.volumeInfo.title[0].toUpperCase();
              var titleB = b.volumeInfo.title[0].toUpperCase();

              let comparison = 0;

              if (titleA > titleB) {
                comparison = 1;
              } else if (titleA < titleB) {
                comparison = -1;
              }
              return comparison;
            });
            this.books = bookTestArr.filter(function(value, index, arr){

              var title = arr[index].volumeInfo.title.toUpperCase();

              firstChar=title.substring(0, 1);  
              if (firstChar < "N") {    
                return value;
              };
            });
            this.books2 = bookTestArr.filter(function(value, index, arr){

              var title = arr[index].volumeInfo.title.toUpperCase();

              firstChar=title.substring(0, 1);  
              if (firstChar > "M") {    
                return value;
              };
            });
          }
          break;
        case "Author": {
          bookTestArr.sort(function (a, b){
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
          });
          this.books = bookTestArr.filter(function(value, index, arr){

            var author = arr[index].volumeInfo.authors[0].toUpperCase();
            var arr = author.split(" ");  
            var lengthAuthor = arr.length - 1;

            author=arr[lengthAuthor];  

            firstChar=author.substring(0, 1);  
            if (firstChar < "N") {    
              return value;
            };
          });

          this.books2 = bookTestArr.filter(function(value, index, arr){

            var author = arr[index].volumeInfo.authors[0].toUpperCase();
            var arr = author.split(" ");  
            var lengthAuthor = arr.length - 1;

            author=arr[lengthAuthor];  

            firstChar=author.substring(0, 1); 
            if (firstChar > "M") { 
              return value;
            };
            });
          }
          break;
        default:
          {
            isValidSort=false;
            alert("Please select how you'd like to view the books."); 
          }
      };
      if (isValidSort) {
        /* reset values */
        this.seenAtoM.fill(true);
        this.seenNtoZ.fill(true);
        if (!this.btnPress) {
          this.resetButtons();
        } else {
          this.btnPress = !this.btnPress;
        };   
        elementDisplay=document.getElementById("result-container");
        elementDisplay.style.visibility = "visible";   
        elementDisplay=document.getElementsByClassName("book-container");
        elementDisplay[0].style.backgroundImage = ""; 
      }
    }
  }
})

var modalWindow = new Vue({
  el: '#modal-window',
  data: {
    books: booksAtoM,
    books2: booksNtoZ,
    seenAtoM:buyableArrAtoM,
    seenNtoZ:buyableArrNtoZ,
    btnPress: false,
    bookURL:"",
    bookIMG:"",
    bkIndex:0,
    bkModal:[],
    modalInfo: {
        id: -1,
        index:1,
        book: bk.books[1]
    },
    indexM:0,
    isActive:false
  },
  computed: {
    buyObject: function (){
      if (this.modalInfo.id > -1){
        return {
          modalPriceActive: this.priceITruth(this.modalInfo.book), modalPriceInActive: !this.priceITruth(this.modalInfo.book)
        }
      }
    },
    bookIndex: function () {
      this.modalIndex=bk.bkIndex;
      console.log(bk.bkIndex,bk.books);
      if (bk.books.length>0){
        return bk.bkIndex
      }
    },
    bookTitle: function () {
      if (this.modalInfo.id > -1){
        return this.modalInfo.book.volumeInfo.title
      }
    },
    bookAuthor: function () {
      if (this.modalInfo.id > -1){
        return this.modalInfo.book.volumeInfo.authors[0]
      }
    },
    bookDescription: function () {
      if (this.modalInfo.id > -1){
        return this.modalInfo.book.volumeInfo.description
      }
    },
    bookAuthorPlural: function () {
      if (this.modalInfo.id > -1){
        var numAuthors=this.modalInfo.book.volumeInfo.authors.length;
        if (numAuthors > 1) { return "s"};
      }
    },
    bookPrice: function () {    
      if (this.modalInfo.id > -1){
        bookPrice=this.priceI(this.modalInfo.book);
        if (bookPrice != "not for sale") {
          return bookPrice;
        }
      }
    }
  },
  methods: {
    bookIndexM: function(){
      console.log("index:",this.indexM,bk.books);
      return bk.bkIndex
    },
    dismissModal: function (e) {
      var modal = document.getElementById('myModal');
      modal.style.display = "none";
    },
    dismissImageModal: function (e) {
      var modal = document.getElementById('myModal-image');
      modal.style.display = "none";
    },
    priceITruth: function (e) {
      var bkPrice=0;
      if (e.saleInfo.saleability == "NOT_FOR_SALE") {
        return false;
      } else {
        return true;
      };
    },
    priceI: function (e) {
      var bkPrice=0;
      if (e.saleInfo.saleability == "NOT_FOR_SALE") {
        return ("not for sale");
      } else {
        return e.saleInfo.listPrice.amount+" ("+e.saleInfo.listPrice.currencyCode+")";
      };
    },
    infoM: function (){
      if (this.modalInfo.id > -1 ) {
        return this.modalInfo.book.volumeInfo.title
      }      
    },
    buyModalItem: function(){      
      url=this.modalInfo.book.saleInfo.buyLink;
      var win = window.open(url, '_blank');
      win.focus();
    }
  },
  template: `  
    <div id="myModal" class="modal" >
      <!-- Modal content info -->
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="modal-title">{{ bookTitle }}</h2>
        </div>
        <div class="modal-body">
          <p id="modal-author"><span>Author{{ bookAuthorPlural }}:</span> {{ bookAuthor }}</p>
          <p id="modal-description">{{ bookDescription }}</p>
        </div>
        <div class="modal-footer">
          <div class="modal-footer-wrapper">
            <div id="buy-hide" class="buyMeIcon-wrapper" v-bind:class="buyObject">
              <i class="fa fa-shopping-cart buyMeIcon" v-on:click.prevent="buyModalItem"><span id="modal-book-price" >{{bookPrice}}</span></i>
            </div>
            <div id="modal-close" v-on:click.prevent="dismissModal(this)" class="close">&times;</div>
          </div>
        </div>
      </div>         
    </div> 
  `
})