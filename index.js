const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middeleware
app.use(cors());
app.use(express.json());

// id and pass



// database start



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ww7s5no.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
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

        // database and collection
        const database = client.db("userDB");
        const productCollection = database.collection("product");
        const cartCollection = database.collection("cart");

        // get api for whole added data
        app.get("/add",async(req,res)=>{
            const cursor = productCollection.find()
            const result = await cursor.toArray()
            res.send(result)

        })
        // get api for update from product
        app.get("/add/:id", async (req,res)=>{
            const id = req.params.id
            const query = {_id: new ObjectId(id)} 
            const result = await productCollection.findOne(query)
            res.send(result)
        })

        // [pst api for add product]

        app.post("/add", async (req, res) => {
            const newProduct = req.body;
            console.log(newProduct);
            const result = await productCollection.insertOne(newProduct)
            res.send(result)
        })
         

        // put api in product for update
        app.put("/add/:id",async (req,res)=>{
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)}
            const options = {upsert:true}
            const updatedProduct = req.body

            const setUpdatedProduct = {
                $set:{
                    image:updatedProduct.image,
                    name:updatedProduct.name,
                    brandName:updatedProduct.brandName,
                    type:updatedProduct.type,
                    price:updatedProduct.price,
                    short_description:updatedProduct.short_description,
                    rating_2:updatedProduct.rating_2
                }
            }
            const result =await productCollection.updateOne(filter,setUpdatedProduct,options)
            res.send(result)
        })



        // get api for mycart
        app.get("/cart",async(req,res)=>{
            const cursor = cartCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })





        // post api for my cart
        app.post("/cart",async(req,res)=>{
            const cartItem = req.body
            console.log(cartItem);
            const result = await cartCollection.insertOne(cartItem)
            res.send(result);
        })

        // delte api formy cart
        app.delete("/cart/:id",async(req,res)=>{
            const id = req.params.id
            // console.log("pls delte ", id)
            const query = {_id : (id)}
            const result = await cartCollection.deleteOne(query)
            res.send(result)
        })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
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