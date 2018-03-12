import { detect } from "./detect.js";


import { greyScale } from "./greyscale.js";
import { IntensityGradient } from "./intensifygradient.js";
import { convertToPixelData } from "./convertToPixelData.js";
import { BoxFilter } from "./boxfilter.js";
import { otsu } from "./otsu.js";
import { blackwhite } from "./blackwhite.js";
import { getMeasures } from "./measures.js";
import { histogram } from "./histogram.js";
import { maxLocalization } from "./maxlocalizatoin.js";
import { fillLocations } from "./fillLocations.js";
import { CreateTable } from "./createtable.js";


var tracks = [];
var ratio = 0.2125;
var blackWhite = false;
var start = document.querySelector('#start');
var stop = document.querySelector('#stop');
var bw = document.querySelector('#bw');
var clear = document.querySelector('#clear');
var range = document.querySelector('#range');
var save = document.querySelector('#save');
var p = document.querySelector('#range-value');
var canvas = document.querySelector('#barcode-canvas');
var context = canvas.getContext('2d');
var video = document.createElement('video');
var videoConstraints = { video: { facingMode: { ideal: "environment" } } };
var isClosed = false;
var trashhold = 127;
//var detector = new BarcodeDetector;

var max = 0;
var min = 255;

save.onclick = function () {
    // here is the most important part because if you dont replace you will get a DOM 18 exception.
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image; // it will save locally
}

clear.onclick = function () {
    p.innerHTML = '';
}

range.onchange = function () {
    trashhold = range.value;
    p.innerHTML = range.value;
}

bw.onclick = function () {
    blackWhite = !blackWhite;
}

stop.onclick = function () {
    isClosed = true;
    for (var i in tracks) {
        tracks[i].stop();
    }
}

start.onclick = startFN;

startFN();

function startFN() {

    //navigator.getUserMedia(videoConstraints, treatStream, console.log);

    video = new Image;
    video.onload = function () {
        canvas.width = video.width;
        canvas.height = video.height;
    }
    video.src = 'Capturar1.PNG';
    //video.src = 'download1.png';



    function treatStream(stream) {
        tracks = stream.getTracks();
        video.srcObject = stream;

        video.onloadedmetadata = function (e) {
            video.play();
            canvas.width = video.videoWidth;
            canvas.height = video.videoWidth * ratio;
            console.log("inicializado");
        };
    }

    requestAnimationFrame(function draw() {

        max = 0;
        min = 255;

        context.drawImage(
            video,
            // 0,
            // (video.videoHeight - (video.videoWidth * ratio)) / 2,
            // video.videoWidth,
            // video.videoWidth * ratio,
            0,
            0,
            canvas.width,
            canvas.height
        );


        //var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        //greyScale(imageData.data);
        // var data = IntensityGradient(imageData.data, imageData.width);

        // var newData = [];

        // newData = BoxFilter(data, imageData.width, 15);

        // var { min, max, maxPos, avrgLight } = getMeasures(newData);

        // if (avrgLight < 15) {
        //     newData = BoxFilter(newData, imageData.width, 8);
        //     var { min, max, maxPos, avrgLight } = getMeasures(newData);
        // }

        // var hist = histogram(newData, max);
        // var thresh = otsu(hist, newData.length);
        // blackwhite(newData, imageData, thresh);
        // CreateTable(imageData);
        // var rects = maxLocalization(max, maxPos, newData, imageData);
        // var Locations = [];
        // fillLocations(rects, Locations);

        //var id = new ImageData(convertToPixelData(newData.length ? newData : data), imageData.width, imageData.height);

        //context.putImageData(imageData, 0, 0);

        // if (Locations.length) {
        //     context.strokeStyle = '#ff0000';
        //     context.rect(Locations[0].x, Locations[0].y, Locations[0].width, Locations[0].height);
        //     context.stroke();
        // }

        if (!isClosed) requestAnimationFrame(draw);
    });

    detectBarcode();

};


function detectBarcode() {
    setTimeout(function readBarCode() {
        var resposta = detect({
            data: {
                scan: context.getImageData(0, 0, canvas.width, canvas.height).data,
                scanWidth: canvas.width,
                scanHeight: canvas.height,
                cmd: 'normal',
                rotation: 1,
                id: 1
            }
        });

        console.log(resposta.result[0].Value);

    }, 1000);
}