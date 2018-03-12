import { Code128Encoding } from "./Code128Encoding.js";

export function CheckCode128(string) {
    var checksum = string[string.length - 2].join("");
    var i;
    checksum = Code128Encoding.value.indexOf(checksum);
    if (checksum === -1) return false;
    var summarizer = Code128Encoding.value.indexOf(string[0].join(""));
    if (summarizer === -1) return false;
    var startChar = Code128Encoding[string[0].join("")];
    if (typeof startChar === 'undefined') return false;
    if (startChar !== "A" && startChar !== "B" && startChar !== "C") return false;
    for (i = 1; i < (string.length - 2); i++) {
        summarizer += Code128Encoding.value.indexOf(string[i].join("")) * i;
        if (Code128Encoding.value.indexOf(string[i].join("")) === -1) return false;
    }
    return (summarizer % 103 === checksum);
}