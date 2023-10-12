'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

storm_eagle.module('waypoint', function () {
  var self;
  var waypoint_state = {};
  return {
    initialize: function initialize() {
      self = storm_eagle['waypoint'];
      document.querySelectorAll("[data-module='waypoint']").forEach(function (el) {
        var waypoint_id = el.getAttribute('id');
        waypoint_state[waypoint_id] = {
          element: el.getAttribute('data-waypoint-element'),
          add_class: el.getAttribute('data-waypoint-add'),
          remove_class: el.getAttribute('data-waypoint-remove'),
          toggle_class: el.getAttribute('data-waypoint-toggle'),
          delay: el.getAttribute('data-waypoint-delay'),
          activate: el.getAttribute('data-waypoint-activate'),
          new_waypoint_obj: {}
        };
        self.add_waypoint_listeners(waypoint_id);
      });
    },
    add_waypoint_listeners: function add_waypoint_listeners(waypoint_id) {
      waypoint_state[waypoint_id]['new_waypoint_obj'] = new Waypoint({
        element: 'this' ? document.getElementById(waypoint_id) : document.querySelector(waypoint_state[waypoint_id]['element']),
        handler: function handler() {
          var delay = waypoint_state[waypoint_id]['delay'] || 0;
          setTimeout(function () {
            if (waypoint_state[waypoint_id]['remove_class']) {
              var _document$getElementB;

              (_document$getElementB = document.getElementById(waypoint_id).classList).remove.apply(_document$getElementB, _toConsumableArray(waypoint_state[waypoint_id]['remove_class'].split(/[,]+/)));
            }

            if (waypoint_state[waypoint_id]['add_class']) {
              document.getElementById(waypoint_id).classList.add(waypoint_state[waypoint_id]['add_class']);
            }

            if (waypoint_state[waypoint_id]['toggle_class']) {
              document.getElementById(waypoint_id).classList.toggle(waypoint_state[waypoint_id]['toggle_class']);
            }
          }, delay);
        },
        offset: waypoint_state[waypoint_id]['activate']
      });
    }
  };
});