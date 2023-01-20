import app from "./app.js";
import { createConnection } from "./database.js";

createConnection();

app.listen(3000, () => {
  console.log("server running on port 3000");
});
