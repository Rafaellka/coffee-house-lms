import { UserRoleEnum } from "../enums/user-role.enum";

export interface IUserResponseModel {
	name: string;
	role: UserRoleEnum;
	id: number;
}