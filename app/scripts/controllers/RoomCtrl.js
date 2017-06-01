(function() {
  function RoomCtrl(DatabaseService, SessionService) {
    this.session = SessionService;
    this.rooms = DatabaseService.get('rooms');

    this.rooms.$loaded().then( rooms => {
      this.activeRoom = SessionService.activeRoom = rooms[0];
    })
    
    this.createRoom = roomName => {
      if (!this.session.user) { return }
      this.rooms.$add({
        name: roomName,
        createdAt: Date.now(),
        creator: {email: this.session.user.email, displayName: this.session.user.displayName, photoURL: this.session.user.photoURL}
      });
      this.newRoomName = '';
    }
    
    this.removeRoom = function(room) {
      this.rooms.$remove(room);
    }
    
    this.setRoom = room => {
      this.activeRoom = SessionService.activeRoom = room;
    }
  }
  
  angular 
    .module('blocChat')
    .controller('RoomCtrl', ['DatabaseService', 'SessionService', RoomCtrl]);
})()