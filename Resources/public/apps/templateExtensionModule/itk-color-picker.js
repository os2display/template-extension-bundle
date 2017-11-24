angular.module('templateExtensionModule').directive('itkColorPicker', [
  '$timeout', '$http', function ($timeout, $http) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        slide: '=',
        close: '&',
        tool: "="
      },
      link: function (scope) {
        scope.selectColor = function (field, color) {
          scope.slide.options[field] = color.value;
        };

        scope.themes = [];

        scope.fields = scope.tool.config.fields;

        $http.get('/api/itk_template_extension/theme_colors').then(
          function success(response) {
            $timeout(function () {
              scope.themes = response.data;
            });
          }
        );
      },
      templateUrl: '/bundles/itktemplateextension/apps/templateExtensionModule/itk-color-picker.html'
    };
  }
]);
