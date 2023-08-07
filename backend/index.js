const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 3000 //as on 5173 our react app will be working

app.use(cors());
app.use(express.json());  //if we have to use req.body we have to use this middleware to deal with
//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`I-Notebook backend listening on port ${port}`)
})
