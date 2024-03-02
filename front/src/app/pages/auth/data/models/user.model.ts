import { IUserResponseModel } from "../response-models/user.response-model";
import { UserRoleEnum } from "../enums/user-role.enum";

export class UserModel implements IUserResponseModel {
	public name: string;
	public role: UserRoleEnum;
	public id: number;

	constructor(data: IUserResponseModel) {
		this.name = data.name;
		this.role = data.role;
		this.id = data.id;
	}

}