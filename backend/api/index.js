const { chromium } = require("playwright");
const axios = require('axios');
const fs = require('fs');

module.exports = async function (req, res) {
  try {
    // Obtener datos de la solicitud (si es necesario)
    // const requestData = req.body; 

    // Lógica de tu función principal
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
        images.push({ 'url': item.src });
      }

      return images;
    });

    const jsonPath = '/tmp/images.json'; // Utilizamos un directorio temporal en Vercel
    fs.writeFileSync(jsonPath, JSON.stringify(imagesUrls, null, 2));

    await jsonProcess(jsonPath);

    await browser.close();

    // Puedes enviar una respuesta si es necesario
    res.status(200).json({ message: 'Proceso completado con éxito' });
  } catch (error) {
    console.error(`Error en la función: ${error.message}`);
    // Envía una respuesta de error si es necesario
    res.status(500).json({ error: 'Error en la función' });
  }
};

async function getImageWeight(url) {
  try {
    const response = await axios.head(url);
    const bytesWeight = response.headers['content-length'];
    const kbWeight = bytesWeight / 1024;
    const mbWeight = (kbWeight / 1024).toFixed(3);
    return mbWeight;
  } catch (error) {
    console.error(`Error al obtener el peso de la imagen ${url}: ${error.message}`);
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
        console.error('La propiedad "url" no está definida en un objeto de imagen.');
      }
    }

    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');

    console.log('Proceso completado con éxito.');
  } catch (error) {
    console.error(`Error al procesar el archivo JSON: ${error.message}`);
  }
}
