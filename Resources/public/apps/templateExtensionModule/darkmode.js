/**
 * @file
 * Contains the Darkmode directive.
 */
'use strict';

/**
 * Darkmode tool.
 *
 * Enables the user to pick a configurable array of media.
 *
 * Example configuration for slide .json file:
 * "tools": [
 *   {
 *     "name": "Darkmode",
 *     "id": "darkmode"
 *   }
 *
 *   ... other tools ...
 * ]
 *
 * add the following to empty_options:
 *   "darkmode": false,
 *   "darkmode_from": 19,
 *   "darkmode_to": 6
 */
angular.module('templateExtensionModule').directive('darkmode', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                slide: '=',
                close: '&',
                tool: '='
            },
            link: function () {},
            templateUrl: '/bundles/os2displaytemplateextension/apps/templateExtensionModule/darkmode.html'
        };
    }
]);
