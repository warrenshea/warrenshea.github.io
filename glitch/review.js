glitch.module('review', function () {

  function html_entities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return {
    force_initialize: function() {
      let id = "review";
      let heading = `Review`;
      let content =  `
        <div style="display:flex;width:100%">
          <div style="width:50%">
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.grida_1200px();">Grid (Design Language)</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.gridb_1200px();">Grid (Contentful)</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.design();">Design Box Model</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.tab_order();">Tab order</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.aria_label();">ARIA-LABEL</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.links();">A HREF</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.img_alt_tags();">IMG ALT tags</button><br>
          </div>
          <div style="width:50%">
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.bg_1280px();">Background 1280px</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.bg_1200px();">Background 1200px</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.bg_hundred();">Background 100%</button><br>
            <button style="margin-top:8px;" onclick="function fnStartDesign(sUrl) {var nScript = document.createElement('script');nScript.setAttribute('language','JavaScript');nScript.setAttribute('src',sUrl);document.body.appendChild(nScript);}fnStartDesign('https://www.sprymedia.co.uk/design/design/media/js/design-loader.js');">Ruler</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.headings();">Headings</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.show_for_sr();">.show-for-sr</button><br>
            <button style="margin-top:8px;" onclick="glitch.core.reset();glitch.review.all_ids();">IDs</button><br>
          </div>
        </div>
        <br><button class="w:100%" onclick="glitch.core.reset();">Reset glitch</button>`;
      glitch.modules.initialize_ui(id,heading,content);
    },
    grida_1200px : function() {
      let module_ui = document.createElement("style");
      let id = "glitch_review_grida_1200px";
      module_ui.type = 'text/css';
      module_ui.id = id;
      module_ui.setAttribute("data-id","glitch-id-element");

      let module_ui_content = `
body.glitch-css-modificiation {
  position: relative;
}
.glitch-grida-1200px {
  position:absolute;
  z-index:100000;
  left:0;
  right:0;
  margin:0 auto;
  max-width:1200px;
  height:100%;
}
.glitch-grid-a-column {
  position:absolute;top:0;width:0;border:1px solid #ff7777;opacity:.5;height:100%;display:inline-block;margin:0;
}
`
      module_ui.appendChild(document.createTextNode(module_ui_content));
      document.getElementsByTagName("head")[0].appendChild(module_ui);

      let idDiv = document.createElement("div");
      idDiv.setAttribute("data-id", "glitch-id-element");
      idDiv.classList.add("glitch-grida-1200px");

let module_grid_content = `
<hr class="glitch-grid-a-column" style="left:calc(0/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(1/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(2/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(3/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(4/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(5/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(6/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(7/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(8/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(9/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(10/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(11/12 * 100%);">
<hr class="glitch-grid-a-column" style="left:calc(12/12 * 100%);">
`;
      idDiv.innerHTML = module_grid_content;
      document.body.prepend(idDiv);

      document.querySelector("body").classList.add("glitch-css-modificiation");
    },
    gridb_1200px : function() {
      let module_ui = document.createElement("style");
      let id = "glitch_review_gridb_1200px";
      module_ui.type = 'text/css';
      module_ui.id = id;
      module_ui.setAttribute("data-id","glitch-id-element");

      let module_ui_content = `
body.glitch-css-modificiation {
  position: relative;
}
.glitch-gridb-1200px {
  column-gap: 16px;
  display:flex;
  position:absolute;
  z-index:100000;
  left:0;
  right:0;
  margin:0 auto;
  max-width:1200px;
  height:100%;
  padding-left:24px;
  padding-right:24px;
}
@media screen and (min-width: 768px) {
  .glitch-gridb-1200px {
    column-gap: 24px;
    padding-left:32px;
    padding-right:32px;
  }
}
@media screen and (min-width: 1024px) {
  .glitch-gridb-1200px {
    column-gap: 24px;
    padding-left:0;
    padding-right:0;
  }
}
@media screen and (min-width: 1280px) {
  .glitch-gridb-1200px {
    column-gap: 32px;
  }
}
.glitch-gridb-1200px > div {
  width: 100%;
}
.glitch-grid-b-column {
  height:100%;
  background-color:#ff7777;opacity:.25;
}
.glitch-grid-b-column.glitch-first-four {
  display:block;
}
.glitch-grid-b-column.glitch-next-eight {
  display:none;
}

@media screen and (min-width: 768px) {
  .glitch-grid-b-column.glitch-next-eight {
    display:block;
  }
}
`
      module_ui.appendChild(document.createTextNode(module_ui_content));
      document.getElementsByTagName("head")[0].appendChild(module_ui);

      let idDiv = document.createElement("div");
      idDiv.setAttribute("data-id", "glitch-id-element");
      idDiv.classList.add("glitch-gridb-1200px");

let module_grid_content = `
<div class="glitch-grid-b-column glitch-first-four"></div>
<div class="glitch-grid-b-column glitch-first-four"></div>
<div class="glitch-grid-b-column glitch-first-four"></div>
<div class="glitch-grid-b-column glitch-first-four"></div>
<div class="glitch-grid-b-column glitch-next-eight"></div>
<div class="glitch-grid-b-column glitch-next-eight"></div>
<div class="glitch-grid-b-column glitch-next-eight"></div>
<div class="glitch-grid-b-column glitch-next-eight"></div>
<div class="glitch-grid-b-column glitch-next-eight"></div>
<div class="glitch-grid-b-column glitch-next-eight"></div>
<div class="glitch-grid-b-column glitch-next-eight"></div>
<div class="glitch-grid-b-column glitch-next-eight"></div>
`;
      idDiv.innerHTML = module_grid_content;
      document.body.prepend(idDiv);

      document.querySelector("body").classList.add("glitch-css-modificiation");
    },
    bg_hundred : function() {
      let module_ui = document.createElement("style");
      let id = "glitch_review_bg_hundred";
      module_ui.type = 'text/css';
      module_ui.id = id;
      module_ui.setAttribute("data-id","glitch-id-element");

      let module_ui_content = `
body.glitch-css-modificiation {
  position: relative;
}
.glitch-bgc-one-hundred {
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0' xmlns='http://www.w3.org/2000/svg' style='width:100px; height: 40px;'%3E%3Ctext x='0' y='40' style='font-family:Arial;font-size:40px;font-weight:bold;fill:%23ddffdd;'%3E100%%3C/text%3E%3C/svg%3E");
  background-size:120px 50px;
  background-repeat: repeat;
  background-color: transparent;
  opacity:.75;
  z-index:100000;
  top:0;
  left:0;
  position: absolute;
  width:100%;
  height:100%;
}`
      module_ui.appendChild(document.createTextNode(module_ui_content));
      document.getElementsByTagName("head")[0].appendChild(module_ui);

      let idDiv = document.createElement("div");
      idDiv.setAttribute("data-id", "glitch-id-element");
      idDiv.classList.add("glitch-bgc-one-hundred");

      document.body.prepend(idDiv);

      document.querySelector("body").classList.add("glitch-css-modificiation");
    },
    bg_1280px : function() {
      let module_ui = document.createElement("style");
      let id = "glitch_review_bg_1280px";
      module_ui.type = 'text/css';
      module_ui.id = id;
      module_ui.setAttribute("data-id","glitch-id-element");

      let module_ui_content = `
body.glitch-css-modificiation {
  position: relative;
}
.glitch-bg-1280px {
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0' xmlns='http://www.w3.org/2000/svg' style='width:100px; height: 40px;'%3E%3Ctext x='0' y='40' style='font-family:Arial;font-size:24px;font-weight:bold;fill:%23ffdddd;'%3E1280px%3C/text%3E%3C/svg%3E");
  background-size:120px 50px;
  background-repeat: repeat;
  background-color: transparent;
  opacity:.75;
  z-index:100000;
  top:0;
  left:0;
  right:0;
  height:100%;
  margin-left: auto;
  margin-right: auto;
  float: none;
  clear: both;
  position: absolute;
  max-width: 1280px;
  border-right: 0.0625rem #929ba9 solid;
  border-left: 0.0625rem #929ba9 solid;
}`
      module_ui.appendChild(document.createTextNode(module_ui_content));
      document.getElementsByTagName("head")[0].appendChild(module_ui);

      let idDiv = document.createElement("div");
      idDiv.setAttribute("data-id", "glitch-id-element");
      idDiv.classList.add("glitch-bg-1280px");
      document.body.prepend(idDiv);

      document.querySelector("body").classList.add("glitch-css-modificiation");
    },
    bg_1200px : function() {
      let module_ui = document.createElement("style");
      let id = "glitch_review_bg_1200px";
      module_ui.type = 'text/css';
      module_ui.id = id;
      module_ui.setAttribute("data-id","glitch-id-element");

      let module_ui_content = `
body.glitch-css-modificiation {
  position: relative;
}
.glitch-bg-1200px {
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0' xmlns='http://www.w3.org/2000/svg' style='width:100px; height: 40px;'%3E%3Ctext x='0' y='40' style='font-family:Arial;font-size:24px;font-weight:bold;fill:%23ddddff;'%3E1200px%3C/text%3E%3C/svg%3E");
  background-size:120px 50px;
  background-repeat: repeat;
  background-color: transparent;
  opacity:.75;
  z-index:100000;
  top:0;
  left:0;
  right:0;
  height:100%;
  margin-left: auto;
  margin-right: auto;
  float: none;
  clear: both;
  position: absolute;
  max-width: 1200px;
  border-right: 0.0625rem #929ba9 solid;
  border-left: 0.0625rem #929ba9 solid;
}`
      module_ui.appendChild(document.createTextNode(module_ui_content));
      document.getElementsByTagName("head")[0].appendChild(module_ui);

      let idDiv = document.createElement("div");
      idDiv.setAttribute("data-id", "glitch-id-element");
      idDiv.classList.add("glitch-bg-1200px");
      document.body.prepend(idDiv);

      document.querySelector("body").classList.add("glitch-css-modificiation");
    },
    design : function() {
      let module_ui = document.createElement("style");
      let id = "glitch_one_hundred_width";
      module_ui.type = 'text/css';
      module_ui.id = id;
      module_ui.setAttribute("data-id","glitch-id-element");

      let module_ui_content = `
* { background-color: rgba(255,0,0,.2); }
* * { background-color: rgba(0,255,0,.2); }
* * * { background-color: rgba(0,0,255,.2); }
* * * * { background-color: rgba(255,0,255,.2); }
* * * * * { background-color: rgba(0,255,255,.2); }
* * * * * * { background-color: rgba(255,255,0,.2); }
* * * * * * * { background-color: rgba(255,0,0,.2); }
* * * * * * * * { background-color: rgba(0,255,0,.2); }
* * * * * * * * * { background-color: rgba(0,0,255,.2); }`;
      //module_ui.innerHTML = module_ui_content;

      module_ui.appendChild(document.createTextNode(module_ui_content));
      document.getElementsByTagName("head")[0].appendChild(module_ui);

    },
    tab_order : function() {

      function getKeyboardFocusableElements (element = document) {
        return [...element.querySelectorAll(
          'a[href]:not([disabled],#glitch-container a[href]), button:not([disabled],#glitch-container button), input:not([disabled],#glitch-container input), textarea:not([disabled],#glitch-container textarea), select:not([disabled],#glitch-container select), [tabindex]'
        )]
          .filter(el => el.offsetParent !== null)
          .filter(el => el.tabIndex >= 0)
      }

      let elms = getKeyboardFocusableElements();

      //document.body.querySelectorAll('a[href]:not([disabled],#glitch-container a[href]), button:not([disabled],#glitch-container button), textarea:not([disabled],#glitch-container textarea), input[type="text"]:not([disabled],#glitch-container input[type="text"]), input[type="radio"]:not([disabled],#glitch-container input[type="radio"]), input[type="checkbox"]:not([disabled],#glitch-container input[type="checkbox"]), select:not([disabled],#glitch-container select), li[role="tab"]:not([disabled],#glitch-container li[role="tab"]), div[role="tabpanel"]:not([disabled],#glitch-container div[role="tabpanel"]), label:not(#glitch-container label)');

      for (var i = 0;i < elms.length; i++) {
//        elms[i].classList.add("glitch-highlight");
        let idDiv = document.createElement("div");
        idDiv.innerHTML = i.toString();
        idDiv.setAttribute("data-id", "glitch-id-element");
        idDiv.setAttribute("style", `
          background:black;
          color:white;
          padding:2px 5px !important;
          font-size:16px !important;
          line-height:1.5 !important;
          border-radius: 50%;
          position:absolute;top:${window.scrollY + elms[i].getBoundingClientRect().top - 16}px;
          left:${window.scrollX + elms[i].getBoundingClientRect().left - 26}px;
          text-transform:initial !important;
          z-index:100;`);
        document.body.prepend(idDiv);
      }
    },
    all_ids : function() {
      let elms = document.body.querySelectorAll('*[id]:not(body > *[id], header *[id], footer *[id], #glitch-container *[id])');
      let ids = [];
      for (var i = 0;i < elms.length; i++) {
        if (elms[i].offsetWidth > 0 && elms[i].offsetHeight > 0) { //remove any headings that are visually hidden (e.g. heading inside a modal)
          ids.push(elms[i].id);
          if (ids.length === 1) {
            glitch.core.add_to_log('<div class="log_heading"><span class="underline">ELEMENT WITH ID</span>:</div>');
            //console.log('ELEMENT WITH ID:');
          }
          glitch.core.add_to_log(elms[i].id);
          //console.log(elms[i].outerHTML);

          elms[i].classList.add("glitch-highlight");

          let idDiv = document.createElement("div");
          idDiv.innerHTML = elms[i].id.toString();
          idDiv.setAttribute("class", "glitch-highlight");
          idDiv.setAttribute("data-id", "glitch-id-element");
          idDiv.setAttribute("style", `
            background:black;color:white;
            font-size:16px !important;
            line-height:1.5 !important;
            position:absolute;top:${window.scrollY + elms[i].getBoundingClientRect().top - 32}px;
            left:${window.scrollX + elms[i].getBoundingClientRect().left}px;
            text-transform:initial !important;
            z-index:100;`);
          document.body.prepend(idDiv);
        }
      }
    },
    links : function() {
      let elms = document.body.querySelectorAll('a[href]:not(#glitch-container a[href])');
      let ahrefs = [];
      for (var i = 0;i < elms.length; i++) {
        if (elms[i].offsetWidth > 0 && elms[i].offsetHeight > 0) { //remove any headings that are visually hidden (e.g. heading inside a modal)
          ahrefs.push(elms[i].href);
          if (ahrefs.length === 1) {
            glitch.core.add_to_log('<div class="log_heading"><span class="underline">A HREF</span>:</div>');
            //console.log('ELEMENT WITH ID:');
          }
          glitch.core.add_to_log(elms[i].href);
          //console.log(elms[i].outerHTML);

          elms[i].classList.add("glitch-highlight");

          let idDiv = document.createElement("div");
          idDiv.innerHTML = elms[i].getAttribute("href").toString();
          idDiv.setAttribute("class", "glitch-highlight");
          idDiv.setAttribute("data-id", "glitch-id-element");
          idDiv.setAttribute("style", `
            background:black;color:white;
            font-size:16px !important;
            line-height:1.5 !important;
            position:absolute;top:${window.scrollY + elms[i].getBoundingClientRect().top - 32}px;
            left:${window.scrollX + elms[i].getBoundingClientRect().left}px;
            text-transform:initial !important;
            z-index:100;`);
          document.body.prepend(idDiv);
        }
      }
    },
    aria_label : function() {
      let elms = document.body.querySelectorAll('*[aria-label]:not(#glitch-container *[aria-label])');
      let ids = [];
      for (var i = 0;i < elms.length; i++) {
        if (elms[i].offsetWidth > 0 && elms[i].offsetHeight > 0) { //remove any headings that are visually hidden (e.g. heading inside a modal)
          ids.push(elms[i].id);
          if (ids.length === 1) {
            glitch.core.add_to_log('<div class="log_heading"><span class="underline">ELEMENT WITH ARIA-LABEL</span>:</div>');
            //console.log('ELEMENT WITH ID:');
          }
          glitch.core.add_to_log(elms[i].id);
          //console.log(elms[i].outerHTML);

          elms[i].classList.add("glitch-highlight");

          let idDiv = document.createElement("div");
          idDiv.innerHTML = elms[i].getAttribute("aria-label").toString();
          idDiv.setAttribute("class", "glitch-highlight");
          idDiv.setAttribute("data-id", "glitch-id-element");
          idDiv.setAttribute("style", `
            background:black;color:white;
            font-size:16px !important;
            line-height:1.5 !important;
            position:absolute;top:${window.scrollY + elms[i].getBoundingClientRect().top - 32}px;
            left:${window.scrollX + elms[i].getBoundingClientRect().left}px;
            text-transform:initial !important;
            z-index:100;`);
          document.body.prepend(idDiv);
        }
      }
    },
    show_for_sr : function() {
      let elms = document.body.querySelectorAll('.show-for-sr:not(#glitch-container .show-for-sr)');
      let ids = [];
      for (var i = 0;i < elms.length; i++) {
        if (elms[i].offsetWidth > 0 && elms[i].offsetHeight > 0) { //remove any headings that are visually hidden (e.g. heading inside a modal)
          ids.push(elms[i].id);
          if (ids.length === 1) {
            glitch.core.add_to_log('<div class="log_heading"><span class="underline">ELEMENT WITH SHOW-FOR-SR CLASS</span>:</div>');
            //console.log('ELEMENT WITH ID:');
          }
          glitch.core.add_to_log(elms[i].innerHTML);
          //console.log(elms[i].outerHTML);

          elms[i].classList.add("glitch-highlight");

          let idDiv = document.createElement("div");
          idDiv.innerHTML = elms[i].innerHTML.toString();
          idDiv.setAttribute("class", "glitch-highlight");
          idDiv.setAttribute("data-id", "glitch-id-element");
          idDiv.setAttribute("style", `
            background:black;color:white;
            font-size:16px !important;
            line-height:1.5 !important;
            position:absolute;top:${window.scrollY + elms[i].getBoundingClientRect().top - 32}px;
            left:${window.scrollX + elms[i].getBoundingClientRect().left}px;
            text-transform:initial !important;
            z-index:100;`);
          document.body.prepend(idDiv);
        }
      }
    },
    img_alt_tags : function() {

      function getKeyboardFocusableElements (element = document) {
        return [...element.querySelectorAll(
          'img[alt]:not(img[alt=""],#glitch-container img)'
        )]
          .filter(el => el.offsetParent !== null)
      }
      let elms = getKeyboardFocusableElements();
      let alt_tags = [];
      for (var i = 0;i < elms.length; i++) {
        alt_tags.push(elms[i].getAttribute("alt"));
        if (alt_tags.length === 1) {
          glitch.core.add_to_log('<div class="log_heading"><span class="underline">IMG WITH ALT</span>:</div>');
          //console.log('ELEMENT WITH ID:');
        }
        glitch.core.add_to_log(elms[i].getAttribute("alt"));
        //console.log(elms[i].outerHTML);

        elms[i].classList.add("glitch-highlight");

        let idDiv = document.createElement("div");
        idDiv.innerHTML = elms[i].getAttribute("alt").toString();
        idDiv.setAttribute("class", "glitch-highlight");
        idDiv.setAttribute("data-id", "glitch-id-element");
        idDiv.setAttribute("style", `
          background:black;color:white;
          font-size:16px !important;
          line-height:1.5 !important;
          position:absolute;top:${window.scrollY + elms[i].getBoundingClientRect().top - 42}px;
          left:${window.scrollX + elms[i].getBoundingClientRect().left - 10}px;
          text-transform:initial !important;
          z-index:100;`);
        document.body.prepend(idDiv);
      }
    },
    headings : function() {
      let elms = document.body.querySelectorAll(`
        h1:not(#glitch-container h1, header h1, footer h1),
        h2:not(#glitch-container h2, header h2, footer h2),
        h3:not(#glitch-container h3, header h3, footer h3),
        h4:not(#glitch-container h4, header h4, footer h4),
        h5:not(#glitch-container h5, header h5, footer h5),
        h6:not(#glitch-container h6, header h6, footer h6)`);
      let headings = [];
      for (var i = 0;i < elms.length; i++) {
        if (elms[i].offsetWidth <= 0 && elms[i].offsetHeight <= 0) { //remove any headings that are visually hidden (e.g. heading inside a modal)
        } else {
          headings.push(elms[i]);
        }
      }
      for (var i = 0;i < headings.length; i++) {
        // if (i === 0) {
        //   console.warn('glitch BOOKMARKLET > HTML VALIDATON > HEADINGS CHECK');
        //   console.warn('--------------------------------------------------');
        // }
        switch (headings[i].tagName) {
          case "H1":
            glitch.core.add_to_log(`${headings[i].tagName}: ${headings[i].textContent}`);
            break;
          case "H2":
            glitch.core.add_to_log(`&boxur;-&nbsp;${headings[i].tagName}: ${headings[i].textContent}`);
            break;
          case "H3":
            glitch.core.add_to_log(`&nbsp;&nbsp;&nbsp;&boxur;-&nbsp;${headings[i].tagName}: ${headings[i].textContent}`);
            break;
          case "H4":
            glitch.core.add_to_log(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&boxur;-&nbsp;${headings[i].tagName}: ${headings[i].textContent}`);
            break;
          case "H5":
            glitch.core.add_to_log(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&boxur;-&nbsp;${headings[i].tagName}: ${headings[i].textContent}`);
            break;
          case "H6":
            glitch.core.add_to_log(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&boxur;-&nbsp;${headings[i].tagName}: ${headings[i].textContent}`);
            break;
          default:
        }
        //console.log(`Heading ${headings[i].tagName}: ${headings[i].outerHTML}`);
        if (headings[i]) {
          headings[i].innerHTML = `${headings[i].tagName}:${headings[i].innerHTML}`;
          headings[i].classList.add("glitch-highlight");
        }
      }
    }
  };
});