export function DecodeCode39(string) {
    var resultString = "";
    var special = false;
    var character = "";
    var specialchar = "";
    for (i = 1; i < string.length - 1; i++) {
        character = Code39Encoding[string[i].join("")].character;
        if (character === "$" || character === "/" || character === "+" || character === "%") {
            // if next character exists => this a special character
            if (i + 1 < string.length - 1) {
                special = true;
                specialchar = character;
                continue;
            }
        }
        if (special) {
            if (typeof ExtendedEncoding[specialchar + character] === 'undefined') { } else {
                resultString += ExtendedEncoding[specialchar + character];
            }
            special = false;
            continue;
        }
        resultString += character;
    }
    return resultString;
}