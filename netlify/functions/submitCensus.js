const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

let cachedClient = null;

async function connectDB() {
    if (cachedClient) return cachedClient;

    const client = new MongoClient(uri, {
        tls: true,
        tlsAllowInvalidCertificates: true
    });
    await client.connect();
    cachedClient = client;
    return client;
}

exports.handler = async function (event) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Empty request body" })
            };
        }

        const payload = JSON.parse(event.body);

        // 🔒 Minimal validation
        if (!payload || typeof payload !== "object") {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid payload format" })
            };
        }

        const client = await connectDB();
        const db = client.db("nss_db");
        const collection = db.collection("village_census");

        const document = {
            familyDetails: payload.familyDetails || {},
            members: Array.isArray(payload.members) ? payload.members : [],
            farmDetails: payload.farmDetails || {},
            equipment: Array.isArray(payload.equipment) ? payload.equipment : [],
            cattle: Array.isArray(payload.cattle) ? payload.cattle : [],
            totalCattleIncome: payload.totalCattleIncome || 0,

            metadata: {
                submittedAt: new Date(),
                source: "Village Census Form",
                userAgent: event.headers["user-agent"] || "unknown"
            }
        };

        await collection.insertOne(document);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "Census data stored successfully"
            })
        };
    } catch (error) {
        console.error("Submit Error:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: "Server error while saving census data"
            })
        };
    }
};
