require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

//Express app
const app = express();
const port = process.env.PORT || 8001;

//middlewares
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.use("/", (req, res) => {
    return res.json({ message: "This is backend server for the React app" });
});

app.use(errorHandler);

const startServer = () => {
    try {
        connectDB();
        app.listen(port, () => {
            console.log("Server is running on port 8001");
        });
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

startServer();