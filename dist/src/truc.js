"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_sns_1 = require("@aws-sdk/client-sns");
const REGION = 'us-east-1';
const snsClient = new client_sns_1.SNS({ region: REGION });
const params = {
    Message: 'This is a message',
    TopicArn: 'arn:aws:sns:us-east-1:966633303160:foo-service-production'
};
const publish = async () => {
    try {
        const data = await snsClient.publish(params);
        console.log('success', data);
    }
    catch (error) {
        console.log(error);
    }
};
publish();
