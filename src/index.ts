import 'reflect-metadata';
import './shared/container';
import express from 'express';
import router from './router';
import cors from 'cors';
import 'dotenv/config';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.listen(port, () => {
	console.log(`Server is running on port ${port}\nhttp://localhost:${port}`);
});
