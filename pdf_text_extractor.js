const pdf = require('pdf-parse');

const data = items[0].binary.data;
const buffer = Buffer.from(data.data, 'base64');

return pdf(buffer).then(function(data) {
  return [
    {
      json: {
        text: data.text,
      }
    }
  ];
});
