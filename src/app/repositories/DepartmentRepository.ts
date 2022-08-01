import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository{

    //getalldepartments
    async getAllDepartments(){
         const departmentrepo = getConnection().getRepository(Department);
        return departmentrepo.find();
    }
    //create
    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }

    //update
    public async updateDepartment(id:string,departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.update(id,departmentDetails);
    }

     //getdepartmentbyid
     public async getDepartmentbyId(id:string) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.findOne(id);
        }

    //delete 
    public async deleteDepartment(id:string){
        const departmentRepo=getConnection().getRepository(Department);
        departmentRepo.softDelete(id);
    }
}