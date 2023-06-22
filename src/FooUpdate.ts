import { MessageHandler } from 'pubsub_node';
import { IMessage } from 'pubsub_node/dist/type/sqsSnsMessage';

export class FooUpdateHandler extends MessageHandler {
  async process(data: IMessage, meta: any) {

    return {data, meta}
  }
}
