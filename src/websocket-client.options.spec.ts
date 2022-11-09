import { WebsocketClientOptions } from './websocket-client.options'

describe('WebsocketClientOptions', () => {
  it('should be defined', () => {
    const options = new WebsocketClientOptions('ws://localhost:8080')
    expect(options).toBeDefined()
    expect(options.url).toEqual('ws://localhost:8080')
  })
})
