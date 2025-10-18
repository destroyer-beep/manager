import express, {Express, Router} from 'express';
import {IConfigService} from "../core/config/ConfigService";
import cors from 'cors';
import http, {Server} from 'http';

export default class ServerApplication {
    private readonly expressApplication: Express;
    private configService: IConfigService;
    private readonly httpServer: Server;
    private readonly productRouter: Router;

    constructor(
      configService: IConfigService,
      productRouter: Router,
    ) {
        this.expressApplication = express();
        this.configService = configService;
        this.productRouter = productRouter;
        this.httpServer = http.createServer(this.expressApplication);
    }

    private async _initRoutes() {
        this.expressApplication.use(express.json({limit: "50mb"}));
        this.expressApplication.use(cors());
        this.expressApplication.use('/api/products', this.productRouter);
    }

    private async _initServer() {
        const port = this.configService.getEnvToNumber('PORT');
        const host = this.configService.getEnv('HOST');

        this.httpServer.listen(port, host, () => {
            console.log(`Server started: PORT = ${port}, HOST = ${host};`);
        });

        process.on('warning', e => console.warn(e.stack));
    }

    public async initApp() {
        await this._initRoutes();
        await this._initServer();
    }
}