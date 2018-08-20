const images = [ // objects to use in add listing form image select
  {name: 'Select Image', path: ''},
  {name: 'Classic Flats', path: 'classic-flats.jpg'},
  {name: 'Haunted', path: 'haunted.png'},
  {name: 'Older', path: 'older.jpg'},
  {name: 'Rental', path: 'rental.jpg'},
  {name: 'Rental 2', path: 'rental2.jpg'},
  {name: 'Shiny', path: 'shiny.jpg'},
  {name: 'Stoney', path: 'stoney.jpg'}
];

app.controller('HomeController', ['$http', function($http) {
  //console.log('in HomeController');
  vm = this;

  vm.images = images;

  vm.newListing = { // form inputs object
    cost: '',
    sqft: '',
    type: 'rent',
    city: '',
    image_path: ''
  };

  vm.addToListings = function() {
    if(!Object.values(vm.newListing).every(value => value)) { // if every form input has not been completed
      console.log('must fill all form fields');
      return;
    }

    $http({
      method: 'POST',
      url: '/listings',
      data: vm.newListing
    }).then(response => {
      console.log('/listings POST success:', response);
      vm.newListing = { // clear inputs
        cost: '',
        sqft: '',
        type: 'rent',
        city: '',
        image_path: ''
      };
    }).catch(error => console.log('/listings POST error:', error));
  }; // end addToListings
}]); // end HomeController