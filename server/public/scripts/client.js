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
    controller: 'HomeController'
  }).when('/rental', {
    templateUrl: 'views/rental.html',
    controller: 'PropertyController'
  }).when('/sale', {
    templateUrl: 'views/sale.html',
    controller: 'PropertyController'
  }).otherwise({
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  });
});

app.controller('HomeController', function($http) {
  console.log('in HomeController');
  
});

app.controller('PropertyController', function($http, $location) {
  console.log('in PropertyController', $location.url());
  
});
