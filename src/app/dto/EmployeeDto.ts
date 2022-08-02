
import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./AddressDto";
import { DepartmentDto } from "./DepartmentDto";


export class EmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public joiningdate: string;

    @IsString()
    public role: string; 

    @IsString()
    public status:string;

    @IsNumber()
    public experience: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    // @ValidateIf(o=>o.address.id==null)
    @ValidateNested({each:true})
    @Type(()=>AddressDto)
    public address: AddressDto;

    // @ValidateNested({each: true})
    // @Type(()=>DepartmentDto)
    // public department?: DepartmentDto
}