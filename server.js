const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth'); // Import your middleware here
// const config = require('./config');
    
const app = express();
   
// Middleware  
app.use(bodyParser.json());
app.use(cors());  
       
// Routes  
app.use('/api/auth', authRoutes);
app.use('/api/products', authMiddleware, productRoutes); // Use your middleware here

// Database
// mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));