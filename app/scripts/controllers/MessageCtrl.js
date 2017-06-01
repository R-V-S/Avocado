(function() {
  function MessageCtrl(DatabaseService, SessionService, $interval, $scope) {
    this.session = SessionService;
    this.messages = DatabaseService.get('messages');
    
    this.messageCount = 0
    
    this.scrollToBottom = () => {
      let messageList = document.querySelector('#message-list')
      if (messageList.children.length !== this.messageCount) { 
        messageList.scrollTop = messageList.scrollHeight - messageList.offsetHeight;
        this.messageCount = messageList.children.length;
      }
      return true;
    }
    
    this.createMessage = messageText => {
      if (!messageText) { return }
      this.messages.$add({
        content: messageText,
        sentAt: Date.now(),
        roomId: this.session.activeRoom.$id,
        creator: this.session.user ? {email: this.session.user.email, displayName: this.session.user.displayName, photoURL: this.session.user.photoURL} : {email: null, displayName: 'Anonymous Avocado', photoURL: null }
      });
      this.newMessage = '';
      this.scrollToBottom();
    }
    
    this.removeMessage = (message) => {
      if (message.creator.email != this.session.user.email) { return }
      this.messages.$remove(message);
    }
    
    // This empty interval causes $digest to run, updating the timeago filter
    $interval( () => {
    }, 1000 * 3)
    
  }
  
  angular 
    .module('blocChat')
    .controller('MessageCtrl', ['DatabaseService', 'SessionService', '$interval', '$scope', MessageCtrl]);
})()