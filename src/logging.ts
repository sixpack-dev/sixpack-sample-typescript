import dotenv from "dotenv";
import { setLogger } from "sixpack-sdk/logger";
import { DefaultLogger, Runtime } from "@temporalio/worker";

export function configureQuieterLogging(): void {
  dotenv.config({ quiet: true });
  process.env.RUST_LOG = "error";
  process.env.SIXPACK_VERBOSE = "true";
  const verbose = process.env.SIXPACK_VERBOSE === "true";

  Runtime.install({
    logger: new DefaultLogger("ERROR", () => {}),
    telemetryOptions: {
      logging: {
        filter: { core: "ERROR", other: "ERROR" },
      },
    },
    workerHeartbeatInterval: 0,
  });

  const temporalNoisePatterns = [
    "Worker state changed",
    "Workflow bundle created",
    "No workflows registered",
    "No activities registered",
    "No Nexus services registered",
    "asset workflow-bundle",
    "webpack ",
  ];

  const shouldSuppress = (message: string): boolean =>
    temporalNoisePatterns.some((pattern) => message.includes(pattern));

  setLogger({
    debug: (message: string) => {
      if (verbose && !shouldSuppress(message)) {
        console.debug(`[${new Date().toISOString()}] [DEBUG] ${message}`);
      }
    },
    info: (message: string) => {
      if (!shouldSuppress(message)) {
        console.info(`[${new Date().toISOString()}] [INFO] ${message}`);
      }
    },
    warn: (message: string) => {
      if (!shouldSuppress(message)) {
        console.warn(`[${new Date().toISOString()}] [WARN] ${message}`);
      }
    },
    error: (message: string) => {
      console.error(`[${new Date().toISOString()}] [ERROR] ${message}`);
    },
  });
}
