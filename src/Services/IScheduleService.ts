import Schedule from "../DataTypes/Schedule";

/**
 * Provides methods for working with `Schedule` data from a data source (e.g. Web API, IndexedDB etc).
 */
export default interface IScheduleService {

    //fetchAll(): Schedule[];
    fetchAll(): Promise<Schedule[]>;
}
