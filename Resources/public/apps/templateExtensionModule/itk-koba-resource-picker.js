angular.module('templateExtensionModule')
.directive('itkKobaResourcePicker', [
  'kobaFactory', 'busService', '$timeout', function (kobaFactory, busService, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        slide: '=',
        close: '&',
        template: '@'
      },
      link: function (scope) {
        // Reset resources.
        scope.availableResources = [];

        // Get resources for the calendar.
        kobaFactory.getResources().then(
          function (data) {
            // Store data in the scope.
            scope.availableResources = data;
            // Filter the current slides options based on the resources
            // available.
            if (scope.slide.options.hasOwnProperty('resources')) {
              var selected = [];
              var len = scope.slide.options.resources.length;
              for (var i = 0; i < len; i++) {
                var found = false;
                for (var j = 0; j < data.length; j++) {
                  if (data[j].mail === scope.slide.options.resources[i].mail) {
                    found = true;
                    break;
                  }
                }

                if (found) {
                  // Item is found, so add it to the list.
                  selected.push(scope.slide.options.resources[i]);
                }
              }
            }

            scope.slide.options.resources = selected;
          },
          function error(reason) {
            busService.$emit('log.error', {
              'cause': reason,
              'msg': 'Kunne ikke hente bookings for ressource.'
            });
          }
        );
      },
      templateUrl: function(elem, attrs) {
        return attrs.template ? attrs.template : '/bundles/itktemplateextension/apps/templateExtensionModule/itk-koba-resource-picker.html'
      }
    };
  }
]);
