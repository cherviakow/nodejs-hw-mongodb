import { isValidObjectId } from "mongoose";
import httpErrors from "http-errors";

export function isValidID(req, res, next) {
    const {id} = req.params;

    if(isValidObjectId(id) !== true){
        return next(httpErrors(400, 'ID is not valid'));

    }


    console.log(id);

    next();
};
