export interface IOpenIdParameters {
    redirect_uri: string;
    state: string;
    login_hint: string;
    nonce: string;
    htOidTxid: string;
    response_type: string;
    scope: string;
    client_id: string;
}
