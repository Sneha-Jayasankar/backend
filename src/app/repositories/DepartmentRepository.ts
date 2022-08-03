import { getConnection, UpdateResult } from "typeorm";
import { DepartmentDto } from "../dto/DepartmentDto";
import { UpdateDepartmentDto } from "../dto/UpdateDepartmentDto";
import { Department } from "../entities/Department";

export class DepartmentRepository{

    //getalldepartments
    async getAllDepartments(): Promise<Department[]>{
         const departmentrepo = getConnection().getRepository(Department);
        return departmentrepo.find();
    }
    //create
    public async saveDepartmentDetails(departmentDetails: DepartmentDto):Promise<Department> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }

    //update
    public async updateDepartment(id:string,departmentDetails: UpdateDepartmentDto): Promise<UpdateResult> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.update(id,departmentDetails);
    }

     //getdepartmentbyid
     public async getDepartmentbyId(id:string): Promise<Department> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.findOne(id);
        }

    //delete 
    public async deleteDepartment(id:string): Promise<void>{
        const departmentRepo = getConnection().getRepository(Department);
        departmentRepo.softDelete(id);
    }
}