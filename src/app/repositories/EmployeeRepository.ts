import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{

    //getallemployees
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }
    
    //create employee
    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    //getemployeebyid
    public async updateEmployee(id:string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id);
    }

}