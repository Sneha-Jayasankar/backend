
import { IsNumber, IsString } from "class-validator";

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
}