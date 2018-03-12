export function CheckEan13(values, middle) {
    if (middle) {
        if (values.length !== 5) return false;
    } else {
        if (values.length !== 3) return false;
    }
    var avrg = 0;
    var i;
    for (i = 0; i < values.length; i++) {
        avrg += values[i];
    }
    avrg /= values.length;
    for (i = 0; i < values.length; i++) {
        if (values[i] / avrg < 0.5 || values[i] / avrg > 1.5) return false;
    }
    return true;
}