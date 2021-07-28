"use strict";

storm_eagle.module('form_theme_maverick_a', function () {
  "use strict";

  return {
    initialize: function initialize() {
      var self = this;
      self.input_listener();
      self.textarea_autoexpand_listener();
    },
    ready: function ready() {
      var self = this;
      document.querySelectorAll('.form\\:theme\\:maverick-a input, .form\\:theme\\:maverick-a select, .form\\:theme\\:maverick-a textarea').forEach(function (element) {
        if (element.type !== 'radio') {
          self.force_set_active_label(element);
        }
      });
      document.querySelectorAll(".form\\:theme\\:maverick-a textarea").forEach(function (element) {
        self.force_textarea_autoexpand(element);
      });
    },
    force_set_active_label: function force_set_active_label(element) {
      element.nextElementSibling.classList[element.value.length ? 'add' : 'remove']('active-label');
    },
    input_listener: function input_listener() {
      var self = this;
      document.querySelectorAll('.form\\:theme\\:maverick-a input, .form\\:theme\\:maverick-a select, .form\\:theme\\:maverick-a textarea').forEach(function (element) {
        if (element.type !== 'radio') {
          element.addEventListener('change', function () {
            self.force_set_active_label(element);
          });
        }
      });
    },
    force_textarea_autoexpand: function force_textarea_autoexpand(element) {
      element.style.height = 'inherit';
      element.style.height = element.scrollHeight + 'px';
    },
    textarea_autoexpand_listener: function textarea_autoexpand_listener() {
      var self = this;
      document.querySelectorAll(".form\\:theme\\:maverick-a textarea").forEach(function (element) {
        element.addEventListener('input', function () {
          self.force_textarea_autoexpand(element);
        });
      });
    }
  };
});