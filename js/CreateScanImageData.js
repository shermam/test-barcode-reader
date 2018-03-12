export function CreateScanImageData() {
    ScanImage.data = new Uint8ClampedArray(ScanImage.width * ScanImage.height * 4);
    var Converter;
    var x, y;
    for (y = 0; y < ScanImage.height; y++) {
        for (x = 0; x < ScanImage.width; x++) {
            Converter = y * 4 * ScanImage.width;
            ScanImage.data[Converter + x * 4] = ScanImage.table[x][y][0];
            ScanImage.data[Converter + x * 4 + 1] = ScanImage.table[x][y][1];
            ScanImage.data[Converter + x * 4 + 2] = ScanImage.table[x][y][2];
            ScanImage.data[Converter + x * 4 + 3] = ScanImage.table[x][y][3];
        }
    }
}