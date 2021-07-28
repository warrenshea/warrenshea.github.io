"use strict";

storm_eagle.module('prism', function () {
  'use strict';

  return {
    initialize: function initialize() {
      var self = this;

      if (document.querySelectorAll("[data-code-reference]").length > 0) {
        self.link_code_with_prism_snippet();
      }
    },
    link_code_with_prism_snippet: function link_code_with_prism_snippet() {
      document.querySelectorAll("[data-code-reference]").forEach(function (el) {
        var $cleanse = el.cloneNode(true);
        document.querySelector("code[data-code-snippet=".concat(el.getAttribute("data-code-reference"))).innerHTML = $cleanse.innerHTML;
      });
    },
    force_prism_reinit: function force_prism_reinit() {
      Prism.highlightAll();
    }
  };
});