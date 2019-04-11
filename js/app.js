'use strict';
//eslint-disable-next-line no-undef
$(document).ready(function(){
  //eslint-disable-next-line no-undef
  $('.sidenav').sidenav();
  setTimeout(function() {
    drawChart();

    showRandomPic();
  }, 500);
});

//global variables
const busMallPic = document.getElementById('busMallPic');
const busMallPic2 = document.getElementById('busMallPic2');
const busMallPic3 = document.getElementById('busMallPic3');
const topProductClick = document.getElementById('topProductClick');
const topProductView = document.getElementById('topProductView');
const totalClickCount = document.getElementById('totalClickCount');
const lastItemSelected = document.getElementById('lastItemSelected');

var allPics = [];
var data;
var clicks = [];
var titles = [];
var productChart;

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

// REF: https://stackoverflow.com/questions/43762363/how-to-store-an-array-of-objects-in-local-storage
if (localStorage.getItem('data') === null){
  localStorage.setItem('data', JSON.stringify(allPics));
  data = JSON.parse(localStorage.getItem('data') || '[]');
  localStorage.totalViewCount = 0;
  localStorage.totalClickCount = 0;

}
data = JSON.parse(localStorage.getItem('data') || '[]');
topProductClick.textContent = localStorage.saveTopProductClick;
topProductView.textContent = localStorage.saveTopProductView;
totalClickCount.textContent = localStorage.totalClickCount;
lastItemSelected.textContent = localStorage.savelastItemSelected;

// Add event listener to products
busMallPic.addEventListener('click', handlePicClick);
busMallPic2.addEventListener('click', handlePicClick);
busMallPic3.addEventListener('click', handlePicClick);

// Get random 3 int within min/max with No duplicates
function showRandomPic() {
  var newGenNumThree = [];
  function in_array(array, el) {
    for(var i = 0 ; i < data.length; i++)
      if(array[i] === el) return true;
    return false;
  }

  function get_rand(array) {
    var rand = data[Math.floor(Math.random() * data.length)];
    for(var i = 0; i < 3; i++) {
      if(!in_array(newGenNumThree, rand)) {
        newGenNumThree.push(rand);
        rand.views += 1;
        // totalViews++;
        localStorage.totalViewCount = Number(localStorage.totalViewCount) + 1;
        return rand;
      }
      return get_rand(array);
    }
  }

  for(var i = 0; i < 3; i++) {
    get_rand();
  }
  // Use generated int to target product img
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
  // Local Storage:
  var clickTotal = data.reduce(function (prev, current) {
    return (prev.clicked > current.clicked) ? prev : current;});
  var viewTotal = data.reduce(function (prev, current) {
    return (prev.views > current.views) ? prev : current;});
  var clickedProduct = data.find(function(data) {
    return data.name === event.target.alt;});
  // Current product click count
  clickedProduct.clicked += 1;
  console.log('User clicked (' + clickedProduct.name + ') with (' + clickedProduct.clicked + ') total click count and this Object is:', clickedProduct);

  // Total click count and Display last clicked Product
  var topProductClickText = clickTotal.name + '@ ' + clickTotal.clicked + ' clicks, (' + (Math.round(clickTotal.clicked * 100/localStorage.totalClickCount)).toFixed(2) + '%) of Total';
  var topProductViewText = topProductView.textContent = viewTotal.name + '@ ' + viewTotal.views + ' views, (' + (Math.round(viewTotal.views * 100/localStorage.totalViewCount)).toFixed(2) + '%) of Total';
  localStorage.totalClickCount = Number(localStorage.totalClickCount)+1;

  // Stats:
  topProductClick.textContent = topProductClickText;
  topProductView.textContent = topProductViewText;
  totalClickCount.textContent = localStorage.totalClickCount;
  lastItemSelected.textContent = clickedProduct.name;

  // Save to local Storage:
  localStorage.saveTopProductClick = topProductClickText;
  localStorage.saveTopProductView = topProductViewText;
  localStorage.savelastItemSelected = clickedProduct.name;

  showRandomPic();
  updateChartArrays();
  productChart.update();
}

function updateChartArrays() {
  for (var i = 0; i < data.length; i++) {
    console.log('test');
    clicks[i] = data[i].clicked;
    titles[i] = data[i].name;
    // Saving for attempt to add chart to local storage.
    // var click = JSON.parse(localStorage.getItem('click'));
    // click.push(data[i]);
    // localStorage.setItem('click', JSON.stringify(click));
  }
}
// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// Charts rendered using Chart JS v.2.6.0
// http://www.chartjs.org/
// ++++++++++++++++++++++++++++++++++++++++++++
var chartData = {
  labels: titles, // titles array we declared earlier
  datasets: [{
    label: 'Number of clicks',
    data: clicks, // clicks array we declared earlier
    backgroundColor: [
      '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9'
    ],
    hoverBackgroundColor: [
      '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e', '690a7e'
    ],
  }]
};

function drawChart() {
  var ctx = document.getElementById('canvas-chart').getContext('2d');
  //eslint-disable-next-line no-undef
  productChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
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
}

document.getElementById('delete-local').addEventListener('click', function() {
  deleteLocal();
});

function deleteLocal() {
  // var counter = 0;
  localStorage.clear();
  localStorage.totalViewCount = 0;
  localStorage.totalClickCount = 0;
  console.log('delete local:', localStorage);
  topProductClick.textContent = 'Ready';
  topProductView.textContent = 'Ready';
  totalClickCount.textContent = 'Ready';
  lastItemSelected.textContent = 'Ready';
  // location.reload();
}

updateChartArrays();
