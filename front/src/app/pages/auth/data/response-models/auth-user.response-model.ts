import { IUserResponseModel } from "./user.response-model";

export interface IAuthUserResponseModel {
	loggedIn: boolean;
	user: IUserResponseModel;
	status?: string;
}