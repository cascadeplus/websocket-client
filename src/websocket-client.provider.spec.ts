import { WebSocket } from 'ws'
import { WebsocketProvider } from './websocket-client.provider'

jest.mock('ws')

describe('WebsocketProvider', () => {
  it('should be defined', () => {
    expect(WebsocketProvider).toBeDefined()
  })

  it('should return a websocket instance', () => {
    const websocket = WebsocketProvider.useFactory({ url: 'ws://localhost:8080' })
    expect(websocket).toBeDefined()
    expect(websocket).toBeInstanceOf(WebSocket)
  })
})
