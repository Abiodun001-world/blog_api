const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 3000;

db.connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});