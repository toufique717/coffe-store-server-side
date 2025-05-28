const express = require('express');
require('dotenv').config()
const cors  = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

//zlEA5JAeMBC7hjom
//Coffe-master

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)
 
app.use(cors());
app.use(express.json());



 
// const uri = "mongodb+srv://Coffe-master:zlEA5JAeMBC7hjom@cluster0.mamyvkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mamyvkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const coffecollection = client.db('coffedb').collection('coffe');
    const  usercollection = client.db('coffedb').collection('user');

    app.get('/coffe',async (req, res) => {

      const cursor = coffecollection.find();
     
     const result = await cursor.toArray();
     res.send(result);
    })


     app.get('/coffe/:id',async (req, res) => {

       const id = req.params.id;
       const query = {_id:new ObjectId(id)}
       const result = await coffecollection.findOne(query);
       res.send(result);
    })


    app.put('/coffe/:id',async (req, res) => {

       const id = req.params.id;
        const filter ={_id: new ObjectId(id)}
        const options ={upsert:true};
        const updatedcoffe = req.body;
        const coffe ={
          $set:
          {
            
            name:updatedcoffe.name,
            name:updatedcoffe.quantity,
            name:updatedcoffe.supplier,
            name:updatedcoffe.taste,
            name:updatedcoffe.category,
            name:updatedcoffe.details,
            name:updatedcoffe.photo,
             
          }

          
        }

         const result =  await coffecollection.updateOne(filter,coffe)
         res.send(result)
    })

    app.post('/coffe',async (req, res) => {
     const newcoffe = req.body;
     console.log(newcoffe);
     const result = await coffecollection.insertOne(newcoffe);
     res.send(result);
    })


    app.get('/user',async (req, res) => {
        const cursor =  usercollection.find();
        const  users = await cursor.toArray();
         res.send(users);
    })


     app.delete('/coffe/:id',async (req, res) => {
      const id = req.params.id;
      const query ={_id: new ObjectId(id)}
     const result = await coffecollection.deleteOne(id);
     res.send(result);
    })
  
    app.post('/user',async (req, res) => {
     const user = req.body;
     console.log(user);
     const result = await  usercollection.insertOne(user);
     res.send(result);
    })


     app.delete('/user/:id',async (req, res) => {
      const id = req.params.id;
      const query ={_id: new ObjectId(id)}
     const result = await  usercollection.deleteOne(query);
     res.send(result);
    })




    //        app.patch('/user',async (req, res) => {

    //      const user = req.params.id;
    //     const filter ={email:user.email}
         
    //     const updatedoc={
    //       $set:
    //       {
            
    //        //name:updatedcoffe.name,
    //        lastLoggedAt:user.lastLoggedAt
             
             
    //       }

          
    //     }

    //      const result =  await  usercollection.updateOne(filter,updatedoc)
    //      res.send(result)
    // })
            app.patch('/user', async (req, res) => {
  const user = req.body;  // ✅ Get full user object from body
  const filter = { email: user.email };

  const updateDoc = {
    $set: {
      lastLoggedAt: user.lastLoggetAt  // ✅ Fix typo too!
    }
  };

  const result = await usercollection.updateOne(filter, updateDoc);
  res.send(result);
});

          





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send(' second timeeeeeeeeeeeeee  coffe making server is running')
})

app.listen(port, () => {
  console.log(`second time coffe making server is running  ${port}`)
})
