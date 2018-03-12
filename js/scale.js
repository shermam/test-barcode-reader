export function Scale(data, width, height) {
    var newData = [];
    var x, y;
    for (y = 0; y < data.length; y += width * 8) {
        for (x = 0; x < width * 4; x += 8) {
            var r = (data[y + x] + data[y + x + 4] + data[y + width * 4 + x] + data[y + width * 4 + x + 4]) / 4;
            newData.push(r);
            var g = (data[y + x + 1] + data[y + x + 4 + 1] + data[y + width * 4 + x + 1] + data[y + width * 4 + x + 4 + 1]) / 4;
            newData.push(g);
            var b = (data[y + x + 2] + data[y + x + 4 + 2] + data[y + width * 4 + x + 2] + data[y + width * 4 + x + 4 + 2]) / 4;
            newData.push(b);
            newData.push(255);
        }
    }
    return new Uint8ClampedArray(newData);
}