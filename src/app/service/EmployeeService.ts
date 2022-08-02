import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Address } from "../entities/Address";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";

export class EmployeeService{
    
        constructor(private employeeRepo:EmployeeRepository){
            
        }
        //getall
        getAllEmployees(){
           return this.employeeRepo.getAllEmployees();
        }
        //create
        public async createEmployee(employeeDetails: any) {
            // console.log(id);
            try {
                const newEmployee = new Employee();
                newEmployee.name = employeeDetails.name
                newEmployee.password = employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): ''
                newEmployee.username = employeeDetails.username
                newEmployee.role = employeeDetails.role
                newEmployee.status = employeeDetails.status
                newEmployee.experience = employeeDetails.experience,
                newEmployee.joiningdate = employeeDetails.joiningdate
                newEmployee.addressId = employeeDetails.address.addressId
                newEmployee.departmentId = employeeDetails.departmentId
            
                if(employeeDetails.address){
                      newEmployee.address = new Address()
                      newEmployee.address.address_line1= employeeDetails.address.address_line1,
                      newEmployee.address.address_line2= employeeDetails.address.address_line2,
                      newEmployee.address.city = employeeDetails.address.city,
                      newEmployee.address.state = employeeDetails.address.state,
                      newEmployee.address.pin = employeeDetails.address.pin
                }
          console.log(newEmployee)

                const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
                return save;
            } catch (err) {
                throw new HttpException(400, "Failed to create employee","failed");
            }
        }
        //update
        public async updateEmployee(employeeId: string, employeeDetails: any) {
            try{
            const employeeRepo = getConnection().getRepository(Employee);
            const updateEmployee = await employeeRepo.update({ id: employeeId, deletedAt: null }, {
                name: employeeDetails.name ? employeeDetails.name : undefined,
                // departmentId: employeeDetails.department_id ? employeeDetails.department_id:undefined,
                // joiningdate:employeeDetails.joiningdate? employeeDetails.joiningdate:undefined,
                // role:employeeDetails.role? employeeDetails.role:undefined,
                // status:employeeDetails.status? employeeDetails.status:undefined,
                // experience:employeeDetails.experience? employeeDetails.experience:undefined
            });
            return updateEmployee;
        } catch (err) {
            throw new HttpException(400, "Failed to update employee","failed");
        }
        }

        //getemployeebyid
        public async getEmployeebyId(employeeId: string) {
            const emp= await this.employeeRepo.getEmployeebyId(employeeId);
            if(!emp){
                throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
            }
            return emp;
        }

        //delete 
        public async deleteEmployee(employeeId: string) {
            return await this.employeeRepo.deleteEmployee(employeeId);
        }

        // Add in EmployeeService.ts

     public employeeLogin = async (
        username: string,
        password: string
      ) => {
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

