"use strict";

storm_eagle.module("color_picker", function () {
  "use strict";

  var self;
  var baseColours = ["#3169b2", "#ab1e23", "#f4c026", "#1c3b65", "#27528c", "#789ccc", "#9bb6d9", "#becfe6", "#80171a", "#9b1b20", "#b63b3f", "#c0575a", "#d58f91", "#b7901d", "#fdf0c9", "#000000", "#202020", "#404040", "#808080", "#c0c0c0", "#e0e0e0", "#f0f0f0", "#ffffff", "#d08888", "#a01010", "#500808", "#84b48e", "#09681d", "#05340f", "#c0791d", "#eeeeec"];
  var baseName = ["blue", "red", "yellow", "yale-blue", "yinmn-blue", "vista-blue", "powder-blue", "columbia-blue", "falu-red", "carmine", "auburn", "bittersweet-shimmer", "old-rose", "dark-goldenrod", "dutch-white", "black", "eerie-black", "onyx", "gray", "silver", "platinum", "white-smoke", "white", "negative-light", "negative", "negative-dark", "positive-light", "positive", "positive-dark", "warning"];
  /**
   * Function to convert HEX to RGB
   * @param  {string} color to match
   **/

  function hex2rgb(colour) {
    var cr, cg, cb;

    if (colour.charAt(0) === '#') {
      colour = colour.substr(1);
    }

    cr = colour.charAt(0) + colour.charAt(1);
    cg = colour.charAt(2) + colour.charAt(3);
    cb = colour.charAt(4) + colour.charAt(5);
    cr = parseInt(cr, 16);
    cg = parseInt(cg, 16);
    cb = parseInt(cb, 16);
    return cr + ',' + cg + ',' + cb;
  }

  return {
    initialize: function initialize() {
      self = storm_eagle["color_picker"];
    },
    find_closest_color: function find_closest_color() {
      var color = document.getElementById("color-picker").value;
      var colorRgb = hex2rgb(color);
      var colorR = colorRgb.split(',')[0];
      var colorG = colorRgb.split(',')[1];
      var colorB = colorRgb.split(',')[2]; // Create an emtyp array for the difference betwwen the colors

      var differenceArray = []; // Function to find the smallest value in an array

      var smallestValue = function smallestValue(array) {
        return Math.min.apply(Math, array);
      }; // Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array


      baseColours.forEach(function (value) {
        var baseColorRgb = hex2rgb(value);
        var baseColoursR = baseColorRgb.split(',')[0];
        var baseColoursG = baseColorRgb.split(',')[1];
        var baseColoursB = baseColorRgb.split(',')[2]; // Add the difference to the differenceArray

        differenceArray.push(Math.sqrt((colorR - baseColoursR) * (colorR - baseColoursR) + (colorG - baseColoursG) * (colorG - baseColoursG) + (colorB - baseColoursB) * (colorB - baseColoursB)));
      }); // Get the lowest number from the differenceArray

      var lowest = smallestValue(differenceArray); // Get the index for that lowest number

      var index = differenceArray.indexOf(lowest);
      var theColour = baseColours[index];

      if (color === theColour || "#" + color === theColour) {
        document.getElementById("picked-color").style.backgroundColor = color;
        document.getElementById("picked-hex").innerHTML = "".concat(color);
        document.getElementById("suggested-color").style.backgroundColor = theColour;
        document.getElementById("suggested-hex-error").classList.remove("display:none");
        document.getElementById("suggested-hex-error").innerHTML = theColour + " is already in the codebase";
        document.getElementById("suggested-hex-button").classList.add("display:none");
        document.getElementById("suggested-hex").innerHTML = "";
        document.getElementById("suggested-hex-name-button").classList.add("display:none");
        document.getElementById("suggested-hex-name").innerHTML = "";
      } else {
        document.getElementById("picked-color").style.backgroundColor = color;
        document.getElementById("picked-hex").innerHTML = "".concat(color);
        document.getElementById("suggested-color").style.backgroundColor = baseColours[index];
        document.getElementById("suggested-hex-error").classList.add("display:none");
        document.getElementById("suggested-hex-error").innerHTML = "";
        document.getElementById("suggested-hex-button").classList.remove("display:none");
        document.getElementById("suggested-hex").innerHTML = "".concat(theColour);
        document.getElementById("suggested-hex-name-button").classList.remove("display:none");
        document.getElementById("suggested-hex-name").innerHTML = "".concat(baseName[index]);
      }

      return false;
    }
  };
});