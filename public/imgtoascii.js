//notice:half of this code was written by some guy one stack overflow,god bless him
let data = document.getElementById("data").value;
let hasColor = document.getElementById("has-color").checked;
let backgroundColor = document.getElementById("background-color");
backgroundColor.value = "#FFFFFF";
let color = backgroundColor.value;
function imgtoascii(image) {
  data = document.getElementById("data").value;
  hasColor = document.getElementById("has-color").checked;
  color = backgroundColor.value;
  console.log(hasColor);
  //creating the canvas for photomosaic
  var canvas = document.createElement("canvas");
  var displayCanvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var displayContext = displayCanvas.getContext("2d");

  canvas.height = image.naturalHeight;
  canvas.width = image.naturalWidth;
  displayCanvas.height = image.naturalHeight;
  displayCanvas.width = image.naturalWidth;

  var imageData = context.getImageData(
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );
  var pixels = imageData.data;

  // Number of mosaic tiles
  var numTileRows = image.naturalWidth / TILE_WIDTH;
  var numTileCols = image.naturalHeight / TILE_WIDTH;

  //canvas copy of image
  var imageCanvas = document.createElement("canvas");
  var imageCanvasContext = canvas.getContext("2d");
  imageCanvas.height = image.naturalHeight;
  imageCanvas.width = image.naturalWidth;
  imageCanvasContext.drawImage(image, 0, 0);

  //function for finding the average color
  function averageColor(row, column) {
    var blockSize = 1, // we can set how many pixels to skip
      data,
      width,
      height,
      i = -4,
      length,
      rgb = {
        r: 0,
        g: 0,
        b: 0,
      },
      count = 0;

    try {
      data = imageCanvasContext.getImageData(
        column * TILE_WIDTH,
        row * TILE_WIDTH,
        TILE_WIDTH,
        TILE_WIDTH
      );
    } catch (e) {
      alert("Not happening this time!");
      return rgb;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
  }

  // Loop through each tile
  for (var r = 0; r < numTileRows; r++) {
    for (var c = 0; c < numTileCols; c++) {
      // Set the pixel values for each tile
      var rgb = averageColor(r, c);
      var red = rgb.r;
      var green = rgb.g;
      var blue = rgb.b;

      // Loop through each tile pixel
      for (var tr = 0; tr < TILE_WIDTH; tr++) {
        for (var tc = 0; tc < TILE_WIDTH; tc++) {
          // Calculate the true position of the tile pixel
          var trueRow = r * TILE_WIDTH + tr;
          var trueCol = c * TILE_WIDTH + tc;

          // Calculate the position of the current pixel in the array
          var pos = trueRow * (imageData.width * 4) + trueCol * 4;

          // Assign the colour to each pixel
          pixels[pos + 0] = red;
          pixels[pos + 1] = green;
          pixels[pos + 2] = blue;
          pixels[pos + 3] = 255;
        }
      }
    }
  }
  // Draw image data to the canvas
  // context.putImageData(imageData, 0, 0);
  // context.fillStyle = 'white';
  // context.fillRect(0,0,canvas.width,canvas.height);
  let line = "";
  displayContext.fillStyle = color;
  console.log(color);
  displayContext.fillRect(0, 0, displayCanvas.width, displayCanvas.height);
  for (var r = 0; r < numTileRows; r++) {
    for (var c = 0; c < numTileCols; c++) {
      let rgb = averageColor(r, c);
      let avg = (rgb.r + rgb.g + rgb.b) / 3;
      let index = map(avg, [0, 255], [0, data.length]);
      if (hasColor) {
        displayContext.fillStyle = rgbToHex(rgb.r, rgb.g, rgb.b);
      } else {
        displayContext.fillStyle = "black";
      }
      displayContext.font = TILE_WIDTH.toString() + "px Arial";
      displayContext.fillText(
        data.charAt(index),
        c * TILE_WIDTH,
        r * TILE_WIDTH
      );

      line += data.charAt(index);
    }
  }
  return displayCanvas;
}

const map = (number, fromRange, toRange) => {
  return (
    ((number - fromRange[0]) * (toRange[1] - toRange[0])) /
      (fromRange[1] - fromRange[0]) +
    toRange[0]
  );
};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
