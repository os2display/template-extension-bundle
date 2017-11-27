/**
 * Itk Rich Text editor.
 *
 * configurable:
 *   tool.config.fontsize_enabled: true/false (default: true)
 */
angular.module('templateExtensionModule').directive('itkRichText', [
  '$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        slide: '=',
        close: '&',
        tool: "="
      },
      link: function (scope, element, attrs) {
        // Show fontsize editor unless it is explicitly disabled in tool.config.
        scope.fontsizeEnabled = scope.tool.config === undefined || scope.tool.config.fontsize_enabled;

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

        /**
         * Callback when Quill editor has been created.
         * @param editor
         */
        scope.editorCreated = function (editor) {
          // Insert text from slide, when editor has been created.
          editor.clipboard.dangerouslyPasteHTML(scope.slide.options.text);
        };
      },
      templateUrl: '/bundles/itktemplateextension/apps/templateExtensionModule/itk-rich-text.html'
    };
  }
]);
