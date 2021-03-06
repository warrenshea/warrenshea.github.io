"use strict";

/* data-module: poopver         the modal
 data-module: poopver-overlay the full screen part behind the modal
 data-module: poopver-trigger the button that opens the modal */
storm_eagle.module('popover', function () {
  'use strict';

  var focus_placeholder;
  var popover_first_tab_stop;
  var popover_last_tab_stop;
  var popover_state = {};

  function keyboard_popover_focus_trap(event) {
    if (event.keyCode === keyboard.keys.tab) {
      if (event.shiftKey) {
        if (document.activeElement === popover_first_tab_stop) {
          event.preventDefault();
          popover_last_tab_stop.focus();
        }
      } else {
        if (document.activeElement === popover_last_tab_stop) {
          event.preventDefault();
          popover_first_tab_stop.focus();
        }
      }
    }

    if (event.keyCode === keyboard.keys.esc || event.keyCode === keyboard.keys.enter && document.activeElement.hasAttribute("[data-module='popover.close']")) {
      storm_eagle.popover.close();
    }
  }

  return {
    initialize: function initialize() {
      var self = this;
      document.querySelectorAll("[data-module='popover']").forEach(function (el, index) {
        var popover_id = el.getAttribute("id");
        popover_state[popover_id] = {
          "focusable_elements": []
        };
        self.get_popover_focusable_elements(popover_id);
      });
      self.resize_listener();
      self.overlay_close_listener();
    },
    open: function open(popover_trigger, popover_id) {
      var self = this;
      /* updates popover visuals */

      document.querySelector("[data-module='popover.overlay']").classList.add('active');
      popover_trigger.classList.add('active');
      document.getElementById(popover_id).classList.add('active');
      self.set_popover_location(popover_id);
      /* removes focus from elements except in popover */

      popover_state[popover_id]["focusable_elements"].forEach(function (el) {
        el.setAttribute("tabindex", "0");
      });
      /* saves item that opened popover for later */

      focus_placeholder = document.activeElement;
      popover_first_tab_stop = popover_state[popover_id]["focusable_elements"][0];
      popover_last_tab_stop = popover_state[popover_id]["focusable_elements"][popover_state[popover_id]["focusable_elements"].length - 1];
      /* set focus to popover (but not the popover_first_tab_stop */

      popover_first_tab_stop.focus();
      /* add keyboard event listener */

      document.getElementById(popover_id).addEventListener('keydown', keyboard_popover_focus_trap);
    },
    close: function close() {
      var self = this;
      /* updates popover visuals */

      document.querySelector("[data-module='popover.overlay'].active").classList.remove('active');
      document.querySelector("[data-module='popover'].active").setAttribute('tabIndex', '-1');
      document.querySelector("[data-module='popover'].active").setAttribute('aria-expanded', false);
      document.querySelector("[data-module='popover'].active").classList.remove('active');
      document.querySelector("[data-module='popover.trigger'].active").classList.remove('active');
      document.querySelectorAll("[data-target='popover']").forEach(function (popover, index) {
        var popover_id = popover.getAttribute("id");
        /* remove focus from popover elements */

        popover_state[popover_id]["focusable_elements"].forEach(function (el) {
          el.setAttribute("tabindex", "-1");
        });
        /* remove keyboard event listener */

        document.getElementById(popover_id).removeEventListener('keydown', keyboard_popover_focus_trap);
      });
      document.querySelectorAll("[data-module='popover.trigger']").forEach(function (popover_trigger) {
        popover_trigger.setAttribute("aria-expanded", false);
      });
      /* set focus to focus_placeholder */

      focus_placeholder.focus();
    },
    get_popover_focusable_elements: function get_popover_focusable_elements(popover_id) {
      var self = this;
      popover_state[popover_id]["focusable_elements"] = document.getElementById(popover_id).querySelectorAll(focus_trap_selector); //console.log(popover_state[popover_id]["focusable_elements"]);
    },
    overlay_close_listener: function overlay_close_listener() {
      var self = this;

      if (document.querySelector("[data-module='popover.overlay']")) {
        document.querySelector("[data-module='popover.overlay']").addEventListener('click', function () {
          self.close();
        });
      }
    },
    resize_listener: function resize_listener() {
      var self = this;

      function force_resize() {
        if (document.querySelector("[data-module='popover'].active")) {
          self.set_popover_location(document.querySelector("[data-module='popover'].active").getAttribute("id"));
        }
      }

      storm_eagle.resize_observer(document.querySelector("body"), force_resize);
    },
    set_popover_location: function set_popover_location(popover_id) {
      var popover_trigger = document.querySelector("[data-module='popover.trigger'].active");
      var popover = document.getElementById(popover_id);

      if (storm_eagle.client.viewport.is_md_down()) {
        popover.style.top = "initial";
        popover.style.left = "0px";
      } else if (storm_eagle.client.viewport.is_lg_up()) {
        popover.style.top = popover_trigger.offsetTop + "px";
        popover.style.left = popover_trigger.offsetLeft + 40 + "px";
      }
    }
  };
});