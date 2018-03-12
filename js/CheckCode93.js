export function CheckCode93(string) {
    var checkOne = string[string.length - 3].join("");
    var checkTwo = string[string.length - 2].join("");
    var failSafe = true;
    if (typeof Code93Encoding[checkOne] === 'undefined') return false;
    if (typeof Code93Encoding[checkTwo] === 'undefined') return false;
    var checkSum = Code93Encoding[checkOne].value;
    var weight = 1;
    var sum = 0;
    var i;
    for (i = string.length - 4; i > 0; i--) {
        failSafe = typeof Code93Encoding[string[i].join("")] === 'undefined' ? false : failSafe;
        if (!failSafe) break;
        sum += Code93Encoding[string[i].join("")].value * weight;
        weight++;
        if (weight > 20) weight = 1;
    }
    var firstCheck = sum % 47;
    var firstBool = firstCheck === checkSum;
    if (!firstBool) return false;
    if (!failSafe) return false;
    sum = firstCheck;
    weight = 2;
    checkSum = Code93Encoding[checkTwo].value;
    for (i = string.length - 4; i > 0; i--) {
        failSafe = typeof Code93Encoding[string[i].join("")] === 'undefined' ? false : failSafe;
        if (!failSafe) break;
        sum += Code93Encoding[string[i].join("")].value * weight;
        weight++;
        if (weight > 15) weight = 1;
    }
    var secondCheck = sum % 47;
    var secondBool = secondCheck === checkSum;
    return secondBool && firstBool;
}