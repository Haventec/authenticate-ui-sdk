import { IResponseStatus } from "./response.interface";

export interface IChangePinResponse {
    responseStatus: IResponseStatus;
}

export interface IChangePin {
    username: string;
}

export interface IChangePinVo {
    username: string;
    applicationUuid: string;
    deviceUuid: string;
}
