import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{

    // getallemployees
    
    public async getAllEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({ relations: ['department','address']});
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
    public async getEmployeebyId(id:string, relations: string[] = ["department", "address"]) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.findOne(id,{ relations: relations});
    }

    //delete employee
    public async deleteEmployee(id:string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employee = await this.getEmployeebyId(id, ["address"]);
        return employeeRepo.softRemove(employee);
        }

    //login

    public async getEmployeeByUsername(username: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    const employeeDetail = await employeeRepo.findOne({
        where: { username },
    });
    return employeeDetail;
}

}