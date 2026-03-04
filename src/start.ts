import { configureQuieterLogging } from "./logging.js";

// temporarily here until most of this is incorporate in SDK
configureQuieterLogging();

await import("./example-supplier.js");
