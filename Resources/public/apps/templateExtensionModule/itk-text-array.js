angular.module('templateExtensionModule').directive('itkTextArray', [
  '$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        slide: '=',
        close: '&'
      },
      link: function (scope, element, attrs) {
        scope.newText = {
          text: "",
          author: ""
        };

        scope.addText = function () {
          if (!scope.slide.options.texts) {
            scope.slide.options.texts = [];
          }

          scope.slide.options.texts.push(angular.copy(scope.newText));
        };

        scope.removeText = function (index) {
          scope.slide.options.texts.splice(index, 1);
        };
      },
      templateUrl: '/bundles/os2displaytemplateextension/apps/templateExtensionModule/itk-text-array.html'
    };
  }
]);
