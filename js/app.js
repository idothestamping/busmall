'use strict';
$(document).ready(function(){
  $('.sidenav').sidenav();
  setTimeout(function() {
    drawChart();
    showRandomPic();
  }, 500);

});
  

//global variables
var allPics = [];
var busMallPic = document.getElementById('busMallPic');
var busMallPic2 = document.getElementById('busMallPic2');
var busMallPic3 = document.getElementById('busMallPic3');
var lastItemSelected = document.getElementById('lastItemSelected');
var totalClickCount = document.getElementById('totalClickCount');
var totalViews = 0;
var counter = 1;

var clicks = [];
var titles = [];
var views = [];
var productChart;
var chartDrawn = false;

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
    // updateChartArrays();
    for(var i = 0 ; i < allPics.length; i++) {
      var grabDiv = document.getElementById('funky-list');
      var addAllPicsArr = document.createElement('li');
      addAllPicsArr.textContent = allPics[i].name + ' was clicked (' + allPics[i].clicked + ') times' + ' out of (' + allPics[i].views + ') views.';
      grabDiv.appendChild(addAllPicsArr).classList.add('list');
    }
  }
  showRandomPic();
  updateChartArrays();
}
updateChartArrays();
// updateChartArrays();

busMallPic.addEventListener('click', handlePicClick);
busMallPic2.addEventListener('click', handlePicClick);
busMallPic3.addEventListener('click', handlePicClick);

// ++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// ++++++++++++++++++++++++++++++++++++++++++++

function updateChartArrays() {
  for (var i = 0; i < allPics.length; i++) {
    clicks[i] = allPics[i].clicked;
    views[i] = allPics[i].views;
    titles[i] = allPics[i].name;
  }
}

function tallyVote(thisSong) {
  for (var i = 0; i < allPics.length; i++) {
    if (thisSong === allPics[i].identifier) {
      allPics[i].clicks++;
      updateChartArrays();
    }
  }
}

// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// Charts rendered using Chart JS v.2.6.0
// http://www.chartjs.org/
// ++++++++++++++++++++++++++++++++++++++++++++

var data = {
  labels: titles, // titles array we declared earlier
  datasets: [{
    label: 'Number of clicks',
    data: clicks, // clicks array we declared earlier
    backgroundColor: [
      '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9'
    ],
    hoverBackgroundColor: [
      'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple', 'purple'
    ],
  }]
};

function drawChart() {
  var ctx = document.getElementById('funky-chart').getContext('2d');
  productChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20
        }
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
  chartDrawn = true;
}

function hideChart() {
  document.getElementById('funky-chart').hidden = true;
}
// ++++++++++++++++++++++++++++++++++++++++++++
// EVENT LISTENERS
// ++++++++++++++++++++++++++++++++++++++++++++

// document.getElementById('draw-chart').addEventListener('click', function() {
//   drawChart();
//   console.log('chart was drawn');
// });

document.getElementById('funky-list').addEventListener('click', function() {
  document.getElementById('funky-list').hidden = true;
});

document.getElementById('voting').addEventListener('click', function(event) {
  if (event.target.id !== 'voting') {
    tallyVote(event.target.id);
  }

  if (chartDrawn) {
    productChart.update();
  }
});


