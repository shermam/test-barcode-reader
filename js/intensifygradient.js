export function IntensityGradient(data, width) {
    var newData = [];
    var max = Number.MIN_VALUE;
    var min = Number.MAX_VALUE;
    var x, y, i;
    for (y = 0; y < data.length; y += width * 4) {
        for (x = 0; x < width * 4; x += 4) {
            var horizontalDiff = 0;
            var verticalDiff = 0;
            for (i = 1; i < 2; i++) {
                if (x + i * 4 < width * 4) {
                    horizontalDiff = horizontalDiff + Math.abs(data[y + x] - data[y + x + i * 4]);
                }
                if (y + width * 4 * i < data.length) {
                    verticalDiff += verticalDiff + Math.abs(data[y + x] - data[y + x + width * 4 * i]);
                }
            }
            var diff = horizontalDiff - verticalDiff;
            max = diff > max ? diff : max;
            min = diff < min ? diff : min;
            newData.push(diff);
        }
    }
    if (min < 0) {
        for (i = 0; i < newData.length; i++) {
            newData[i] = newData[i] - min;
        }
        min = 0;
    }
    return newData;
}