const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.post('/extract', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
});

app.get('/', (req, res) => {
  res.send('PDF Extractor API is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
