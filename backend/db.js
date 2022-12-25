import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
dotenv.config();
export default {
connect: () => { 
    mongoose.connect('mongodb+srv://KAO:Npes3501@cluster6-1.owxnmdq.mongodb.net/?retryWrites=true&w=majority', {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then((res) => console.log("mongo db connection created"));
 }
};