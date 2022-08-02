import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middlewares/validationMiddleware";
import { EmployeeDto } from "../dto/EmployeeDto";
import { AddressService } from "../service/AddressService";
import { Address } from "../entities/Address";
import { plainToClass } from "class-transformer";
import { ParameterValidationDto } from "../dto/ParametervalidationDto";
import authorizationMiddleware from "../middlewares/authorizationMiddleware";

class EmployeeController extends AbstractController {
  constructor(private employeeservice: EmployeeService,private addressservice:AddressService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  //routes
  protected initializeRoutes() {
    this.router.get(`${this.path}`,authorizationMiddleware(['admin','hr']), this.getallemployees);
    this.router.post(`${this.path}`,validationMiddleware(EmployeeDto,APP_CONSTANTS.body), this.createemployee);
    this.router.put(`${this.path}/:id`,validationMiddleware(ParameterValidationDto,APP_CONSTANTS.params), this.updateemployee);
    this.router.get(`${this.path}/:id`,validationMiddleware(ParameterValidationDto,APP_CONSTANTS.params), this.getemployeebyid);
    this.router.delete(`${this.path}/:id`,validationMiddleware(ParameterValidationDto,APP_CONSTANTS.params), this.deleteemployee);
    this.router.post(`${this.path}/login`,this.login);
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
      // console.log(request.body);
        const adr:any=await this.addressservice.createAddress(request.body.address);
        const emp:any = await this.employeeservice.createEmployee(request.body,adr.id);
        // const adr:any=await this.addressservice.createAddress(request.body.address,emp.id);
  
        response.status(200);
        const data = {
          "employee": emp,
          // "address": adr
        }
        response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
    }
    catch(error){
        return next(error);
    }
  }

//update employee
private updateemployee=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
    try{
      // console.log(request.params.id);
      const variable=request.params.id;
        const emp:any = await this.employeeservice.updateEmployee(request.params.id,request.body);
        // const adr = await this.addressservice.updateAddress(variable,request.body.address);
        const data = {
          "employee": emp,
          // "address": adr
        }
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
      }
      catch(error) {
        return next(error);
      }
    }

//get employee by id
private getemployeebyid=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
  try{
      const data:any = await this.employeeservice.getEmployeebyId(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
  }
  catch(error){
      return next(error);
  }
}

//delete
private deleteemployee=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
  try{
      const data:any = await this.employeeservice.deleteEmployee(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
  }
  catch(error){
      return next(error);
  }
}

// login

private login = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) => {
  try{
  const loginData = request.body;
  const loginDetail = await this.employeeservice.employeeLogin(
    loginData.username,
    loginData.password
  );
  response.send(
    this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
  );
}
catch(error) {
  return next(error);
}
}
}

export default EmployeeController;
