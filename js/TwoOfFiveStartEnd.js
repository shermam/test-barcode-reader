export function TwoOfFiveStartEnd(values, start) {
    if (values.length < 5 || values.length > 6) return false;
    var maximum = 0;
    var TwoOfFiveMax = [0, 0];
    var u;
    for (u = 0; u < values.length; u++) {
        if (values[u] > maximum) {
            maximum = values[u];
            TwoOfFiveMax[0] = u;
        }
    }
    maximum = 0;
    for (u = 0; u < values.length; u++) {
        if (u === TwoOfFiveMax[0]) continue;
        if (values[u] > maximum) {
            maximum = values[u];
            TwoOfFiveMax[1] = u;
        }
    }
    if (start) {
        return TwoOfFiveMax[0] + TwoOfFiveMax[1] === 2;
    } else {
        return TwoOfFiveMax[0] + TwoOfFiveMax[1] === 2;
    }
}
