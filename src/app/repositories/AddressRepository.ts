import { getConnection } from "typeorm";
import { AddressDto } from "../dto/AddressDto";
import { UpdateAddressDto } from "../dto/UpdateAddressDto";
import { Address } from "../entities/Address";

export class AddressRepository{

    //getalldddresss
    async getAllAddresss(){
         const addressrepo = getConnection().getRepository(Address);
        return addressrepo.find();
    }
    //create
    public async saveAddressDetails(addressDetails: AddressDto) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.save(addressDetails);
    }

    //update
    public async updateAddress(id:string,addressDetails: UpdateAddressDto) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.update(id,addressDetails);
    }

     //getdddressbyid
     public async getAddressbyId(id:string) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.findOne(id);
        }

    //delete 
    public async deleteAddress(id:string){
        const addressRepo=getConnection().getRepository(Address);
        addressRepo.softDelete(id);
    }
}