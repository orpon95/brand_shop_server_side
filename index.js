const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


// middeleware
app.use(cors());
app.use(express.json());

// id and pass
// mdorpon95
// KvXpL33lAyMITtGH


// database start



const uri = "mongodb+srv://mdorpon95:KvXpL33lAyMITtGH@cluster0.ww7s5no.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


// database end

app.get("/", (req, res) => {
    res.send("brand server is running")
})

app.listen(port, () => {
    console.log(`brand server is running at port ${port}`)
})