import { ImgProcessing } from "./imageprocessing.js";
import { ScaleHeight } from "./scaleheight.js";
import { otsu } from "./otsu.js";
import { yStraighten } from "./yStraighten.js";
import { BinaryString } from "./BinaryString.js";
import { EnlargeTable } from "./EnlargeTable.js";

export function Main(Image, ScanImage, FormatPriority, Multiple) {
    var Locations = [];
    var allTables = [];
    ImgProcessing(Image, ScanImage, allTables, Locations);
    var allResults = [];
    var tempObj;
    var tempData;
    var hist;
    var val;
    var thresh;
    var start;
    var end;
    var z, i;
    for (z = 0; z < allTables.length; z++) {
        Image = allTables[z];
        var scaled = ScaleHeight(30, Image);
        var variationData;
        var incrmt = 0;
        var format = "";
        var first = true;
        var eanStatistics = {};
        var eanOrder = [];
        var Selection = false;
        do {
            tempData = scaled.subarray(incrmt, incrmt + Image.width * 4);
            hist = [];
            for (i = 0; i < 256; i++) {
                hist[i] = 0;
            }
            for (i = 0; i < tempData.length; i += 4) {
                val = Math.round((tempData[i] + tempData[i + 1] + tempData[i + 2]) / 3);
                hist[val] = hist[val] + 1;
            }
            thresh = otsu(hist, tempData.length / 4);
            start = thresh < 41 ? 1 : thresh - 40;
            end = thresh > 254 - 40 ? 254 : thresh + 40;
            variationData = yStraighten(tempData, start, end, Image);
            Selection = BinaryString(variationData, Image, FormatPriority);
            if (Selection.string) {
                format = Selection.format;
                tempObj = Selection;
                Selection = Selection.string;
                if (format === "EAN-13") {
                    if (typeof eanStatistics[Selection] === 'undefined') {
                        eanStatistics[Selection] = {
                            count: 1,
                            correction: tempObj.correction
                        };
                        eanOrder.push(Selection);
                    } else {
                        eanStatistics[Selection].count = eanStatistics[Selection].count + 1;
                        eanStatistics[Selection].correction = eanStatistics[Selection].correction + tempObj.correction;
                    }
                    Selection = false;
                }
            } else {
                Selection = false;
            }
            incrmt += Image.width * 4;
        } while (!Selection && incrmt < scaled.length);
        if (Selection && format !== "EAN-13") allResults.push({
            Format: format,
            Value: Selection
        });
        if (format === "EAN-13") Selection = false;
        if (!Selection) {
            EnlargeTable(4, 2, Image);
            incrmt = 0;
            scaled = ScaleHeight(20, Image);
            do {
                tempData = scaled.subarray(incrmt, incrmt + Image.width * 4);
                hist = [];
                for (i = 0; i < 256; i++) {
                    hist[i] = 0;
                }
                for (i = 0; i < tempData.length; i += 4) {
                    val = Math.round((tempData[i] + tempData[i + 1] + tempData[i + 2]) / 3);
                    hist[val] = hist[val] + 1;
                }
                thresh = otsu(hist, tempData.length / 4);
                start = thresh < 40 ? 0 : thresh - 40;
                end = thresh > 255 - 40 ? 255 : thresh + 40;
                variationData = yStraighten(tempData, start, end, Image);
                Selection = BinaryString(variationData, Image, FormatPriority);
                if (Selection.string) {
                    format = Selection.format;
                    tempObj = Selection;
                    Selection = Selection.string;
                    if (format === "EAN-13") {
                        if (typeof eanStatistics[Selection] === 'undefined') {
                            eanStatistics[Selection] = {
                                count: 1,
                                correction: tempObj.correction
                            };
                            eanOrder.push(Selection);
                        } else {
                            eanStatistics[Selection].count = eanStatistics[Selection].count + 1;
                            eanStatistics[Selection].correction = eanStatistics[Selection].correction + tempObj.correction;
                        }
                        Selection = false;
                    }
                } else {
                    Selection = false;
                }
                incrmt += Image.width * 4;
            } while (!Selection && incrmt < scaled.length);
            if (format === "EAN-13") {
                var points = {};
                for (var key in eanStatistics) {
                    eanStatistics[key].correction = eanStatistics[key].correction / eanStatistics[key].count;
                    var pointTemp = eanStatistics[key].correction;
                    pointTemp -= eanStatistics[key].count;
                    pointTemp += eanOrder.indexOf(key);
                    points[key] = pointTemp;
                }
                var minPoints = Number.POSITIVE_INFINITY;
                var tempString = "";
                for (var point in points) {
                    if (points[point] < minPoints) {
                        minPoints = points[point];
                        tempString = key;
                    }
                }
                if (minPoints < 11) {
                    Selection = tempString;
                } else {
                    Selection = false;
                }
            }
            if (Selection) allResults.push({
                Format: format,
                Value: Selection,
                bBox: Locations[z],
            });
        }
        if (allResults.length > 0 && !Multiple) break;
    }
    return allResults;
}
