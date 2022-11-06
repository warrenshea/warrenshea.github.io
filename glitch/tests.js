glitch.module('tests', function () {

  const commonAllCapsElements = [
    'FAQ', 'F A Q',
    'MD',
    'PDF', 'P D F',
    'RRSP', 'R R S P',
    'TFSA', 'T F S A'
  ];
  const commonSuperscriptElements = [
    '®†', '^®$', '®\\*',
    'TM', 'MD',
    'MD\\*', 'MD†',
    'MC'
  ];

  function html_entities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function checkA11yContent(element, regexExpression, errorRef) {
    const regex = RegExp(regexExpression, 'gi');
    const { errors } = errorRef;
    const ariaLabel = element.attributes['aria-label'];
    if (typeof ariaLabel !== 'undefined') {
      if (!regex.test(ariaLabel.value)) {
        errors[errors.length] = element;
        element.classList.add("glitch-highlight");
      }
    } else if (!regex.test(element.textContent)) {
      errors[errors.length] = element;
      element.classList.add("glitch-highlight");
    }
  }

  function printErrors(
    errors,
    consoleDescription,
    consoleDescriptionDetails,
    hasParentElement = true,
    hasTestPerformed = false,
  ) {
    let hasShownErrors = false;
    //console.log(errors);
    for (var i = 0;i < errors.length; i++) {
      if (i === 0) {
        glitch.core.add_to_log(`<div class="log_heading"><span class="underline">${consoleDescription}</span>:</div>&nbsp;&boxur;&gt;&nbsp;${consoleDescriptionDetails}<br>`);
        console.log(`${consoleDescription}:`);
      }
      if (typeof errors[i] === "object" && typeof errors[i].Problems !== "undefined") {
        if (typeof errors[i].Problems === "string") {
          if (typeof errors[i].Element === "string") {
            glitch.core.add_to_log(errors[i].Element);
            console.log(errors[i].Element);
          } else {
            glitch.core.add_to_log(html_entities(errors[i].Element.outerHTML));
            console.log(errors[i].Element);
          }
          hasShownErrors = true;
        } else if (errors[i].Problems.length > 0 && hasShownErrors === false ) {
          for (var j = 0;j < errors[i].Problems.length; j++) {
            glitch.core.add_to_log(errors[i].Problems[j]);
            console.log(errors[i].Problems[j]);
          }
          hasShownErrors = true;
        }
      } else {
        glitch.core.add_to_log(html_entities(errors[i].outerHTML));
        console.log(errors[i]);
        errors[i].classList.add("glitch-highlight");
      }
    }
  }

  return {
    force_initialize: function() {
      let self = this;
      let id = "tests";
      let heading = `Tests`;

      let content =  `
        <button style="margin-top:8px;" class="w:100%" onclick="glitch.core.reset();glitch.tests.all_tests();">Run all (30) tests</button>
        <button style="margin-top:2px;" class="w:100%" onclick="glitch.core.reset();">Reset glitch</button><br><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.empty_ids();">Empty IDs</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.duplicate_ids();">duplicate IDs</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.a_blank_has_a11y_copy();">&lt;a target=_blank&gt; has a11y copy</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.pdf_has_a11y_copy();">PDF link has a11y copy</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.links_all_caps_content();">a links with all caps content</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.iframes_for_title();">iframe has title</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.for_exactly_one_h1();">exactly one &lt;h1&gt;</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.tab_title_has_heading();">tab title has heading</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.list_elements_have_list_children();">list elements have list children</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.input_has_descriptive_label();">input have descriptive label</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.select_have_descriptive_label();">select have descriptive label</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.table_elements_have_table_children();">table elements have table children</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.table_is_not_display_flex();">table is not display:flex</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.sup_without_sr_copy();">&lt;sup&gt; has sr copy</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.svg_doesnt_have_title_attr();">&lt;svg&gt; doesn't have title attribute</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.a_button_doesnt_have_show_for_sr_class();">&lt;a/button&gt; doesn't have .show-for-sr</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.tables_first_tr_has_th();">table's first &lt;tr&gt; has &lt;th&gt;</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.table_has_proper_scope_attr();">table has proper scope attribute</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.required_input_has_aria_required();">required input has aria-required=true</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.phone_number_links_have_aria_label();">phone number links have aria-label</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.aria_current_attr_exists_in_nav();">if aria-current page attr exists in nav</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.aria_current_attr_exists();">if aria-current page attr exists</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.font_size_greater_14();">if font-size &gt; 14</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.bespoke_stickynav_link_ref_heading();">[Bespoke] Stickynav link refs heading</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.wem_stickynav_link_ref_heading();">[WEM] Stickynav link refs heading</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.canvas_has_alt_text_or_aria_hidden();">Canvas has alt or aria-hidden</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.a_button_aria_label_corret_a11y_copy();">&lt;a/button&gt; has a11y copy in aria-label</button><br>
        <button style="margin-top:6px;" onclick="glitch.core.reset();glitch.tests.video_player_proper_controllers();">video player has proper contollers</button>`;
      glitch.modules.initialize_ui(id,heading,content);
    },
    all_tests : function() {
      glitch.core.clear_counter();
      glitch.core.add_to_log(`<div class="log_heading"><span id="all_tests"></span> TOTAL ERRORS / ISSUES:</div>`);
      glitch.tests.empty_ids();
      glitch.tests.duplicate_ids();
      glitch.tests.a_blank_has_a11y_copy();
      glitch.tests.pdf_has_a11y_copy();
      glitch.tests.links_all_caps_content();
      glitch.tests.iframes_for_title();
      glitch.tests.for_exactly_one_h1();
      glitch.tests.tab_title_has_heading();
      glitch.tests.list_elements_have_list_children();
      glitch.tests.input_has_descriptive_label();
      glitch.tests.select_have_descriptive_label();
      glitch.tests.table_elements_have_table_children();
      glitch.tests.table_is_not_display_flex();
      glitch.tests.sup_without_sr_copy();
      glitch.tests.svg_doesnt_have_title_attr();
      glitch.tests.a_button_doesnt_have_show_for_sr_class();
      glitch.tests.tables_first_tr_has_th();
      glitch.tests.table_has_proper_scope_attr();
      glitch.tests.required_input_has_aria_required();
      glitch.tests.phone_number_links_have_aria_label();
      glitch.tests.aria_current_attr_exists_in_nav();
      glitch.tests.aria_current_attr_exists();
      glitch.tests.font_size_greater_14();
      glitch.tests.bespoke_stickynav_link_ref_heading();
      glitch.tests.wem_stickynav_link_ref_heading();
      glitch.tests.canvas_has_alt_text_or_aria_hidden();
      glitch.tests.a_button_aria_label_corret_a11y_copy();
      //glitch.tests.first_element_in_main_is_skipnav();
      glitch.tests.video_player_proper_controllers();
      document.getElementById('all_tests').innerHTML = glitch.core.get_counter();
    },
    empty_ids: function() {
      // Checking for duplicate IDs
      const errors = [];
      const ids = [];
      const allEl = document.body.querySelectorAll('*[id]:not(body > *[id],#glitch-container *[id]');
      for (let i = 0; i < allEl.length; i += 1) {
        if (allEl[i].id === '') {
          ids.push(allEl[i].id);
          errors[errors.length] = allEl[i];
        }
      }
      printErrors(
        errors,
        `<span id="empty_ids">[${errors.length} errors]</span>: empty_ids`,
        `List of elements with empty ids`,
      );
      glitch.core.add_to_counter(errors.length);
    },
    duplicate_ids: function() {
      // Checking for duplicate IDs
      const errors = [];
      const ids = [];
      const allEl = document.body.querySelectorAll('*[id]:not(body > *[id], header *[id], footer *[id], #glitch-container *[id])');
      for (let i = 0; i < allEl.length; i += 1) {
        if (
          allEl[i].id === '' ||
          ids.indexOf(allEl[i].id) === -1
        ) {
          ids.push(allEl[i].id);
        } else {
          errors[errors.length] = allEl[i];
        }
      }
      printErrors(
        errors,
        `<span id="duplicate_ids">[${errors.length} errors]</span>: duplicate_ids`,
        `List of elements with duplicate ids`,
      );
      glitch.core.add_to_counter(errors.length);
    },
    a_blank_has_a11y_copy: function() {
      // Checking links with target=_blank
      const errorRef = { errors: [] };
      const regexExpression = 'open|ouvrir|ouvre';
      const allEl = document.body.querySelectorAll(
        "a[target='_blank'], button[target='_blank']"
      );
      for (let i = 0; i < allEl.length; i += 1) {
        checkA11yContent(allEl[i], regexExpression, errorRef);
      }
      printErrors(
        errorRef.errors,
        `<span id="a_blank_has_a11y_copy">[${errorRef.errors.length} errors]</span>: a_blank_has_a11y_copy`,
        `List of &lt;a/button&gt; links with target=_blank where the a11y doesn't have "open","ouvrir", or "ouvre"`
      );
      glitch.core.add_to_counter(errorRef.errors.length);
    },
    pdf_has_a11y_copy: function() {
      // Checking links for PDF content
      const errorRef = { errors: [] };
      const regexExpression = 'pdf|p d f';
      const allEl = document.body.querySelectorAll(
        "a[href*='.pdf'], button[href*='.pdf']"
      );
      for (let i = 0; i < allEl.length; i += 1) {
        checkA11yContent(allEl[i], regexExpression, errorRef);
      }
      printErrors(
        errorRef.errors,
        `<span id="pdf_has_a11y_copy">[${errorRef.errors.length} errors]</span>: pdf_has_a11y_copy`,
        `List of .pdf links where the a11y doesn't have "pdf" or "p d f"`
      );
      glitch.core.add_to_counter(errorRef.errors.length);
    },
    links_all_caps_content: function() {
      // Checking links for all caps content
      const errors = [];
      const regex = RegExp('\\p{Lu}+', 'u');
      function allCapsRecursiveVerification(node) {
        if (node.toString() === '[object Text]') {
          const content = node.textContent;
          // Check for known common all caps elements to be skipped
          // We can add other relevant classes to fixtures/common_identifiers.js
          if (commonAllCapsElements.indexOf(content) < 0) {
            if (
              content.toUpperCase() === content &&
              regex.test(content)
            ) {
              errors[errors.length] = node.parentNode;
            }
          }
        }
        node = node.firstChild;
        while (node) {
          allCapsRecursiveVerification(node);
          node = node.nextSibling;
        }
      }
      const allEl = document.body.querySelectorAll('a:not(#glitch-container a), button:not(#glitch-container button)');
      for (let i = 0; i < allEl.length; i += 1) {
        const elAriaLabel = allEl[i].ariaLabel;
        const regexCond = RegExp('^\\d+$', 'u');
        // Verify if aria label is not for a phone number link
        if (typeof elAriaLabel !== 'undefined' && elAriaLabel !== null &&
          elAriaLabel !== '' && !regexCond.test(elAriaLabel.replace(/\s/g, ""))) {
          if (elAriaLabel.toUpperCase() === elAriaLabel) {
            errors[errors.length] = allEl[i];
          }
        } else {
          allCapsRecursiveVerification(allEl[i]);
        }
      }
      printErrors(
        errors,
        `<span id="links_all_caps_content">[${errors.length} errors]</span>: links_all_caps_content`,
        `List of &lt;a/button&gt; where text content has all capital content`
      );
      glitch.core.add_to_counter(errors.length);
    },
    iframes_for_title: function() {
      // Checking iframes for title
      const errors = [];
      const allEl = document.body.querySelectorAll('iframe');
      for (let i = 0; i < allEl.length; i += 1) {
        if (typeof allEl[i].attributes.title === 'undefined') {
          errors[errors.length] = allEl[i];
        }
      }
      printErrors(
        errors,
        `<span id="iframes_for_title">[${errors.length} errors]</span>: iframes_for_title`,
        `List of &lt;iframe&gt;s without title attribute`
      );
      glitch.core.add_to_counter(errors.length);
    },
    for_exactly_one_h1: function() {
      // Checking page for exactly one H1 element
      const errors = [];
      let hasParentElement = true;
      const allEl = document.body.querySelectorAll('h1');
      if (allEl.length !== 1) {
        if (allEl.length === 0) {
          errors[errors.length] = { 'Element': 'No H1 element found' };
          hasParentElement = false;
        } else {
          for (let i = 0; i < allEl.length; i += 1) {
            errors[errors.length] = allEl[i];
          }
        }
      }
      printErrors(
        errors,
        `<span id="for_exactly_one_h1">[${errors.length} errors]</span>: for_exactly_one_h1`,
        `Check to ensure page only has 1 &lt;h1&gt; tag`,
        hasParentElement
      );
      glitch.core.add_to_counter(errors.length);
    },
    tab_title_has_heading: function() {
      // Checking tab title has heading
      const errors = [];
      const allEl = document.body.querySelectorAll('ul[role=tablist] li > button');
      for (let i = 0; i < allEl.length; i += 1) {
        if (
          allEl[i].getElementsByTagName('h2').length +
          allEl[i].getElementsByTagName('h3').length +
          allEl[i].getElementsByTagName('h4').length +
          allEl[i].getElementsByTagName('h5').length ===
          0
        ) {
          errors[errors.length] = allEl[i];
        }
      }
      printErrors(
        errors,
        `<span id="tab_title_has_heading">[${errors.length} errors]</span>: tab_title_has_heading`,
        `List of ul[role=tablist] li &gt; button that doesn't have &lt;h#&gt; headings inside`,
      );
      glitch.core.add_to_counter(errors.length);
    },
    list_elements_have_list_children: function() {
      // List elements have list children
      const errors = [];
      const allEl = document.body.querySelectorAll('ul, ol');
      for (let i = 0; i < allEl.length; i += 1) {
        for (let j = 0; j < allEl[i].children.length; j += 1) {
          if (allEl[i].children[j].nodeName !== 'LI') {
            errors[errors.length] = allEl[i].children[j];
          }
        }
      }
      printErrors(
        errors,
        `<span id="list_elements_have_list_children">[${errors.length} errors]</span>: list_elements_have_list_children`,
        `List of elements inside &lt;ul&gt;/&lt;ol&gt; that are not &lt;li&gt;`,
      );
      glitch.core.add_to_counter(errors.length);
    },
    input_has_descriptive_label: function() {
      // Input field has descriptive label
      const errors = [];
      const allEl = document.body.querySelectorAll('input:not(#glitch-container input)');
      for (let i = 0; i < allEl.length; i += 1) {
        if (allEl[i].type !== 'hidden') {
          if (allEl[i].hasAttribute('id')) {
            if (
              !document.body.querySelectorAll(`label[for=${allEl[i].id}]`)
                .length
            ) {
              errors[errors.length] = allEl[i];
            }
          }
        }
      }
      printErrors(
        errors,
        `<span id="input_has_descriptive_label">[${errors.length} errors]</span>: input_has_descriptive_label`,
        `List of &lt;input&gt;s that do not have labels`
      );
      glitch.core.add_to_counter(errors.length);
    },
    select_have_descriptive_label: function() {
      // Checks all select fields for descriptive label
      const errors = [];
      const allEl = document.body.querySelectorAll('select');

      for (let i = 0; i < allEl.length; i += 1) {
        const selectId = allEl[i].id;
        const selectAriaLabelledBy = allEl[i].getAttribute('aria-labelledby');

        if (selectId && document.body.querySelectorAll(`label[for=${selectId}]`).selector) {
          break;
        }

        cy.get(allEl[i]).siblings('label').then($nextElem => {
          const labelId = $nextElem[0].id;
          const labelFor = $nextElem[0].getAttribute('for');
          if (selectId && labelFor) {
            if (!labelFor.includes(selectId)) {
              errors[errors.length] = allEl[i];
            }
          } else if (selectAriaLabelledBy && labelId) {
            if (!selectAriaLabelledBy.includes(labelId)) {
              errors[errors.length] = allEl[i];
            }
          }
        })
      }
      printErrors(
        errors,
        `<span id="select_have_descriptive_label">[${errors.length} errors]</span>: select_have_descriptive_label`,
        `List of &lt;select&gt;s that do not have labels`
      );
      glitch.core.add_to_counter(errors.length);
    },
    // ==============
    // === Tables ===
    // ==============
    table_elements_have_table_children: function() {
      // Checking tables for appropriate structural elements (caption, thead,  tbody)
      const errors = [];
      const allEl = document.body.querySelectorAll('table:not(#glitch-container table)');
      for (
        let tableEl = 0;
        tableEl < allEl.length;
        tableEl += 1
      ) {
        const tableErrors = [];
        const { children } = allEl[tableEl];
        if (typeof children !== 'undefined') {
          let theadChild = 0;
          let tbodyChild = 0;
          let captionChild = 0;
          let otherTableChild = 0;
          for (
            let tableChd = 0;
            tableChd < children.length;
            tableChd += 1
          ) {
            if (
              /thead/i.test(children[tableChd].nodeName)
            ) {
              theadChild += 1;
            } else if (
              /tbody/i.test(children[tableChd].nodeName)
            ) {
              tbodyChild += 1;
            } else if (
              /caption/i.test(children[tableChd].nodeName)
            ) {
              captionChild += 1;
            } else if (
              !/col|tr|colgroup|tfoot/i.test(
                children[tableChd].nodeName
              )
            ) {
              otherTableChild += 1;
            }
          }
          if (!/caption/i.test(children[0].nodeName)) {
            tableErrors[tableErrors.length] =
              'Caption is not the first table child';
          }
          if (captionChild > 1) {
            tableErrors[tableErrors.length] =
              'Table contains more than one caption';
          }
          if (theadChild === 0) {
            tableErrors[tableErrors.length] =
              'Table does not contain thead';
          } else if (theadChild > 1) {
            tableErrors[tableErrors.length] =
              'Table contains more than one thead';
          }
          if (tbodyChild === 0) {
            tableErrors[tableErrors.length] =
              'Table does not contain tbody';
          }
          if (otherTableChild !== 0) {
            tableErrors[tableErrors.length] =
              'Non-table elements detected in table';
          }
          if (tableErrors.length !== 0) {
            errors.push({
              Problems: tableErrors,
              Element: allEl[tableEl]
            });
          }
        } else {
          errors.push({
            Problems: 'Empty table',
            Element: allEl[tableEl]
          });
        }
      }
      printErrors(
        errors,
        `<span id="table_elements_have_table_children">[${errors.length} errors]</span>: table_elements_have_table_children`,
        `List of &lt;table&gt; elements have proper &lt;table&gt; children`
      );
      glitch.core.add_to_counter(errors.length);
    },
    table_is_not_display_flex: function() {
      // Checks that tables aren\'t using display flex styling
      const errors = [];
      const allTables = document.body.querySelectorAll('table');

      for (let tableEl = 0; tableEl < allTables.length; tableEl += 1) {
        if (getComputedStyle(allTables[tableEl]).display === 'flex') {
          errors.push({
            Problems: 'Table using flex styling',
            Element: allTables[tableEl]
          });
        }
      }
      printErrors(
        errors,
        `<span id="table_is_not_display_flex">[${errors.length} errors]</span>: table_is_not_display:flex`,
        `List of &lt;table&gt; elements that have display:flex styling`
      );
      glitch.core.add_to_counter(errors.length);
    },
    sup_without_sr_copy: function() {
      // Checking superscript elements with links and buttons for screen reader copy
      const errors = [];
      const allEl = document.body.querySelectorAll('sup');
      const regexSup = new RegExp(commonSuperscriptElements.join("|"), "i");
      // Check for known common superscript elements to be skipped
      // We can add other relevant classes to fixtures/common_identifiers.js
      const filteredSuperscriptElements = [...allEl].filter(
        (el) => { return !regexSup.test(el.outerText); }
      );
      //console.log(filteredSuperscriptElements);
      if (filteredSuperscriptElements.length > 0) {
        // List of all superscript elements
        // console.log("List of all superscript elements", filteredSuperscriptElements)
        for (let i = 0; i < filteredSuperscriptElements.length; i += 1) {
          // Checking links and buttons for aria label which contains the sup element
          if (
            filteredSuperscriptElements[i].parentElement.tagName === 'A' ||
            filteredSuperscriptElements[i].parentElement.tagName === 'BUTTON'
          ) {
            const ariaLabel = filteredSuperscriptElements[i].parentElement.attributes['aria-label'];
            if (
              typeof ariaLabel === 'undefined' ||
              ariaLabel.value === ''
            ) {
              errors[errors.length] = filteredSuperscriptElements[i];
            }
          } else if (
            filteredSuperscriptElements[i].parentElement.tagName === 'SPAN' &&
            (filteredSuperscriptElements[i].parentElement.parentElement
              .tagName === 'A' ||
              filteredSuperscriptElements[i].parentElement.parentElement
                .tagName === 'BUTTON')
          ) {
            const ariaLabel =
              filteredSuperscriptElements[i].parentElement.parentElement
                .attributes['aria-label'];
            if (
              typeof ariaLabel === 'undefined' ||
              ariaLabel.value === ''
            ) {
              errors[errors.length] = filteredSuperscriptElements[i];
            }
          } else if (filteredSuperscriptElements[i].getElementsByTagName('a')[i]) {
            // Checking links within the superscript element for aria label
            const ariaLabel = filteredSuperscriptElements[i].getElementsByTagName('a')[i].attributes['aria-label'];
            if (
              typeof ariaLabel === 'undefined' ||
              ariaLabel.value === ''
            ) {
              errors[errors.length] = filteredSuperscriptElements[i];
            }
          } else if (
            filteredSuperscriptElements[i].getElementsByTagName('button')[i]
          ) {
            // Checking buttons within the superscript element for aria label
            const ariaLabel = filteredSuperscriptElements[i].getElementsByTagName(
              'button'
            )[i].attributes['aria-label'];
            if (
              typeof ariaLabel === 'undefined' ||
              ariaLabel.value === ''
            ) {
              errors[errors.length] = filteredSuperscriptElements[i];
            }
          } else if (
            filteredSuperscriptElements[i].children &&
            filteredSuperscriptElements[i].children.length
          ) {
            // Checking superscript elements with span for show-for-sr content
            if (
              filteredSuperscriptElements[i].children[0].tagName === 'SPAN' &&
              filteredSuperscriptElements[i].children[0].className ===
              'show-for-sr'
            ) {
              const showSrContent =
                filteredSuperscriptElements[i].children[0].textContent;
              if (
                typeof showSrContent === 'undefined' ||
                showSrContent.value === ''
              ) {
                errors[errors.length] = filteredSuperscriptElements[i];
              }
            }
          } else {
            // Superscript elements without screen reader copy
            errors[errors.length] = filteredSuperscriptElements[i];
          }
        }
      }
      printErrors(
        errors,
        `<span id="sup_without_sr_copy">[${errors.length} errors]</span>: sup_without_sr_copy`,
        `List of &lt;sup&gt; elements without proper screen reader copy`
      );
      glitch.core.add_to_counter(errors.length);
    },

    svg_doesnt_have_title_attr: function() {
      // Checking SVG elements do not have title attribute or property
      const errors = [];
      const allSVGElements = document.body.querySelectorAll('svg');
      for (let i = 0; i < allSVGElements.length; i += 1) {
        const svgChildren = allSVGElements[i].children;
        for (let j = 0; j < svgChildren.length; j += 1) {
          if (
            svgChildren[j].nodeName === 'title' ||
            allSVGElements[i].hasAttribute('title')
          ) {
            console.log(
              'SVG has a title child or attribute: ',
              allSVGElements[i]
            );
            errors[errors.length] = allSVGElements[i];
          }
        }
      }
      printErrors(
        errors,
        `<span id="svg_doesnt_have_title_attr">[${errors.length} errors]</span>: svg_doesnt_have_title_attr`,
        `List of &lt;svg&gt; elements without table attributes`
      );
      glitch.core.add_to_counter(errors.length);
    },
    a_button_doesnt_have_show_for_sr_class: function() {
      // Checks that anchors/buttons do not have the show-for-sr class
      const errors = [];
      const allEl = document.body.querySelectorAll('a, button');

      for (let i = 0; i < allEl.length; i += 1) {
        const allElChildren = allEl[i].children;
        for (let j = 0; j < allElChildren.length; j += 1) {
          // SVG classes are objects consisting of animVal and baseVal
          if (typeof allElChildren[j].className === "string"
            && allElChildren[j].className.split(" ").indexOf("show-for-sr") >= 0) {
            errors[errors.length] = allElChildren[j]
          }
        }
        if (allEl[i].getAttribute("class")
          && allEl[i].className.split(" ").indexOf("show-for-sr") >= 0) {
          errors[errors.length] = allEl[i]
        }
      }
      printErrors(
        errors,
        `<span id="a_button_doesnt_have_show_for_sr_class">[${errors.length} errors]</span>: a_button_doesnt_have_show_for_sr_class`,
        `List of &lt;a&gt;/&lt;button&gt; elements without .show-for-sr class on children`
      );
      glitch.core.add_to_counter(errors.length);
    },
    tables_first_tr_has_th: function() {
      // Checks that every table appropriate th elements for table header
      // check that the first <tr> row contains <th> elements
      const errors = [];
      const tableElements = document.body.querySelectorAll("table");
      for (let i = 0; i < tableElements.length; i += 1) {
        const tableChildren = tableElements[i].children;
        for (let j = 0; j < tableChildren.length; j += 1) {
          if (tableChildren[j].nodeName === "THEAD") {
            // <th> elements should exist in thead
            const tableHeadChildren = tableChildren[j].children[0].children;
            for (let k = 0; k < tableHeadChildren.length; k += 1) {
              if (tableHeadChildren[k].nodeName !== "TH") {
                errors[errors.length] = tableHeadChildren[k]
              }
            }
          }
          if (tableChildren[j].nodeName === "TBODY") {
            // <th> elements should NOT exist in tbody
            const tableHeadChildren = tableChildren[j].children[0].children;
            for (let k = 0; k < tableHeadChildren.length; k += 1) {
              let parent = tableHeadChildren[k].parentNode;
              // check if the TH table child is not wrapped in a TR element
              if (tableHeadChildren[k].nodeName === "TH" && parent.nodeName !== "TR") {
                errors[errors.length] = tableHeadChildren[k]
              }
            }
          }
        }
      }
      printErrors(
        errors,
        `<span id="tables_first_tr_has_th">[${errors.length} errors]</span>: tables_first_tr_has_th`,
        `List of &lt;table&gt; elements where first &lt;tr&gt; doesn't have &lt;th&gt;`
      );
      glitch.core.add_to_counter(errors.length);
    },
    table_has_proper_scope_attr: function() {
      // Checks that table has appropriate scope attribute for corresponding row or column
      // Check that all th elements have a scope attribute.
      // Check that all scope attributes have the value row, col, rowgroup, or colgroup.
      // Reference: https://www.w3.org/TR/WCAG20-TECHS/H63.html
      const errors = [];
      const scopeTypes = ["row", "col", "rowgroup", "colgroup"]
      const tablesElements = document.body.querySelectorAll("table:not(#glitch-container table)");
      const tableHeadTags = document.body.querySelectorAll("table th:not(#glitch-container table th)");

      for (let i = 0; i < tableHeadTags.length; i += 1) {
        if (!tableHeadTags[i].getAttribute("scope")) {
          errors[errors.length] = tableHeadTags[i];
        } else if (!scopeTypes.includes(tableHeadTags[i].getAttribute("scope"))) {
          errors[errors.length] = tableHeadTags[i];
        }
      }
      printErrors(
        errors,
        `<span id="table_has_proper_scope_attr">[${errors.length} errors]</span>: table_has_proper_scope_attr`,
        `List of &lt;table&gt; elements without proper scope attributes`
      );
      glitch.core.add_to_counter(errors.length);
    },
    required_input_has_aria_required: function() {
      // Checks that every Required input-field has an aria-required="true" attribute
      const errors = [];

      const parentElementHasErrorClass = (element) => {
        // checks if the closest span has a error-message class
        for (let i = 0; i < element.parentNode.children.length; i++) {   // eslint-disable-line no-plusplus
          if (element.parentNode.children[i].nodeName === "SPAN") {
            if (element.parentNode.children[i].getAttribute("class").includes("error-message")) {
              return true;
            }
          }
        }
        return false;
      }

      const checkIfLabelHasRequiredText = (element) => {
        // checks the input label for text that might suggest this
        // field might be required like the Required word or an asterisk
        for (let i = 0; i < element.parentNode.children.length; i++) {   // eslint-disable-line no-plusplus
          if (element.parentNode.children[i].nodeName === "LABEL") {
            const requiredText = ['required', 'Required', 'requis'];
            const regex = new RegExp(requiredText.join("|"), "i");
            if (regex.test(element.parentNode.children[i].innerText) || element.parentNode.children[i].innerText.includes('*')) return true;
          }
        }
        return false;
      }

      const inputElements = document.body.querySelectorAll("input");

      for (let i = 0; i < inputElements.length; i++) {  // eslint-disable-line no-plusplus
        // check that the input element is not hidden
        if (inputElements[i].getAttribute('type') !== "hidden") {
          if (checkIfLabelHasRequiredText(inputElements[i]) && inputElements[i].getAttribute('aria-required') !== "true") {
            errors[errors.length] = inputElements[i];
          }
          if (parentElementHasErrorClass(inputElements[i]) && inputElements[i].getAttribute('aria-required') !== "true") {
            errors[errors.length] = inputElements[i];
          }
        }
      }
      printErrors(
        errors,
        `<span id="required_input_has_aria_required">[${errors.length} errors]</span>: required_input_has_aria_required`,
        `List of &lt;input required&gt; elements without proper aria-required="true"`
      );
      glitch.core.add_to_counter(errors.length);
    },
    phone_number_links_have_aria_label: function() {
      // Checking phone number links for aria label
      const errors = [];
      const allEl = document.body.querySelectorAll(
        "a[href^='tel'], a[href^='TEL'], a[href^='Tel']"
      );
      for (let i = 0; i < allEl.length; i += 1) {
        const ariaTextAttribute =
          allEl[i].attributes['aria-label'];
        if (
          typeof ariaTextAttribute === 'undefined' ||
          ariaTextAttribute.value === ''
        ) {
          errors[errors.length] = allEl[i];
        }
      }
      printErrors(
        errors,
        `<span id="phone_number_links_have_aria_label">[${errors.length} errors]</span>: phone_number_links_have_aria_label`,
        `List of &lt;a href="tel:"&gt; elements without proper aria-label`
      );
      glitch.core.add_to_counter(errors.length);
    },
    breadcrumb_aria_current_page: function() {
      // Checks for aria-current page attribute if listed in nav
      const errors = [];
      const navMenuItems = document.body.querySelectorAll(
        "div[class*='nav-menu'] ul li a"
      );
      for (let i = 0; i < navMenuItems.length; i += 1) {
        const menuItem = navMenuItems[i].href;
        if (url === menuItem) {
          const ariaCurrent =
            navMenuItems[i].attributes['aria-current'];

          if (typeof ariaCurrent === 'undefined') {
            errors[errors.length] = navMenuItems[i];
          }
        }
      }
      printErrors(
        errors,
        `<span id="breadcrumb_aria_current_page">[${errors.length} errors]</span>: breadcrumb_aria_current_page`,
        `List of breadcrumb elements without aria-current="page"`
      );
      glitch.core.add_to_counter(errors.length);
    },
    aria_current_attr_exists_in_nav: function() {
      // Checks for aria-current page attribute if listed in nav
      const errors = [];
      const navMenuItems = document.body.querySelectorAll(
        "div[class*='nav-menu'] ul li a"
      );
      //console.log(navMenuItems);
      for (let i = 0; i < navMenuItems.length; i += 1) {
        const menuItem = navMenuItems[i].href;
        console.log(document.location.pathname, "=", menuItem);

        if (document.location.pathname === menuItem) {
          const ariaCurrent =
            navMenuItems[i].attributes['aria-current'];

          if (typeof ariaCurrent === 'undefined') {
            errors[errors.length] = navMenuItems[i];
          }
        }
      }
      printErrors(
        errors,
        `<span id="aria_current_attr_exists_in_nav">[${errors.length} errors]</span>: aria_current_attr_exists_in_nav`,
        `List of aria-current="true" elements in navigation`
      );
      glitch.core.add_to_counter(errors.length);
    },
    aria_current_attr_exists: function() {
      // Checks for the existence of aria-current page attribute on the page
      const errors = [];
      const ariaCurrent = document.body.querySelectorAll("[aria-current='page']");
      if (ariaCurrent.length <= 0) {
        const breadcrumb = document.body.querySelectorAll('.breadcrumbs');
        if (breadcrumb.length > 0) {
          errors.push({
            Problems: "No 'aria-current=page' exists",
            Element: "No 'aria-current=page' exists"
          });
        }
      }
      printErrors(
        errors,
        `<span id="aria_current_attr_exists">[${errors.length} errors]</span>: aria_current_attr_exists`,
        `Checks if no aria-current="true" exists`
      );
      glitch.core.add_to_counter(errors.length);
    },
    font_size_greater_14: function() {
      // Ensures font size is greater than 14px on pages
      const errors = [];
      const largestSize = 14;
      const els = document.body.querySelectorAll('*:not(#glitch-container *,sup,sub,header *,footer *,sup a,sup span)');
      for (let i = 0; i < els.length; i += 1) {
        if (els[i].offsetWidth > 0 && els[i].offsetHeight > 0) {
          let fontSize = window.getComputedStyle(els[i], null).getPropertyValue('font-size').replace("px","");
          if (parseFloat(fontSize) < 14 && fontSize !== "") {
            console.log(fontSize);
            errors[errors.length] = els[i];
          }
        }
      }
      printErrors(
        errors,
        `<span id="font_size_greater_14">[${errors.length} errors]</span>: font_size_greater_14`,
        `List of elements where font is &lt; (less than) 14`
      );
      glitch.core.add_to_counter(errors.length);
    },
    bespoke_stickynav_link_ref_heading: function() {
      // Verifies the link references a section heading
      const errors = [];
      const stickyNav = document.body.querySelectorAll("ul[id='stickyPageNavId']");
      console.log(stickyNav);
      // let ids = [];
      if (stickyNav) {
        const stickyNavChildren = document.body.querySelectorAll("ul[id='stickyPageNavId'] > li a");
        for (let i = 0; i < stickyNavChildren.length; i += 1) {
          const id = stickyNavChildren[i].attributes['href'].value.replace('#', '');
          const referencePoint = document.getElementById(id);
          console.log(referencePoint);
          console.log(referencePoint.tagName);
          if (referencePoint.tagName === 'H1' || referencePoint.tagName === 'H2' || referencePoint.tagName === 'H3') {
          } else {
            errors[errors.length] = stickyNavChildren[i];
          }
        }
      }
      printErrors(
        errors,
        `<span id="bespoke_stickynav_link_ref_heading">[${errors.length} errors]</span>: bespoke_stickynav_link_ref_heading`,
        `List of elements on Bespoke page where stickynav link reference is not heading`
      );
      glitch.core.add_to_counter(errors.length);
    },
    wem_stickynav_link_ref_heading: function() {
      // Verfies the link references a section heading
      const errors = [];
      const stickyNavItems = document.body.querySelectorAll('div[class="cm-stickynav-bar-secondary"] ul li a');
      for (let i = 0; i < stickyNavItems.length; i += 1) {
        const id = stickyNavItems[i].attributes['href'].value.replace('#', '');
        const referencePoint = document.getElementById(id);
        if (referencePoint.tagName === 'H1' || referencePoint.tagName === 'H2' || referencePoint.tagName === 'H3') {
          } else {
          errors[errors.length] = stickyNavItems[i];
        }
      }
      printErrors(
        errors,
        `<span id="wem_stickynav_link_ref_heading">[${errors.length} errors]</span>: wem_stickynav_link_ref_heading`,
        `List of elements on WEM page where stickynav link reference is not heading`
      );
      glitch.core.add_to_counter(errors.length);
    },
    canvas_has_alt_text_or_aria_hidden: function() {
      // Checking charts for alt text or aria-hidden
      const errors = [];
      const allEl = document.body.querySelectorAll('canvas');
      if (allEl.length > 0) {
        // List out all image elements to decide whether it's decorative or informative
        for (let i = 0; i < allEl.length; i += 1) {
          const ariaHidden = allEl[i].attributes['aria-hidden'];
          const allElParentAriaHidden = []
          const nextElem = allEl[i].nextSibling;

          let parent =allEl[i].parentNode;
          if (parent && parent.length > 0) {
            for (let j = 0; j < parent.length; j += 1) {
              allElParentAriaHidden.push(parent[j].ariaHidden)
            }
          }

          if (!allElParentAriaHidden.includes("true")
            && ariaHidden !== "true"
            || nextElem.className !== "show-for-sr") {
            errors[errors.length] = allEl[i];
          }
        }
      }
      printErrors(
        errors,
        `<span id="canvas_has_alt_text_or_aria_hidden">[${errors.length} errors]</span>: canvas_has_alt_text_or_aria_hidden`,
        `List of chart elements without aria-hidden='true' and/or depicted information not immediately after the chart`
      );
      glitch.core.add_to_counter(errors.length);
    },
    a_button_aria_label_corret_a11y_copy: function() {
      // Checking buttons and links with ambiguous content
      const errors = [];
      const regexExpression = 'open|ouvrir|ouvre|apply now|learn more|open now|get started|en savoir plus|ouvrez un compte';
      const regex = RegExp(regexExpression, 'gi');
      const allEl = document.body.querySelectorAll(
        "a:not(#glitch-container a), button:not(#glitch-container button)"
      );
      for (let i = 0; i < allEl.length; i += 1) {
        if (regex.test(allEl[i].textContent)) {
          if (typeof allEl[i].ariaLabel === "undefined" || allEl[i].ariaLabel === null) {
            errors[errors.length] = allEl[i];
          }
        }
      }
      printErrors(
        errors,
        `<span id="a_button_aria_label_corret_a11y_copy">[${errors.length} errors]</span>: a_button_aria_label_corret_a11y_copy`,
        `List of &lt;a&gt;/&lt;button&gt; without correct a11y copy in aria-label`
      );
      glitch.core.add_to_counter(errors.length);
    },
   first_element_in_main_is_skipnav: function() {
      // checks first element of main for a span with id=skip-nav
      // this is not a valid test in general, and was only an applicable test for my work's pages
      const errors = [];
      const allElements = document.body.querySelectorAll("main > *");
      if (allElements[0].getAttribute("id") === "skip-nav" && allElements[0].tagName === "SPAN") {
      } else {
        errors[errors.length] = allElements[0];
      }
      printErrors(
        errors,
        `<span id="first_element_in_main_is_skipnav">[${errors.length} errors]</span>: first_element_in_main_is_skipnav`,
        `Check that first element in &lt;main&gt; &lt;span id=skip-nav&gt;`
      );
    },
    video_player_proper_controllers: function() {
      // Video player has proper controllers
      const errors = [];
      const allElements = document.body.querySelectorAll('iframe');

      if (allElements.length === 0) {
        return;
      }

      // eslint-disable-next-line
      const youTubeVideoIDRegularExpression = "^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)";

      for (let i = 0; i < allElements.length; i += 1) {
        const iframeSource = allElements[i].src;
        const youTubeVideoID = iframeSource.match(youTubeVideoIDRegularExpression);

        if (youTubeVideoID && iframeSource.includes('controls=0')) {
          errors.push({
            Problems: 'Video player does not have proper controllers',
            Element: allElements[i]
          });
        }
      }
      printErrors(
        errors,
        `<span id="video_player_proper_controllers">[${errors.length} errors]</span>: video_player_proper_controllers`,
        `List of video player without proper controllers`
      );
    }
  };
});