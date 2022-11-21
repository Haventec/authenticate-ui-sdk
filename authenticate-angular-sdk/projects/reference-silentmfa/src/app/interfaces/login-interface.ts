export interface ILoginResponse {
    accessToken: {
        type: string;
        token: string;
    };
    authKey: string;
}

export interface ILogin {
    username: string;
    password: string;
}