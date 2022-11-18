var TILE_WIDTH = 10;
var TILE_HEIGHT = 10;

document.getElementById("input").onchange = function () {
  var reader = new FileReader();
  reader.onload = function (e) {
    // get loaded data and render thumbnail.
    document.getElementById("image").src = e.target.result;
  };
  // read the image file as a data URL.
  reader.readAsDataURL(this.files[0]);
};

function displayAsciiImg() {
  if (document.getElementById("output-image")) {
    document.getElementById("output-image").remove();
  }
  var image = document.getElementById("image");
  var canvas = imgtoascii(image);
  canvas.id = "output-image";
  document.getElementById("output").appendChild(canvas);
}
