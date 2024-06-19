const express = require("express");
const { execFile } = require("child_process");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const app = express();
const port = 5000; // Backend runs on port 5000

app.get("/encrypt", async (req, res) => {
  try {
    const command = "encrypt";
    const args = [
      "Dxvv0919",
      "123456",
      "pk.key",
      "rl.key",
      "DaoXuanVinh",
      "cipher.bin",
    ];

    const exePath = path.resolve(__dirname, "encForWeb");

    // Check if the file exists and is executable
    const fs = require("fs");
    if (!fs.existsSync(exePath)) {
      return res.status(404).send(`Executable not found at path: ${exePath}`);
    }

    execFile("./encForWeb", [command, ...args], (error, stdout, stderr) => {
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
    });
  } catch (error) {
    console.error(`Caught error: ${error.message}`);
    res.status(500).send(`Caught error: ${error.message}`);
  }
});

app.get("/decrypt", (req, res) => {
  try {
    const command = "decrypt";
    const args = ["Dxvv0919", "123456", "cipher.bin", "plaintext.txt"];

    const exePath = path.resolve(__dirname, "encForWeb");

    // Check if the file exists and is executable
    const fs = require("fs");
    if (!fs.existsSync(exePath)) {
      return res.status(404).send(`Executable not found at path: ${exePath}`);
    }

    execFile("./encForWeb", [command, ...args], (error, stdout, stderr) => {
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
    });
  } catch (error) {
    console.error(`Caught error: ${error.message}`);
    res.status(500).send(`Caught error: ${error.message}`);
  }
});

app.get("/sendCipherFile", async (req, res) => {
  const cipherfile = "./cipher.bin";
  const form = new FormData();
  const fs = require("fs");

  form.append("cipherfile", fs.createReadStream(cipherfile));
  console.log(cipherfile)
  try {
    const response = await axios.post("http://localhost:8888/upload", form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    res.status(200).send(`File sent successfully: ${response.data}`);
  } catch (error) {
    res.status(500).send(`Failed to send file: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
