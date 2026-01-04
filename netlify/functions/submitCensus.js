require("dotenv").config();
const { MongoClient } = require("mongodb");

let cachedClient = null;

async function connectToDB() {
    if (cachedClient) return cachedClient;

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    cachedClient = client;
    return client;
}

exports.handler = async (event) => {

    // ✅ Handle CORS preflight
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: ""
        };
    }

    // ❌ Reject non-POST (after OPTIONS is handled)
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        const data = JSON.parse(event.body);

        const client = await connectToDB();
        const db = client.db(process.env.MONGO_DB_NAME);

        const result = await db.collection("census").insertOne({
            ...data,
            createdAt: new Date()
        });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                message: "Census submitted successfully",
                insertedId: result.insertedId
            })
        };

    } catch (err) {
        console.error("Submit error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Internal Server Error"
            })
        };
    }
};
