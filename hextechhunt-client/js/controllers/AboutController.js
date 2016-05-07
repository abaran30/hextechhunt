angular.module('hextechhuntClientApp')
  .controller('AboutController',
    function ($scope) {
      // Return the user to the previous view
      $scope.goBack = function() {
        window.history.back();
      };

      // Load the view with a fade-in animation
      $(function() {
          $('#view-container').hide().fadeIn(300);
      });
    });
