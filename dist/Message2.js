"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passage = void 0;
const { MessageHandler } = require('pubsub_node');
class Passage extends MessageHandler {
    async process(data, meta) {
        console.log('info2', data);
    }
}
exports.Passage = Passage;
