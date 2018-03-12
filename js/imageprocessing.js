import { greyScale } from "./greyscale.js";
import { IntensityGradient } from "./intensifygradient.js";
import { BoxFilter } from "./boxfilter.js";
import { otsu } from "./otsu.js";
import { CreateTable } from "./createtable.js";
import { maxLocalization } from "./maxlocalizatoin.js";
import { CreateImageData } from "./CreateImageData.js";
import { histogram } from "./histogram.js";
import { blackwhite } from "./blackwhite.js";
import { getMeasures } from "./measures.js";
import { fillLocations } from "./fillLocations.js";

export function ImgProcessing(Image, ScanImage, allTables, Locations) {

    var i;
    var x;
    var y;
    greyScale(Image.data);
    var newData = IntensityGradient(Image.data, Image.width);
    newData = BoxFilter(newData, Image.width, 15);
    var { min, max, maxPos, avrgLight } = getMeasures(newData);

    if (avrgLight < 15) {
        newData = BoxFilter(newData, Image.width, 8);
        var { min, max, maxPos, avrgLight } = getMeasures(newData);
    }
    var hist = histogram(newData, max);
    var thresh = otsu(hist, newData.length);
    blackwhite(newData, Image, thresh);
    CreateTable(Image);
    var rects = maxLocalization(max, maxPos, newData, Image);
    fillLocations(rects, Locations);

    for (i = 0; i < rects.length; i++) {
        var newTable = [];
        for (x = rects[i][0][0] * 2; x < rects[i][0][1] * 2; x++) {
            var tempArray = [];
            for (y = rects[i][1][0] * 2; y < rects[i][1][1] * 2; y++) {
                tempArray.push([ScanImage.table[x][y][0], ScanImage.table[x][y][1], ScanImage.table[x][y][2], 255]);
            }
            newTable.push(tempArray);
        }
        if (newTable.length < 1) continue;
        Image.table = newTable;
        Image.width = newTable.length;
        Image.height = newTable[0].length;
        CreateImageData(Image);
        allTables.push({
            table: newTable,
            data: new Uint8ClampedArray(Image.data),
            width: Image.width,
            height: Image.height
        });
    }
}