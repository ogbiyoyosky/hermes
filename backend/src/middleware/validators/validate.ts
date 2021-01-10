import Joi from "@hapi/joi";
import logger from "../../logger";



const validator = {
  validateBody: (schema) => (req, res, next) => {
    //logger.info("body", req.body);
    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).send({
        status: "bad request",
        status_code: 400,
        error: result.error.message,
      });
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    subcribe: Joi.object().keys({
      url: Joi.string()
        .required()
        .trim()
        .error(new Error("url is required")),
          }),

    publish: Joi.object().keys({
      message: Joi.string()
        .required()
        .trim()
        .error(new Error("message is required")),
      
      
    })
  
  },

  


};

export default validator;
