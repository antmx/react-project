
import { describe, expect, test } from "@jest/globals";
import WebApiScheduleService from "../src/Services/WebApiScheduleService";
import IScheduleService from "../src/Services/IScheduleService";

describe('WebApiScheduleService', () => {

    //let _items: number[];

    beforeEach(() => {

        //_items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    test.concurrent("Does something", async () => {

        let svc: IScheduleService = new WebApiScheduleService(
            //"https://localhost:44301/v1",
            "http://localhost:61377/v1", // Have to use http in tests as self-signed certs cause an error
            "P5IQ4D05G9AJK58V482U8KIG1MJ3WLIC",
            "GXXQB1PDBTJF727SB9HPTNBF7CFSZER5G27JO8R3EBK3C1YIZH54EUQM00SPWSPN");

        let schedules = await svc.fetchAll();

        expect(schedules).not.toBe(null);
        expect(schedules.length).toBeGreaterThan(0);
    });
});
