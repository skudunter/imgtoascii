//notice:the code is ugly dont @ me
var TILE_WIDTH = document.getElementById("resolution").value;
var link = document.createElement("a");

document.getElementById("input").onchange = function () {
  var reader = new FileReader();
  reader.onload = function (e) {
    // get loaded data and render thumbnail.
    document.getElementById("image").src = e.target.result;
  };
  // read the image file as a data URL.
  reader.readAsDataURL(this.files[0]);
};
document.getElementById("resolution").addEventListener("change", () => {
  TILE_WIDTH = document.getElementById("resolution").value;
});
function displayAsciiImg() {
  if (document.getElementById("output-image")) {
    document.getElementById("output-image").remove();
  }
  var image = document.getElementById("image");
  var canvas = imgtoascii(image);
  canvas.id = "output-image";
  document.getElementById("output").appendChild(canvas);
  link.download = "downnload.png";
  link.href = document.getElementById("output-image").toDataURL();
  link.innerHTML = "download";
  document.getElementById("download-output").appendChild(link);
}
