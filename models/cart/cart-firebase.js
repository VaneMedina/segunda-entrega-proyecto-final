import fs from 'fs'
import admin from 'firebase-admin'
import {getFirestore} from 'firebase-admin/firestore'
import config from '../config.js'

const serviceAccount = JSON.parse(fs.readFileSync(config.firebase.credential, 'utf8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebase.databaseURL
})

class FirebaseContainer {
    constructor() {
        this.db = getFirestore().collection('carts')
    }

    async getAll() {
        const query = await this.db.get()
        let docs = query.docs

        const items = docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return items
    }
}

export default FirebaseContainer