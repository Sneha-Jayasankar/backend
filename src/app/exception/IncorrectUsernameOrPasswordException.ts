import { CustomError } from "../util/errorCode";
import HttpException from "./HttpException";

class IncorrectUsernameOrPasswordException extends HttpException {

    constructor(error: CustomError) {
      super(400, error.MESSAGE, error.CODE);
    }
  }
     
    
export default IncorrectUsernameOrPasswordException;
