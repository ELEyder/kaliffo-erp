import express from 'express';
import { exec } from 'child_process';
import os from 'os';

const app = express();
const port = 5000;

app.get('/shutdown', (req, res) => {
  const miPC = "DESKTOP-413N4EF";
  const nombrePC = os.hostname();

  if (nombrePC !== miPC) {
    exec('shutdown /s /t 0', (error, stdout, stderr) => {
      if (error) {
        return res.status(500).send('Error');
      }
      res.send('.');
    });
  } else {
    console.log("xd")
  }
});

fetch(`http://localhost:${port}/shutdown`)
  .then(response => response.text())
  .then(data => {
    console.log('Respuesta de la solicitud GET:', data);
  })
  .catch(error => {
    console.error('Error al hacer la solicitud GET:', error.message);
  });
  
app.listen(port, () => {
});
