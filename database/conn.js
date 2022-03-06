const mongoose=require('mongoose')
const db=process.env.DB;

mongoose.connect(db,{
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(()=>{
     console.log(`DB Connected`);
}).catch((err)=>{
      console.log(err)
})