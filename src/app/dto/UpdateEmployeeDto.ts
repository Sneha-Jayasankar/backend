import { Allow, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class UpdateEmployeeDto{
    @IsString()
    public name: string;

    @IsString()
    public joiningdate: string;

    @IsString()
    public username: string;

    @IsOptional()
    @IsString()
    public departmentId: string

    @IsOptional()
    @IsString()
    public role?: string

    @IsOptional()
    @IsString()
    public status?: string

    @IsOptional()
    @IsNumber()
    public experience?: number

    @IsOptional()
    @IsString()
    public addressId: string

    @IsOptional()
    @IsString()
    public password?: string

}