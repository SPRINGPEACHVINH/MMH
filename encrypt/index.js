const express = require('express');
const { execFile } = require('child_process');
const app = express();
const port = 5000; // Backend runs on port 5000

app.get('/run-exe', (req, res) => {
    const exePath = 'path_to_your_exe_file.exe';
    execFile(exePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing file: ${error}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        res.send(`Output: ${stdout}`);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});