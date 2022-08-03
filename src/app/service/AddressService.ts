import { AddressDto } from "../dto/AddressDto";
import { UpdateAddressDto } from "../dto/UpdateAddressDto";
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
        public async createAddress(addressDetails: AddressDto) {
            try { 
                const save = await this.addressRepo.saveAddressDetails(addressDetails);
                return save;
            } catch (err) {
                throw new HttpException(400, "Failed to create Address","failed");
            }
        }

        //update
        public async updateAddress(addressId:string,addressDetails: UpdateAddressDto) {
            try{
            const updateAddress = await this.addressRepo.updateAddress(addressId,addressDetails)
                return updateAddress;
            
            } catch (err) {
                throw new HttpException(400, "Failed to update employee","failed");
            }
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