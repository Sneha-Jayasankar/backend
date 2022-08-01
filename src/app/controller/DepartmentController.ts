import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";

class DepartmentController extends AbstractController {
  constructor(private departmentservice:DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }

  //routes
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getalldepartments);
    this.router.post(`${this.path}`, this.createdepartment);

  }

  //functions
  private getalldepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any =await this.departmentservice.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private createdepartment=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
    try{
        const data:any = await this.departmentservice.createDepartment(request.body);
        response.status(200);
        response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
    }
    catch(error){
        return next(error);
    }
  }
}

export default DepartmentController;
