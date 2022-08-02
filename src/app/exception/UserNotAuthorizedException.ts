import { CustomError } from "../util/errorCode";
import HttpException from "./HttpException";

class UserNotAuthorizedException extends HttpException {

    constructor(error: CustomError) {
      super(403, error.MESSAGE, error.CODE);
    }
  }
     
    
export default UserNotAuthorizedException;
