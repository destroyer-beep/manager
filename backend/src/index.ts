import createApp from "./app/createApp";

async function initApp() {
    const app = createApp();
    void await app.initApp();
}

void await initApp();