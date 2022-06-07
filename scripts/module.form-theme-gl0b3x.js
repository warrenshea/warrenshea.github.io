"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

storm_eagle.module('form_theme_gl0b3x', function () {
  "use strict";

  var self;
  return {
    initialize: function initialize() {
      self = storm_eagle["form_theme_gl0b3x"];
      self.input_listener();
      self.textarea_autoexpand_listener();
    },
    ready: function ready() {
      document.querySelectorAll('.form\\:theme\\:gl0b3x input, .form\\:theme\\:gl0b3x select, .form\\:theme\\:gl0b3x textarea').forEach(function (element) {
        if (element.type !== 'radio') {
          self.force_set_active_label(element);
        }
      });
      document.querySelectorAll(".form\\:theme\\:gl0b3x textarea").forEach(function (element) {
        self.force_textarea_autoexpand(element);
      });
    },
    force_set_active_label: function force_set_active_label(element) {
      element.nextElementSibling.classList[element.value.length ? 'add' : 'remove']('active-label');
    },
    input_listener: function input_listener() {
      document.querySelectorAll('.form\\:theme\\:gl0b3x input, .form\\:theme\\:gl0b3x select, .form\\:theme\\:gl0b3x textarea').forEach(function (element) {
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
      document.querySelectorAll(".form\\:theme\\:gl0b3x textarea").forEach(function (element) {
        element.addEventListener('input', function () {
          self.force_textarea_autoexpand(element);
        });
      });
    }
  };
});
storm_eagle.module('form_parent_checkbox', function () {
  "use strict";

  var self;
  var parent_checkbox_state = {};

  function _is_checked(el) {
    if (typeof el.checked === 'boolean') {
      return el.checked;
    } // If ARIA checkbox widget


    return el.getAttribute('aria-checked') === 'true';
  }

  function _set_checked(key, value) {
    var el = document.getElementById(key);

    if (typeof el.checked === 'boolean') {
      switch (value.toString()) {
        case 'true':
          el.checked = true;
          break;

        case 'false':
          el.checked = false;
          break;

        default:
          break;
      }
    } // If ARIA checkbox widget
    //if (typeof el.getAttribute('aria-checked') === 'string') {


    switch (value.toString()) {
      case 'true':
      case 'false':
        el.ariaChecked = value;
        break;

      default:
        break;
    }
  }

  function _update_parent(parent_id) {
    var num_child_checkboxes_checked = 0;
    var num_checkboxes = 0;

    for (var _i = 0, _Object$entries = Object.entries(parent_checkbox_state[parent_id]); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (num_checkboxes > 0) {
        if (_is_checked(document.getElementById(key))) {
          num_child_checkboxes_checked += 1;
        }
      }

      num_checkboxes += 1;
    }

    if (num_child_checkboxes_checked === 0) {
      document.getElementById(parent_id).setAttribute('aria-checked', 'false');
      document.getElementById(parent_id).checked = false;
    } else {
      if (num_child_checkboxes_checked === num_checkboxes - 1) {
        document.getElementById(parent_id).setAttribute('aria-checked', 'true');
        document.getElementById(parent_id).checked = true;
      } else {
        document.getElementById(parent_id).setAttribute('aria-checked', 'mixed');
        document.getElementById(parent_id).checked = true;
      }
    }
  }

  function _update_state(parent_id, id_clicked) {
    if (parent_id === id_clicked) {
      if (_is_checked(document.getElementById(parent_id)) === false) {
        for (var _i2 = 0, _Object$entries2 = Object.entries(parent_checkbox_state[parent_id]); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              key = _Object$entries2$_i[0],
              value = _Object$entries2$_i[1];

          parent_checkbox_state[parent_id][key] = false;

          _set_checked(key, false);
        }
      } else if (_is_checked(document.getElementById(parent_id)) === true) {
        for (var _i3 = 0, _Object$entries3 = Object.entries(parent_checkbox_state[parent_id]); _i3 < _Object$entries3.length; _i3++) {
          var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
              _key = _Object$entries3$_i[0],
              _value = _Object$entries3$_i[1];

          parent_checkbox_state[parent_id][_key] = true;

          _set_checked(_key, true);
        }
      }
    } else {
      if (_is_checked(document.getElementById(id_clicked)) === true) {
        parent_checkbox_state[parent_id][id_clicked] = false;

        _set_checked(id_clicked, false);
      } else if (_is_checked(document.getElementById(id_clicked)) === false) {
        parent_checkbox_state[parent_id][id_clicked] = true;

        _set_checked(id_clicked, true);
      }
    }

    _update_parent(parent_id);
  }

  return {
    initialize: function initialize() {
      self = storm_eagle["form_parent_checkbox"];
      document.querySelectorAll("[data-module='parent-checkbox']").forEach(function (el, num_child_checkboxes) {
        var parent_checkbox_id = el.getAttribute("id");
        var checkbox_ids = el.getAttribute('aria-controls').split(' ');
        parent_checkbox_state[parent_checkbox_id] = {};
        parent_checkbox_state[parent_checkbox_id][parent_checkbox_id] = _is_checked(document.getElementById(parent_checkbox_id));
        self.add_parent_event_listeners(parent_checkbox_id);

        for (var i = 0; i < checkbox_ids.length; i++) {
          parent_checkbox_state[parent_checkbox_id][checkbox_ids[i]] = _is_checked(document.getElementById(checkbox_ids[i]));
          self.add_child_event_listeners(parent_checkbox_id, document.getElementById(checkbox_ids[i]));
        }
      });
    },
    add_parent_event_listeners: function add_parent_event_listeners(parent_checkbox_id) {
      document.getElementById(parent_checkbox_id).addEventListener('keydown', function (event) {
        _update_state(parent_checkbox_id, parent_checkbox_id);
      });
      document.getElementById(parent_checkbox_id).addEventListener('click', function (event) {
        _update_state(parent_checkbox_id, parent_checkbox_id);
      });
    },
    add_child_event_listeners: function add_child_event_listeners(parent_checkbox_id, el) {
      el.addEventListener('change', function (event) {
        _update_state(parent_checkbox_id, el.getAttribute("id"));
      });
      el.addEventListener('keydown', function (event) {
        _update_state(parent_checkbox_id, el.getAttribute("id"));
      });
      el.addEventListener('click', function (event) {
        _update_state(parent_checkbox_id, el.getAttribute("id"));
      });
    }
  };
});