import {PubSub} from 'pubsub_node'
import { FooUpdateHandler } from './FooUpdate';


const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logfile.log' })
  ]
});



const config = {
  service: 'foo-service',
  env: 'production',
  aws: {
    region: 'us-east-1',
    snsTopics: 'arn:aws:sns:us-east-1:966633303160:foo-service-production',
    sqsQueue: 'https://sqs.us-east-1.amazonaws.com/966633303160/urw_test'
  },
  Handlers: {FooUpdateHandler: FooUpdateHandler},

  logger: logger
}






const pubsub = new PubSub(config);


export default pubsub
