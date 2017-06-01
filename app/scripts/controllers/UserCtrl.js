(function() {
  function UserCtrl(DatabaseService, SessionService) {
    this.session = SessionService;
    this.auth = DatabaseService.auth;
    
    this.auth.$onAuthStateChanged(user => {
      this.user = SessionService.user = user;
    });
    
    this.auth.signin = function() {
      DatabaseService.auth.$signInWithPopup('google');
    }
  }
  
  angular 
    .module('blocChat')
    .controller('UserCtrl', ['DatabaseService', 'SessionService', UserCtrl]);
})()