const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {mongoDB} = require('./db/db.js');

dotenv.config();


const app = express();

// global middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:`http://localhost:3000`,credentials: true}));

// routes to be added
// app.use('/api/auth',authRoutes);
// app.use('/api/tasks',taskRoutes);

app.use((err,req,res,next)=>{
  console.log(err.stack);
  res.status(500).json({error: 'internal server error'});
});

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
  mongoDB();
  console.log(`server is running on the port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
})

