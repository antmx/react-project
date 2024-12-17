import * as uuid from 'uuid';
import moment from 'moment';
import crypto from 'crypto-js';

export default class WebApiSignature {

    public EndPointUrl!: string;
    public RequestId!: string;
    public UtcNow!: moment.Moment;
    //public HashInBase64!: string;

    /**
     *
     */
    constructor(endPointUrl: string) {

        this.EndPointUrl = endPointUrl;
        this.RequestId = uuid.v4();
        this.UtcNow = moment().utc();
    }

    /**
     * Generates a secure URL that can be used for calls to the Web API
     * @returns A string representing a secure URL.
     */
    toSecureUrl(secretKey: string): string {

        let now = this.UtcNow.format('yyyy-MM-DDTHH:mm:ssZ').replace('+00:00', 'Z');
        let rawString = this.RequestId + now + this.EndPointUrl;
        let hash = crypto.HmacSHA256(rawString, /*environment.get('secretKey')*/ secretKey);
        let hashInBase64 = crypto.enc.Base64.stringify(hash);

        return this.EndPointUrl +
            '?requestId=' + encodeURIComponent(this.RequestId) +
            '&requestTimestamp=' + encodeURIComponent(this.UtcNow.format('yyyy-MM-DDTHH:mm:ssZ').replace('+00:00', 'Z')) +
            '&uri=' + encodeURIComponent(this.EndPointUrl) +
            '&signature=' + encodeURIComponent(hashInBase64);
    }
}
