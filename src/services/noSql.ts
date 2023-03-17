import IUserServices from "./IUserServices";

class teste implements IUserServices {
	async findAll(): Promise<any[]> {
		throw new Error("Method not implemented.");
	}
	async registerEmail({ name, email }: Partial<any>): Promise<Partial<any>> {
		throw new Error("Method not implemented.");
	}
}
