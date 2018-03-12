export function getMeasures(newData) {
    var min = newData[0];
    var i;
    for (i = 1; i < newData.length; i++) {
        min = min > newData[i] ? newData[i] : min;
    }
    var max = 0;
    var maxPos = 0;
    var avrgLight = 0;
    for (i = 0; i < newData.length; i++) {
        newData[i] = Math.round((newData[i] - min));
        avrgLight += newData[i];
        if (max < newData[i]) {
            max = newData[i];
            maxPos = i;
        }
    }
    avrgLight /= newData.length;

    return {
        min,
        max,
        maxPos,
        avrgLight
    }
}