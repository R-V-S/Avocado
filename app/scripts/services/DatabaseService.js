(function() {
  function DatabaseService($firebaseArray, $firebaseAuth) {
    var DatabaseService = {};
    
    DatabaseService.get = function(child) {
      return $firebaseArray( firebase.database().ref().child(child) );
    }
        
    DatabaseService.auth = $firebaseAuth();
    
    return DatabaseService;
  }
  
  angular 
    .module('blocChat')
    .factory('DatabaseService', ['$firebaseArray', '$firebaseAuth', DatabaseService]);
})()