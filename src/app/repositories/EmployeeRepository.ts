import { getConnection } from "typeorm";
import { EmployeeDto } from "../dto/EmployeeDto";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{

    // getallemployees
    
    public async getAllEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({ relations: ['department','address']});
    }
    
    //create employee
    public async saveEmployeeDetails(employeeDetails: EmployeeDto) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    //updateemployee
    public async updateEmployee(id:string, employeeDetails:UpdateEmployeeDto) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    //getemployeebyid
    public async getEmployeebyId(id:string, relations: string[] = ["department", "address"]) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.findOne(id,{ relations: relations});
    }

    //softdelete employee
    public async softdeleteEmployee(id:string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employee = await this.getEmployeebyId(id, ["address"]);
        return employeeRepo.softRemove(employee);
        }


    //harddelete employee-not calling
    public async hardDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.delete({id});
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