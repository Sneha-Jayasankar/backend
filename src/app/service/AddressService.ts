import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Address } from "../entities/Address";
import HttpException from "../exception/HttpException";
import { AddressRepository } from "../repositories/AddressRepository";

export class AddressService{
    
        constructor(private addressRepo:AddressRepository){
            
        }
        //getall
        getAllAddresss(){
           return this.addressRepo.getAllAddresss();
        }

        //create
        public async createAddress(addressDetails: any,id:string) {
            // console.log(id);
            try {
                const newAddress = plainToClass(Address, {
                    
                    address_line1: addressDetails.address_line1,
                    address_line2:addressDetails.address_line2,
                    city:addressDetails.city,
                    state:addressDetails.city,
                    pin:addressDetails.pin,
                    employee_id:id,
                });
                // console.log(id);
                const save = await this.addressRepo.saveAddressDetails(newAddress);
                return save;
            } catch (err) {
                throw new HttpException(400, "Failed to create Address","failed");
            }
        }

        //update
        public async updateAddress(id:string,addressDetails: any) {
            
            const addressRepo = getConnection().getRepository(Address);
            
           
            return await this.addressRepo.updateAddress(id,addressDetails);
        }

        //get Address by id
        public async getAddressbyId(addressId: string) {
            const dept= await this.addressRepo.getAddressbyId(addressId);
            return dept;
    
        }

        // delete
        public async deleteAddress(addressId:string){
            return await this.addressRepo.deleteAddress(addressId);

        }

}