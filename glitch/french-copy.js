glitch.module('french_copy', function () {
  return {
    force_initialize: function() {
      let self = this;
      let id = "french_copy";
      let heading = `French Copy`;

      let content =  `
        <input type="text" id="glitch-clipboard" style="font-size:24px;width:100%;text-align:center;margin-bottom:4px;font-family:courier;" value="Clipboard" disabled>
        <table style="width:100%;line-height:1.4;">
          <tbody style="background-color:transparent" id="glitch-french-character-tbody-lowercase"></tbody>
          <tbody style="background-color:transparent;display:none;" id="glitch-french-character-tbody-uppercase"></tbody>
        </table>`;
      glitch.modules.initialize_ui(id,heading,content);
      self.build_table();
      self.shift_listener();
    },
    build_table: function() {
      let french_characters_lowercase = ['', '&agrave;','&acirc;','&auml;','&eacute;','&egrave;','&ecirc;','&euml;','','','&icirc;','&iuml;','','','&ocirc;','','','&ugrave;','&ucirc;','&uuml;','&laquo;','&ccedil;','&oelig;','&raquo;']
      let french_characters_uppercase = ['', '&Agrave;','&Acirc;','&Auml;','&Eacute;','&Egrave;','&Ecirc;','&Euml;','','','&Icirc;','&Iuml;','','','&Ocirc;','','','&Ugrave;','&Ucirc;','&Uuml;','&laquo;','&ccedil;','&oelig;','&raquo;']
      function create_table(french_characters_array) {
        let glitch_french_character_tbody = "<tr>";
        for (i = 0; i < french_characters_array.length; i++) {
          if (french_characters_array[i] === '') {
            glitch_french_character_tbody += `<td></td><td></td>`
          } else {
            glitch_french_character_tbody += `<td><button onclick="glitch.french_copy.copy_to_clipboard('${french_characters_array[i]}');" class="french-copy" style="min-width:30px;">${french_characters_array[i]}</button></td><td><button onclick="glitch.french_copy.copy_to_clipboard('${french_characters_array[i].replace("&","&amp;")}');" class="french-copy" style="min-width:70px;`
            if (i % 4 === 3) {
              glitch_french_character_tbody += `margin-right:0px;`;
            } else {
              glitch_french_character_tbody += `margin-right:8px;`;
            }
            glitch_french_character_tbody += `">${french_characters_array[i].replace("&","&amp;")}</button></td>`;
          }
          if (i % 4 === 3) {
            glitch_french_character_tbody += `</tr><tr>`;
          }
        }
        glitch_french_character_tbody += "</tr>";
        return glitch_french_character_tbody;
      }
      document.getElementById("glitch-french-character-tbody-lowercase").innerHTML = create_table(french_characters_lowercase);
      document.getElementById("glitch-french-character-tbody-uppercase").innerHTML = create_table(french_characters_uppercase);
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
      document.getElementById('glitch-clipboard').value = text;
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