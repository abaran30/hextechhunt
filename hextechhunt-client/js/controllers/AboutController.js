angular.module('hextechhuntClientApp')
  .controller('AboutController',
    function ($scope) {
      $scope.returnToSearch = function() {
        location.href = '#/search';
      };

      // Load the view with a fade-in animation
      $(function () {
          $('#view-container').hide().fadeIn(300);
      });
    });
