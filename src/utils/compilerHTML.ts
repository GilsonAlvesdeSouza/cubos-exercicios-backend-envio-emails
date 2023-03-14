import handlebars from 'handlebars';
import fs from 'fs/promises';

const compilerHTML = async (arquivo: string, context: object) => {
	const html = await fs.readFile(arquivo);
	const template = handlebars.compile(html.toString());
	return template(context);
};

export default compilerHTML;
