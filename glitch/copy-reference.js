glitch.module('copy_reference', function () {
  return {
    force_initialize: function() {
      let self = this;
      let id = "copy_reference";
      let heading = `French Copy`;

      let content =  `
        <input type="text" id="glitch-clipboard-copy" style="font-size:24px;width:100%;text-align:center;margin-bottom:4px;font-family:courier;" value="Clipboard" disabled>

        <div style="text-align:center">Press & hold [SHIFT] for uppercase version</div>
        <table style="width:100%;line-height:1.4;">
          <tbody style="background-color:transparent" id="glitch-french-character-tbody-lowercase"></tbody>
          <tbody style="background-color:transparent;display:none;" id="glitch-french-character-tbody-uppercase"></tbody>
        </table>`;
      glitch.modules.initialize_ui(id,heading,content);
      self.build_table();
      self.shift_listener();
    },
    build_table: function() {
      let characters_lowercase = ['', '&agrave;','&acirc;','&auml;','&eacute;','&egrave;','&ecirc;','&euml;','','','&icirc;','&iuml;','','','&ocirc;','','','&ugrave;','&ucirc;','&uuml;','&laquo;','&ccedil;','&oelig;','&raquo;','&copy;','&reg;','&trade;','','&dagger;','&Dagger;','&sect;']
      let characters_uppercase = ['', '&Agrave;','&Acirc;','&Auml;','&Eacute;','&Egrave;','&Ecirc;','&Euml;','','','&Icirc;','&Iuml;','','','&Ocirc;','','','&Ugrave;','&Ucirc;','&Uuml;','&laquo;','&ccedil;','&oelig;','&raquo;','&copy;','&reg;','&trade;','','&dagger;','&Dagger;','&sect;']
      function create_table(characters_array) {
        let glitch_french_character_tbody = "<tr>";
        for (i = 0; i < characters_array.length; i++) {
          if (characters_array[i] === '') {
            glitch_french_character_tbody += `<td></td><td></td>`
          } else {
            glitch_french_character_tbody += `<td><button onclick="glitch.copy_reference.copy_to_clipboard('${characters_array[i]}');" class="copy-reference" style="min-width:30px;">${characters_array[i]}</button></td><td><button onclick="glitch.copy_reference.copy_to_clipboard('${characters_array[i].replace("&","&amp;")}');" class="copy-reference" style="min-width:70px;`
            if (i % 4 === 3) {
              glitch_french_character_tbody += `margin-right:0px;`;
            } else {
              glitch_french_character_tbody += `margin-right:8px;`;
            }
            glitch_french_character_tbody += `">${characters_array[i].replace("&","&amp;")}</button></td>`;
          }
          if (i % 4 === 3) {
            glitch_french_character_tbody += `</tr><tr>`;
          }
          if (i !== 0 && (i % 19 === 0 || i % 23 === 0 || i % 27 === 0)) {
            glitch_french_character_tbody += `</tr><tr><td colspan="8">&nbsp;</tr><tr>`;
          }
        }
        glitch_french_character_tbody += "</tr>";
        return glitch_french_character_tbody;
      }
      document.getElementById("glitch-french-character-tbody-lowercase").innerHTML = create_table(characters_lowercase);
      document.getElementById("glitch-french-character-tbody-uppercase").innerHTML = create_table(characters_uppercase);
    },
    shift_listener: function() {
      function shiftKey(event) {
        if (event.shiftKey) {
          document.getElementById('glitch-french-character-tbody-uppercase').style.display="block";
          document.getElementById('glitch-french-character-tbody-lowercase').style.display="none";
        } else {
          document.getElementById('glitch-french-character-tbody-uppercase').style.display="none";
          document.getElementById('glitch-french-character-tbody-lowercase').style.display="block";
        }
      }
      document.removeEventListener('keyup', shiftKey);
      document.removeEventListener('keydown', shiftKey);
      document.addEventListener('keyup', shiftKey);
      document.addEventListener('keydown', shiftKey);
    },
    copy_to_clipboard: function(text) {
      document.getElementById('glitch-clipboard-copy').value = text;
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