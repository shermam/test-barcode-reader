export function ScaleHeight(scale, Image) {
    var tempArray = [];
    var avrgRed = 0;
    var avrgGreen = 0;
    var avrgBlue = 0;
    var i, j, k;
    for (i = 0; i < Image.height - scale; i += scale) {
        for (j = 0; j < Image.width; j++) {
            avrgRed = 0;
            avrgGreen = 0;
            avrgBlue = 0;
            for (k = i; k < i + scale; k++) {
                avrgRed += Image.table[j][k][0];
                avrgGreen += Image.table[j][k][1];
                avrgBlue += Image.table[j][k][2];
            }
            tempArray.push(avrgRed / scale);
            tempArray.push(avrgGreen / scale);
            tempArray.push(avrgBlue / scale);
            tempArray.push(255);
        }
    }
    return new Uint8ClampedArray(tempArray);
}