angular.module('templateExtensionModule').directive('quillText', [
  '$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        slide: '=',
        close: '&'
      },
      link: function (scope, element, attrs) {
        scope.open = true;

        scope.closeTool = function () {
          $timeout(function() {
            scope.open = false;

            $timeout(scope.close, 600);
          });
        };

        /**
         * Callback when Quill editor has been created.
         * @param editor
         */
        scope.editorCreated = function (editor) {
          // Insert text from slide, when editor has been created.
          editor.clipboard.dangerouslyPasteHTML(scope.slide.options.text);
        };

        scope.availableFontSizes = [
          {
            name: "Lille",
            value: 8
          },
          {
            name: "Normal",
            value: 16
          },
          {
            name: "Stor",
            value: 24
          },
          {
            name: "Meget stor",
            value: 32
          }
        ];
      },
      templateUrl: '/bundles/itktemplateextension/apps/templateExtensionModule/quill-text.html'
    };
  }
]);
