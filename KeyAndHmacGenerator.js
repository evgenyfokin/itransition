import crypto from 'crypto'

export class KeyAndHmacGenerator {

    constructor() {
        this.algorithm = 'sha256';
    }
    generateKey() {
        return crypto.randomBytes(32)
    }

    _createHmac(key, message) {
        let hmac = crypto.createHmac(this.algorithm, key)
        hmac.update(message)
        return hmac.digest('hex')
    }

    generateHmac(key, message) {
        return this._createHmac(key, message)
    }

    verifyHmac(key, message, supposedHmac) {
        let calculateHmac =this._createHmac(key,message)
        return calculateHmac === supposedHmac
    }
}