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
  }).when('/rental', {
    templateUrl: 'views/properties.html',
    controller: 'PropertyController as pc'
  }).when('/sale', {
    templateUrl: 'views/properties.html',
    controller: 'PropertyController as pc'
  }).otherwise({
    templateUrl: 'views/home.html',
    controller: 'HomeController as hc'
  });
});

app.controller('HomeController', function($http) {
  console.log('in HomeController');
  
});

app.controller('PropertyController', function($http, $location) {
  console.log('in PropertyController', $location.url());
  vm = this;

  vm.properties = [
    {
      cost: 10000,
      sqft: 1000
    },
    {
      cost: 20000,
      sqft: 2000
    }
  ];

  vm.getProperties = function(){
    console.log('getProperties:', $location.url());
    
  }

  vm.getProperties();
});
