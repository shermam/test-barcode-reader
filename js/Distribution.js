import { availableFormats } from "./availableFormats.js";

export function Distribution(totalBinArray, type) {
    var testData = 0;
    var result = [];
    var totalBars;
    var total;
    var maxLength;
    var k, i, j;
    var blackMax;
    var whiteMax;
    var wideAvrg;
    var narrowAvrg;
    var prevPos;
    var wideValues;
    var max;

    type = availableFormats.indexOf(type);

    if (type === 0) {
        total = 11;
        totalBars = 6;
        maxLength = 4;
    } else if (type === 1) {
        total = 9;
        totalBars = 6;
        maxLength = 4;
    } else if (type === 2) {
        total = 12;
        totalBars = 9;
    } else if (type === 3) {
        total = 7;
        totalBars = 4;
        maxLength = 4;
    } else if (type === 6) {
        totalBars = 7;
    }
    for (k = 0; k < totalBinArray.length; k++) {
        var BinArray = totalBinArray[k];
        var sum = 0;
        var counter = 0;
        var tempBin = [];
        var narrowArr = [];
        var wideArr = [];
        if (type === 6) {
            var upperTolerance = 1.5;
            var lowerTolerance = 1 / 2;
            if (BinArray.length !== 7) return [];
            if (k === 0 || k === totalBinArray.length - 1) {
                whiteMax = [
                    [0, 0],
                    [0, 0]
                ];
                blackMax = [0, 0];
                for (i = 0; i < BinArray.length; i++) {
                    if (i % 2 === 0) {
                        if (BinArray[i] > blackMax[0]) {
                            blackMax[0] = BinArray[i];
                            blackMax[1] = i;
                        }
                    } else {
                        if (BinArray[i] > whiteMax[0][0]) {
                            whiteMax[0][0] = BinArray[i];
                            prevPos = whiteMax[0][1];
                            whiteMax[0][1] = i;
                            i = prevPos - 1;
                            continue;
                        }
                        if (BinArray[i] > whiteMax[1][0] && i !== whiteMax[0][1]) {
                            whiteMax[1][0] = BinArray[i];
                            whiteMax[1][1] = i;
                        }
                    }
                }
                if (SecureCodabar) {
                    wideAvrg = whiteMax[0][0] + whiteMax[1][0] + blackMax[0];
                    wideAvrg /= 3;
                    wideValues = [whiteMax[0][0], whiteMax[1][0], blackMax[0]];
                    for (i = 0; i < wideValues.length; i++) {
                        if (wideValues[i] / wideAvrg > upperTolerance || wideValues[i] / wideAvrg < lowerTolerance) return [];
                    }
                    narrowAvrg = 0;
                    for (i = 0; i < BinArray.length; i++) {
                        if (i === blackMax[1] || i === whiteMax[0][1] || i === whiteMax[1][1]) continue;
                        narrowAvrg += BinArray[i];
                    }
                    narrowAvrg /= 4;
                    for (i = 0; i < BinArray.length; i++) {
                        if (i === blackMax[1] || i === whiteMax[0][1] || i === whiteMax[1][1]) continue;
                        if (BinArray[i] / narrowAvrg > upperTolerance || BinArray[i] / narrowAvrg < lowerTolerance) return [];
                    }
                }
                for (i = 0; i < BinArray.length; i++) {
                    if (i === blackMax[1] || i === whiteMax[0][1] || i === whiteMax[1][1]) {
                        tempBin.push(1);
                    } else {
                        tempBin.push(0);
                    }
                }
            } else {
                blackMax = [0, 0];
                whiteMax = [0, 0];
                for (i = 0; i < BinArray.length; i++) {
                    if (i % 2 === 0) {
                        if (BinArray[i] > blackMax[0]) {
                            blackMax[0] = BinArray[i];
                            blackMax[1] = i;
                        }
                    } else {
                        if (BinArray[i] > whiteMax[0]) {
                            whiteMax[0] = BinArray[i];
                            whiteMax[1] = i;
                        }
                    }
                }
                if (blackMax[0] / whiteMax[0] > 1.55) {
                    var tempArray = blackMax;
                    blackMax = [tempArray, [0, 0],
                        [0, 0]
                    ];
                    for (i = 0; i < BinArray.length; i++) {
                        if (i % 2 === 0) {
                            if (BinArray[i] > blackMax[1][0] && i !== blackMax[0][1]) {
                                blackMax[1][0] = BinArray[i];
                                prevPos = blackMax[1][1];
                                blackMax[1][1] = i;
                                i = prevPos - 1;
                                continue;
                            }
                            if (BinArray[i] > blackMax[2][0] && i !== blackMax[0][1] && i !== blackMax[1][1]) {
                                blackMax[2][0] = BinArray[i];
                                blackMax[2][1] = i;
                            }
                        }
                    }
                    if (SecureCodabar) {
                        wideAvrg = blackMax[0][0] + blackMax[1][0] + blackMax[2][0];
                        wideAvrg /= 3;
                        for (i = 0; i < blackMax.length; i++) {
                            if (blackMax[i][0] / wideAvrg > upperTolerance || blackMax[i][0] / wideAvrg < lowerTolerance) return [];
                        }
                        narrowAvrg = 0;
                        for (i = 0; i < BinArray.length; i++) {
                            if (i === blackMax[0][1] || i === blackMax[1][1] || i === blackMax[2][1]) continue;
                            narrowAvrg += BinArray[i];
                        }
                        narrowAvrg /= 4;
                        for (i = 0; i < BinArray.length; i++) {
                            if (i === blackMax[0][1] || i === blackMax[1][1] || i === blackMax[2][1]) continue;
                            if (BinArray[i] / narrowAvrg > upperTolerance || BinArray[i] / narrowAvrg < lowerTolerance) return [];
                        }
                    }
                    for (i = 0; i < BinArray.length; i++) {
                        if (i === blackMax[0][1] || i === blackMax[1][1] || i === blackMax[2][1]) {
                            tempBin.push(1);
                        } else {
                            tempBin.push(0);
                        }
                    }
                } else {
                    if (SecureCodabar) {
                        wideAvrg = blackMax[0] + whiteMax[0];
                        wideAvrg /= 2;
                        if (blackMax[0] / wideAvrg > 1.5 || blackMax[0] / wideAvrg < 0.5) return [];
                        if (whiteMax[0] / wideAvrg > 1.5 || whiteMax[0] / wideAvrg < 0.5) return [];
                        narrowAvrg = 0;
                        for (i = 0; i < BinArray.length; i++) {
                            if (i === blackMax[1] || i === whiteMax[1]) continue;
                            narrowAvrg += BinArray[i];
                        }
                        narrowAvrg /= 5;
                        for (i = 0; i < BinArray.length; i++) {
                            if (i === blackMax[1] || i === whiteMax[1]) continue;
                            if (BinArray[i] / narrowAvrg > upperTolerance || BinArray[i] / narrowAvrg < lowerTolerance) return [];
                        }
                    }
                    for (i = 0; i < BinArray.length; i++) {
                        if (i === blackMax[1] || i === whiteMax[1]) {
                            tempBin.push(1);
                        } else {
                            tempBin.push(0);
                        }
                    }
                }
            }
            result.push(tempBin);
            continue;
        }
        if (type === 4 || type === 5) {
            max = [
                [0, 0],
                [0, 0]
            ];
            for (i = 0; i < BinArray.length; i++) {
                if (!isFinite(BinArray[i])) return [];
                if (BinArray[i] > max[0][0]) {
                    max[0][0] = BinArray[i];
                    prevPos = max[0][1];
                    max[0][1] = i;
                    i = prevPos - 1;
                }
                if (BinArray[i] > max[1][0] && i !== max[0][1]) {
                    max[1][0] = BinArray[i];
                    max[1][1] = i;
                }
            }
            if (Secure2Of5) {
                wideAvrg = max[0][0] + max[1][0];
                wideAvrg /= 2;
                if (max[0][0] / wideAvrg > 1.3 || max[0][0] / wideAvrg < 0.7) return [];
                if (max[1][0] / wideAvrg > 1.3 || max[1][0] / wideAvrg < 0.7) return [];
                narrowAvrg = 0;
                for (i = 0; i < BinArray.length; i++) {
                    if (i === max[0][1] || i === max[1][1]) continue;
                    narrowAvrg += BinArray[i];
                }
                narrowAvrg /= 3;
                for (i = 0; i < BinArray.length; i++) {
                    if (i === max[0][1] || i === max[1][1]) continue;
                    if (BinArray[i] / narrowAvrg > 1.3 || BinArray[i] / narrowAvrg < 0.7) return [];
                }
            }
            for (i = 0; i < BinArray.length; i++) {
                if (i === max[0][1] || i === max[1][1]) {
                    tempBin.push(1);
                    continue;
                }
                tempBin.push(0);
            }
            result.push(tempBin);
            continue;
        }
        while (counter < totalBars) {
            sum += BinArray[counter];
            counter++;
        }
        if (type === 2) {
            var indexCount = [];
            blackMax = [
                [0, 0],
                [0, 0]
            ];
            whiteMax = [0, 0];
            for (j = 0; j < BinArray.length; j++) {
                if (j % 2 === 0) {
                    if (BinArray[j] > blackMax[0][0]) {
                        blackMax[0][0] = BinArray[j];
                        prevPos = blackMax[0][1];
                        blackMax[0][1] = j;
                        j = prevPos;
                    }
                    if (BinArray[j] > blackMax[1][0] && j !== blackMax[0][1]) {
                        blackMax[1][0] = BinArray[j];
                        blackMax[1][1] = j;
                    }
                } else {
                    if (BinArray[j] > whiteMax[0]) {
                        whiteMax[0] = BinArray[j];
                        whiteMax[1] = j;
                    }
                }
            }
            if (whiteMax[0] / blackMax[0][0] > 1.5 && whiteMax[0] / blackMax[1][0] > 1.5) {
                blackMax = [
                    [0, 0],
                    [0, 0]
                ];
                for (j = 0; j < BinArray.length; j++) {
                    if (j % 2 !== 0) {
                        if (BinArray[j] > blackMax[0][0] && j !== whiteMax[1]) {
                            blackMax[0][0] = BinArray[j];
                            prevPos = blackMax[0][1];
                            blackMax[0][1] = j;
                            j = prevPos;
                        }
                        if (BinArray[j] > blackMax[1][0] && j !== blackMax[0][1] && j !== whiteMax[1]) {
                            blackMax[1][0] = BinArray[j];
                            blackMax[1][1] = j;
                        }
                    }
                }
            }
            wideAvrg = blackMax[0][0] + blackMax[1][0] + whiteMax[0];
            wideAvrg /= 3;
            if (blackMax[0][0] / wideAvrg > 1.6 || blackMax[0][0] / wideAvrg < 0.4) return [];
            if (blackMax[1][0] / wideAvrg > 1.6 || blackMax[1][0] / wideAvrg < 0.4) return [];
            if (whiteMax[0] / wideAvrg > 1.6 || whiteMax[0] / wideAvrg < 0.4) return [];
            narrowAvrg = 0;
            for (i = 0; i < BinArray.length; i++) {
                if (i === blackMax[0][1] || i === blackMax[1][1] || i === whiteMax[1]) continue;
                narrowAvrg += BinArray[i];
            }
            narrowAvrg /= 6;
            for (i = 0; i < BinArray.length; i++) {
                if (i === blackMax[0][1] || i === blackMax[1][1] || i === whiteMax[1]) continue;
                if (BinArray[i] / narrowAvrg > 1.6 || BinArray[i] / narrowAvrg < 0.4) return [];
            }
            for (j = 0; j < BinArray.length; j++) {
                if (j === blackMax[0][1] || j === blackMax[1][1] || j === whiteMax[1]) {
                    tempBin.push(2);
                } else {
                    tempBin.push(1);
                }
            }
            result.push(tempBin);
            continue;
        }
        if (type === 3) {
            max = [
                [0, 0],
                [0, 0],
                [0, 0]
            ];
            for (j = 0; j < BinArray.length; j++) {
                if (BinArray[j] > max[0][0]) {
                    max[0][0] = BinArray[j];
                    prevPos = max[0][1];
                    max[0][1] = j;
                    j = prevPos;
                }
                if (BinArray[j] > max[1][0] && j !== max[0][1]) {
                    max[1][0] = BinArray[j];
                    prevPos = max[1][1];
                    max[1][1] = j;
                    j = prevPos;
                }
                if (BinArray[j] > max[2][0] && j !== max[0][1] && j !== max[1][1]) {
                    max[2][0] = BinArray[j];
                    max[2][1] = j;
                }
            }
            if (max[0][0] / max[1][0] >= 3) {
                narrowAvrg = 0;
                for (j = 0; j < BinArray.length; j++) {
                    if (j === max[0][1]) continue;
                    narrowAvrg += BinArray[j];
                }
                narrowAvrg /= 3;
                for (j = 0; j < BinArray.length; j++) {
                    if (j === max[0][1]) continue;
                    if (BinArray[j] / narrowAvrg < 0.02 || BinArray[j] / narrowAvrg > 3) return {
                        data: [],
                        correction: 0
                    };
                }
                if (max[0][0] / narrowAvrg < 2.2 || max[0][0] / narrowAvrg > 6) return {
                    data: [],
                    correction: 0
                };
                for (j = 0; j < BinArray.length; j++) {
                    if (j === max[0][1]) {
                        tempBin.push(4);
                    } else {
                        tempBin.push(1);
                    }
                }
                result.push(tempBin);
            } else if (max[0][0] / max[2][0] > 2) {
                wideAvrg = max[0][0] + max[1][0];
                wideAvrg /= 5;
                if (max[0][0] / (wideAvrg * 3) < 0.02 || max[0][0] / (wideAvrg * 3) > 3) return {
                    data: [],
                    correction: 0
                };
                if (max[1][0] / (wideAvrg * 2) < 0.02 || max[1][0] / (wideAvrg * 2) > 3) return {
                    data: [],
                    correction: 0
                };
                narrowAvrg = 0;
                for (j = 0; j < BinArray.length; j++) {
                    if (j === max[0][1] || j === max[1][1]) continue;
                    narrowAvrg += BinArray[j];
                }
                narrowAvrg /= 2;
                for (j = 0; j < BinArray.length; j++) {
                    if (j === max[0][1] || j === max[1][1]) continue;
                    if (BinArray[j] / narrowAvrg < 0.02 || BinArray[j] / narrowAvrg > 3) return {
                        data: [],
                        correction: 0
                    };
                }
                for (j = 0; j < BinArray.length; j++) {
                    if (j === max[0][1]) {
                        tempBin.push(3);
                    } else if (j === max[1][1]) {
                        tempBin.push(2);
                    } else {
                        tempBin.push(1);
                    }
                }
                result.push(tempBin);
            } else {
                if (max[0][1] % 2 === max[1][1] % 2 && max[0][1] % 2 === max[2][1] % 2) {
                    var modMem = max[0][1] % 2;
                    max[2] = [0, 0];
                    for (j = 0; j < BinArray.length; j++) {
                        if (j % 2 === modMem) continue;
                        if (BinArray[j] > max[2][0]) {
                            max[2][0] = BinArray[j];
                            max[2][1] = j;
                        }
                    }
                }
                wideAvrg = max[0][0] + max[1][0] + max[2][0];
                wideAvrg /= 3;
                for (j = 0; j < max.length; j++) {
                    if (max[j][0] / wideAvrg < 0.02 || max[j][0] / wideAvrg > 3) return {
                        data: [],
                        correction: 0
                    };
                }
                var narrow = 0;
                for (j = 0; j < BinArray.length; j++) {
                    if (j === max[0][1] || j === max[1][1] || j === max[2][1]) continue;
                    narrow = BinArray[j];
                }
                if (wideAvrg / narrow < 0.02 || wideAvrg / narrow > 3) return {
                    data: [],
                    correction: 0
                };
                for (j = 0; j < BinArray.length; j++) {
                    if (j === max[0][1] || j === max[1][1] || j === max[2][1]) {
                        tempBin.push(2);
                    } else {
                        tempBin.push(1);
                    }
                }
                result.push(tempBin);
            }
            for (j = 0; j < tempBin.length; j++) {
                testData += Math.abs(tempBin[j] - (BinArray[j] / sum) * total);
            }
            continue;
        }
        counter = 0;
        while (counter < totalBars) {
            tempBin.push((BinArray[counter] / sum) * total);
            counter++;
        }
        counter = 0;
        while (counter < totalBars) {
            tempBin[counter] = tempBin[counter] > maxLength ? maxLength : tempBin[counter];
            tempBin[counter] = tempBin[counter] < 1 ? 1 : tempBin[counter];
            tempBin[counter] = Math.round(tempBin[counter]);
            counter++;
        }
        if (type === 3) {
            var checking = 0;
            for (i = 0; i < tempBin.length; i++) {
                checking += tempBin[i];
            }
            if (checking > 7) {
                max = 0;
                var hitIndex = 0;
                for (i = 0; i < tempBin.length; i++) {
                    if (tempBin[i] > max) {
                        max = tempBin[i];
                        hitIndex = i;
                    }
                }
                tempBin[hitIndex] = max - (checking - 7);
            }
        }
        if (type === 3) {
            for (i = 0; i < tempBin.length; i++) {
                testData += Math.abs(tempBin[i] - (BinArray[i] / sum) * total);
            }
        }
        result.push(tempBin);
    }
    if (type === 3) {
        return {
            data: result,
            correction: testData
        };
    } else {
        return result;
    }
}