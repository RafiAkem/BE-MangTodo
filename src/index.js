const app = require("./app");

// Load environment variables
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

// Start server
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log(`For Android Emulator, use: http://10.0.2.2:${port}`);
});
