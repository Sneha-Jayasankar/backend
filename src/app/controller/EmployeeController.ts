import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";

class EmployeeController extends AbstractController {
  constructor(private employeeservice: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  //routes
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getallemployees);
    this.router.post(`${this.path}`, this.createemployee);
    this.router.put(`${this.path}/:id`, this.updateemployee);

  }

  //functions

  //get all employees
  private getallemployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeservice.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  //create employee
  private createemployee=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
    try{
        const data:any = await this.employeeservice.createEmployee(request.body);
        response.status(200);
        response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
    }
    catch(error){
        return next(error);
    }
  }

//update employee
private updateemployee=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
    try{
        const data:any = await this.employeeservice.updateEmployee(request.params.id,request.body);
        response.status(200);
        response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
    }
    catch(error){
        return next(error);
    }
  }

}

export default EmployeeController;
