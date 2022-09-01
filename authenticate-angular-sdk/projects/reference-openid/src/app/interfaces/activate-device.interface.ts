import { IAccessToken } from "./access-token.interface";
import { IResponseStatus } from "./response.interface";

export interface IActivateDeviceResponse {
    responseStatus: IResponseStatus;
    accessToken: IAccessToken;
}
export interface IActivateDevice {
    activationToken: string;
    hashedPin: string;
}

export interface IActivateDeviceVo {
    activationToken: string;
    applicationUuid: string;
    deviceUuid: string;
    username: string;
    hashedPin: string;
}
