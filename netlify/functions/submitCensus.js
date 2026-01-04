require("dotenv").config();
const { MongoClient } = require("mongodb");

let cachedClient = null;

async function connectToDB() {
    if (cachedClient) return cachedClient;

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    cachedClient = client;
    return client;
}

exports.handler = async (event) => {

    // ✅ HANDLE PREFLIGHT (THIS FIXES 405)
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

    // ❌ Reject non-POST AFTER OPTIONS
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        const data = JSON.parse(event.body);

        const client = await connectToDB();
        const db = client.db(process.env.MONGODB_DB_NAME);
        const collection = db.collection("submissions");

        await collection.insertOne({
            ...data,
            createdAt: new Date()
        });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ success: true })
        };

    } catch (err) {
        console.error("🔥 FUNCTION ERROR:", err);

        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                error: "Internal Server Error",
                message: err.message
            })
        };
    }
};
