import { Code128Encoding } from "./Code128Encoding.js";

export function DecodeCode128(string) {
    var set = Code128Encoding[string[0].join("")];
    var symbol;
    var Code128Format = "Code128";
    var resultString = "";
    var i;
    for (i = 1; i < (string.length - 2); i++) {
        symbol = Code128Encoding[string[i].join("")][set];
        switch (symbol) {
            case "FNC1":
                if (i === 1) Code128Format = "GS1-128";
                break;
            case "FNC2":
            case "FNC3":
            case "FNC4":
                break;
            case "SHIFT_B":
                i++;
                resultString += Code128Encoding[string[i].join("")].B;
                break;
            case "SHIFT_A":
                i++;
                resultString += Code128Encoding[string[i].join("")].A;
                break;
            case "Code_A":
                set = "A";
                break;
            case "Code_B":
                set = "B";
                break;
            case "Code_C":
                set = "C";
                break;
            default:
                resultString += symbol;
        }
    }
    return {
        string: resultString,
        format: Code128Format
    };
}