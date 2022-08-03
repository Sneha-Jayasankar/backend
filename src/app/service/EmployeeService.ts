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
import { response } from "express";
import { AddressService } from "./AddressService";

export class EmployeeService{
    
        constructor(private employeeRepo:EmployeeRepository,private addressservice:AddressService){
            
        }
        //getall
        getAllEmployees(){
           return this.employeeRepo.getAllEmployees();
        }
        //create
        public async createEmployee(employeeDetails: any) {
            // console.log(id);
            try {
              const newAddress = new Address()
              if(employeeDetails.address){
                
                newAddress.address_line1= employeeDetails.address.address_line1,
                newAddress.address_line2= employeeDetails.address.address_line2,
                newAddress.city = employeeDetails.address.city,
                newAddress.state = employeeDetails.address.state,
                newAddress.pin = employeeDetails.address.pin
          }
                const newEmployee = new Employee();
                newEmployee.name = employeeDetails.name
                newEmployee.password = employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): ''
                newEmployee.username = employeeDetails.username
                newEmployee.role = employeeDetails.role
                newEmployee.status = employeeDetails.status
                newEmployee.experience = employeeDetails.experience
                newEmployee.joiningdate = employeeDetails.joiningdate
                newEmployee.departmentId=employeeDetails.departmentId
                newEmployee.address = newAddress;
            
             
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
            // const addressRepo=getConnection().getRepository(Address);
            const updateaddress = plainToClass(Address, {
              id: employeeDetails.addressId,
              address_line1:employeeDetails.address_line1,
              address_line2:employeeDetails.address_line2,
              city: employeeDetails.city,
              state: employeeDetails.state,
              pin: employeeDetails.pin
            })
            const updateEmployee = await employeeRepo.update({ id: employeeId, deletedAt: null }, {
                name: employeeDetails.name ? employeeDetails.name : undefined,
                departmentId: employeeDetails.departmentId ? employeeDetails.departmentId:undefined,
                joiningdate:employeeDetails.joiningdate? employeeDetails.joiningdate:undefined,
                role:employeeDetails.role? employeeDetails.role:undefined,
                status:employeeDetails.status? employeeDetails.status:undefined,
                experience:employeeDetails.experience? employeeDetails.experience:undefined,
                
            });
            await this.addressservice.updateAddress(employeeDetails.addressId,updateaddress);
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

        //softdelete 
        public async softdeleteEmployee(employeeId: string) {
            return await this.employeeRepo.softdeleteEmployee(employeeId);
        }

        //harddelete-not caliing
        public async harddeleteEmployee(employeeId: string) {
          return await this.employeeRepo.hardDeleteEmployeeById(employeeId);
      }
        // login

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

