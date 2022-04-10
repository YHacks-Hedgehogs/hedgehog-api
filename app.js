const express = require('express');

const app = express();

const PORT = process.env.PORT || 4000;

app.express

app.get('/', 
  (req, res) => {
    res.send('Hello, World!');
  }
);

app.listen(PORT, 
  () => {
    console.log(`Evently listening on http://localhost:${PORT}/`);
  }
);
