import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: process.env.JEST_DB_HOST || "localhost",
    port: parseInt(process.env.JEST_DB_PORT || "5962"),
    username: process.env.JEST_DB_USER ||   "postgres",
    password: process.env.JEST_DB_PASS || "postgres",
    database: process.env.JEST_DB_NAME || "tests",
    dropSchema: true,
    entities: [
        "./src/modules/**/entities/*.ts"
    ],
    synchronize: true,
    logging: false
}

export default connectionOptions;