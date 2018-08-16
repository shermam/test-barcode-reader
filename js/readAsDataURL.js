export function readAsDataURL(file) {

    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onload = _ => {
            resolve({
                content: reader.result,
                name: file.name,
                size: file.size
            })
        };
        reader.readAsDataURL(file);
    });
}