"use strict";

/*
  @TODO: a11y keyboard functionality
  https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
*/
storm_eagle.module("accordion", function () {
  "use strict";

  var self;
  var accordion_state = {};
  return {
    initialize: function initialize() {
      self = storm_eagle["accordion"];
      document.querySelectorAll('[data-module="accordion"]').forEach(function (el) {
        var accordion_id = el.getAttribute("id");
        accordion_state[accordion_id] = {
          "all_triggers": el.querySelectorAll(':scope > li > [data-module="accordion.trigger"],:scope > [data-module="accordion.trigger"]'),
          "all_panels": el.querySelectorAll(':scope > li > [data-module="accordion.panel"],:scope > [data-module="accordion.panel"]'),
          "active_setting": el.getAttribute('data-accordion-active'),
          "initial_active": JSON.parse(el.getAttribute("data-accordion-initial"))
        };
        self.add_event_listeners(accordion_id);
        self.init_ui(accordion_id);
      });
    },
    add_event_listeners: function add_event_listeners(accordion_id) {
      accordion_state[accordion_id]["all_triggers"].forEach(function (el) {
        el.addEventListener("click", function () {
          if (accordion_state[accordion_id]["active_setting"] === "single") {
            accordion_state[accordion_id]["all_triggers"].forEach(function (el) {
              el.setAttribute("aria-expanded", "false");
            });
            el.setAttribute("aria-expanded", "true");
            self.open(accordion_id, el.getAttribute("aria-controls"));
          } else if (accordion_state[accordion_id]["active_setting"] === "multiple") {
            if (el.getAttribute("aria-expanded") === "false") {
              el.setAttribute("aria-expanded", "true");
            } else if (el.getAttribute("aria-expanded") === "true") {
              el.setAttribute("aria-expanded", "false");
            }

            self.open(accordion_id, el.getAttribute("aria-controls"));
          }
        });
      });
    },
    init_ui: function init_ui(accordion_id) {
      accordion_state[accordion_id]["all_triggers"].forEach(function (el, index) {
        el.setAttribute("tabindex", "-1");
        el.setAttribute("aria-expanded", "false");
        el.setAttribute("aria-controls", el.nextElementSibling.getAttribute("id"));
        el.nextElementSibling.setAttribute("aria-labelledby", el.getAttribute("id"));

        if (index === 0) {
          el.setAttribute("tabindex", "0");
          el.addEventListener('focusin', function () {
            document.getElementById(accordion_id).classList.add('focus');
          });
          el.addEventListener('focusout', function () {
            document.getElementById(accordion_id).classList.remove('focus');
          });
        }
      });
      accordion_state[accordion_id]["all_panels"].forEach(function (el) {
        el.classList.add("display:none");
      });
      accordion_state[accordion_id]["all_triggers"].forEach(function (el, index) {
        if (accordion_state[accordion_id]["initial_active"][index] === 1) {
          el.click();
        }
      });
    },
    open: function open(accordion_id, id) {
      if (accordion_state[accordion_id]["active_setting"] === "single") {
        accordion_state[accordion_id]["all_panels"].forEach(function (el) {
          el.classList.add("display:none");
        });
        document.getElementById(id).classList.remove("display:none");
        storm_eagle.equalize_heights.force_resize();
      } else if (accordion_state[accordion_id]["active_setting"] === "multiple") {
        document.getElementById(id).classList.toggle("display:none");
        storm_eagle.equalize_heights.force_resize();
      }
    }
  };
});