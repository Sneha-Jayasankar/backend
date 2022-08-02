/**
 * Wraps Controllers for easy import from other modules
 */
import { Address } from "../entities/Address";
import { AddressRepository } from "../repositories/AddressRepository";
import { DepartmentRepository } from "../repositories/DepartmentRepository";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { AddressService } from "../service/AddressService";
import { DepartmentService } from "../service/DepartmentService";
import { EmployeeService } from "../service/EmployeeService";
import AddressController from "./AddressController";
import DepartmentController from "./DepartmentController";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService( new EmployeeRepository()),new AddressService(new AddressRepository())),
  new DepartmentController(new DepartmentService(new DepartmentRepository())),
  new AddressController(new AddressService(new AddressRepository()))
];
