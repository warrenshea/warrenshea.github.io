"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

storm_eagle.module('modal', function () {
  'use strict';

  var self;
  var focus_placeholder;
  var modal_first_tab_stop;
  var modal_last_tab_stop;
  var modal_state = {};

  function modal_close(event) {
    //console.log(event.target.classList);
    if (event.target.classList.contains("modal-container") || event.target.classList.contains("modal-overlay")) {
      storm_eagle.modal.close();
    }
  }

  function keyboard_modal_focus_trap(event) {
    if (event.keyCode === keyboard.keys.tab) {
      if (event.shiftKey) {
        if (document.activeElement === modal_first_tab_stop) {
          event.preventDefault();
          modal_last_tab_stop.focus();
        }
      } else {
        if (document.activeElement === modal_last_tab_stop) {
          event.preventDefault();
          modal_first_tab_stop.focus();
        }
      }
    }

    if (event.keyCode === keyboard.keys.esc || event.keyCode === keyboard.keys.enter && document.activeElement.hasAttribute("[data-trigger='modal-close']")) {
      storm_eagle.modal.close();
    }
  }

  return {
    initialize: function initialize() {
      self = storm_eagle["modal"];
      document.querySelectorAll("[data-module='modal']").forEach(function (el) {
        var modal_id = el.getAttribute("id");
        modal_state[modal_id] = {
          "focusable_elements": [],
          "remove_focusable_elements": []
        };
        self.get_modal_focusable_elements(modal_id);
      });
    },
    open: function open(modal_trigger, modal_id) {
      document.addEventListener('mousedown', modal_close);
      /* updates modal visuals */

      document.querySelector("body").classList.add("overflow:hidden");

      if (modal_trigger) {
        modal_trigger.classList.add('active');
      }

      document.getElementById(modal_id).classList.add('active');
      document.getElementById(modal_id).querySelector(".modal-container").classList.add('active');
      /* removes focus from elements except in modal */

      modal_state[modal_id]["focusable_elements"].forEach(function (el) {
        el.setAttribute("tabindex", "0");
      });
      modal_state[modal_id]["remove_focusable_elements"].forEach(function (el) {
        el.setAttribute("tabindex", "-1");
      });
      /* remove focusable elements from nodelist, e.g. popover inside modal */

      modal_state[modal_id]["focusable_elements"] = _toConsumableArray(modal_state[modal_id]["focusable_elements"]).filter(function (el) {
        return !_toConsumableArray(modal_state[modal_id]["remove_focusable_elements"]).includes(el);
      });
      /* saves item that opened modal for later */

      focus_placeholder = document.activeElement;
      modal_first_tab_stop = modal_state[modal_id]["focusable_elements"][0];
      modal_last_tab_stop = modal_state[modal_id]["focusable_elements"][modal_state[modal_id]["focusable_elements"].length - 1];
      /* set focus to modal (but not the modal_first_tab_stop */

      setTimeout(function () {
        if (modal_first_tab_stop) {
          modal_first_tab_stop.focus();
        }
      }, 100);
      /* add keyboard event listener */

      document.getElementById(modal_id).addEventListener('keydown', keyboard_modal_focus_trap);
    },
    close: function close() {
      document.removeEventListener('mousedown', modal_close);
      document.querySelector("body").classList.remove("overflow:hidden");
      /* updates modal visuals */

      document.querySelector("[data-module='modal'].active").setAttribute('tabIndex', '-1');
      document.querySelector("[data-module='modal'].active").setAttribute('aria-expanded', false);

      if (document.querySelector("[data-module='modal.trigger'].active")) {
        document.querySelector("[data-module='modal.trigger'].active").classList.remove('active');
      }

      document.querySelector("[data-module='modal'].active").querySelector(".modal-container").classList.remove('active');
      document.querySelector("[data-module='modal'].active").classList.remove('active');
      document.querySelectorAll("[data-module='modal']").forEach(function (modal, index) {
        var modal_id = modal.getAttribute("id");
        /* remove focus from modal elements */

        modal_state[modal_id]["focusable_elements"].forEach(function (el) {
          el.setAttribute("tabindex", "-1");
        });
        /* remove keyboard event listener */

        document.getElementById(modal_id).removeEventListener('keydown', keyboard_modal_focus_trap);
      });
      document.querySelectorAll("[data-module='modal.trigger']").forEach(function (modal_trigger) {
        modal_trigger.setAttribute("aria-expanded", false);
      });
      /* set focus to focus_placeholder */

      focus_placeholder.focus();
    },
    get_modal_focusable_elements: function get_modal_focusable_elements(modal_id) {
      modal_state[modal_id]["focusable_elements"] = document.getElementById(modal_id).querySelectorAll(focus_trap_selector); //console.log(modal_state[modal_id]["focusable_elements"]);

      modal_state[modal_id]["remove_focusable_elements"] = document.getElementById(modal_id).querySelectorAll(remove_focus_selector); //console.log(modal_state[modal_id]["remove_focusable_elements"]);
    }
  };
});