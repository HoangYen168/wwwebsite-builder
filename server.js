const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/templates/:template', (req, res) => {
  const template = req.params.template;
  res.sendFile(path.join(__dirname, `public/templates/${template}`));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
