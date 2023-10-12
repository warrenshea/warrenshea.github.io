'use strict';

storm_eagle.module('range_slider', function () {
  var self;
  var slider_state = {};
  return {
    initialize: function initialize() {
      self = storm_eagle['range_slider'];
      document.querySelectorAll('[data-module="range-slider.input-container"]').forEach(function (el) {
        var slider_id = el.querySelector('[data-module="range-slider.input-1"]').getAttribute('id');
        slider_state[slider_id] = {
          input_container: el,
          slider_2_id: el.querySelector('[data-module="range-slider.input-2"]').getAttribute('id'),
          label_container: el.querySelector('[data-module="slider.labels"]'),
          labels: el.querySelectorAll('[data-module="slider.labels"] > * '),
          num_labels: el.querySelectorAll('[data-module="slider.labels"] > * ').length,
          slider_fill: el.querySelector('[data-module="slider.fill"]')
        };
        self.slider_listener(slider_id);
        self.resize_listener(slider_id);
        self.update_slider_track(slider_id);
      });
    },
    ready: function ready() {
      document.querySelectorAll('[data-module="range-slider.input-1"]').forEach(function (el) {
        var slider_id = el.getAttribute('id');
        self.force_resize(slider_id);
      });
    },
    force_resize: function force_resize(slider_id) {
      var container_width = slider_state[slider_id]['input_container'].offsetWidth;
      var full_label_width = container_width * slider_state[slider_id]['num_labels'] / (slider_state[slider_id]['num_labels'] - 1);
      slider_state[slider_id]['label_container'].style.width = full_label_width + 'px';
      var transform_left = 50 / slider_state[slider_id]['num_labels'] * -1;
      slider_state[slider_id]['label_container'].style.transform = "translateX(".concat(transform_left, "%)");
    },
    slider_listener: function slider_listener(slider_id) {
      document.getElementById(slider_id).addEventListener('input', function (event) {
        self.update_slider_track(slider_id);
      });
      document.getElementById(slider_state[slider_id]['slider_2_id']).addEventListener('input', function (event) {
        self.update_slider_track(slider_id);
      });
    },
    update_slider_track: function update_slider_track(slider_id) {
      var el_1 = document.getElementById(slider_id);
      var el_2 = document.getElementById(slider_state[slider_id]['slider_2_id']);

      if (parseInt(el_1.value) > parseInt(el_2.value)) {
        var temp = el_1;
        el_1 = el_2;
        el_2 = temp;
      }

      var left = (el_1.value - el_1.getAttribute('min')) / (el_1.getAttribute('max') - el_1.getAttribute('min')) * 100;
      slider_state[slider_id]['slider_fill'].style.left = left + '%';
      var percentage = (el_2.value - el_2.getAttribute('min')) / (el_2.getAttribute('max') - el_2.getAttribute('min')) * 100;
      slider_state[slider_id]['slider_fill'].style.width = percentage - left + '%';
    },
    update_all_slider_track: function update_all_slider_track() {
      document.querySelectorAll('[data-module="range-slider.input-container"]').forEach(function (el) {
        var slider_id = el.querySelector('[data-module="slider.input-1"]').getAttribute('id');
        self.update_slider_track(slider_id);
      });
    },
    resize_listener: function resize_listener(slider_id) {
      function force_resize() {
        return self.force_resize(slider_id);
      }

      storm_eagle.resize_observer(document.getElementById(slider_id), force_resize);
    }
  };
});