"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const winston_1 = require("winston");
const { MessageHandler } = require('pubsub_node');
class Message extends MessageHandler {
    async process(data, meta) {
        (0, winston_1.log)('info', data);
    }
}
exports.Message = Message;
