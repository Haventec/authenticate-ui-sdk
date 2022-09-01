import { IAccessToken } from "./access-token.interface";
import { IResponseStatus } from "./response.interface";

export interface IActivateUserResponse {
    responseStatus: IResponseStatus;
    accessToken: IAccessToken;
}
export interface IActivateUser {
    activationToken: string;
    hashedPin: string;
}

export interface ActivateUserVo {
    activationToken: string;
    applicationUuid: string;
    username: string;
    hashedPin: string;
    deviceName: string;
}
