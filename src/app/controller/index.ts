/**
 * Wraps Controllers for easy import from other modules
 */
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { EmployeeService } from "../service/EmployeeService";
import DepartmentController from "./DepartmentController";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService( new EmployeeRepository())),
  new DepartmentController()
];
