import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repositories/DepartmentRepository";

export class DepartmentService{
    
        constructor(private departmentRepo:DepartmentRepository){
            
        }
        getAllDepartments(){
           return this.departmentRepo.getAllDepartments();
        }

        public async createDepartment(departmentDetails: any) {
            try {
                const newDepartment = plainToClass(Department, {
                    name: departmentDetails.name
                    // username: DepartmentDetails.username,
                    // age: DepartmentDetails.age,
                   
                    // isActive: true,
                });
                const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
                return save;
            } catch (err) {
                throw new HttpException(400, "Failed to create Department","failed");
            }
        }
    
    }

