import { EventEmitter } from "events";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import { Controller } from "./util/rest/controller";
import RequestWithUser from "./util/rest/request";
import errorMiddleware from "./middlewares/errorMiddleware"
import cors = require("cors");
/**
 * Express application wrapper class to centralize initialization
 */
class App extends EventEmitter {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    super();

    this.app = express();

    this.app.use(cors());

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  /**
   * Starts the application listener (web server)
   */
  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on ${process.env.PORT}`)
    });
  }

  /**
   * Return the app context.
   */
  public getServer() {
    return this.app;
  }

  /**
   * Adds desired middleware to app
   * gets executed in the defined order
   * since all these are imported they can be called third party middleware
   */
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(express.static('public'));


    // use for computing processing time on response
    //user defined
    this.app.use((request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
      request.startTime = Date.now();
      // console.log(request.startTime);
      next();
    });
  } 

  /**
   * Iterates through controllers in services/index and adds their routes/handlers to app
   * @param controllers
   */
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandling(){
    this.app.use(errorMiddleware);
  }

}

export default App;
