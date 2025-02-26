const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000
// Middleware to parse JSON request bodies
app.use(express.json())
app.use(cors());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q5jln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // await client.connect();

        // database 
        const database = client.db('TaskManager')
        const taskCollection = database.collection('tasks');
        // --------------------------------------------------------------------end points start here------------------------------------------------------------------------------

        // get all task for specific user
        app.get('/tasks', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const tasks = await taskCollection.find(query).toArray();
            res.send(tasks);
        })

        app.patch('/tasks', async (req, res) => {
            console.log('task changed successfully')
            const { _id, category } = req.body;
            console.log(_id, category);
            const result = await taskCollection.updateOne({ _id: new ObjectId(_id) }, { $set: { category: category } });
        })

        // add new task for specific user
        app.post('/tasks', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask)
            res.send(result)
        })
        app.delete('/tasks/:id', async(req, res) => {
            const id = req.params.id;
            const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        })

        // --------------------------------------------------------------------end points End here------------------------------------------------------------------------------
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', function (req, res) {
    res.send("task manager is running....................")
})

app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
})

