"use strict";

storm_eagle.module('cms', function () {
  return {
    css_fix_special_characters: function css_fix_special_characters(text) {
      text = storm_eagle.util.replace_all(text, ":", "\\:");
      text = storm_eagle.util.replace_all(text, "+", "\\+");
      text = storm_eagle.util.replace_all(text, "=", "\\=");
      text = storm_eagle.util.replace_all(text, "(", "\\(");
      text = storm_eagle.util.replace_all(text, ")", "\\)");
      return text;
    }
  };
});