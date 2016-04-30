angular.module('hextechhuntClientApp')
  .controller('AboutController',
    function ($scope) {
      // Load the view with a fade-in animation
      $(function () {
          $('#view-container').hide().fadeIn(300);
      });
    });
