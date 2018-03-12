export function convertToPixelData(array) {
    var retorno = new Uint8ClampedArray(array.length * 4);

    for (var i = 0; i < array.length; i++) {
        var index = i * 4;
        retorno[index] = retorno[index + 1] = retorno[index + 2] = array[i];
        retorno[index + 3] = 255;
    }

    return retorno;
}