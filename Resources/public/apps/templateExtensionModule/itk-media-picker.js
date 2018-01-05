/**
 * @file
 * Contains the ItkImagePicker directive.
 */

/**
 * ItkImagePicker tool.
 *
 * Enables the user to pick a configurable array of media.
 *
 * Example configuration for slide .json file:
 * "tools": [
 *   {
 *     "name": "Medier",
 *     "id": "itk-media-editor",
 *     "config": {
 *       "fields": [
 *         {
 *           "field": "image",
 *           "name": "Billede",
 *           "media_type": "image"
 *         },
 *         {
 *           "field": "background_video",
 *           "name": "Baggrundsvideo",
 *           "media_type": "video"
 *         },
 *         {
 *           "field": "logo",
 *           "name": "Logo",
 *           "media_type": "logo"
 *         }
 *       ]
 *     }
 *   }
 *
 *   ... other tools ...
 * ]
 */
angular.module('templateExtensionModule').directive('itkMediaPicker', [
  'mediaFactory', '$timeout', function (mediaFactory, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        slide: '=',
        close: '&',
        tool: '='
      },
      link: function (scope) {
        var config = scope.tool.config;
        var index = null;

        scope.fields = config.fields;
        scope.step = null;
        scope.selectedMedia = [];
        scope.selectedMediaType = null;

        /**
         * Remove the media from the given index.
         *
         * @param pickedIndex The index to remove.
         */
        scope.removeMedia = function(pickedIndex) {
          scope.slide.options[pickedIndex] = null;

          cleanupMediaList(scope.slide.media);
        };

        /**
         * Set the step to background-picker.
         */
        scope.backgroundPicker = function backgroundPicker(pickedIndex, mediaType) {
          index = pickedIndex;

          // Defaults to image.
          scope.selectedMediaType = mediaType ? mediaType : 'image';

          scope.step = 'background-picker';
        };

        /**
         * Set the step to pick-from-media.
         */
        scope.pickFromMedia = function pickFromMedia() {
          var field = scope.slide.options[index];

          if (field !== "" &&
            field !== null &&
            field !== undefined) {
            scope.selectedMedia = [scope.slide.media[field]];
          }

          scope.step = 'pick-from-media';
        };

        /**
         * Set the step to pick-from-computer.
         */
        scope.pickFromComputer = function pickFromComputer() {
          scope.step = 'pick-from-computer';
        };

        scope.back = function back() {
          scope.selectedMedia = [];
          scope.step = null;
          index = null;
        };

        function cleanupMediaList(mediaList) {
          // Cleanup media list
          var usedMedia = [];
          for (var key = mediaList.length - 1; key >= 0; key--) {
            var used = false;
            var field = null;

            // Is the media used by a field?
            for (field in scope.fields) {
              if (scope.fields.hasOwnProperty(field)) {
                field = scope.fields[field];
                if (scope.slide.options[field.field] === key) {
                  usedMedia.push(mediaList[key]);
                  used = true;
                }
              }
            }

            // If not in use, remove the media from the list.
            if (!used) {
              mediaList.splice(key, 1);

              // Decrement field media indexes greater than the removed media index.
              for (field in scope.fields) {
                if (scope.fields.hasOwnProperty(field)) {
                  field = scope.fields[field];
                  if (scope.slide.options[field.field] > key) {
                    scope.slide.options[field.field] = scope.slide.options[field.field] - 1;
                  }
                }
              }
            }
          }
        }

        /**
         * Add a media from scope.slide.media.
         *
         * @param clickedMedia
         */
        var clickMedia = function (clickedMedia) {
          var mediaList = [];
          var found = false;
          var mediaIndex = null;

          // See if the media is already in the media list.
          for (var i in scope.slide.media) {
            var media = scope.slide.media[i];

            if (media.id === clickedMedia.id) {
              found = true;
              mediaIndex = parseInt(i);
            }
            mediaList.push(media);
          }

          // If the media is not already in mediaList, add it.
          if (!found) {
            mediaList.push(clickedMedia);
            mediaIndex = mediaList.length - 1;
          }

          scope.slide.options[index] = mediaIndex;

          cleanupMediaList(mediaList);

          scope.step = null;
          scope.slide.media = mediaList;
        };

        // Register event listener for select media.
        scope.$on('mediaOverview.selectMedia', function (event, media) {
          clickMedia(media);
        });

        // Register event listener for media upload success.
        scope.$on('mediaUpload.uploadSuccess', function (event, data) {
          mediaFactory.getMedia(data.id).then(
            function success(media) {
              scope.slide.media.push(media);
              scope.slide.options[index] = scope.slide.media.length - 1;
            },
            function error(reason) {
              busService.$emit('log.error', {
                'cause': reason,
                'msg': 'Kunne ikke tilføje media.'
              });
            }
          );

          var notAllSuccess = data.queue.find(function (item, index) {
            return !item.isSuccess;
          });

          if (!notAllSuccess) {
            scope.close();
          }
        });
      },
      templateUrl: '/bundles/itktemplateextension/apps/templateExtensionModule/itk-media-picker.html'
    };
  }
]);
