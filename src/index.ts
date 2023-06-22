import { Poller } from 'pubsub_node'
import pubsub from './pubSub'
import { FooUpdate } from './publisher'
import { randomUUID } from 'crypto'

const id = randomUUID()

const fooUpdate = new FooUpdate({foo: 'bar'}, id, 'foo.updated')
fooUpdate.publish()

const main = () => {
  const poller = new Poller(pubsub)

  const startPolling = async () => {
    const consumer = poller.poll();
    consumer.on('error', () => {
      process.exit(0);
    });
  };

  startPolling().catch((error) => {
    console.error('Failed to poll queue due to ', error);
  })
}

main()

