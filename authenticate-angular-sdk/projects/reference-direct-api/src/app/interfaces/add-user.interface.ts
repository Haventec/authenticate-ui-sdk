import { IResponseStatus } from "./response.interface";

export interface IAddUserResponse {
    responseStatus: IResponseStatus;
}

export interface IAddUser {
    email: string;
    username: string;
}

export interface IAddUserVo {
    applicationUuid: string;
    email: string;
    username: string;
}