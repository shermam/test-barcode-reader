export function yStraighten(img, start, end, Image) {
    var average = 0;
    var threshold;
    var newImg = new Uint8ClampedArray(Image.width * (end - start + 1) * 4);
    var i, j;
    for (i = 0; i < newImg.length; i++) {
        newImg[i] = 255;
    }
    for (i = 0; i < Image.width * 4; i += 4) {
        threshold = end;
        average = (img[i] + img[i + 1] + img[i + 2]) / 3;
        if (i < Image.width * 4 - 4) {
            average += (img[i + 4] + img[i + 5] + img[i + 6]) / 3;
            average /= 2;
        }
        for (j = i; j < newImg.length; j += Image.width * 4) {
            if (average < threshold) {
                newImg[j] = newImg[j + 1] = newImg[j + 2] = 0;
            }
            threshold--;
        }
    }
    return newImg;
}