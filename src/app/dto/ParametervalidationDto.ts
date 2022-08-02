import { IsUUID } from "class-validator";

export class ParameterValidationDto{
    @IsUUID()
    public id:string;
}