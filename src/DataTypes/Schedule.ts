
/**
 * Represents a Schedule.
 */
export default class Schedule {

    // [ScheduleID] [int] IDENTITY(1,1) NOT NULL,
    // [CreatedDate] [datetime] NOT NULL,
    // [CreatedByID] [int] NOT NULL,
    // [UpdatedDate] [datetime] NOT NULL,
    // [UpdatedByID] [int] NOT NULL,
    // [Deleted] [bit] NOT NULL,
    // [RowVersion] [timestamp] NOT NULL,
    // [Cron] [varchar](128) NOT NULL,
    // [ScheduleStatusID] [tinyint] NOT NULL,
    // [ModuleConfigurationID] [uniqueidentifier] NOT NULL,
    // [Enabled] [bit] NOT NULL,
    // [LastRunDate] [datetime] NULL,

    /**
     *
     */
    // constructor(
    //     scheduleId: number, cron: string, enabled: boolean, deleted: boolean, lastRunDate: Date | null
    // ) {
    //     this._scheduleId = scheduleId;
    //     this._cron = cron;
    //     this._enabled = enabled;
    //     this._deleted = deleted;
    //     this._lastRunDate = lastRunDate
    // }

    /**
     *
     */
    constructor() {

    }

    private _scheduleId!: number;
    // public get ScheduleId(): number {
    //     return this._scheduleId;
    // }
    // public set ScheduleId(v: number) {
    //     this._scheduleId = v;
    // }

    private _cron!: string;
    // public get Cron(): string {
    //     return this._cron;
    // }
    // public set Cron(v: string) {
    //     this._cron = v;
    // }

    private _enabled!: boolean;
    // public get Enabled(): boolean {
    //     return this._enabled;
    // }
    // public set Enabled(v: boolean) {
    //     this._enabled = v;
    // }

    private _deleted!: boolean;
    // public get Deleted(): boolean {
    //     return this._deleted;
    // }
    // public set Deleted(v: boolean) {
    //     this._deleted = v;
    // }

    private _lastRunDate!: Date | null;
    // public get LastRunDate(): Date | null {
    //     return this._lastRunDate;
    // }
    // public set LastRunDate(v: Date | null) {
    //     this._lastRunDate = v;
    // }

}
