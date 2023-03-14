import { Knex, knex } from 'knex';
import 'dotenv/config';

const config: Knex.Config = {
	client: process.env.DB_CLIENT,
	connection: {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	}
};

const knexInstance = knex(config);

export default knexInstance;
