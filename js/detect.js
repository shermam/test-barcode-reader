import { Scale } from "./scale.js";
import { CreateTable } from "./createtable.js";
import { Main } from "./decodemain.js";

export function detect(e) {
    var width;
    var i;
    var ScanImage;
    var Image;
    var FormatPriority = ["Code128"];
    var Multiple = false;
    var FinalResult;

    ScanImage = {
        data: new Uint8ClampedArray(e.data.scan),
        width: e.data.scanWidth,
        height: e.data.scanHeight
    };

    Image = {
        data: Scale(ScanImage.data, ScanImage.width, ScanImage.height),
        width: ScanImage.width / 2,
        height: ScanImage.height / 2
    };


    CreateTable(Image);
    CreateTable(ScanImage);

    FinalResult = Main(Image, ScanImage, FormatPriority, Multiple);

    if (FinalResult.length > 0) {
        return ({
            id: e.data.id,
            result: FinalResult,
            success: true
        });
    } else {
        return ({
            id: e.data.id,
            result: FinalResult,
            success: false
        });
    }
};