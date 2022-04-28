const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { listen } = require("express/lib/application");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.04xuj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const itemsCollection = client.db("perfume_Gallery").collection("products");

    app.get("/items", async (req, res) => {
      const query = {};
      const cursor = itemsCollection.find(query);
      const items = await cursor.toArray();
      res.send(items);
    });
  } finally {
  }
}

run().catch(console.dir);

//use middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("running my node Server");
});

app.listen(port, () => {
  console.log("server is running");
});
