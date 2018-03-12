export function greyScale(data) {
    var i;
    for (i = 0; i < data.length; i += 4) {
        var max = 0;
        var min = 255;
        max = data[i] > max ? data[i] : max;
        max = data[i + 1] > max ? data[i + 1] : max;
        max = data[i + 2] > max ? data[i + 2] : max;
        min = data[i] < min ? data[i] : min;
        min = data[i + 1] < min ? data[i + 1] : min;
        min = data[i + 2] < min ? data[i + 2] : min;
        data[i] = data[i + 1] = data[i + 2] = (max + min) / 2;
    }
}