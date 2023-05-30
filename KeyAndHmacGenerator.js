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

// let key = Buffer.from('fab221a4e24a88026ff4b6571ad9c71bf6b4670afbe40bafd0e5367b657f0153', 'hex');
// let message = 'Scissors';
//
// let hmac = crypto.createHmac('sha256', key);
// hmac.update(message);
// let hmacResult = hmac.digest('hex');
