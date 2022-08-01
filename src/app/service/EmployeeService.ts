import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repositories/EmployeeRepository";

export class EmployeeService{
    
        constructor(private employeeRepo:EmployeeRepository){
            
        }
        //getall
        getAllEmployees(){
           return this.employeeRepo.getAllEmployees();
        }
        //create
        public async createEmployee(employeeDetails: any) {
            try {
                const newEmployee = plainToClass(Employee, {
                    name: employeeDetails.name,
                    // username: employeeDetails.username,
                    // age: employeeDetails.age,
                    departmentId: employeeDetails.departmentId,
                    // isActive: true,
                });
                const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
                return save;
            } catch (err) {
                throw new HttpException(400, "Failed to create employee","failed");
            }
        }
        //update
        public async updateEmployee(employeeId: string, employeeDetails: any) {
            const employeeRepo = getConnection().getRepository(Employee);
            const updateEmployee = await employeeRepo.update({ id: employeeId, deletedAt: null }, {
                name: employeeDetails.name ? employeeDetails.name : undefined,
            });
            return updateEmployee;
        }

        //getemployeebyid
        public async getEmployeebyId(employeeId: string) {
            const emp= await this.employeeRepo.getEmployeebyId(employeeId);
            // if(!emp){
            //     throw new EntityNotFoundException({
            //         CODE:"404",
            //         MESSAGE:"Employee with the given id is not found"
            //     })
            // }
            return emp;
        }

        //delete 
        public async deleteEmployee(employeeId: string) {
            return await this.employeeRepo.deleteEmployee(employeeId);
        }
}

