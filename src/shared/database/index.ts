import { createConnection, getConnection } from 'typeorm';

createConnection().then(() => {
    console.log(`Database connected`);
});