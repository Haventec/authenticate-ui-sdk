import { IResponseStatus } from "./response.interface";

export interface IAddDeviceResponse {
    responseStatus: IResponseStatus;
}

export interface IAddDevice {
    username: string;
}

export class IAddDeviceVo {
    applicationUuid: string;
    username: string;
    deviceName: string;
}
