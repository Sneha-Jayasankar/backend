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
                    departmentId: employeeDetails.departmentId,
                    joiningdate:employeeDetails.joiningdate,
                    role:employeeDetails.role,
                    status:employeeDetails.status,
                    experience:employeeDetails.experience
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

