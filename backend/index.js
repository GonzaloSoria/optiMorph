const { chromium } = require("playwright");
const fs = require('fs');
const axios = require('axios');

async function getImageWeight(url) {
    try {
        const response = await axios.head(url);
        const bytesWeight = response.headers['content-length'];
        const kbWeight = bytesWeight / 1024;
        const mbWeight = (kbWeight / 1024).toFixed(3);
        return mbWeight;
    } catch (error) {
        console.error(`Error al obtener el weight de la image ${url}: ${error.message}`);
        return null;
    }
}

async function jsonProcess(path) {
    try {
        const jsonContent = fs.readFileSync(path, 'utf-8');
        const data = JSON.parse(jsonContent);

        for (const image of data) {
            if (image.url) {
                const weight = await getImageWeight(image.url);
                if (weight !== null) {
                    image.mbWeight = weight;
                }
            } else {
                console.error('La propiedad "url" no está definida en un objeto de image.');
            }
        }

        fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');

        console.log('Proceso completado con éxito.');
    } catch (error) {
        console.error(`Error al procesar el archivo JSON: ${error.message}`);
    }
}

( async () => {
    const browser = await chromium.launch({
        headless: true
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.lenovo.com/us/en/pc/');
    await page.waitForLoadState('domcontentloaded');

    const imagesUrls = await page.evaluate(() => {
        const images = [];
        const items = document.querySelectorAll('img');

        for (const item of items) {
            images.push({'url': item.src});
        }

        return images;
    })

    fs.writeFileSync('images.json', JSON.stringify(imagesUrls, null, 2))

    const jsonPath = './images.json';
    await jsonProcess(jsonPath);

    await browser.close();
})();
