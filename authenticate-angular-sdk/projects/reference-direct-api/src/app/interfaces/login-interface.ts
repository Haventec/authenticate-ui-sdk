import { IResponseStatus } from "./response.interface";

export interface ILoginResponse {
    responseStatus: IResponseStatus;
}

export interface ILogin {
    username: string;
    hashedPin: string;
}

export interface ILoginVo {
    applicationUuid: string;
    username: string;
    authKey: string;
    deviceUuid: string;
    hashedPin: string;
}