import express from 'express';

const app = express();

// TODO: WebSocket connection

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
});
  
app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000');
});