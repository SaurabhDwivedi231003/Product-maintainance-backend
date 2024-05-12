const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://saurabhdwivedi2310:12344321@cluster0.hkavumb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const config = require('../config.js');
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true }, 
    price: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    rating: { type: Number },
    createdAt: { type: Date, default: Date.now },
    company: { type: String, required: true }
  });
  
  const userSchema = new mongoose.Schema({
    username : { 
        type : String,
        required : true,
        unique : true , 
        trim : true,
        lowercase : true,
        minlength : 3 ,
        maxlenth : 30 ,
    },
    email : {
        type : String,
        required : true,
        unique : true ,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String ,
        required : true ,
        minlength : 6,
    }
    });

  const Product = mongoose.model('Product', productSchema);
  const User = mongoose.model('User', userSchema);
  
  module.exports = {
    User ,  Product
  };
