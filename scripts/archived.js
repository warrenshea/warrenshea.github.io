'use strict';
/**
 * Disables the telephone number link from calling in medium and up
 */

storm_eagle.module('disable_tel_medium_up', function () {
  return {
    initialize: function initialize() {
      document.querySelectorAll('a[href^="tel"]').forEach(function (el) {
        el.addEventListener('click', function (event) {
          if (storm_eagle.client.viewport.is_md_up()) {
            event.preventDefault();
          }
        });
      });
    }
  };
});