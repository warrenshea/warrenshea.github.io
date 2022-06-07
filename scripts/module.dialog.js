"use strict";

storm_eagle.module('dialog', function () {
  'use strict';

  var self;
  var focus_placeholder;
  var dialog_first_tab_stop;
  var dialog_last_tab_stop;
  var dialog_state = {};

  function dialog_close(event) {
    //console.log(event.target.classList);
    if (event.target.classList.contains("dialog-container") || event.target.classList.contains("dialog-overlay")) {
      storm_eagle.dialog.close();
    }
  }

  function keyboard_dialog_focus_trap(event) {
    if (event.keyCode === keyboard.keys.tab) {
      if (event.shiftKey) {
        if (document.activeElement === dialog_first_tab_stop) {
          event.preventDefault();
          dialog_last_tab_stop.focus();
        }
      } else {
        if (document.activeElement === dialog_last_tab_stop) {
          event.preventDefault();
          dialog_first_tab_stop.focus();
        }
      }
    }

    if (event.keyCode === keyboard.keys.esc || event.keyCode === keyboard.keys.enter && document.activeElement.hasAttribute("[data-trigger='dialog-close']")) {
      storm_eagle.dialog.close();
    }
  }

  return {
    initialize: function initialize() {
      self = storm_eagle["dialog"];
      document.querySelectorAll("[data-module='dialog']").forEach(function (el) {
        var dialog_id = el.getAttribute("id");
        dialog_state[dialog_id] = {
          "focusable_elements": [],
          "remove_focusable_elements": []
        };
      });
    },
    open: function open(dialog_trigger, dialog_id) {
      document.addEventListener('mousedown', dialog_close);
      /* updates dialog visuals */

      if (dialog_trigger) {
        dialog_trigger.classList.add('active');
      }

      document.getElementById(dialog_id).classList.add('active');
      document.getElementById(dialog_id).querySelector(".dialog-container").classList.add('active');
      /* saves item that opened dialog for later */

      focus_placeholder = document.activeElement;
      dialog_first_tab_stop = dialog_state[dialog_id]["focusable_elements"][0];
      dialog_last_tab_stop = dialog_state[dialog_id]["focusable_elements"][dialog_state[dialog_id]["focusable_elements"].length - 1];
      /* set focus to dialog (but not the dialog_first_tab_stop */

      setTimeout(function () {
        if (dialog_first_tab_stop) {
          dialog_first_tab_stop.focus();
        }
      }, 100);
      /* add keyboard event listener */

      document.getElementById(dialog_id).addEventListener('keydown', keyboard_dialog_focus_trap);
    },
    close: function close() {
      document.removeEventListener('mousedown', dialog_close);
      document.querySelector("body").classList.remove("overflow:hidden");
      /* updates dialog visuals */

      document.querySelector("[data-module='dialog'].active").setAttribute('tabIndex', '-1');
      document.querySelector("[data-module='dialog'].active").setAttribute('aria-expanded', false);

      if (document.querySelector("[data-module='dialog.trigger'].active")) {
        document.querySelector("[data-module='dialog.trigger'].active").classList.remove('active');
      }

      document.querySelector("[data-module='dialog'].active").querySelector(".dialog-container").classList.remove('active');
      document.querySelector("[data-module='dialog'].active").classList.remove('active');
      document.querySelectorAll("[data-module='dialog']").forEach(function (dialog, index) {
        var dialog_id = dialog.getAttribute("id");
      });
      document.querySelectorAll("[data-module='dialog.trigger']").forEach(function (dialog_trigger) {
        dialog_trigger.setAttribute("aria-expanded", false);
      });
      /* set focus to focus_placeholder */

      focus_placeholder.focus();
    }
  };
});