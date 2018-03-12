export function CreateTable(Image) {
    Image.table = [];
    var tempArray = [];
    var i, j;
    for (i = 0; i < Image.width * 4; i += 4) {
        tempArray = [];
        for (j = i; j < Image.data.length; j += Image.width * 4) {
            tempArray.push([Image.data[j], Image.data[j + 1], Image.data[j + 2], Image.data[j + 3]]);
        }
        Image.table.push(tempArray);
    }
}