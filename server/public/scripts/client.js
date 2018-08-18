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
  })//.otherwise({
  //   templateUrl: 'views/home.html',
  //   controller: 'HomeController as hc'
  // });
});

app.controller('HomeController', function($http) {
  console.log('in HomeController');
  
});

app.controller('ListingsController', function($http, $location) {
  const url = $location.url(); // url is always '/listings/rent' or '/listings/sale'
  console.log('in ListingsController', url);
  vm = this;

  vm.listings = [
    {
      cost: 10000,
      sqft: 1000
    },
    {
      cost: 20000,
      sqft: 2000
    }
  ];

  vm.getListings = function(){
    console.log('in getListings:', url);
    $http({
      method: 'GET',
      url: url
    }).then(response => {
      console.log('getListings success:', response.data);
      vm.listings = response.data;
    }).catch(error => console.log('getListings error:', error));
  }

  vm.getListings();
});
