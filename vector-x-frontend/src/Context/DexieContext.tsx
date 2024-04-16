// db.js
import Dexie from 'dexie';

const db = new Dexie('vectorX');
db.version(1).stores({
    user: '++id, avatar',
});

export default db;