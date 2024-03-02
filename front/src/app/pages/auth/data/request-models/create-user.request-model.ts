import { UserRoleEnum } from "../enums/user-role.enum";

export interface ICreateUserRequestModel {
	login: string;
	password: string;
	name: string;
	role: UserRoleEnum;
}