const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from node mongo crud server');
});

// user: dbUser2 pass: fzXxS9H23BX3IOgc


const uri = "mongodb+srv://dbUser2:fzXxS9H23BX3IOgc@cluster0.ubvegtf.mongodb.net/?retryWrites=true&w=majority";

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
        const userCollection = client.db('nodeMongoCrud').collection('users');

        // to get data from the database
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const user = await cursor.toArray();
            res.send(user);
        });

        // to send data to the database
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(user);
        });

        // to delete data from the database
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Mongo server running on port ${port}`);
});