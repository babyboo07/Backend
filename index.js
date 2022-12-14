const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const videoRoute = require('./routes/video');
const categoryRoute =require('./routes/category');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios')

dotenv.config();
const app = express();
const PORT =  process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, 
    (err) => {
        if (err) console.log("Error: ", err)
        else console.log("DB Connected!");
    }
)

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(
	bodyParser.urlencoded({
		extended: false,
	}),
);

// Routes
app.use("/v1/auth", authRoute);

app.use("/v1/users", userRoute);

app.use("/v1/videos", videoRoute);

app.use("/v1/category", categoryRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
