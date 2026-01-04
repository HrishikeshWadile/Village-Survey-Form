require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Mongo client
const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;
let client;

// Connect function
async function getClient() {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
    }
    return client;
}

// POST route to submit census
app.post("/submitCensus", async (req, res) => {
    try {
        const data = req.body;

        const mongoClient = await getClient();
        const db = mongoClient.db(dbName);

        const result = await db.collection("census").insertOne(data);

        res.status(200).json({ message: "Census submitted successfully", insertedId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
