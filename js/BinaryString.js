import { BinaryConfiguration } from "./BinaryConfiguration.js";
import { Distribution } from "./Distribution.js";
import { CheckCode128 } from "./CheckCode128.js";
import { DecodeCode128 } from "./DecodeCode128.js";

export function BinaryString(img, Image, FormatPriority) {
    var binaryString = [];
    var container = 255;
    var count = 0;
    var j, i;
    var success = false;

    for (j = 0; j < img.length - Image.width * 4; j += Image.width * 4) {
        var SlicedArray = img.subarray(j, j + Image.width * 4);
        binaryString = [];
        i = 0;
        while (SlicedArray[i] === 255) {
            i += 4;
        }
        while (i < SlicedArray.length) {
            count = 0;
            container = SlicedArray[i];
            while (SlicedArray[i] === container && i < SlicedArray.length) {
                count++;
                i += 4;
            }
            binaryString.push(count);
        }
        if (binaryString.length > 2 && binaryString[0] <= binaryString[1] / 10) {
            binaryString.splice(0, 2);
        }

        binaryString = BinaryConfiguration(binaryString, FormatPriority[0]);
        binaryString = Distribution(binaryString, FormatPriority[0]);

        if (typeof binaryString === 'undefined') continue;
        if (binaryString.length > 4 && CheckCode128(binaryString)) {

            binaryString = DecodeCode128(binaryString);
            success = true;
        }
        if (success) break;
    }

    return binaryString;
}