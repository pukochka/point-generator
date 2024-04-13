const port = 3000;

const fs = require('fs');
const express = require('express');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.post('*', function (req, res) {
  try {
    const { signals, name } = req.body;

    const data = new Uint8Array(Object.values(signals));

    const buffer = Buffer.from(data.buffer);

    fs.writeFile(name + '.rti', buffer, (err) => {
      if (err) {
        console.error(err);
      } else {
        res.send({ result: true });
      }
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(port);
