export function DecodeCodaBar(string) {
    var result = "";
    var start = string[0].join("");
    var end = string[string.length - 1].join("");
    var i;
    if (!(CodaBarEncoding[start] === "A" || CodaBarEncoding[start] === "B" || CodaBarEncoding[start] === "C" || CodaBarEncoding[start] === "D")) return false;
    if (!(CodaBarEncoding[end] === "A" || CodaBarEncoding[end] === "B" || CodaBarEncoding[end] === "C" || CodaBarEncoding[end] === "D")) return false;
    for (i = 1; i < string.length - 1; i++) {
        if (typeof CodaBarEncoding[string[i].join("")] === 'undefined') return false;
        result += CodaBarEncoding[string[i].join("")];
    }
    return result;
}