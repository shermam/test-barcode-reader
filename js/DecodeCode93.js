export function DecodeCode93(string) {
    var resultString = "";
    var special = false;
    var character = "";
    var specialchar = "";
    for (i = 1; i < string.length - 3; i++) {
        character = Code93Encoding[string[i].join("")].character;
        if (character === "($)" || character === "(/)" || character === "(+)" || character === "(%)") {
            special = true;
            specialchar = character[1];
            continue;
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
