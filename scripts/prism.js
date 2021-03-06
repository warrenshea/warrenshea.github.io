"use strict";

storm_eagle.module('prism', function () {
  'use strict';

  function htmlEncode(str) {
    var buf = [];

    for (var i = str.length - 1; i >= 0; i--) {
      buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }

    return buf.join('');
  }

  return {
    initialize: function initialize() {
      var self = this;

      if (document.querySelectorAll("[data-code-reference]").length > 0) {
        self.linkCodeWithPrismSnippet();
      }
    },
    linkCodeWithPrismSnippet: function linkCodeWithPrismSnippet() {
      document.querySelectorAll("[data-code-reference]").forEach(function (el) {
        var $cleanse = el.cloneNode(true);
        document.querySelector("code[data-code-snippet=".concat(el.getAttribute("data-code-reference"))).innerHTML = $cleanse.innerHTML;
      });
    },
    forcePrismReinit: function forcePrismReinit() {
      Prism.highlightAll();
    }
  };
});