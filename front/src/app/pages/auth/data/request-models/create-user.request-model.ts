import { UserRoleEnum } from "../enums/user-role.enum";
import { IAuthUserRequestModel } from "./auth-user.request-model";

export interface ICreateUserRequestModel extends IAuthUserRequestModel {
	name: string;
	role: UserRoleEnum;
}