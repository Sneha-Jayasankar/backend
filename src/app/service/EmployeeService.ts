import { EmployeeRepository } from "../repositories/EmployeeRepository";

export class EmployeeService{
    
        constructor(private employeeRepo:EmployeeRepository){
            
        }
        getAllEmployees(){
           return this.employeeRepo.getAllEmployees();
        }
    
    }