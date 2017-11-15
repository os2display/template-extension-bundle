angular.module('templateExtensionModule').directive('quillText', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      slide:'=',
      close: '&'
    },
    link: function (scope, element, attrs) {
      /**
       * Callback when Quill editor has been created.
       * @param editor
       */
      scope.editorCreated = function (editor) {
        // Insert text from slide, when editor has been created.
        editor.clipboard.dangerouslyPasteHTML(scope.slide.options.text);
      }
    },
    templateUrl: '/bundles/itktemplateextension/apps/templateExtensionModule/quill-text.html'
  };
});
