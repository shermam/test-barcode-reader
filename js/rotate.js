function Rotate(data, width, height, rotation) {
    var newData = [];
    var x, y;
    switch (rotation) {
        case 90:
            for (x = 0; x < width * 4; x += 4) {
                for (y = width * 4 * (height - 1); y >= 0; y -= width * 4) {
                    newData.push(data[x + y]);
                    newData.push(data[x + y + 1]);
                    newData.push(data[x + y + 2]);
                    newData.push(data[x + y + 3]);
                }
            }
            break;
        case -90:
            for (x = width * 4 - 4; x >= 0; x -= 4) {
                for (y = 0; y < data.length; y += width * 4) {
                    newData.push(data[x + y]);
                    newData.push(data[x + y + 1]);
                    newData.push(data[x + y + 2]);
                    newData.push(data[x + y + 3]);
                }
            }
            break;
        case 180:
            for (y = width * 4 * (height - 1); y >= 0; y -= width * 4) {
                for (x = width * 4 - 4; x >= 0; x -= 4) {
                    newData.push(data[x + y]);
                    newData.push(data[x + y + 1]);
                    newData.push(data[x + y + 2]);
                    newData.push(data[x + y + 3]);
                }
            }
    }
    return new Uint8ClampedArray(newData);
}