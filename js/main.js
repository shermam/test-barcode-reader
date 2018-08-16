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
import { readAsDataURL } from "./readAsDataURL.js";
import { Scale } from "./scale.js";


var tracks = [];
var ratio = 0.2125;
var blackWhite = false;
var start = document.querySelector('#start');
var stop = document.querySelector('#stop');
var bw = document.querySelector('#bw');
var clear = document.querySelector('#clear');
var range = document.querySelector('#range');
var save = document.querySelector('#save');
var detectar = document.querySelector('#detectar');
var file = document.querySelector('#file');
var p = document.querySelector('#range-value');
var canvas = document.querySelector('#barcode-canvas');
var context = canvas.getContext('2d');
var video = document.createElement('video');
var videoConstraints = { video: { facingMode: { ideal: "environment" } } };
var isClosed = false;
var trashhold = 127;
var codelable = document.querySelector('#code');
//var detector = new BarcodeDetector;
window.onerror = function (error) {
    codelable.innerHTML += JSON.stringify(error) + '<br>';
}

var max = 0;
var min = 255;

save.onclick = function () {
    // here is the most important part because if you dont replace you will get a DOM 18 exception.
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image; // it will save locally
}

clear.onclick = carregaImagem;
file.onchange = carregaImagem;

function carregaImagem() {
    codelable.innerHTML += 'Change 3';
    codelable.innerHTML += JSON.stringify(file.files);
    readAsDataURL(file.files[0]).then(function (resposta) {
        codelable.innerHTML += 'leu arquivo';
        var image = new Image;
        image.onload = function () {
            codelable.innerHTML += 'Carregou imagem: ' + image.naturalWidth;

            startFN(image);
        }
        image.src = resposta.content;
    });

}

detectar.onclick = function () {

    codelable.innerHTML += `Width: ${canvas.width / 2}, Height: ${canvas.height / 2}`;
    var data = context.getImageData(0, 0, canvas.width, canvas.height).data;

    var id = new ImageData(Scale(data, canvas.width, canvas.height), canvas.width / 2, canvas.height / 2);
    context.putImageData(id, 0, 0);

    // context.fillStyle = '#000000';
    // context.fillRect(0, 0, 300, 300);


    detectBarcode({
        scan: id.data,
        scanWidth: id.width,
        scanHeight: id.height,
        cmd: 'normal',
        rotation: 1,
        id: 1
    }, 0)
    codelable.innerHTML += 'Pelo menons não deu erro';
};




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

//startFN();

function startFN(video) {

    //navigator.getUserMedia(videoConstraints, treatStream, console.log);

    // video = new Image;
    // video.onload = function () {
    canvas.width = video.width;
    canvas.height = video.height;
    // }
    // video.src = 'Capturar1.PNG';
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

        //if (!isClosed) requestAnimationFrame(draw);
    });

    // detectBarcode({
    //     scan: context.getImageData(0, 0, canvas.width, canvas.height).data,
    //     scanWidth: canvas.width,
    //     scanHeight: canvas.height,
    //     cmd: 'normal',
    //     rotation: 1,
    //     id: 1
    // }, 1000);

};


function detectBarcode(data, timeout) {
    setTimeout(function readBarCode() {
        var resposta = detect({
            data: data
        });

        try {

            var resposta = resposta.result[0].Value;

            codelable.innerHTML = resposta;

            console.log(resposta);
        } catch (error) {
            console.log(error);
            codelable.innerHTML += error.message + '<br>';

        }

    }, timeout);
}