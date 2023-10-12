'use strict';

storm_eagle.module('homepage', function () {
  return {
    initialize: function initialize() {
      document.querySelectorAll('li.opacity\\:0\\%').forEach(function (el, index) {
        setTimeout(function () {
          el.classList.remove('opacity:0%');
          el.classList.add('opacity:100%');
        }, index * 45);
      });
      document.querySelectorAll('h2,.heading,.description-line,.description-notes-line').forEach(function (el, index) {
        setTimeout(function () {
          el.classList.remove('opacity:0%');
          el.classList.add('opacity:100%');
        }, index * 25);
      });
    }
  };
});