'use strict';
//global variables
var allPics = [];
var busMallPic = document.getElementById('busMallPic');
var busMallPic2 = document.getElementById('busMallPic2');
var busMallPic3 = document.getElementById('busMallPic3');
var lastItemSelected = document.getElementById('lastItemSelected');
var totalClickCount = document.getElementById('totalClickCount');
var totalViews = 0;

function BusMallPic(name) {
  this.filepath = `assets/${name}.jpg`;
  this.name = name;
  this.views = 0;
  this.clicked = 0;
  allPics.push(this);
}

new BusMallPic('bag');
new BusMallPic('banana');
new BusMallPic('bathroom');
new BusMallPic('boots');
new BusMallPic('breakfast');
new BusMallPic('bubblegum');
new BusMallPic('chair');
new BusMallPic('cthulhu');
new BusMallPic('dog-duck');
new BusMallPic('dragon');
new BusMallPic('pen');
new BusMallPic('pet-sweep');
new BusMallPic('scissors');
new BusMallPic('shark');
new BusMallPic('sweep');
new BusMallPic('tauntaun');
new BusMallPic('unicorn');
new BusMallPic('usb');
new BusMallPic('water-can');
new BusMallPic('wine-glass');

function showRandomPic() {

  var newGenNumThree = [];

  function in_array(array, el) {
    for(var i = 0 ; i < allPics.length; i++)
      if(array[i] === el) return true;
    return false;
  }

  function get_rand(array) {
    var rand = allPics[Math.floor(Math.random() * allPics.length)]; // Product Object
    for(var i = 0; i < 3; i++) {
      if(!in_array(newGenNumThree, rand)) {
        newGenNumThree.push(rand); // Add new product to array 3 times, only if it's not duplicate
        rand.views += 1;
        totalViews++;
        return rand;
      }
      return get_rand(array);
    }
  }

  for(var i = 0; i < 3; i++) {
    get_rand();
  }

  busMallPic.src = newGenNumThree[0].filepath;
  busMallPic.alt = newGenNumThree[0].name;
  busMallPic.title = newGenNumThree[0].name;

  busMallPic2.src = newGenNumThree[1].filepath;
  busMallPic2.alt = newGenNumThree[1].name;
  busMallPic2.title = newGenNumThree[1].name;

  busMallPic3.src = newGenNumThree[2].filepath;
  busMallPic3.alt = newGenNumThree[2].name;
  busMallPic3.title = newGenNumThree[2].name;
}

showRandomPic();

var counter = 1;
function handlePicClick(event) {
  // console.log(event);
  console.log('clicked event: ' + event.target.alt);
  // console.log(allPics);
  var addCount = allPics.find(function(allPics) {
    return allPics.name === event.target.alt;
  });
  addCount.clicked += 1;
  console.log('User picked ' + addCount.name + ' Total clicked count: ' + addCount.clicked);
  lastItemSelected.innerHTML = event.target.alt;
  totalClickCount.innerHTML = counter;
  // add to user total counter per click
  counter++;
  console.log(counter);
  if(counter === 26) { // change to 25 per user story
    for(var i = 0 ; i < allPics.length; i++) {
      var grabDiv = document.getElementById('grandTotal');
      var addAllPicsArr = document.createElement('li');
      addAllPicsArr.textContent = allPics[i].name + ' was clicked (' + allPics[i].clicked + ') times' + ' out of (' + allPics[i].views + ') views.';
      grabDiv.appendChild(addAllPicsArr).classList.add('list');
    }
    var selectedItemList = document.getElementById('selectedItemList');
    var selectedItemList2 = document.getElementById('selectedItemList2');

    var addselectedItem = document.createElement('li');
    var addselectedItem2 = document.createElement('li');
    var clickTotal = allPics.reduce(function (prev, current) {
      return (prev.clicked > current.clicked) ? prev : current;});
    var viewTotal = allPics.reduce(function (prev, current) {
      return (prev.views > current.views) ? prev : current;});
    // addselectedItem.textContent = clickTotal.name + ' (' + clickTotal.clicked + ') ' + (clickTotal.clicked * 100/counter)+'% of Total Clicks';
    addselectedItem.textContent = clickTotal.name + '@ ' + clickTotal.clicked + ' clicks (' + (Math.round(clickTotal.clicked * 100/counter)).toFixed(2) + '%) of Total';
    addselectedItem2.textContent = viewTotal.name + '@ ' + viewTotal.views + ' views (' + (Math.round(viewTotal.views * 100/totalViews)).toFixed(2) + '%) of Total';
    // addselectedItem.textContent = max.name + ' ' + Math.max.apply(Math, allPics.map(function(o) {
    //   return o.clicked; }));
    // addselectedItem2.textContent = Math.max.apply(Math, allPics.map(function(o) {
    // return o.views; }));
    selectedItemList.appendChild(addselectedItem).classList.add('list');
    selectedItemList2.appendChild(addselectedItem2).classList.add('list');
    busMallPic.removeEventListener('click', handlePicClick);
    busMallPic2.removeEventListener('click', handlePicClick);
    busMallPic3.removeEventListener('click', handlePicClick);

  }
  showRandomPic();
}

busMallPic.addEventListener('click', handlePicClick);
busMallPic2.addEventListener('click', handlePicClick);
busMallPic3.addEventListener('click', handlePicClick);

