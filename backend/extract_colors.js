const { Jimp } = require('jimp');
const path = process.argv[2];

if (!path) {
    console.error('Please provide an image path');
    process.exit(1);
}

Jimp.read(path)
    .then(image => {
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        const pixels = [];

        // Sample pixels (every 10th pixel to save time)
        for (let x = 0; x < width; x += 10) {
            for (let y = 0; y < height; y += 10) {
                const hex = image.getPixelColor(x, y).toString(16).slice(0, -2).padStart(6, '0');
                pixels.push('#' + hex);
            }
        }

        // Simple dominant color logic
        const colorCounts = {};
        pixels.forEach(p => {
            colorCounts[p] = (colorCounts[p] || 0) + 1;
        });

        const sortedColors = Object.entries(colorCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(entry => entry[0]);

        console.log('DOMINANT_COLORS_START');
        sortedColors.forEach(c => console.log(c));
        console.log('DOMINANT_COLORS_END');
    })
    .catch(err => {
        console.error(err);
    });
