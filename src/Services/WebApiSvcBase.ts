// import moment from 'moment';
// import crypto from 'crypto-js';
// import * as uuid from 'uuid';
import WebApiSignature from "./WebApiSignature"

/**
 * Base class for services that uses the Web API to access data.
 */
export default abstract class WebApiSvcBase {

    private _baseUrl: string;
    private _clientId: string;
    private _secretKey: string;

    /**
     *
     */
    constructor(baseUrl: string, clientId: string, secretKey: string) {

        this._baseUrl = baseUrl;
        this._clientId = clientId;
        this._secretKey = secretKey;
    }

    protected BuildRequest(method: string, endpointPath: string): [secureUrl: string, reqInit: RequestInit] {

        let apiSig = new WebApiSignature(this._baseUrl + endpointPath);
        let secureUrl = apiSig.toSecureUrl(this._secretKey);

        const headers: Headers = new Headers();
        headers.set("X-Client-Id", this._clientId);
        headers.set('Accept', 'application/json');

        let reqInit: RequestInit = {
            headers: headers,
            method: method
        };

        return [secureUrl, reqInit];
    }
}

class requestHelper {

    /**
     * Replaces variable placeholders in a string that match the pattern {{variable}}
     * with values that that have been configured as variables.
     * @param {String} str A string such as part of a Url.
     * @returns {String} A string that has been updated with variables.
     */
    // replaceVariables(str: string): string {

    //     return str.replace(
    //         /\{\{([^}]+)\}\}/g,
    //         (match, $item) => {
    //             if ($item) {
    //                 let variable = pm.variables.get($item);
    //                 if (variable) {
    //                     return variable
    //                 }
    //             }
    //             return match;
    //         })
    // }

    /**
     * Creates a url with additional query parameters that comply with the APIs signature requirements.
     * @param {Object} signature The signature object that contains the required elements to build the Url.
     * @returns {String} A completed url.
     */
    // buildUrl(signature: WebApiSignature): string {

    //     return signature.FullUrl +
    //         '?requestId=' + encodeURIComponent(signature.RequestId) +
    //         '&requestTimestamp=' + encodeURIComponent(signature.UtcNow.format('yyyy-MM-DDTHH:mm:ssZ').replace('+00:00', 'Z')) +
    //         '&uri=' + encodeURIComponent(signature.FullUrl) +
    //         '&signature=' + encodeURIComponent(signature.HashInBase64);
    // }
}

class threadHelpers {

    /**
    * Creates a promise to send a request, initiate a callback and resolve.
    * @param pmo The Postman object responseible for making the sendRequest.
    * @param request The request to be sent.
    * @param callback The callback action to take.
    * @returns {Promise} A promise to complete a request.
    */
    // asyncSend(pmo, request, callback): Promise<any> {
    //     return new Promise(resolve => {
    //         pmo.sendRequest(request, (error, response) => {
    //             callback(error, response);
    //             resolve(1);
    //         });
    //     })
    // }
}

class auth {

    /**
     * Generates a new signature.
     * @param {Object} environment, the scoped postman environment.
     * @param {String} requestId, a unique Guid for the request.
     * @param {String} fullUrl, the complete url with any variables subsituted.
     * @return {Object} an object containing the requestId, fullUrl, datetime and hash of the signature.
     */
    // signatureGenerate(environment: Object, requestId: string, fullUrl: string): any {

    //     var now = moment().utc().format('yyyy-MM-DDTHH:mm:ssZ').replace('+00:00', 'Z');
    //     var rawString = requestId + now + fullUrl;
    //     var hash = crypto.HmacSHA256(rawString, environment.get('secretKey'));
    //     var hashInBase64 = crypto.enc.Base64.stringify(hash);

    //     let r = {
    //         requestId,
    //         fullUrl,
    //         now,
    //         hashInBase64
    //     };

    //     return r;
    // }

    /**
     * Sets the environment variables ready for use in requests.
     * @param environment the in-scope environment for the request
     */
    // signCurrentRequest(environment: any): void {

    //     var requestId = uuid.v4();
    //     environment.set('requestId', requestId);

    //     var fullUrl = pm.environment.get("baseUrl") + requestHelper.replaceVariables(pm.request.url.getPath());
    //     environment.set('fullUrl', fullUrl);

    //     var signedRequest = auth.signatureGenerate(environment, requestId, fullUrl);
    //     environment.set('requestTimestamp', signedRequest.now);
    //     environment.set('bodySignature', signedRequest.hashInBase64);
    //     environment.set('querySignature', encodeURIComponent(signedRequest.hashInBase64));
    // }

    /**
     * Signs into the Api and stores a bearer token for use in further requests.     
     * The call to retrieve the bearer token is asychronous and must be awaited to ensure 
     * that other requests can make use of the result.
     * @param pmo, the postman object that is responsible for making the final call
     */
    // async setAuthTokenAsync(pmo): Promise {
    //     var authSignedRequest = auth.signatureGenerate(pmo.environment, uuid.v4(), pmo.environment.get("baseUrl") + '/v1/auth/tokens');

    //     var authRequestBody = {
    //         'Email': pmo.environment.get('authEmail'),
    //         'Password': pmo.environment.get('authPassword'),
    //         'IpAddress': pmo.environment.get('authIP'),
    //         'RequestId': authSignedRequest.requestId,
    //         'RequestTimestamp': authSignedRequest.now,
    //         'Uri': authSignedRequest.fullUrl,
    //         'IgnoreSignature': false,
    //         'ReturnExceptions': true,
    //         'Signature': authSignedRequest.hashInBase64,
    //         'Locale': 'en-GB',
    //         'ProgrammeId': pmo.environment.get('programmeId')
    //     };

    //     var authResponseHandler = function (error, response) {

    //         if ((error !== undefined && error !== null) || response.code !== 200) {
    //             console.log('Error encountered in Pre-request script');
    //             if (error !== undefined && error !== null)
    //                 console.log(error);
    //             console.log(response);
    //             return;
    //         }

    //         var responseContent = response.json();
    //         pmo.environment.set('authToken', responseContent.results.token);
    //         console.log('set token: ' + responseContent.results.token);
    //     };

    //     var authRequest = {
    //         url: authSignedRequest.fullUrl,
    //         method: 'POST',
    //         header: {
    //             'Content-Type': 'application/json',
    //             'X-Client-Id': pmo.environment.get('x-clientId')
    //         },
    //         body: { mode: 'raw', raw: JSON.stringify(authRequestBody) }
    //     };

    //     await threadHelpers.asyncSend(pmo, authRequest, authResponseHandler);
    // }
}

class variables {

    /**
     * Makes an unauthenticated call to retrieve policies based on the mobile number 04501987123.
     * This number is set in the SQL script that sets up data for the run.
     * @param pmo, the postman object that is responsible for making the final call.
     */
    // setPolicyId(pmo): void {
    //     var signature = auth.signatureGenerate(pmo.environment, uuid.v4(), pmo.environment.get("baseUrl") + '/v1/policy/getdetails');

    //     var completedUrl = requestHelper.buildUrl(signature) +
    //         '&insuredMobileNumber=' + encodeURIComponent('04501987123');

    //     var request = {
    //         url: completedUrl,
    //         method: 'GET',
    //         header: {
    //             'X-Client-Id': pmo.environment.get('x-clientId')
    //         }
    //     }

    //     var policyResponseHandler = function (error, response) {
    //         if (error) {
    //             console.log(`Error in setting policyId: ${error}`)
    //         }
    //         else {
    //             pmo.environment.set('policyId', response.json().results.policyId);
    //             console.log(`policyId set to ${pmo.environment.get('policyId')}`);
    //         }
    //     };

    //     pmo.sendRequest(request, policyResponseHandler);
    // }

    /**
     * Makes an authenticated call to retrieve calims based on the authenticated user.
     * The first claim retrieved is stored as a variable for use in subsequent calls.
     * @param pmo, the postman object that is responsible for making the final call.
     */
    // setClaimId(pmo): void {

    //     var signature = auth.signatureGenerate(pmo.environment, uuid.v4(), pmo.environment.get("baseUrl") + '/v1/claims');

    //     var request = {
    //         url: requestHelper.buildUrl(signature),
    //         method: 'GET',
    //         header: {
    //             'X-Client-Id': pmo.environment.get('x-clientId')
    //         },
    //         auth: {
    //             type: 'bearer',
    //             bearer: [{
    //                 key: 'token',
    //                 type: 'any',
    //                 value: pmo.environment.get('authToken')
    //             }]
    //         }
    //     }

    //     var claimResponseHandler = function (error, response) {
    //         if (error) {
    //             console.log(`Error in setting claimId: ${error}`)
    //         }
    //         else {
    //             pmo.environment.set('claimId', response.json().results.claims.first().claimId);
    //             console.log(`claimId set to ${pmo.environment.get('claimId')}`);
    //         }
    //     };

    //     pmo.sendRequest(request, claimResponseHandler);
    // }
}
