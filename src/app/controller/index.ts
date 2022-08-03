/**
 * Wraps Controllers for easy import from other modules
 */
import { DepartmentRepository } from "../repositories/DepartmentRepository";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { DepartmentService } from "../service/DepartmentService";
import { EmployeeService } from "../service/EmployeeService";
import DepartmentController from "./DepartmentController";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService( new EmployeeRepository())),
  new DepartmentController(new DepartmentService(new DepartmentRepository())),
];
