import { Knex, knex } from 'knex';
import 'dotenv/config';

const config: Knex.Config = {
	client: process.env.MYSQL_CLIENT,
	connection: {
		host: process.env.MYSQL_HOST,
		port: Number(process.env.MYSQL_PORT),
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASS,
		database: process.env.MYSQL_NAME
	}
};

const knexInstanceMySQL = knex(config);

export default knexInstanceMySQL;
