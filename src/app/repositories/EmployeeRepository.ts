import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{

    //getallemployees
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }
}