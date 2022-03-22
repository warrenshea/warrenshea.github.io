glitch.module('accessibility', function () {
  return {
    force_initialize: function() {
      let self = this;
      let id = "accessibility";
      let heading = `Accessibility`;

      let content =  `
        <input type="text" id="glitch-clipboard-a11y" style="font-size:24px;width:100%;text-align:center;margin-bottom:4px;font-family:courier;" value="Clipboard" disabled>
        <input style="width:calc(100% - 75px);margin-right:10px" value=", opens in a new window">
        <button type="button" value=", opens in a new window" style="margin-top:4px;" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button><br>
        <input style="width:calc(100% - 75px);margin-right:10px" value=", s’ouvre dans une nouvelle fenêtre">
        <button type="button" value=", s’ouvre dans une nouvelle fenêtre" style="margin-top:4px;" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button><br>
        <input style="width:calc(100% - 75px);margin-right:10px" value="footnote [number]">
        <button type="button" value="footnote [number]" style="margin-top:4px;" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button><br>
        <input style="width:calc(100% - 75px);margin-right:10px" value="footnote [number] details">
        <button type="button" value="footnote [number] details" style="margin-top:4px;" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button><br>
        <input style="width:calc(100% - 75px);margin-right:10px" value="note de bas de page [numéro]">
        <button type="button" value="note de bas de page [numéro]" style="margin-top:4px;" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button><br>
        <input style="width:calc(100% - 75px);margin-right:10px" value="renseignements de la note de bas de page [numéro]">
        <button type="button" value="renseignements de la note de bas de page [numéro]" style="margin-top:4px;" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button><br>

        <input style="width:22px;margin-right:10px" value="*">
        <button type="button" value="*" style="margin-top:4px;margin-right:20px" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button>
        <input style="width:62px;margin-right:10px" value="star">
        <button type="button" value="star" style="margin-top:4px;margin-right:20px" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button>
        <input style="width:62px;margin-right:10px" value="étoile">
        <button type="button" value="étoile" style="margin-top:4px;" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button><br>

        <input style="width:22px;margin-right:10px" value="†">
        <button type="button" value="†" style="margin-top:4px;margin-right:20px" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button>
        <input style="width:62px;margin-right:10px" value="dagger">
        <button type="button" value="dagger" style="margin-top:4px;margin-right:20px" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button>
        <input style="width:62px;margin-right:10px" value="obèle">
        <button type="button" value="obèle" style="margin-top:4px;" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button><br>

        <input style="width:22px;margin-right:10px" value="‡">
        <button type="button" value="‡" style="margin-top:4px;margin-right:20px" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button>
        <input style="width:62px;margin-right:10px" value="double dagger">
        <button type="button" value="double dagger" style="margin-top:4px;margin-right:20px" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button>
        <input style="width:62px;margin-right:10px" value="double obèle">
        <button type="button" value="double obèle" style="margin-top:4px;" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button><br>

        <input style="width:22px;margin-right:10px" value="§">
        <button type="button" value="§" style="margin-top:4px;margin-right:20px" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button>
        <input style="width:62px;margin-right:10px" value="section">
        <button type="button" value="section" style="margin-top:4px;margin-right:20px" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button>
        <input style="width:62px;margin-right:10px" value="symbole section">
        <button type="button" value="symbole section" style="margin-top:4px;" onclick="glitch.accessibility.copy_textarea_bulk_to_clipboard(this);">Copy</button><br>`;
      glitch.modules.initialize_ui(id,heading,content);
    },
    copy_textarea_bulk_to_clipboard: function(element) {
      const self = this;
      self.copy_to_clipboard(element.value);
    },
    copy_to_clipboard: function(text) {
      document.getElementById('glitch-clipboard-a11y').value = text;
      /*https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript*/
      function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          //console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
          //console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
      }
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(function() {
        //console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        //console.error('Async: Could not copy text: ', err);
      });
    }
  };
});