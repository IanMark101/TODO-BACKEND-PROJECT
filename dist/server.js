import app from "./app";
import { env } from "./config/env";
const startServer = () => {
    try {
        app.listen(env.PORT, () => {
            console.log(`✓ Server running on port ${env.PORT}`);
            console.log(`✓ Environment: ${env.NODE_ENV}`);
        });
    }
    catch (error) {
        console.error("✗ Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map