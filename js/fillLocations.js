export function fillLocations(rects, Locations) {
    for (var i = 0; i < rects.length; i++) {
        var locationObj = {
            x: rects[i][0][0],
            y: rects[i][1][0],
            width: rects[i][0][1] - rects[i][0][0],
            height: rects[i][1][1] - rects[i][1][0]
        };

        Locations.push(locationObj);
    }
}