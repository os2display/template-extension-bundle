/**
 * "tools": [
 *   {
 *     "name": "Color picker",
 *     "id": "itk-color-picker",
 *     "config": {
 *       "colorPath": "/api/os2display_template_extension/theme_colors"
 *     }
 *   }
 */
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
        var config = scope.tool.config;

        var colorPath = config.colorPath ? config.colorPath : '/api/os2display_template_extension/theme_colors';

        scope.selectColor = function (field, color) {
          scope.slide.options[field] = color.value;
        };

        scope.themes = [];

        scope.fields = scope.tool.config.fields;

        $http.get(colorPath).then(
          function success(response) {
            $timeout(function () {
              scope.themes = response.data;
            });
          }
        );
      },
      templateUrl: '/bundles/os2displaytemplateextension/apps/templateExtensionModule/itk-color-picker.html'
    };
  }
]);
