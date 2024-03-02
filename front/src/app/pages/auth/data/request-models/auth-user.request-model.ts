import { UserRoleEnum } from "../enums/user-role.enum";

export interface IAuthUserRequestModel {
	login: string;
	password: string;
	name: string;
	role: UserRoleEnum;
}