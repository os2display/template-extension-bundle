angular.module('templateExtensionModule', ['ngQuill']);

/**
 * Configure templateExtensionModule.
 */
angular.module('templateExtensionModule').config(['ngQuillConfigProvider', function (ngQuillConfigProvider) {

  // Set allowed formats for quill editor.
  ngQuillConfigProvider.set({ formats: ['bold', 'italic', 'header', 'list'] })
}]);
