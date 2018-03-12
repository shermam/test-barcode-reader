import { Intersects } from "./intersects.js";

export function maxLocalization(max, maxPos, data, Image) {
    var originalMax = max;
    var rects = [];
    var x, y, i;
    do {
        var startX = maxPos % Image.width;
        var startY = (maxPos - startX) / Image.width;
        var minY = 0;
        var maxY = Image.height;
        var minX = 0;
        var maxX = Image.width - 1;
        for (y = startY; y < Image.height - 1; y++) {
            if (Image.table[startX][y + 1][0] === 0) {
                maxY = y;
                break;
            }
        }
        for (y = startY; y > 0; y--) {
            if (Image.table[startX][y - 1][0] === 0) {
                minY = y;
                break;
            }
        }
        for (x = startX; x < Image.width - 1; x++) {
            if (Image.table[x + 1][startY][0] === 0) {
                maxX = x;
                break;
            }
        }
        for (x = startX; x > 0; x--) {
            if (Image.table[x - 1][startY][0] === 0) {
                minX = x;
                break;
            }
        }
        for (y = minY * Image.width; y <= maxY * Image.width; y += Image.width) {
            for (x = minX; x <= maxX; x++) {
                data[y + x] = 0;
            }
        }
        var newRect = [
            [minX, maxX],
            [minY, maxY]
        ];
        for (i = 0; i < rects.length; i++) {
            if (Intersects(newRect, rects[i])) {
                if (rects[i][0][1] - rects[i][0][0] > newRect[0][1] - newRect[0][0]) {
                    rects[i][0][0] = rects[i][0][0] < newRect[0][0] ? rects[i][0][0] : newRect[0][0];
                    rects[i][0][1] = rects[i][0][1] > newRect[0][1] ? rects[i][0][1] : newRect[0][1];
                    newRect = [];
                    break;
                } else {
                    rects[i][0][0] = rects[i][0][0] < newRect[0][0] ? rects[i][0][0] : newRect[0][0];
                    rects[i][0][1] = rects[i][0][1] > newRect[0][1] ? rects[i][0][1] : newRect[0][1];
                    rects[i][1][0] = newRect[1][0];
                    rects[i][1][1] = newRect[1][1];
                    newRect = [];
                    break;
                }
            }
        }
        if (newRect.length > 0) {
            rects.push(newRect);
        }
        max = 0;
        maxPos = 0;
        var newMaxPos = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i] > max) {
                max = data[i];
                maxPos = i;
            }
        }
    } while (max > originalMax * 0.70);
    return rects;
}