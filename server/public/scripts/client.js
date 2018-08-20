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