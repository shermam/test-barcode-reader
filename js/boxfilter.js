export function BoxFilter(data, width, radius) {
    var elements = [];
    var sum = [];
    var val;
    var x, y, i;
    for (x = 0; x < width; x++) {
        elements.push([]);
        sum.push(0);
        for (y = 0; y < (radius + 1) * width; y += width) {
            elements[elements.length - 1].push(data[x + y]);
            sum[sum.length - 1] = sum[sum.length - 1] + data[x + y];
        }
    }
    var newData = [];
    for (y = 0; y < data.length; y += width) {
        for (x = 0; x < width; x++) {
            var newVal = 0;
            var length = 0;
            for (i = x; i >= 0; i--) {
                newVal += sum[i];
                length++;
                if (length === radius + 1) break;
            }
            var tempLength = 0;
            for (i = x + 1; i < width; i++) {
                newVal += sum[i];
                length++;
                tempLength++;
                if (tempLength === radius) break;
            }
            length *= elements[0].length;
            newVal /= length;
            newData.push(newVal);
        }
        if (y - radius * width >= 0) {
            for (i = 0; i < elements.length; i++) {
                val = elements[i].shift();
                sum[i] = sum[i] - val;
            }
        }
        if (y + (radius + 1) * width < data.length) {
            for (i = 0; i < elements.length; i++) {
                val = data[i + y + (radius + 1) * width];
                elements[i].push(val);
                sum[i] = sum[i] + val;
            }
        }
    }
    return newData;
}