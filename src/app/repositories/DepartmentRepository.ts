import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository{

    //getalldepartments
    async getAllDepartments(){
         const departmentrepo = getConnection().getRepository(Department);
        return departmentrepo.find();
    }

    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }
}