import path from "path";
import guessRoute from './routes/scoreCard'
import express from "express";
import cors from "cors";
import db2 from './db';
import routes from './routes';
import mongoose from 'mongoose';




db2.connect();
const app = express();
app.use('/', routes);
app.use(express.json());
// app.use(cors());
// init middleware
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}
app.use('/api', guessRoute)
// define routes
app.get("/api", (req, res) => {
  // send the request back to the client
  console.log("GET /api");
  res.send({ message: "Hello from the server!" }).status(200);
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

// define server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
    console.log("1111111111111111111111111111")
    // await deleteDB();
    // await saveUser(57, "Ric");
    // await saveUser(108, "Sandy");
    // await saveUser(77, "Peter");
});
