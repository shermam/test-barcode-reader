export function BinaryConfiguration(binaryString, type) {
    var result = [];
    var binTemp = [];
    var count = 0;
    var bars;
    var len;
    var totalBars;
    var i;
    if (type === "Code128" || type === "Code93") {
        totalBars = 6;
        len = binaryString[0];
        if (type === "Code128") len /= 2;
        for (i = 0; i < binaryString.length; i++) {
            if (binaryString[i] > len * 6) {
                binaryString.splice(i, binaryString.length);
                break;
            }
        }
        do {
            if (binaryString.length === 7 && type === "Code128") {
                result.push(binaryString.splice(0, binaryString.length));
            } else {
                result.push(binaryString.splice(0, totalBars));
            }
            if (type === "Code93" && binaryString.length < 6) binaryString.splice(0, totalBars);
        } while (binaryString.length > 0);
    }
    if (type === "Code39") {
        totalBars = 9;
        len = binaryString[0];
        for (i = 0; i < binaryString.length; i++) {
            if (binaryString[i] > len * 5) {
                binaryString.splice(i, binaryString.length);
                break;
            }
        }
        do {
            result.push(binaryString.splice(0, totalBars));
            binaryString.splice(0, 1);
        } while (binaryString.length > 0);
    }
    if (type === "EAN-13") {
        totalBars = 4;
        len = binaryString[0];
        var secureCount = 0;
        for (i = 0; i < binaryString.length; i++) {
            if (binaryString[i] > len * 6) {
                binaryString.splice(i, binaryString.length);
                break;
            }
        }
        if (CheckEan13(binaryString.splice(0, 3), false)) secureCount++;
        count = 0;
        do {
            result.push(binaryString.splice(0, totalBars));
            count++;
            if (count === 6)
                if (CheckEan13(binaryString.splice(0, 5), true)) secureCount++;
        } while (result.length < 12 && binaryString.length > 0);
        if (CheckEan13(binaryString.splice(0, 3), false)) secureCount++;
        if (secureCount < 2) return [];
    }
    if (type === "2Of5") {
        totalBars = 5;
        len = binaryString[0] / 2;
        for (i = 0; i < binaryString.length; i++) {
            if (binaryString[i] > len * 5) {
                binaryString.splice(i, binaryString.length);
                break;
            }
        }
        var temp = binaryString.splice(0, 6);
        result.push(temp);
        do {
            binTemp = [];
            for (i = 0; i < totalBars; i++) {
                binTemp.push(binaryString.splice(0, 1)[0]);
                // binaryString.splice(0, 1)[0];
            }
            result.push(binTemp);
            if (binaryString.length === 5) result.push(binaryString.splice(0, 5));
        } while (binaryString.length > 0);
    }
    if (type === "Inter2Of5") {
        totalBars = 5;
        len = binaryString[0];
        for (i = 0; i < binaryString.length; i++) {
            if (binaryString[i] > len * 5) {
                binaryString.splice(i, binaryString.length);
                break;
            }
        }
        result.push(binaryString.splice(0, 4));
        var binTempWhite = [];
        do {
            binTemp = [];
            binTempWhite = [];
            for (i = 0; i < totalBars; i++) {
                binTemp.push(binaryString.splice(0, 1)[0]);
                binTempWhite.push(binaryString.splice(0, 1)[0]);
            }
            result.push(binTemp);
            result.push(binTempWhite);
            if (binaryString.length === 3) result.push(binaryString.splice(0, 3));
        } while (binaryString.length > 0);
    }
    if (type === "Codabar") {
        totalBars = 7;
        len = binaryString[0];
        for (i = 0; i < binaryString.length; i++) {
            if (binaryString[i] > len * 5) {
                binaryString.splice(i, binaryString.length);
                break;
            }
        }
        do {
            result.push(binaryString.splice(0, totalBars));
            binaryString.splice(0, 1);
        } while (binaryString.length > 0);
    }
    return result;
}