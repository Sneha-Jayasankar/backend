import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from "../middlewares/validationMiddleware";
import { DepartmentDto } from "../dto/DepartmentDto";
import { ParameterValidationDto } from "../dto/ParametervalidationDto";

class DepartmentController extends AbstractController {
  constructor(private departmentservice:DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }

  //routes
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getalldepartments);
    this.router.post(`${this.path}`,validationMiddleware(DepartmentDto,APP_CONSTANTS.body), this.createdepartment);
    this.router.put(`${this.path}/:id`,validationMiddleware(ParameterValidationDto,APP_CONSTANTS.params), this.updatedepartment);
    this.router.get(`${this.path}/:id`,validationMiddleware(ParameterValidationDto,APP_CONSTANTS.params), this.getdepartmentbyid);
    this.router.delete(`${this.path}/:id`,validationMiddleware(ParameterValidationDto,APP_CONSTANTS.params), this.deletedepartment);
  }

  //functions
  //get all
  private getalldepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any =await this.departmentservice.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
//create
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

  //update
  private updatedepartment=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
    try{
        const data:any = await this.departmentservice.updateDepartment(request.params.id,request.body);
        response.status(200);
        response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
    }
    catch(error){
        return next(error);
    }
  }

  //get department by id
  private getdepartmentbyid=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
    try{
        const data:any = await this.departmentservice.getDepartmentbyId(request.params.id);
        response.status(200);
        response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
    }
    catch(error){
        return next(error);
    }
  }

  //delete
private deletedepartment=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
  try{
      const data:any = await this.departmentservice.deleteDepartment(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
  }
  catch(error){
      return next(error);
  }
}


}

export default DepartmentController;
