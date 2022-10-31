const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Simple Node Express Running");
})

app.use(cors());
app.use(express.json())

const users = [
    { id: 1, name: 'khan', email: 'khan@gmail.com' },
    { id: 2, name: 'ali', email: 'ali@gmail.com' },
    { id: 3, name: 'akbar', email: 'akbar@gmail.com' },
]

//username: tanvirUser1
//password: 


const uri = "mongodb+srv://tanvirUser1:v6CGOSE0OWo00pki@cluster0.afkplob.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        // const user = { name: 'tanvir', email: 'tanvir@gmail.com' }
        // const result = await userCollection.insertOne(user)
        // console.log(result)

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({})
            const users = await cursor.toArray();
            res.send(users)
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            console.log(user)
            user._id = result.insertedId
            res.send(user)
        })
    }
    finally {

    }
}

run().catch(err => console.log(err))

// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) > 0);
//         res.send(filtered)
//     }
//     else {
//         res.send(users)
//     }
// })

// app.post('/users', (req, res) => {
//     const user = req.body;
//     console.log(user)
//     user.id = users.length + 1;
//     users.push(user)
//     console.log(user);
//     res.send(user)
// })

app.listen(port, () => {
    console.log(`simple node server running on port ${port}`)
})