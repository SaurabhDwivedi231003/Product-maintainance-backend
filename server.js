const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth'); // Import your middleware here
require('dotenv').config();

const app = express();
   
// Middleware  
app.use(bodyParser.json());
app.use(cors());  
       
// Routes  
app.use('/api/auth', authRoutes);
app.use('/api/products', authMiddleware, productRoutes); // Use your middleware here



//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));