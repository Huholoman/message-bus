import { assert } from 'chai'
import { Bus } from '../src'

describe('Bus', () => {
    it('can subscribe and unsubscribe', () => {
        const bus = new Bus()

        const unsubscribe = bus.subscribe('test', () => {})
        assert.equal(1, bus.subscriptions.size)

        unsubscribe()
        assert.equal(0, bus.subscriptions.size)
    });

    it('can send message', () => {
        const bus = new Bus()
        const testMessage = {
            some: 'text'
        }

        bus.subscribe('test', (message: object) => {
            result = message
        })

        let result = null;

        bus.publish('test', testMessage)

        assert.deepEqual(testMessage, result)
    })
});
