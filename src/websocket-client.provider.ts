import { WebSocket } from 'ws'
import { WebsocketClientConstants } from './websocket-client.enums'
import { WebsocketClientOptions } from './websocket-client.options'

export const WebsocketProvider = {
  provide: WebsocketClientConstants.WEBSOCKET,
  useFactory: (options: WebsocketClientOptions) => {
    return new WebSocket(options.url)
  },
  inject: [{ token: WebsocketClientConstants.OPTIONS, optional: false }]
}
