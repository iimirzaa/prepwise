import express from 'express';
import Logger from './utils/logger.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import AuthRouter from './routes/auth.routes.js';
import connectDB from './config/db.js';
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', {
    stream: {
        write: (message) => {

            Logger.info(message.trim())
        }
    }
}));
app.use('/prepwise/auth', AuthRouter);
connectDB().then(() => {
    try {
        app.listen(process.env.PORT, () => {
            Logger.info(`Server running at ${process.env.PORT}`);
        })
    } catch (error) {
        Logger.error("Failed to start the server", { error: error.message, stack: error.stack });
        process.exit(1);

    }

});

