import ServerApplication from "./app";
import ConfigService from "../core/config/ConfigService";
import productRouter from "../routes/product.route";

export default function createApp() {
    const configService = new ConfigService();

    return new ServerApplication(
        configService,
        productRouter
    )
}