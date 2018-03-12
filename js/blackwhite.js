export function blackwhite(newData, Image, thresh) {
    for (var i = 0; i < newData.length; i++) {
        if (newData[i] < thresh) {
            Image.data[i * 4] = Image.data[i * 4 + 1] = Image.data[i * 4 + 2] = 0;
        } else {
            Image.data[i * 4] = Image.data[i * 4 + 1] = Image.data[i * 4 + 2] = 255;
        }
    }
}