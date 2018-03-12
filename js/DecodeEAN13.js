export function DecodeEAN13(string) {
    if (string.length !== 12) return false;
    var leftSide = string.slice(0, 6);
    var trigger = false;
    var rightSide = string.slice(6, string.length);
    var i;
    for (i = 0; i < leftSide.length; i++) {
        leftSide[i] = leftSide[i].join("");
        if (leftSide[i].length !== 4) {
            trigger = true;
            break;
        }
    }
    if (trigger) return false;
    for (i = 0; i < rightSide.length; i++) {
        rightSide[i] = rightSide[i].join("");
        if (rightSide[i].length !== 4) {
            trigger = true;
            break;
        }
    }
    if (trigger) return false;
    var decodeFormat = [];
    for (i = 0; i < leftSide.length; i++) {
        if (typeof EAN13Encoding.L[leftSide[i]] !== 'undefined') {
            decodeFormat.push("L");
        } else if (typeof EAN13Encoding.G[leftSide[i]] !== 'undefined') {
            decodeFormat.push("G");
        } else {
            trigger = true;
            break;
        }
    }
    if (trigger) return false;
    var resultArray = [];
    if (typeof EAN13Encoding.formats[decodeFormat.join("")] === 'undefined') return false;
    resultArray.push(EAN13Encoding.formats[decodeFormat.join("")]);
    for (i = 0; i < leftSide.length; i++) {
        if (typeof EAN13Encoding[decodeFormat[i]][leftSide[i]] === 'undefined') {
            trigger = true;
            break;
        }
        resultArray.push(EAN13Encoding[decodeFormat[i]][leftSide[i]]);
    }
    if (trigger) return false;
    for (i = 0; i < rightSide.length; i++) {
        if (typeof EAN13Encoding.R[rightSide[i]] === 'undefined') {
            trigger = true;
            break;
        }
        resultArray.push(EAN13Encoding.R[rightSide[i]]);
    }
    if (trigger) return false;
    var weight = 3;
    var sum = 0;
    for (i = resultArray.length - 2; i >= 0; i--) {
        sum += resultArray[i] * weight;
        if (weight === 3) {
            weight = 1;
        } else {
            weight = 3;
        }
    }
    sum = (10 - sum % 10) % 10;
    if (resultArray[resultArray.length - 1] === sum) {
        return resultArray.join("");
    } else {
        return false;
    }
}
