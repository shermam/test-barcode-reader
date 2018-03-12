export function Decode2Of5(string) {
    var result = "";
    var i;
    for (i = 0; i < string.length; i++) {
        if (TwoOfFiveEncoding.indexOf(string[i].join("")) === -1) return false;
        result += TwoOfFiveEncoding.indexOf(string[i].join(""));
    }
    return result;
}