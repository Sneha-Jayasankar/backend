import { getConnection } from "typeorm";
import { Address } from "../entities/Address";

export class AddressRepository{

    //getalldddresss
    async getAllAddresss(){
         const addressrepo = getConnection().getRepository(Address);
        return addressrepo.find();
    }
    //create
    public async saveAddressDetails(addressDetails: Address) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.save(addressDetails);
    }

    //update
    public async updateAddress(id:string,addressDetails: Address) {
        // console.log(id);
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.update({ employee_id: id },addressDetails);
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