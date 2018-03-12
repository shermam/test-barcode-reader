export function histogram(data, max) {
    var i;
    var hist = [];
    for (i = 0; i <= max; i++) {
        hist[i] = 0;
    }
    for (i = 0; i < data.length; i++) {
        hist[data[i]] = hist[data[i]] + 1;
    }
    return hist;
}

