angular.module('hextechhuntClientApp')
  .controller('AboutController',
    function ($scope) {
      // Return the user to the Home (Search) view
      $scope.returnToSearch = function() {
        location.href = '#/search';
      };

      // Load the view with a fade-in animation
      $(function () {
          $('#view-container').hide().fadeIn(300);
      });
    });
