import {config} from "dotenv";
config();

export interface IConfigService {
    getEnv: (envName: keyof ConfigService) => string;
    getEnvToNumber: (envName: keyof ConfigService) => number;
}

export default class ConfigService implements IConfigService{
    PORT: string | undefined;
    HOST: string | undefined;

    constructor() {
        this.PORT = process.env.PORT;
        this.HOST = process.env.HOST;
    }
    getEnv(envName: keyof ConfigService) {
        const env = this[envName];
        if(env && typeof env === 'string') return env;

        console.error(`The requested variable ${envName} is not defined in the .env file`);
        process.exit(1);
    }

    getEnvToNumber(envName: keyof ConfigService) {
        try {
            const env = this[envName];
            if(env && typeof env === 'string') return +env;

            console.error(`The requested variable ${envName} is not defined in the .env file`);
            process.exit(1);
        } catch (e) {
            console.error(`The requested variable ${envName} is not defined in the .env file`);
            process.exit(1);
        }
    }
}