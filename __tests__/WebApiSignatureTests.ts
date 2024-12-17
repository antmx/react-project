
import { describe, expect, test } from "@jest/globals";
import WebApiSignature from "../src/Services/WebApiSignature";

describe('WebApiSignature', () => {

    //let _items: number[];

    beforeEach(() => {

        //_items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    test("toSecureUrl returns valid URL", function () {

        let endPointUrl = "https://localhost:44301/v1/foo";
        let apiSig = new WebApiSignature(endPointUrl);

        // clientId = P5IQ4D05G9AJK58V482U8KIG1MJ3WLIC
        // client secret = GXXQB1PDBTJF727SB9HPTNBF7CFSZER5G27JO8R3EBK3C1YIZH54EUQM00SPWSPN
        let result = apiSig.toSecureUrl("GXXQB1PDBTJF727SB9HPTNBF7CFSZER5G27JO8R3EBK3C1YIZH54EUQM00SPWSPN");
        // https://localhost:44301/v1/foo?requestId=3886ec85-4173-4d8d-8545-cc3b6824a0d1&requestTimestamp=2024-12-12T00%3A16%3A24Z&uri=https%3A%2F%2Flocalhost%3A44301%2Fv1%2Ffoo&signature=EGnG3MZqBGQ5v9nGGa4fnPc6W14xWDqzI7cDcKRFTnk%3D

        let endPointUrlRegex = new RegExp("^" + endPointUrl + "?");
        expect(result).toMatch(endPointUrlRegex);

        let requestIdRegex = /\?requestId=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}?/;
        expect(result).toMatch(requestIdRegex);

        let requestTimestampRegex = /&requestTimestamp=[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}%3A[0-9]{2}%3A[0-9]{2}Z?/;
        expect(result).toMatch(requestTimestampRegex);

        let uriRegex = new RegExp("&uri=" + encodeURIComponent(endPointUrl));
        expect(result).toMatch(uriRegex);

        let signatureRegex = /&signature=.+/;
        expect(result).toMatch(signatureRegex);
    });
});
