import { Publisher } from 'pubsub_node';
import pubsub from './pubSub';

export class FooUpdate extends Publisher {
  data
  id
  action
  constructor(data: {[key: string]: any}, id: string, action: string) {
    super(pubsub);
    this.data = data;
    this.id = id;
    this.action = action;
  }


  async messageData() {
    return {
      id: this.id,
      data: this.data,
      action: this.action
    }
  }
}
