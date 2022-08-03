import { Type } from "class-transformer";
import { Allow, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Address } from "../entities/Address";
import { UpdateAddressDto } from "./UpdateAddressDto";


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
    public addressId?: string

    @IsOptional()
    @IsString()
    public password?: string

    @ValidateNested({each:true})
    @Type(()=>UpdateAddressDto)
    public address: Address;

}