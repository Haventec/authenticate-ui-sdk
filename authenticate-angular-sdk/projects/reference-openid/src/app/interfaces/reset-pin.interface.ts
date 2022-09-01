import { IAccessToken } from "./access-token.interface";
import { IResponseStatus } from "./response.interface";

export interface IResetPinResponse {
    responseStatus: IResponseStatus;
    accessToken: IAccessToken
}

export interface IResetPin {
    hashedPin: string;
    resetPinToken: string;
}

export class IResetPinVo {
    username: string;
    applicationUuid: string;
    deviceUuid: string;
    hashedPin: string;
    resetPinToken: string;
}
