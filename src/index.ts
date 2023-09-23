import express from 'express';
import bodyParser from 'body-parser'
import todo from './routes/todo'
const app=express()
const port=3000
 app.use(bodyParser.json());
 app.use('/todos',todo);
app.get('/',(req,res)=>{
console.log("hello");
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})