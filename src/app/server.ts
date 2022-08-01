import "./config"; // initiate dot env configs, etc.

import { createConnection } from "typeorm";
import App from "./app";
import controllers from "./controller";

process.on("uncaughtException", (e) => {
  process.exit(1);
});
process.on("unhandledRejection", (e) => {
  process.exit(1);
});
(async () => {
  const app = new App(controllers);
  app.listen();
})();
