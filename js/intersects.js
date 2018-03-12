export function Intersects(rectOne, rectTwo) {
    return (rectOne[0][0] <= rectTwo[0][1] &&
        rectTwo[0][0] <= rectOne[0][1] &&
        rectOne[1][0] <= rectTwo[1][1] &&
        rectTwo[1][0] <= rectOne[1][1]);
}