var fgImage = null;
var bgImage = null;
var fgCanvas = null;
var bgCanvas = null;


function loadForegroundImage(){
  fgCanvas = document.getElementById("foreground canvas");
  var fileName = document.getElementById("fg file");
  fgImage = new SimpleImage(fileName);
  fgImage.drawTo(fgCanvas);
}


function loadBackgroundImage(){
  bgCanvas = document.getElementById("background canvas");
  var fileName = document.getElementById("bg file");
  bgImage = new SimpleImage(fileName);
  bgImage.drawTo(bgCanvas);
}


function makeGray(){
  var grayCanvas = document.getElementById("gray canvas");
  
  for (var pixel of grayImage.values()){
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setGreen(avg);
    pixel.setBlue(avg);
    pixel.setRed(avg);
  }
}


function clearCanvases(){
  fgCtx = fgCanvas.getContext("2d");
  bgCtx = bgCanvas.getContext("2d");
  fgCtx.clearRect(0,0,fgCanvas.width,fgCanvas.height);
  bgCtx.clearRect(0,0,bgCanvas.width,bgCanvas.height);  
}


function doGreenScreen(){
  if(fgImage == null || ! fgImage.complete()){
    alert("Please load a foreground image.");
  }
  if(bgImage == null || ! bgImage.complete()){
    alert("Please load a background image.");
  }
  var outputImage = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  for(var pixel of fgImage.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if(pixel.getGreen() > (pixel.getRed() + pixel.getBlue())){
      var bgPixel = bgImage.getPixel(x,y);
      outputImage.setPixel(x,y,bgPixel);
    }
    else{
      outputImage.setPixel(x,y,pixel);
    }
  }
  clearCanvases();
  outputImage.drawTo(fgCanvas);
}