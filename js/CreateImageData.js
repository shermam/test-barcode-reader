export function CreateImageData(Image) {
    Image.data = new Uint8ClampedArray(Image.width * Image.height * 4);
    var Converter;
    var x, y;
    for (y = 0; y < Image.height; y++) {
        for (x = 0; x < Image.width; x++) {
            Converter = y * 4 * Image.width;
            Image.data[Converter + x * 4] = Image.table[x][y][0];
            Image.data[Converter + x * 4 + 1] = Image.table[x][y][1];
            Image.data[Converter + x * 4 + 2] = Image.table[x][y][2];
            Image.data[Converter + x * 4 + 3] = Image.table[x][y][3];
        }
    }
}