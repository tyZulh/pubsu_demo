"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("pubsub_node/dist/src"));
const handler_1 = __importDefault(require("pubsub_node/dist/src/handler"));
const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logfile.log' })
    ]
});
console.log(src_1.default);
class Handler extends handler_1.default {
    constructor(data, meta) {
        super(data, meta);
        this.meta = meta;
        this.data = data;
    }
    process(data, meta) {
        console.log(data, meta);
    }
}
const config = {
    env: 'production',
    service: 'foo-service',
    serviceQueueOptions: {
        fifo: true,
        messageRetentionPeriod: 1209600,
        delaySeconds: 0,
        maximumMessageSize: 262144,
        contentBasedDeduplication: false // Enables content-based deduplication. Only applicable for a FIFO queue
    },
    aws: {
        region: 'us-east-1',
    },
    queueUrl: 'https://sqs.us-east-1.amazonaws.com/966633303160/foo-service-production',
    topicArn: 'arn:aws:sns:us-east-1:966633303160:foo-service-production',
    handlers: [Handler],
    redisUrl: 'redis://url:port',
    logger: console
};
const pubsub = new src_1.default(config);
// Note that the snake_cased message types on the subscriptions below will
// be 'magically' converted to UpperCamelCase handler classes registered above 
pubsub.config.subscribeTo('foo-service', ['handler']);
// pubsub.config.subscribeTo('cuillere', ['passage']);
// pubsub.config.subscribeTo('wibble-service', ['wibble_update']);
exports.default = pubsub;
