import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repositories/DepartmentRepository";

export class DepartmentService{
    
        constructor(private departmentRepo:DepartmentRepository){
            
        }
        //getall
        getAllDepartments(){
           return this.departmentRepo.getAllDepartments();
        }

        //create
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

        //update
        public async updateDepartment(departmentId: string, departmentDetails: any) {
            const departmentRepo = getConnection().getRepository(Department);
            const updateDepartment = await departmentRepo.update({ id: departmentId, deletedAt: null }, {
                name: departmentDetails.name ? departmentDetails.name : undefined,
            });
            return updateDepartment;
        }

        //get department by id
        public async getDepartmentbyId(departmentId: string) {
            const dept= await this.departmentRepo.getDepartmentbyId(departmentId);
            return dept;
    
        }

        // delete
        public async deleteDepartment(departmentId:string){
            return await this.departmentRepo.deleteDepartment(departmentId);

        }

}