export function CheckInterleaved(values, start) {
    var average = 0;
    var i;
    for (i = 0; i < values.length; i++) {
        average += values[i];
    }
    average /= 4;
    if (start) {
        if (values.length !== 4) return false;
        for (i = 0; i < values.length; i++) {
            if (values[i] / average < 0.5 || values[i] / average > 1.5) return false;
        }
        return true;
    } else {
        if (values.length !== 3) return false;
        var max = 0;
        var pos;
        for (i = 0; i < values.length; i++) {
            if (values[i] > max) {
                max = values[i];
                pos = i;
            }
        }
        if (pos !== 0) return false;
        if (values[0] / average < 1.5 || values[0] / average > 2.5) return false;
        for (i = 1; i < values.length; i++) {
            if (values[i] / average < 0.5 || values[i] / average > 1.5) return false;
        }
        return true;
    }
}