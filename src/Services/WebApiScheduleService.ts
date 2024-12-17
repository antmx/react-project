
import Schedule from "../DataTypes/Schedule";
import IScheduleService from "./IScheduleService";
import WebApiSvcBase from "./WebApiSvcBase";

export default class WebApiScheduleService extends WebApiSvcBase implements IScheduleService {

    async fetchAll(): Promise<Schedule[]> {

        let reqParts = super.BuildRequest("GET", "/Schedule/FetchAll");
        let secureUrl = reqParts[0];
        let reqInit = reqParts[1];
        let response = await fetch(secureUrl, reqInit);
        let json = await response.json();

        return new Array<Schedule>(...json.results);
    }
}
