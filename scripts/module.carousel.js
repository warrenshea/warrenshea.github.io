'use strict';

/* @TODO: Infinite Scroll */
/* @TODO: Autoplay */
storm_eagle.module('carousel', () => {
  let self;
  let module_state = {};

  return {
    initialize: () => {
      self = storm_eagle.carousel;
      module_state = {};
      document.querySelectorAll('[data-module="carousel"]').forEach((el) => {
        let id = el.getAttribute('id');
        module_state[id] = {
          id,
          el,
          item_group: el.querySelector('[data-module="carousel.item-group"]'),
          item: el.querySelectorAll('[data-module="carousel.item"]:not(.display\\:none)'),
          total_children: el.querySelectorAll('[data-module="carousel.item"]:not(.display\\:none)').length,
          indicators_group: el.querySelector('[data-module="carousel.indicators-group"]'),
          controls_prev: el.querySelector('[data-module="carousel.controls-prev"]'),
          controls_next: el.querySelector('[data-module="carousel.controls-next"]'),
          item_height_variable: el.getAttribute('data-carousel-item-height-variable'),
          breakpoint: el.getAttribute('data-carousel-breakpoint'),
          transition_duration_array: JSON.parse(el.getAttribute('data-carousel-transition-duration')),
          transition_duration: '',
          number_of_active_array: JSON.parse(el.getAttribute('data-carousel-number-active')),
          number_of_active: '',
          offset_left_array: JSON.parse(el.getAttribute('data-carousel-offset')),
          offset_left: '',
          carousel_item_width: '',
          current_active_carousel_item: '',
        };
        self.state.initialize(id);
        self.event_listeners.initialize(id);
      });
    },
    state: {
      initialize: (id) => {
        self.state.set_current_active_carousel_item(id);
        self.state.set_offset_left(id);
        self.state.set_number_of_active(id);
        self.state.set_transition_duration(id);
      },
      set_current_active_carousel_item: (id) => {
        /* set the active item state property based on which DOM element has the 'active-item' class */
        const { item } = module_state[id];
        item.forEach((el, index) => {
          if (el.classList.contains('active-item')) {
            module_state[id]["current_active_carousel_item"] = index; //set current_active_carousel_item as the carousel item control set as "active" in the HTML code
          }
        });
      },
      set_offset_left: (id) => {
        const { el, offset_left_array } = module_state[id];
        /* if the value is > 1, then use a pixel value for the offset */
        /* if the value is > 0 and < 1, use the value as a percentage (e.g. 1/4 = .25) */
        const calculate_pixel_value = (id, offsetValue) => {
          if (offsetValue > 1) {
            return offsetValue;
          } else if (offsetValue > 0 && offsetValue < 1) {
            return el.offsetWidth * offsetValue;
          } else {
            return 0;
          }
        }
        if (storm_eagle.client.viewport.is_sm_only()) {
          module_state[id]['offset_left'] = calculate_pixel_value(id, offset_left_array[0]);
        } else if (storm_eagle.client.viewport.is_md_only()) {
          module_state[id]['offset_left'] = calculate_pixel_value(id, offset_left_array[1]);
        } else if (storm_eagle.client.viewport.is_lg_only()) {
          module_state[id]['offset_left'] = calculate_pixel_value(id, offset_left_array[2]);
        } else if (storm_eagle.client.viewport.is_xl_up()) {
          module_state[id]['offset_left'] = calculate_pixel_value(id, offset_left_array[3]);
        }
      },
      set_number_of_active: (id) => {
        const { number_of_active_array } = module_state[id];
        if (storm_eagle.client.viewport.is_sm_only()) {
          module_state[id]['number_of_active'] = number_of_active_array[0];
        } else if (storm_eagle.client.viewport.is_md_only()) {
          module_state[id]['number_of_active'] = number_of_active_array[1];
        } else if (storm_eagle.client.viewport.is_lg_only()) {
          module_state[id]['number_of_active'] = number_of_active_array[2];
        } else if (storm_eagle.client.viewport.is_xl_up()) {
          module_state[id]['number_of_active'] = number_of_active_array[3];
        }
      },
      set_transition_duration: (id) => {
        const { transition_duration_array } = module_state[id];
        if (storm_eagle.client.viewport.is_sm_only()) {
          module_state[id]['transition_duration'] = transition_duration_array[0];
        } else if (storm_eagle.client.viewport.is_md_only()) {
          module_state[id]['transition_duration'] = transition_duration_array[1];
        } else if (storm_eagle.client.viewport.is_lg_only()) {
          module_state[id]['transition_duration'] = transition_duration_array[2];
        } else if (storm_eagle.client.viewport.is_xl_up()) {
          module_state[id]['transition_duration'] = transition_duration_array[3];
        }
      },
    },
    event_listeners: {
      initialize: (id) => {
        self.event_listeners.indicator.initialize(id);
        self.event_listeners.control_buttons.initialize(id);
        self.event_listeners.swipe.initialize(id);
        self.event_listeners.resize.initialize(id);
      },
      indicator: {
        initialize: (id) => {
          const { el } = module_state[id];
          el.querySelectorAll('[data-module="carousel.indicators-group"] .control').forEach((el) => {
            el.removeEventListener('click', self.event_listeners.indicator.handle_change);
            el.addEventListener('click', self.event_listeners.indicator.handle_change);
          });
        },
        handle_change: (event) => {
          event.preventDefault();
          const id = storm_eagle.util.closest_parent(event.currentTarget, '[data-module="carousel"]').getAttribute('id');
          const { el, item_group, transition_duration } = module_state[id];
          item_group.style.transitionDuration = `${transition_duration}s`;
          module_state[id]['current_active_carousel_item'] = storm_eagle.util.index_in_parent(event.currentTarget);
          self.update_carousel(id);
        },
      },
      control_buttons: {
        initialize: (id) => {
          const { el, controls_next, controls_prev } = module_state[id];
          controls_next.removeEventListener('click', self.event_listeners.control_buttons.handle_swipe_left);
          controls_next.addEventListener('click', self.event_listeners.control_buttons.handle_swipe_left);
          controls_prev.removeEventListener('click', self.event_listeners.control_buttons.handle_swipe_right);
          controls_prev.addEventListener('click', self.event_listeners.control_buttons.handle_swipe_right);
        },
        handle_swipe_left: (event) => {
          event.preventDefault();
          const id = storm_eagle.util.closest_parent(event.currentTarget, '[data-module="carousel"]').getAttribute('id');
          const { el, item_group } = module_state[id];
          /* console.log("left"); */
          item_group.dispatchEvent(new Event('swiped-left'));
        },
        handle_swipe_right: (event) => {
          event.preventDefault();
          const id = storm_eagle.util.closest_parent(event.currentTarget, '[data-module="carousel"]').getAttribute('id');
          const { el, item_group } = module_state[id];
          /* console.log("right"); */
          item_group.dispatchEvent(new Event('swiped-right'));
        },
      },
      resize: {
        initialize: (id) => {
          const { el } = module_state[id];
          const force_resize = () => {
            return self.force_resize(id);
          }
          storm_eagle.resize_observer(el, force_resize);
        }
      },
      swipe: {
        initialize: (id) => {
          const { el, item_group } = module_state[id];
          /* if a coursel is swiped left */
          item_group.removeEventListener('swiped-left', self.event_listeners.swipe.handle_swiped_left);
          item_group.addEventListener('swiped-left', self.event_listeners.swipe.handle_swiped_left);

          /* if a coursel is swiped right */
          item_group.removeEventListener('swiped-right', self.event_listeners.swipe.handle_swiped_right);
          item_group.addEventListener('swiped-right', self.event_listeners.swipe.handle_swiped_right);
        },
        handle_swiped_left: (event) => {
          //go -> in the carousel
          const id = storm_eagle.util.closest_parent(event.currentTarget, '[data-module="carousel"]').getAttribute('id');
          const { el, item_group, total_children, transition_duration, number_of_active, current_active_carousel_item } = module_state[id];
          item_group.style.transitionDuration = `${transition_duration}s`;
          if (module_state[id]['current_active_carousel_item'] !== total_children - number_of_active) {
            module_state[id]['current_active_carousel_item']++;
            self.update_carousel(id);
          }
        },
        handle_swiped_right: (event) => {
          //go <- in the carousel
          const id = storm_eagle.util.closest_parent(event.currentTarget, '[data-module="carousel"]').getAttribute('id');
          const { el, item_group, transition_duration } = module_state[id];
          item_group.style.transitionDuration = `${transition_duration}s`;
          if (module_state[id]['current_active_carousel_item'] !== 0) {
            module_state[id]['current_active_carousel_item']--;
            self.update_carousel(id);
          }
        },
      },
    },
    update_carousel: (id) => {
      const { el, item_group, item, total_children, number_of_active, offset_left, carousel_item_width, current_active_carousel_item } = module_state[id];
      const set_active_items = (id) => {
        /* resets the active classes on the carousel items and adds the proper active classes */
        item.forEach((el) => {
          el.classList.remove('active-item', 'active');
        });
        item[current_active_carousel_item].classList.add('active-item');
        for (let i = 0; i < number_of_active; i++) {
          item[current_active_carousel_item + i].classList.add('active');
        }
        /* resets the active classes on the carousel control and adds the proper active classes */
        el.querySelectorAll('[data-module="carousel.indicators-group"] .control').forEach((el) => {
          el.classList.remove('active-item');
        });
        el.querySelectorAll('[data-module="carousel.indicators-group"] .control')[current_active_carousel_item].classList.add('active-item');
      }

      const update_controls = (id) => {
        const { controls_next, controls_prev } = module_state[id];
        /* show both chevrons */
        if (total_children !== 1) {
          controls_prev.classList.remove('display:none');
          controls_prev.classList.add('display:block');
          controls_next.classList.remove('display:none');
          controls_next.classList.add('display:block');
        }
        /* hide chevrons */
        if (current_active_carousel_item === 0) {
          controls_prev.classList.add('display:none');
          controls_prev.classList.remove('display:block');
        } else if (current_active_carousel_item === total_children - number_of_active) {
          controls_next.classList.add('display:none');
          controls_next.classList.remove('display:block');
        }
      }

      set_active_items(id);
      update_controls(id);

      /* ensures only links in the active carousel or tab-able */
      el.querySelectorAll('[data-module="carousel.item-group"] .item a').forEach((el) => {
        el.setAttribute('tabindex', '-1');
      });
      el.querySelectorAll('[data-module="carousel.item-group"] .item.active-item a').forEach((el) => {
        el.setAttribute('tabindex', '0');
      });

      /* changes the left offset */
      item_group.style.left = `${offset_left - current_active_carousel_item * carousel_item_width}px`;

      /* ensures there's no transition duration except when we want the transition to occcur */
      setTimeout(() => {
        item_group.style.transitionDuration = '0s';
      }, module_state[id]['transition_duration'] * 1000);
    },
    reinitialize_carousel: (id) => {
      const { el, item_group, item, total_children, item_height_variable, indicators_group, number_of_active, offset_left, carousel_item_width, current_active_carousel_item } = module_state[id];
      /* indicate that the carousel is currently active, rather than disabled */
      el.classList.add('carousel-is-active');

      /* dynamically create the control buttons */
      // el.querySelectorAll('[data-module="carousel.controls"]').forEach(el => {
      //   el.remove();
      // });
      indicators_group.innerHTML = '';
      for (let i = 0; i <= total_children - number_of_active; i++) {
        indicators_group.innerHTML += `<button name="carousel-control-button" class="control cursor:pointer"><span class="show-for-sr">Go to slide #${i + 1}</button>`;
      }
      self.event_listeners.indicator.initialize(id);

      /* set the active item class on the control buttons */
      el.querySelectorAll('[data-module="carousel.indicators-group"] .control')[current_active_carousel_item].classList.add('active-item');
      //console.log(el.querySelectorAll('[data-module="carousel.indicators-group'] .control"));
      //console.log([module_state[id]["current_active_carousel_item"]]);

      /* updates the carousel width state property and updates the carousel container */
      module_state[id]['carousel_item_width'] = (el.offsetWidth - 2 * offset_left) / number_of_active;
      item.forEach((el) => {
        el.style.width = `${carousel_item_width}px`;
      });
      item_group.style.width = `${offset_left + carousel_item_width * total_children}px`;

      /* if the carousel item height changes, a height needs to be set for the container */
      if (item_height_variable === 'true') {
        item_group.style.height = `${el.querySelector('.items-group .item.active-item').offsetHeight + parseInt(el.style.paddingBottom || 0)}px`;
      }
      self.update_carousel(id);
    },
    disable: (id) => {
      const { el, item_group } = module_state[id];
      /* re-enables all links to be tab-able */
      el.querySelectorAll('.items-group .item a').forEach((el) => {
        el.setAttribute('tabindex', '0');
      });

      /* disable the carousel at this viewport */
      el.classList.remove('carousel-is-active');
      item_group.style.left = 0;
      item_group.style.width = '100%';
      item_group.style.height = 'auto';
      el.querySelectorAll('[data-module="carousel.item"]').forEach((el2) => {
        el2.style.width = 100 / el.querySelector('[data-module="carousel.item"]').length + '%';
      });
    },
    force_resize: (id) => {
      const { el, indicators_group, controls_prev, controls_next, breakpoint } = module_state[id];
      self.state.initialize(id);
      if (breakpoint === 'sm-only') {
        if (storm_eagle.client.viewport.is_sm_only()) {
          self.reinitialize_carousel(id);
        } else {
          indicators_group.classList.add('md+:hide');
          controls_prev.classList.add('md+:hide');
          controls_next.classList.add('md+:hide');
          self.disable(id);
        }
      } else if (breakpoint === 'sm-up') {
        if (storm_eagle.client.viewport.is_sm_up()) {
          self.reinitialize_carousel(id);
        }
      } else if (breakpoint === 'md-down') {
        if (storm_eagle.client.viewport.is_md_down()) {
          self.reinitialize_carousel(id);
        } else {
          indicators_group.classList.add('lg+:hide');
          controls_prev.classList.add('lg+:hide');
          controls_next.classList.add('lg+:hide');
          self.disable(id);
        }
      } else if (breakpoint === 'md-only') {
        if (storm_eagle.client.viewport.is_md_only()) {
          self.reinitialize_carousel(id);
        } else {
          indicators_group.classList.add('sm=:hide');
          indicators_group.classList.add('lg+:hide');
          controls_prev.classList.add('sm=:hide');
          controls_prev.classList.add('lg+:hide');
          controls_next.classList.add('sm=:hide');
          controls_next.classList.add('lg+:hide');
          self.disable(id);
        }
      } else if (breakpoint === 'md-up') {
        if (storm_eagle.client.viewport.is_md_up()) {
          self.reinitialize_carousel(id);
        } else {
          indicators_group.classList.add('sm=:hide');
          controls_prev.classList.add('sm=:hide');
          controls_next.classList.add('sm=:hide');
          self.disable(id);
        }
      } else if (breakpoint === 'lg-down') {
        if (storm_eagle.client.viewport.is_lg_down()) {
          self.reinitialize_carousel(id);
        } else {
          indicators_group.classList.add('xl+:hide');
          controls_prev.classList.add('xl+:hide');
          controls_next.classList.add('xl+:hide');
          self.disable(id);
        }
      } else if (breakpoint === 'lg-only') {
        if (storm_eagle.client.viewport.is_lg_only()) {
          self.reinitialize_carousel(id);
        } else {
          indicators_group.classList.add('md-:hide');
          indicators_group.classList.add('xl+:hide');
          controls_prev.classList.add('md-:hide');
          controls_prev.classList.add('xl+:hide');
          controls_next.classList.add('md-:hide');
          controls_next.classList.add('xl+:hide');
          self.disable(id);
        }
      } else if (breakpoint === 'lg-up') {
        if (storm_eagle.client.viewport.is_lg_up()) {
          self.reinitialize_carousel(id);
        } else {
          indicators_group.classList.add('md-:hide');
          controls_prev.classList.add('md-:hide');
          controls_next.classList.add('md-:hide');
          self.disable(id);
        }
      } else if (breakpoint === 'xl-up') {
        if (storm_eagle.client.viewport.is_xl_up()) {
          self.reinitialize_carousel(id);
        } else {
          indicators_group.classList.add('lg-:hide');
          controls_prev.classList.add('lg-:hide');
          controls_next.classList.add('lg-:hide');
          self.disable(id);
        }
      } else {
        self.reinitialize_carousel(id);
      }
    },
  };
});
