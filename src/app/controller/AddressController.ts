import { NextFunction,Response } from "express";
import APP_CONSTANTS from "../constants";
import { AddressService } from "../service/AddressService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";

class AddressController extends AbstractController {
    constructor(private Addressservice:AddressService) {
      super(`${APP_CONSTANTS.apiPrefix}/address`);
      this.initializeRoutes();
    }
  
    //routes
    protected initializeRoutes() {
      this.router.get(`${this.path}`, this.getallAddress);
    //   this.router.post(`${this.path}`, this.createAddress);
      // this.router.put(`${this.path}/:id`, this.updateAddress);
      this.router.get(`${this.path}/:id`, this.getAddressbyid);
      this.router.delete(`${this.path}/:id`, this.deleteAddress);
    }
  
    //functions
    //get all
    private getallAddress = async (request: RequestWithUser, response: Response, next: NextFunction) => {
      try {
        const data: any =await this.Addressservice.getAllAddresss();
        response.status(200);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      } catch (error) {
        return next(error);
      }
    }
  //create
    // private createAddress=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
    //   try{
    //       const data:any = await this.Addressservice.createAddress(request.body);
    //       response.status(200);
    //       response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
    //   }
    //   catch(error){
    //       return next(error);
    //   }
    // }
  
    //update
    // private updateAddress=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
    //   try{
    //       const data:any = await this.Addressservice.updateAddress(request.params.id);
    //       response.status(200);
    //       response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
    //   }
    //   catch(error){
    //       return next(error);
    //   }
    // }
  
    //get Address by id
    private getAddressbyid=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
      try{
          const data:any = await this.Addressservice.getAddressbyId(request.params.id);
          response.status(200);
          response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
      }
      catch(error){
          return next(error);
      }
    }
  
    //delete
  private deleteAddress=async (request:RequestWithUser, response:Response,next:NextFunction)=>{
    try{
        const data:any = await this.Addressservice.deleteAddress(request.params.id);
        response.status(200);
        response.send(this.fmt.formatResponse(data,Date.now() - request.startTime, "OK", 1));
    }
    catch(error){
        return next(error);
    }
  }
  
  
  }
  
  export default AddressController;
  