app.controller('ListingsController', function($http, $location) {
  vm = this;

  vm.pageURL = $location.url(); // url is always '/listings/rent' or '/listings/sale'

  vm.listings = [];

  vm.deleteListing = function(id){
    $http({
      method: 'DELETE',
      url: '/listings/' + id
    }).then(response => {
      console.log('/listings DELETE success:', response);
      getListings();
    })
    .catch(error => console.log('/listings DELETE error:', error));
  }; // end deleteListing

  vm.searchListings = function(search) {
    if (search.term === 'city' && !search.value) { // if name is blank for city, get all listings
      getListings();
      return;
    } else if ((search.term === 'cost' || search.term === 'sqft') && (!search.min && !search.max)) { // if both min and max are blank, get all listings
      getListings();
      return;
    }

    const searchPath = generateSearchPath(search);

    $http({
      method: 'GET',
      url: vm.pageURL + searchPath
    }).then(function(response) {
      console.log('search response:', response.data);
      vm.listings = response.data;
    }).catch(function(error) {
      console.log('/listings search error:', error);
    });
  } // end searchListings

  function generateSearchPath(search) {
    let searchPath = '/search';

    // complete search path based on what is inside search object
    // for city -> '/search/city/:partialName'
    // for cost or sqft -> '/search/cost?min=[INT]&max=[INT]'
    if (search.term === 'city') {
      searchPath += '/city/' + search.value;
    } else if (search.term === 'cost' || search.term === 'sqft') {
      searchPath += `/${search.term}?`;
      if (search.min && !search.max) {
        searchPath += 'min=' + search.min;
      } else if (!search.min && search.max) {
        searchPath += 'max=' + search.max;
      } else if (search.min && search.max) {
        searchPath += `min=${search.min}&max=${search.max}`;
      } 
    }
    return searchPath;
  } // end generateSearchPath

  function getListings(){
    $http({
      method: 'GET',
      url: vm.pageURL
    }).then(response => {
      vm.listings = response.data;
    }).catch(error => console.log('getListings error:', error));
  }; // end getListings

  getListings(); // get all listings on page load
}); // end ListingsController