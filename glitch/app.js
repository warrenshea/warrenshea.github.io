glitch =  (function(window, document, undefined) {

  return {
    /**
     * Add module and module name_space to the glitch object
     *
     * @param string name_space
     * @param object module_object
     * @return mixed
     * @scope public
     */
    module : function(name_space, module_object) {
      if(glitch[name_space] === undefined) {
        glitch[name_space] = module_object();
        if(glitch[name_space] !== undefined) {
          if(typeof glitch[name_space].initialize === 'function') {
            glitch[name_space].initialize();
          }
          if(typeof glitch[name_space].ready === 'function') {
            glitch.documentReady(function() {
              glitch[name_space].ready();
            });
          }
          return glitch[name_space];
        }
      } else {
        glitch.throw_exception(`Cannot create module. The module: '${name_space}' already exists`);
      }
    },
    destroy_module: function(name_space) {
      glitch[name_space] = undefined;
    }
  };
})(window, document);

glitch.module('core', function () {
  //local development
  let _path_prefix = (window.location.hostname === "http://localhost:3000") ? "" : "http://localhost:3000";
  //production
  //let _path_prefix = (window.location.hostname === "https://warrenshea.github.io/glitch") ? "" : "https://warrenshea.github.io/glitch";

  let issue_counter = 0;

  return {
    get_path_prefix: function() {
      return _path_prefix;
    },
    add_to_log: function (copy) {
      let copy_container = document.createElement("div");
      copy_container.innerHTML = copy;
      document.getElementById('glitch__log__details').appendChild(copy_container);
    },
    clear_log: function () {
      document.getElementById('glitch__log__details').innerHTML = "";
    },
    clear_page_highlights: function () {
      const self = this;
      self.remove("css",".glitch-highlight");
    },
    clear_css_modifications: function () {
      const self = this;
      self.remove("css",".glitch-css-modificiation");
    },
    clear_headings_identifier_from_innerhtml: function() {
      const self = this;
      let elms = document.body.querySelectorAll(`h1,h2,h3,h4,h5,h6`);
      for (var i = 0;i < elms.length; i++) {
        if (elms[i].innerHTML.substring(0,3) === `${elms[i].tagName}:`) {
          elms[i].innerHTML = elms[i].innerHTML.substring(3);
        }
      }
    },
    add_to_counter: function(increment) {
      const self = this;
      issue_counter += increment;
    },
    get_counter: function(increment) {
      const self = this;
      return issue_counter;
    },
    clear_counter: function() {
      const self = this;
      issue_counter = 0;
    },
    set_active: function(param) {
      document.getElementById("glitch__current-action").innerHTML = param.innerHTML;
    },
    remove: function(type, selector) {
      let elements_to_remove = document.querySelectorAll(selector);
      switch(type) {
        case "css":
          for (let i=0; i < elements_to_remove.length; i++){
            elements_to_remove[i].classList.remove(selector.substring(1));
          }
          break;
        case "element":
          elements_to_remove.forEach((element) => {
            element.remove();
          });
          break;
        default:
      }
    },
    reset: function () {
      const self = this;
      self.clear_log();
      self.clear_page_highlights();
      self.clear_css_modifications();
      self.clear_headings_identifier_from_innerhtml();
      self.clear_counter();
      self.remove("element","[data-id='glitch-id-element']");
    }
  };
});

glitch.module('ui', function () {
  let _glitch;
  return {
    initialize: function() {
      const self = this;
      self.include_css();
      self.initialize_ui();
      self.add_listeners();
    },
    include_css: function() {
      let cssExternalStyleLink = document.createElement("link");
      cssExternalStyleLink.rel = "stylesheet";
      cssExternalStyleLink.type = "text/css";
      cssExternalStyleLink.setAttribute("data-id", "bookmarklet-css");
      cssExternalStyleLink.href = `${glitch.core.get_path_prefix()}/app.css`;
      document.querySelector("head").appendChild(cssExternalStyleLink);
    },
    initialize_ui: function() {
      const self = this;
      _glitch = document.getElementById("glitch-container");

      let glitch_temp = document.createElement("div");
      glitch_temp.id = "glitch-container";
      let glitch_temp_content = `
        <div id="glitch__header" class="glitch__header">
          <span id="glitch__title">glitch: The Helper Bookmarklet</span>
          <div id="glitch__minimize" class="glitch__minimize" title="Minimize"></div>
          <div id="glitch__maximize" class="glitch__maximize glitch__hide" title="Maximize"></div>
          <div id="glitch__close" class="glitch__close" title="Close"></div>
        </div>
        <div id="glitch__body" class="glitch__body">
          <div id="glitch__module" class="glitch__module">
            <!--<button class="w:100%" onclick="glitch.core.reset();">Reset glitch</button><br>-->
            <div class="glitch__body-inner-container-tabs">
              <div class="tabs">
                <div class="tab">
                  <input type="radio" class="radio" id="glitch_tab_id_1" name="glitch_tab" onclick="glitch.core.reset();" checked>
                  <label class="tab-label" for="glitch_tab_id_1"><span style="padding-top:1px">Page Check</span></label>
                  <div class="tab-content" id="glitch__module_page_check"></div>
                </div>
                <div class="tab">
                  <input type="radio" class="radio" id="glitch_tab_id_2" name="glitch_tab" onclick="glitch.core.reset();">
                  <label class="tab-label" for="glitch_tab_id_2"><span style="padding-top:1px">Tests</span></label>
                  <div class="tab-content" id="glitch__module_tests"></div>
                </div>
                <div class="tab">
                  <input type="radio" class="radio" id="glitch_tab_id_3" name="glitch_tab" onclick="glitch.core.reset();">
                  <label class="tab-label" for="glitch_tab_id_3"><span style="padding-top:1px">Review</span></label>
                  <div class="tab-content" id="glitch__module_review"></div>
                </div>
                <div class="tab">
                  <input type="radio" class="radio" id="glitch_tab_id_4" name="glitch_tab" onclick="glitch.core.reset();">
                  <label class="tab-label" for="glitch_tab_id_4"><span style="padding-top:1px">Go to: Multiple URLs</span></label>
                  <div class="tab-content" id="glitch__module_go_to_bulk"></div>
                </div>
                <div class="tab">
                  <input type="radio" class="radio" id="glitch_tab_id_5" name="glitch_tab" onclick="glitch.core.reset();">
                  <label class="tab-label" for="glitch_tab_id_5"><span style="padding-top:1px">Reference: Accessibility</span></label>
                  <div class="tab-content" id="glitch__module_accessibility"></div>
                </div>
                <div class="tab">
                  <input type="radio" class="radio" id="glitch_tab_id_6" name="glitch_tab" onclick="glitch.core.reset();">
                  <label class="tab-label" for="glitch_tab_id_6"><span style="padding-top:1px">Reference: Copy Reference</span></label>
                  <div class="tab-content" id="glitch__module_copy_reference"></div>
                </div>
              </div>
            </div>
          </div>
<!--          <div class="glitch__body-inner-container" id="glitch__description">
            <h2 class="glitch__h2">Description</h2>
            <div id="glitch__description__details" class="glitch__description__details">

            </div>
          </div>-->
          <div class="glitch__body-inner-container" id="glitch__log">
            <!--<h2 class="glitch__h2">Log</h2>-->
            <div id="glitch__log__details" class="glitch__log__details overflow-x:scroll">

            </div>
          </div>
        </div>`;
      glitch_temp.innerHTML = glitch_temp_content;

      if (_glitch) {
        //if the container exists, replace it
        glitch_temp.style.left = _glitch.style.left;
        glitch_temp.style.top = _glitch.style.top;
        document.body.replaceChild(glitch_temp, _glitch);
      } else {
        //if the container doesn't exist, add a new one
        document.body.appendChild(glitch_temp);
      }
    },
    add_listeners: function() {
      const self = this;
      let isReadyToMove = false,
        xLocation = 0,
        yLocation = 0;
      _glitch = document.getElementById("glitch-container");

      const _close = function() {
        if (_glitch) {
          glitch.core.reset();
          _remove_references();
          _glitch.remove();
        }
      }

      const _maximize = function() {
        if (_glitch) {
          document.getElementById("glitch__minimize").classList.remove("glitch__hide");
          document.getElementById("glitch__maximize").classList.add("glitch__hide");
          document.getElementById("glitch__body").classList.remove("glitch__hide");
          document.getElementById("glitch__title").innerHTML = "glitch: The Helper Bookmarklet";
          document.getElementById("glitch-container").classList.remove("glitch__short");
          _glitch.style.left = _glitch.offsetLeft - 330 + "px";
        }
      }

      const _minimize = function() {
        if (_glitch) {
          document.getElementById("glitch__minimize").classList.add("glitch__hide");
          document.getElementById("glitch__maximize").classList.remove("glitch__hide");
          document.getElementById("glitch__body").classList.add("glitch__hide");
          document.getElementById("glitch__title").innerHTML = "glitch";
          _glitch.style.left = _glitch.offsetLeft + 330 + "px";
          document.getElementById("glitch-container").classList.add("glitch__short");
        }
      }

      const _remove_references = function() {
        glitch.core.remove("element","[data-id='glitch'], [data-id='bookmarklet-css'], [data-id='html-validation']");
      }

      document.getElementById("glitch__header").onmousedown = function(windowEvent) {
        windowEvent = windowEvent || window.event;
        isReadyToMove = true;
        xLocation = windowEvent.clientX;
        yLocation = windowEvent.clientY;
        return false
      };

      document.onmousemove = function(windowEvent) {
        windowEvent = windowEvent || window.event;
        if (isReadyToMove === true) {
          let glitchOffSetTop = _glitch.offsetTop,
            glitchOffSetLeft = _glitch.offsetLeft;
          if (yLocation < windowEvent.clientY) {
            glitchOffSetTop += windowEvent.clientY - yLocation;
            _glitch.style.top = (glitchOffSetTop < 10) ? "10px" : glitchOffSetTop + "px";
          } else if (yLocation > windowEvent.clientY) {
            glitchOffSetTop -= yLocation - windowEvent.clientY;
            _glitch.style.top = (glitchOffSetTop < 10) ? "10px" : glitchOffSetTop + "px";
          }

          if (xLocation < windowEvent.clientX) {
            glitchOffSetLeft += windowEvent.clientX - xLocation;
            _glitch.style.left = glitchOffSetLeft + "px";
          } else if (xLocation > windowEvent.clientX) {
            glitchOffSetLeft -= xLocation - windowEvent.clientX;
            _glitch.style.left = glitchOffSetLeft + "px";
          }
          xLocation = windowEvent.clientX;
          yLocation = windowEvent.clientY;
        }
      };

      document.onmouseup = function() {
        isReadyToMove = false
      };

      document.getElementById("glitch__close").onmousedown = function() {
        _close();
      }

      document.getElementById("glitch__maximize").onmousedown = function() {
        _maximize();
      }

      document.getElementById("glitch__minimize").onmousedown = function() {
        _minimize();
      }
    }
  };
});

glitch.module('modules', function () {
  return {
    initialize: function() {
      const self = this;
      self.add_external(`${glitch.core.get_path_prefix()}/page-check.js`, "glitch", function() { glitch.page_check.force_initialize() });
      self.add_external(`${glitch.core.get_path_prefix()}/tests.js`, "glitch", function() { glitch.tests.force_initialize() });
      self.add_external(`${glitch.core.get_path_prefix()}/go-to-bulk.js`, "glitch", function() { glitch.go_to_bulk.force_initialize() });
      self.add_external(`${glitch.core.get_path_prefix()}/review.js`, "glitch", function() { glitch.review.force_initialize() });
      self.add_external(`${glitch.core.get_path_prefix()}/accessibility.js`, "glitch", function() { glitch.accessibility.force_initialize() });
      self.add_external(`${glitch.core.get_path_prefix()}/copy-reference.js`, "glitch", function() { glitch.copy_reference.force_initialize() });
    },
    add_external: function(url, data_id, callback) {
      let script = document.createElement('script');
      script.setAttribute("data-id", data_id);
      script.onload = function() {
        script.onload = null;
        script.onreadystatechange = null;
        callback.call(this);
      };
      script.onreadystatechange = function() {
        if (/^(complete|loaded)$/.test(this.readyState) === true) {
          script.onreadystatechange = null;
          script.onload();
        }
      };
      script.src = url;
      if (document.head) { document.head.appendChild(script); } else { document.getElementsByTagName('head')[0].appendChild(script); }
    },
    initialize_ui: function(id,heading,content) {
      let module_ui = document.createElement("div");
      module_ui.className = "glitch__body-inner-container overflow-x:scroll";
      module_ui.id = id;
      let module_ui_content = `
        ${content}`;
      module_ui.innerHTML = module_ui_content;
      document.getElementById(`glitch__module_${id}`).innerHTML = module_ui.innerHTML;
    }
  };
});

// glitch.module('restore_console_log', function() {
//   return {
//     initialize: function() {
//       const self = this;
//       setTimeout(function(){
//         if (glitch.page_check.return_codebase() === "Bessa") {
//           console.warn("test");
//           delete console.log;
//           console.log;
//         }
//       }, 3000);
//     }
//   }
// });