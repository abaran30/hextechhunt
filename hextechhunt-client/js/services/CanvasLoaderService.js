angular.module('hextechhuntClientApp')
  .service('CanvasLoaderService', function() {
    var canvasLoader = new CanvasLoader('canvasloader-container');
    canvasLoader.setColor('#1D2C8B');
    canvasLoader.setShape('square');
    canvasLoader.setDiameter(150);
    canvasLoader.setDensity(80);
    canvasLoader.setRange(1);
    canvasLoader.setFPS(30);

    var loaderObject = document.getElementById("canvasLoader");
    loaderObject.style.position = "absolute";
    loaderObject.style["top"] = canvasLoader.getDiameter() * -0.5 + "px";
    loaderObject.style["left"] = canvasLoader.getDiameter() * -0.5 + "px";

    this.showSpinner = function() {
      canvasLoader.show();
    };

    this.hideSpinner = function() {
      canvasLoader.hide();
    };
  });
