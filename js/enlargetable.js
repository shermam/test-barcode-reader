import { CreateImageData } from "./CreateImageData.js";

export function EnlargeTable(h, w, Image) {
    var TempArray = [];
    var x, y, i;
    for (x = 0; x < Image.width; x++) {
        TempArray = [];
        for (y = 0; y < Image.height; y++) {
            for (i = 0; i < h; i++) {
                TempArray.push(Image.table[x][y]);
            }
        }
        Image.table[x] = TempArray.slice();
    }
    TempArray = Image.table.slice();
    for (x = 0; x < Image.width; x++) {
        for (i = 0; i < w; i++) {
            Image.table[x * w + i] = TempArray[x].slice();
        }
    }
    Image.width = Image.table.length;
    Image.height = Image.table[0].length;
    CreateImageData(Image);
}