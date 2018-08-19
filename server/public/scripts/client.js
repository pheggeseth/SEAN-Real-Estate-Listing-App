/*
When first installing app, run from command line:
> npm init --yes
> npm install express --save

Install DB interface package
> npm install mongoose --save (for MongoDB)
> npm install pg --save (for PostgreSQL)

in separate terminal window, start database
> mongod for MongoDB
> brew services start postgresql for PostgreSQL
*/
console.log('JS');

const app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController as hc'
  }).when('/listings/rent', {
    templateUrl: 'views/listings.html',
    controller: 'ListingsController as lc'
  }).when('/listings/sale', {
    templateUrl: 'views/listings.html',
    controller: 'ListingsController as lc'
  }).otherwise({
    templateUrl: 'views/home.html',
    controller: 'HomeController as hc'
  });
});

app.controller('HomeController', function($http) {
  console.log('in HomeController');
  vm = this;
  vm.images= [
    {name: 'Select Image', path: ''},
    {name: 'Classic Flats', path: 'classic-flats.jpg'},
    {name: 'Haunted', path: 'haunted.png'},
    {name: 'Older', path: 'older.jpg'},
    {name: 'Rental', path: 'rental.jpg'},
    {name: 'Rental 2', path: 'rental2.jpg'},
    {name: 'Shiny', path: 'shiny.jpg'},
    {name: 'Stoney', path: 'stoney.jpg'}
  ];
  vm.newListing = {
    cost: '',
    sqft: '',
    type: 'rent',
    city: '',
    image_path: ''
  };
  vm.addToListings = function() {
    console.log('addToListings:', vm.newListing);
    if(!Object.values(vm.newListing).every(value => value)) {
      console.log('must fill all form fields');
      return;
    }

    $http({
      method: 'POST',
      url: '/listings',
      data: vm.newListing
    }).then(response => {
      console.log('/listings POST success:', response);

    }).catch(error => console.log('/listings POST error:', error));
  };
});

app.controller('ListingsController', function($http, $location) {
  const url = $location.url(); // url is always '/listings/rent' or '/listings/sale'
  //console.log('in ListingsController', url);
  vm = this;

  vm.listings = [];

  vm.deleteListing = function(id){
    console.log('/listings DELETE request:', id);
    $http({
      method: 'DELETE',
      url: '/listings/' + id
    }).then(response => {
      console.log('/listings DELETE success:', response);
      getListings();
    })
    .catch(error => console.log('/listings DELETE error:', error));
  };

  vm.search = function(term) {
    console.log('search:', term);
  }

  function getListings(){
    //console.log('in getListings:', url);
    $http({
      method: 'GET',
      url: url
    }).then(response => {
      //console.log('getListings success');
      vm.listings = response.data;
    }).catch(error => console.log('getListings error:', error));
  };

  getListings();
});
