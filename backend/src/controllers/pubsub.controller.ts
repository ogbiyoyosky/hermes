import { Request, Response, NextFunction } from "express";
import CouponModel, { IMessenager } from "../models/Messenger";
import logger from "../logger";
import publishToQueue from "../queueProvider/publishToQueue"
import * as httpStatus from "http-status";
import { any, date } from "joi";
import MessengerModel from "../models/Messenger";

class PublisherControler {
  /**
   * Publish A Message
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async publish(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {topic} = req.params;
    const { message } = req.body;

 

    MessengerModel.find({topic}).then( async (subcriptions: any)=> {

    
      for (var i in subcriptions) {

        
        const {server, topic} = subcriptions[i]
        const data = {
          server,
          topic,
          message
        }
      
        await publishToQueue("published_message", JSON.stringify(data), true,)
      }
      
        return res.status(httpStatus.OK).send({
              message: "Message published to subscribers",
              status: "ok",
              status_code: httpStatus.OK,
        });
      })
        
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal Server Error",
        status: "Internal Server Error",
        status_code: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * Subcribe to topic
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async subcribe(req: Request, res: Response, next: NextFunction) {
    try {
    const {topic} = req.params;
    const { url } = req.body;

    MessengerModel.findOne({topic, server:url}).then( (subcription)=> {
      if(subcription) {
        return res.status(httpStatus.OK).send({
              message: "Already subcribed",
              status: "ok",
              status_code: httpStatus.OK,
            });
      } else {
        MessengerModel.create({topic, server:url}).then(data => {
               return res.status(httpStatus.OK).send({
                 message: "Successfully subcribed",
                 status: "ok",
                 data: {
                  url,
                  topic
                },
                 status_code: httpStatus.OK,
               });
             }).catch(err=> {
               console.log(err)
               return res.status(httpStatus.BAD_REQUEST).send({
                 message: "Unable to subcribe",
                 status: "bad request",
                 status_code: httpStatus.BAD_REQUEST,
               });
             })
      }
    })
     
     
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal Server Error",
        status: "Internal Server Error",
        status_code: httpStatus.INTERNAL_SERVER_ERROR,
     });
     }
  }

  /**
   * Printing Event
   * @param {Object} req: url params
   * @param {Function} res: Express.js response callback
   * @param {Function} next: Express.js middleware callback
   * @author Emmanuel Ogbiyoyo
   * @public
   */

  public static async event(req: Request, res: Response, next: NextFunction) {
    try {
      const {message, topic} = req.body;
      logger.info(`subcriber recieving message on topic ${topic}`)
      return res.status(httpStatus.OK).send({
        message: `successfully recieved message from ${topic}`,
        status_code: httpStatus.OK,
        results: [{
          data: message,
          topic
        }],
        status: "ok"
      })


     
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Internal Server Error",
        status: "Internal Server Error",
        status_code: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
export default PublisherControler;
