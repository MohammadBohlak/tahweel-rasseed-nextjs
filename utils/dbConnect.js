const mongoose = require('mongoose');

export default  async function dbConnect() {
    try {
      await mongoose.connect('mongodb+srv://mohammad:123@cluster0.s0eoj.mongodb.net/mydata' ,
      {useUnifiedTopology:true , useNewUrlParser:true});

      console.log('Connected successfully !')

    } catch (error) {
        console.log("field connected\n" , error)
    }
}

 