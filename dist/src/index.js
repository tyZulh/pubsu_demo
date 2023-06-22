"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_sqs_1 = require("@aws-sdk/client-sqs");
const pubSub_1 = __importDefault(require("../pubSub"));
const publisher_1 = __importDefault(require("pubsub_node/dist/src/publisher"));
class Message extends publisher_1.default {
    constructor(data) {
        super(pubSub_1.default);
        this.data = data;
    }
    async messageData() {
        console.log(this.data);
        return {
            data: this.data,
        };
    }
}
pubSub_1.default.subscriber
    .subscribe()
    .then(async (data) => {
    await data;
    console.log("index.subscribe", data);
    // Successfully subscribed to topics specified in configurations
    const fooMess = new Message('Second message test from pubsub_node module').publish();
    console.log("sending message");
    fooMess.then((data) => {
        console.log("message publish", data);
    }).catch((error) => {
        console.error(error);
    });
    const startPolling = async () => {
        let consumer;
        try {
            const poller = pubSub_1.default.Poller();
            await pubSub_1.default.subscriber.subscribe();
            console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-');
            consumer = poller.poll();
        }
        catch (e) {
            console.error(e);
        }
        console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-');
        consumer && consumer.on('error', () => {
            process.exit(0);
        });
    };
    startPolling().then((e) => {
        console.log('Started polling queue');
        // const messages = new Messages
        // messages.fetch('https://sqs.us-east-1.amazonaws.com/966633303160/urw_test')
    }).catch((error) => {
        console.error('Failed to poll queue due to ', error);
    });
})
    .catch((error) => {
    console.log(error);
    // Something went wrong :(
});
const sqs = new client_sqs_1.SQS({
    region: 'us-east-1'
});
