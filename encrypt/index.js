const express = require("express");
const { execFile } = require("child_process");
const path = require("path");
const axios = require("axios");
const app = express();
const port = 5000; // Backend runs on port 5000

app.get("/run-exe", async (req, res) => {
  try {
    const command = "genkey";
    const args = ["Dxvv0919", "123456", "sk.key", "pk.key", "rl.key"];

    const exePath = path.resolve(__dirname, "encForWeb");

    // Check if the file exists and is executable
    const fs = require("fs");
    if (!fs.existsSync(exePath)) {
      return res.status(404).send(`Executable not found at path: ${exePath}`);
    }

    execFile(
      exePath.resolve(__dirname, "encForWeb"),
      [command, ...args],
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          res.status(500).send(`Error: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          res.status(500).send(`Stderr: ${stderr}`);
          return;
        }

        console.log(`Stdout: ${stdout}`);
        res.send(`Output: ${stdout}`);
      }
    );
  } catch (error) {
    console.error(`Caught error: ${error.message}`);
    res.status(500).send(`Caught error: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
