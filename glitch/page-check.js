glitch.module('page_check', function () {
  let titletag = "unknown";
  let script_src = [];
  let iframe_src = [];

  return {
    force_initialize: function() {
      let self = this;
      let id = "page_check";
      let heading = `Page Check`;

      let scripts = document.querySelectorAll('script');
      for (var i = 0;i < scripts.length; i++) {
        if (script_src.indexOf(scripts[i].src) === -1) { //if the script_src isn't in the array, add it to the array
          script_src.push(scripts[i].src);
        }
      }
      let iframe = document.querySelectorAll('iframe');
      for (var i = 0;i < iframe.length; i++) {
        if (iframe_src.indexOf(iframe[i].src) === -1) { //if the script_src isn't in the array, add it to the array
          iframe_src.push(iframe[i].src);
        }
      }

      self.get_titletag();

      let content =  `
        <table style="width:100%;line-height:1.4;">
          <tbody style="background-color:transparent">
            <tr><th style="vertical-align:top;width:70px;display:inline-block;text-align:right;">Title Tag:&nbsp;</th><td style="width:100%">${titletag}</td></tr>
          </tbody>
        </table>

        <button style="margin-top:8px;" class="w:100%" onclick="glitch.core.reset();glitch.page_check.all_tests();">Run all (31) tests</button>
        <button style="margin-top:2px;" class="w:100%" onclick="glitch.core.reset();">Reset Glitch</button>`;
      glitch.modules.initialize_ui(id,heading,content);
    },
    get_titletag: function() {
      titletag = document.querySelector("title").innerHTML;
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
      glitch.tests.first_element_in_main_is_skipnav();
      glitch.tests.video_player_proper_controllers();
      document.getElementById('all_tests').innerHTML = glitch.core.get_counter();
    }
  };
});