import { IsString } from "class-validator";

export class AddressDto {
    @IsString()
    public address_line1: string;

    @IsString()
    public address_line2: string;

    @IsString()
    public city: string;

    @IsString()
    public state: string;

    @IsString()
    public pin: string;
}