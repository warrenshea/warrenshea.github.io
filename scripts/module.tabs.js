'use strict';
storm_eagle.module('tabs', () => {
  let self;
  let state = {};
  return {
    initialize: () => {
      self = storm_eagle.tabs;
      state = {};
      self.setup();
    },
    setup: () => {
      document.querySelectorAll('[data-module="tabs"]').forEach((el) => {
        const id = el.getAttribute('id');
        state[id] = {
          el,
          all_triggers: el.querySelectorAll('[data-module="tabs.trigger"]'),
          all_panels: el.parentNode.querySelectorAll('[data-module="tabs.panel"]'),
          active_trigger_classes: el.getAttribute('data-tab-trigger-active-classes') ? el.getAttribute('data-tab-trigger-active-classes').split(',') : '',
          inactive_trigger_classes: el.getAttribute('data-tab-trigger-inactive-classes') ? el.getAttribute('data-tab-trigger-inactive-classes').split(',') : '',
          active_panel_classes: el.getAttribute('data-tab-panel-active-classes') ? el.getAttribute('data-tab-panel-active-classes').split(',') : '',
          inactive_panel_classes: el.getAttribute('data-tab-panel-inactive-classes') ? el.getAttribute('data-tab-panel-inactive-classes').split(',') : '',
          initial_active: JSON.parse(el.getAttribute('data-tabs-initial')),
        };
        self.ui.initialize(id);
        self.event_listeners.initialize(id);
      });
    },
    ui: {
      initialize: (id) => {
        const { all_triggers, all_panels, inactive_panel_classes } = state[id];
        state[id]['all_triggers'].forEach((trigger, index) => {
          trigger.removeAttribute("hidden");
          trigger.setAttribute('aria-controls', state[id]['all_panels'][index].getAttribute('id'));
          all_panels[index].querySelector(':scope > div.display\\:none').innerHTML = trigger.innerHTML;
          all_panels[index].setAttribute('aria-labelledby', trigger.getAttribute('id'));
          if (index === 0) {
            trigger.setAttribute('tabindex', '0');
            trigger.removeEventListener('focusin', self.event_listeners.trigger_focus.add);
            trigger.addEventListener('focusin', self.event_listeners.trigger_focus.add);
            trigger.removeEventListener('focusout', self.event_listeners.trigger_focus.remove);
            trigger.addEventListener('focusout', self.event_listeners.trigger_focus.remove);
          }
        });
        all_panels.forEach((panel) => {
          panel.classList.add(...inactive_panel_classes);
        });
        self.ui.initialize_initial_active(id);
      },
      initialize_initial_active: (id) => {
        const { all_triggers, initial_active } = state[id];
        all_triggers.forEach((trigger, index) => {
          if (initial_active[index] === 1) {
            self.action.set_active_tab(id, trigger.getAttribute('id'), trigger.getAttribute('aria-controls'));
          }
        });
      },
    },
    event_listeners: {
      initialize: (id) => {
        const { all_triggers, active_trigger_classes, inactive_trigger_classes } = state[id];
        all_triggers.forEach((trigger) => {
          trigger.addEventListener('click', () => {
            self.action.set_active_tab(id, trigger.getAttribute('id'), trigger.getAttribute('aria-controls'));
          });
        });
      },
      trigger_focus: {
        add: (event) => {
          event.currentTarget.classList.add('focus');
        },
        remove: (event) => {
          event.currentTarget.classList.remove('focus');
        },
      }
    },
    action: {
      set_active_tab: (id, trigger_id, panel_id) => {
        const { all_triggers, all_panels, active_trigger_classes, inactive_trigger_classes, active_panel_classes, inactive_panel_classes } = state[id];

        all_triggers.forEach((trigger) => {
          trigger.classList.add(...inactive_trigger_classes);
          trigger.classList.remove(...active_trigger_classes);
        });
        document.getElementById(trigger_id).classList.add(...active_trigger_classes);
        document.getElementById(trigger_id).classList.remove(...inactive_trigger_classes);

        all_panels.forEach((panel) => {
          panel.classList.add(...inactive_panel_classes);
          panel.classList.remove(...active_panel_classes);
        });
        document.getElementById(panel_id).classList.add(...active_panel_classes);
        document.getElementById(panel_id).classList.remove(...inactive_panel_classes);
      },
    },
  };
});
