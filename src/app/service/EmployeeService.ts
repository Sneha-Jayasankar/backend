import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import { AddressService } from "./AddressService";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import { EmployeeDto } from "../dto/EmployeeDto";
import { Employee } from "../entities/Employee";

export class EmployeeService{
    
        constructor(private employeeRepo:EmployeeRepository,private addressservice:AddressService){
            
        }
        //getall
        getAllEmployees():Promise <Employee[]>{
           return this.employeeRepo.getAllEmployees();
        }
        //create
        public async createEmployee(employeeDetails:EmployeeDto):Promise<EmployeeDto & Employee> {
            try {
          employeeDetails = {...employeeDetails, password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): ''}

                const save = await this.employeeRepo.saveEmployeeDetails(employeeDetails);
                return save;
            } catch (err) {
                throw new HttpException(400, "Failed to create employee","failed");
            }
        }
        //update
        public async updateEmployee(id: string, employeeDetails: UpdateEmployeeDto):Promise<Employee> {
            try{
              const employee = await this.getEmployeebyId(id);
              employeeDetails.address.id = employee.address.id;
              employeeDetails = {...employeeDetails, password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): ''}
            const save=await this.employeeRepo.updateEmployee(id,employeeDetails);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to update employee","failed");
        }
        }

        //getemployeebyid
        public async getEmployeebyId(employeeId: string):Promise <Employee>{
            const emp= await this.employeeRepo.getEmployeebyId(employeeId);
            if(!emp){
                throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
            }
            return emp;
        }

        //softdelete 
        public async softdeleteEmployee(employeeId: string): Promise<Employee> {
            return await this.employeeRepo.softdeleteEmployee(employeeId);
        }

        //harddelete-not caliing
        public async harddeleteEmployee(employeeId: string) {
          return await this.employeeRepo.hardDeleteEmployeeById(employeeId);
      }

        // login
     public async employeeLogin (username: string,password: string) {
        const employeeDetails = await this.employeeRepo.getEmployeeByUsername(
          username
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "custom:role":employeeDetails.role
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORRECT_USERNAME);
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
}

