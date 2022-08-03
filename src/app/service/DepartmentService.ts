import { UpdateResult } from "typeorm";
import { DepartmentDto } from "../dto/DepartmentDto";
import { UpdateDepartmentDto } from "../dto/UpdateDepartmentDto";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repositories/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService{
    
        constructor(private departmentRepo:DepartmentRepository){
            
        }
        //getall
        getAllDepartments(): Promise<Department[]>{
           return this.departmentRepo.getAllDepartments();
        }

        //create
        public async createDepartment(departmentDetails: DepartmentDto):Promise<Department> {
            try {
                const save = await this.departmentRepo.saveDepartmentDetails(departmentDetails);
                return save;
            } catch (err) {
                throw new HttpException(400, "Failed to create Department","failed");
            }
        }

        //update
        public async updateDepartment(departmentId: string, departmentDetails: UpdateDepartmentDto):Promise<UpdateResult> {
        
            const updateDepartment = await this.departmentRepo.updateDepartment(departmentId,departmentDetails)
            return updateDepartment;
        }

        //get department by id
        public async getDepartmentbyId(departmentId: string): Promise<Department> {
            const dept: Department= await this.departmentRepo.getDepartmentbyId(departmentId);
            if(!dept){
                throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
            }
            return dept;
    
        }

        // delete
        public async deleteDepartment(departmentId:string){
            const deletevariable= await this.departmentRepo.deleteDepartment(departmentId);
            return deletevariable;
        }

}