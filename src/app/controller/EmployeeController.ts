import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middlewares/validationMiddleware";
import { EmployeeDto } from "../dto/EmployeeDto";
import { ParameterValidationDto } from "../dto/ParametervalidationDto";
import authorizationMiddleware from "../middlewares/authorizationMiddleware";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";

class EmployeeController extends AbstractController {
  constructor(private employeeservice: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  //routes

  protected initializeRoutes() {
    //getall
    this.router.get(`${this.path}`, this.getallemployees);

    //create
    this.router.post(`${this.path}`, 
    authorizationMiddleware(['admin', 'hr']), 
    validationMiddleware(EmployeeDto, APP_CONSTANTS.body), 
    this.createemployee);

    //update
    this.router.put(`${this.path}/:id`,
     authorizationMiddleware(['admin', 'hr']),
    validationMiddleware(ParameterValidationDto, APP_CONSTANTS.params), 
    validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body), this.updateemployee);

    //getbyid
    this.router.get(`${this.path}/:id`,
     validationMiddleware(ParameterValidationDto, APP_CONSTANTS.params),
      this.getemployeebyid);

     //delete 
    this.router.delete(`${this.path}/:id`,
     authorizationMiddleware(['admin', 'hr']),
     validationMiddleware(ParameterValidationDto, APP_CONSTANTS.params),
     this.deleteemployee);

     //login
    this.router.post(`${this.path}/login`, this.login);
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
  private createemployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeservice.createEmployee(request.body)
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    }
    catch (error) {
      return next(error);
    }
  }

  //update employee
  private updateemployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const variable = request.params.id;
      const updateEmp: UpdateEmployeeDto = request.body
      response.send(await this.employeeservice.updateEmployee(variable, updateEmp));
    }
    catch (error) {
      return next(error);
    }
  }

  //get employee by id
  private getemployeebyid = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeservice.getEmployeebyId(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    }
    catch (error) {
      return next(error);
    }
  }

  //softdelete
  private deleteemployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeservice.softdeleteEmployee(request.params.id);
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    }
    catch (error) {
      return next(error);
    }
  }
  //harddelete

  // login

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const loginData = request.body;
      const loginDetail = await this.employeeservice.employeeLogin(
        loginData.username,
        loginData.password
      );
      response.send(
        this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
      );
    }
    catch (error) {
      return next(error);
    }
  }
}

export default EmployeeController;
