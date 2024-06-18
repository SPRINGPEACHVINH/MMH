const express = require('express');
const { execFile } = require('child_process');
const app = express();
const port = 5000; // Backend runs on port 5000

app.get('/run-exe', (req, res) => {
    execFile("./encForWeb", (error, stdout, stderr) => console.log(stdout));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});