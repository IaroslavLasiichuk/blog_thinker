const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Blog Thinker server');
  });

  app.listen(PORT, () => {
    console.log(`✅Server running on port http://localhost:${PORT}`);
  });
