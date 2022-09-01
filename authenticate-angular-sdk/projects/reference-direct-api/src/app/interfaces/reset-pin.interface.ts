import { IResponseStatus } from "./response.interface";

export interface IResetPinResponse {
    responseStatus: IResponseStatus;
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