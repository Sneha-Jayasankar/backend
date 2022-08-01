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

    //updateemployee
    public async updateEmployee(id:string, employeeDetails:Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.update(id,employeeDetails);
    }

    //getemployeebyid
    public async getEmployeebyId(id:string) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.findOne(id);
    }

    //delete employee
    public async deleteEmployee(id:string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete(id);
        }

}