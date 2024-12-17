import Schedule from "../DataTypes/Schedule";
import IScheduleService from "./IScheduleService";
import WebApiSignature from "./WebApiSignature";
import WebApiSvcBase from "./WebApiSvcBase";

export default class WebApiScheduleService extends WebApiSvcBase implements IScheduleService {

    /**
     *
     */
    constructor(baseUrl: string, clientId: string, secretKey: string) {
        super(baseUrl, clientId, secretKey);

    }

    async fetchAll(): Promise<Schedule[]> {

        // let apiSig = new WebApiSignature(this._baseUrl + "/Schedule/FetchAll");
        // let secureUrl = apiSig.toSecureUrl(this._secretKey);

        // const headers: Headers = new Headers();
        // headers.set("X-Client-Id", this._clientId);
        // headers.set('Accept', 'application/json');

        // let reqInit: RequestInit = {
        //     headers: headers,
        //     method: "GET"
        // };

        let reqParts = super.BuildRequest("GET", "/Schedule/FetchAll");
        let secureUrl = reqParts[0];
        let reqInit = reqParts[1];
        let response = await fetch(secureUrl, reqInit);
        let json = await response.json();

        return new Array<Schedule>(
            ...json.results,
            //new Schedule(1, "", true, false, null)
        );
    }

}
