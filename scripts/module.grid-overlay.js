  'use strict';
  storm_eagle.module('grid_overlay', () => {
    let self;
    let state = {};
    let prev_body_width = 0;
    return {
      initialize: () => {
        self = storm_eagle.grid_overlay;
        document.querySelectorAll('[data-module="iframe-grid-sliders"]').forEach((el, index) => {
          let id = el.getAttribute('id');
          state[id] = {
            iframe: el.querySelector('[data-module="iframe-grid"]'),
            container: el.querySelector('[data-module="range-slider.input-container"]'),
            slider_1: el.querySelector('[data-module="range-slider.input-1"]'),
            slider_2: el.querySelector('[data-module="range-slider.input-2"]'),
            range_slider_width: el.querySelector('[data-module="range-slider-width"]'),
            overlay_grid_lines: el.querySelectorAll(`.${id} > div`),
          };
        });
        self.add_message_listener();
        self.resize_listener();
        self.slider_listener();
      },
      add_message_listener: () => {
        window.addEventListener('message', (event) => {
          // console.log(`receiving message: ${event.data}`);
          if (event.data !== "") {
            let { action, new_height, new_id } = JSON.parse(event.data);
            if (action === "update_height") {
              // console.log(state[new_id]['iframe']);
              // console.log(`grid_overlay.js > message recieved > ${new_height}:${new_id}`);
              new_height = parseInt(new_height);
              state[new_id]['iframe'].style.height = `${new_height + 1}px`;
              self.update_range_sliders(new_id);
              if (storm_eagle.isotope_cards) {
                storm_eagle.isotope_cards.refresh_isotope();
              }
            }
          }
        });
      },
      update_range_sliders: (id) => {
        //console.log(`grid_overlay.js > update_range_sliders > ${id}`);
        let min_range = state[id]['container'].offsetWidth * 2 * -1;
        let max_range = state[id]['container'].offsetWidth * 2;
        state[id]['slider_1'].min = min_range;
        state[id]['slider_2'].min = min_range;
        state[id]['slider_1'].max = max_range;
        state[id]['slider_2'].max = max_range;
        state[id]['slider_1'].setAttribute('value', min_range);
        state[id]['slider_2'].setAttribute('value', max_range);
        if (storm_eagle.range_slider) {
          storm_eagle.range_slider.ui.update_slider_track(state[id]['slider_1'].getAttribute('id'));
        }
      },
      show_grid: (id) => {
        state[id]['overlay_grid_lines'].forEach((el) => {
          el.classList.remove('hide');
        });
      },
      hide_grid: (id) => {
        state[id]['overlay_grid_lines'].forEach((el) => {
          el.classList.add('hide');
        });
      },
      calculate_grid_lines: (grid_overlay_wrapper, width) => {
        const wrapper = document.querySelector(`.${grid_overlay_wrapper}`);
        const valid_overlay_types = ["grid-overlay-standard", "grid-overlay-standard-wrap", "grid-overlay-standard-centered", "grid-overlay-rare", "grid-overlay-flexible"];
        if (valid_overlay_types.includes(grid_overlay_wrapper)) {
          wrapper.classList.remove("sm","md","lg","xl");
          if (width >= 375 && width < 768) {
            wrapper.classList.add("sm");
          } else if (width >= 768 && width < 1024) {
            wrapper.classList.add("md");
          } else if (width >= 1024 && width < 1280) {
            wrapper.classList.add("lg");
          } else {
            wrapper.classList.add("xl");
          }
        }
        wrapper.style.width = `${width}px`;
      },
      range_slider_input_1: (id) => {
        let val1 = state[id]['slider_1'].value;
        let val2 = state[id]['slider_2'].value;
        if (val1 > -750) {
          val1 = '-750';
          state[id]['slider_1'].value = val1;
          state[id]['slider_1'].setAttribute('value', val1);
          state[id]['slider_2'].value = val2;
          state[id]['slider_2'].setAttribute('value', val2);
        } else {
          state[id]['slider_2'].value = -val1;
          state[id]['slider_2'].setAttribute('value', -val1);
        }
        state[id]['range_slider_width'].value = `  ${Math.abs(Math.ceil(val1 / 2))}px`;
        //console.log(`range_slider_input_1 > ${id} > asking_for_height`);
        const action = "asking_for_height";
        const query = { action };
        state[id]['iframe'].contentWindow.postMessage(JSON.stringify(query), window.location.origin);
        state[id]['iframe'].style.width = `${Math.abs(val1 / 2)}px`;
        self.calculate_grid_lines(id, Math.min(1280, Math.abs(val1 / 2)));
      },
      range_slider_input_2: (id) => {
        let val1 = state[id]['slider_1'].value;
        let val2 = state[id]['slider_2'].value;
        if (val2 < 750) {
          val2 = '750';
          state[id]['slider_1'].value = val1;
          state[id]['slider_1'].setAttribute('value', val1);
          state[id]['slider_2'].value = val2;
          state[id]['slider_2'].setAttribute('value', val2);
        } else {
          state[id]['slider_1'].value = -val2;
          state[id]['slider_1'].setAttribute('value', -val2);
        }
        state[id]['range_slider_width'].value = `  ${Math.abs(Math.ceil(val2 / 2))}px`;
        //console.log(`range_slider_input_2 > ${id} > asking_for_height`);
        const action = "asking_for_height";
        const query = { action };
        state[id]['iframe'].contentWindow.postMessage(JSON.stringify(query), window.location.origin);
        state[id]['iframe'].style.width = `${Math.abs(val2 / 2)}px`;
        self.calculate_grid_lines(id, Math.min(1280, Math.abs(val2 / 2)));
      },
      force_grid: (id, grid_value) => {
        const action = "asking_for_height";
        const query = { action };
        switch (grid_value) {
          case 1440:
            //console.log(`force_grid (1440) > asking_for_height`);
            state[id]['iframe'].contentWindow.postMessage(JSON.stringify(query), window.location.origin);
            state[id]['slider_1'].value = -2880;
            state[id]['slider_1'].setAttribute('value', -2880);
            state[id]['slider_2'].value = 2880;
            state[id]['slider_2'].setAttribute('value', 2880);
            state[id]['iframe'].style.width = `${1440}px`;
            self.calculate_grid_lines(id, 1280);
            state[id]['range_slider_width'].value = `  ${Math.abs(Math.ceil(2880 / 2))}px`;
            storm_eagle.range_slider.ui.update_slider_track(state[id]['slider_1'].getAttribute('id'));
            break;
          case 1280:
            //console.log(`force_grid (1280) > asking_for_height`);
            state[id]['iframe'].contentWindow.postMessage(JSON.stringify(query), window.location.origin);
            state[id]['slider_1'].value = -2560;
            state[id]['slider_1'].setAttribute('value', -2560);
            state[id]['slider_2'].value = 2560;
            state[id]['slider_2'].setAttribute('value', 2560);
            state[id]['iframe'].style.width = `${1280}px`;
            self.calculate_grid_lines(id, 1280);
            state[id]['range_slider_width'].value = `  ${Math.abs(Math.ceil(2560 / 2))}px`;
            storm_eagle.range_slider.ui.update_slider_track(state[id]['slider_1'].getAttribute('id'));
            break;
          case 1024:
            //console.log(`force_grid (1024) > asking_for_height`);
            state[id]['iframe'].contentWindow.postMessage(JSON.stringify(query), window.location.origin);
            state[id]['slider_1'].value = -2048;
            state[id]['slider_1'].setAttribute('value', -2048);
            state[id]['slider_2'].value = 2048;
            state[id]['slider_2'].setAttribute('value', 2048);
            state[id]['iframe'].style.width = `${1024}px`;
            self.calculate_grid_lines(id, 1024);
            state[id]['range_slider_width'].value = `  ${Math.abs(Math.ceil(2048 / 2))}px`;
            storm_eagle.range_slider.ui.update_slider_track(state[id]['slider_1'].getAttribute('id'));
            break;
          case 768:
            //console.log(`force_grid (768) > asking_for_height`);
            state[id]['iframe'].contentWindow.postMessage(JSON.stringify(query), window.location.origin);
            state[id]['slider_1'].value = -1536.4;
            state[id]['slider_1'].setAttribute('value', -1536.4);
            state[id]['slider_2'].value = 1536.4;
            state[id]['slider_2'].setAttribute('value', 1536.4);
            state[id]['iframe'].style.width = `${768.2}px`;
            self.calculate_grid_lines(id, 768.2);
            state[id]['range_slider_width'].value = `  ${Math.abs(Math.ceil(1536 / 2))}px`;
            storm_eagle.range_slider.ui.update_slider_track(state[id]['slider_1'].getAttribute('id'));
            break;
          case 375:
            //console.log(`force_grid (375) > asking_for_height`);
            state[id]['iframe'].contentWindow.postMessage(JSON.stringify(query), window.location.origin);
            state[id]['slider_1'].value = -750;
            state[id]['slider_1'].setAttribute('value', -750);
            state[id]['slider_2'].value = 750;
            state[id]['slider_2'].setAttribute('value', 750);
            state[id]['iframe'].style.width = `${375}px`;
            self.calculate_grid_lines(id, 375);
            state[id]['range_slider_width'].value = `  ${Math.abs(Math.ceil(750 / 2))}px`;
            storm_eagle.range_slider.ui.update_slider_track(state[id]['slider_1'].getAttribute('id'));
            break;
          default:
            break;
        }
      },
      //if the entire window changes in width, update the range sliders for all the grids
      resize_listener: () => {
        const force_resize_on_width_change = () => {
          if (prev_body_width !== document.querySelector('body').offsetWidth) {
            prev_body_width = document.querySelector('body').offsetWidth;
            Object.keys(state).forEach((key) => {
              self.update_range_sliders(key);
              //self.update_iframe_width(key);
            });
          }
        }
        storm_eagle.resize_observer(document.querySelector('body'), force_resize_on_width_change);
      },
      slider_listener: () => {
        const change_fill_color = (el) => {
          let width = Math.ceil(el.getBoundingClientRect().width);
          if (storm_eagle.client.viewport.is_sm_only(width)) {
            el.style.backgroundColor = "#f4c026";
          } else if (storm_eagle.client.viewport.is_md_only(width)) {
            el.style.backgroundColor = "#09681d";
          } else if (storm_eagle.client.viewport.is_lg_only(width)) {
            el.style.backgroundColor = "#ab1e23";
          } else if (storm_eagle.client.viewport.is_xl_up(width)) {
            el.style.backgroundColor = "#3169b2";
          }
        }
        document.querySelectorAll(`[data-module="iframe-grid-sliders"] [data-module="slider.fill"]`).forEach((el) => {
          storm_eagle.resize_observer(el, change_fill_color, { "props": el });
        });
      },
    };
  });