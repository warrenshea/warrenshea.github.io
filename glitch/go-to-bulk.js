glitch.module('go_to_bulk', function () {

  return {
    force_initialize: function() {
      let self = this;
      let id = "go_to_bulk";
      let heading = `Go to (bulk)`;

      let content =  `
          <div style="width:100%;">
            <textarea style="width:100%;min-height:120px;resize: none;overflow-x:scroll;" wrap="off" id="glitch-bulk-textarea" placeholder="e.g."></textarea>
          </div>
          <button type="button" style="margin-top:8px;" onclick="glitch.go_to_bulk.open_urls();">Open URLs</button><br>
        </div>
        `;
      glitch.modules.initialize_ui(id,heading,content);
    },
    open_urls: function() {
      let array_of_urls = [];
      array_of_urls = document.getElementById(`glitch-bulk-textarea`).value.split("\n");
      array_of_urls.forEach(url => {
        window.open(url);
      });
    }
  };
});