export function CheckCode39(string) {
    var trigger = true;
    if (typeof Code39Encoding[string[0].join("")] === 'undefined') return false;
    if (Code39Encoding[string[0].join("")].character !== "*") return false;
    if (typeof Code39Encoding[string[string.length - 1].join("")] === 'undefined') return false;
    if (Code39Encoding[string[string.length - 1].join("")].character !== "*") return false;
    for (i = 1; i < string.length - 1; i++) {
        if (typeof Code39Encoding[string[i].join("")] === 'undefined') {
            trigger = false;
            break;
        }
    }
    return trigger;
}