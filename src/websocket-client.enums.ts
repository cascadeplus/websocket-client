export enum WebsocketClientConstants {
  WEBSOCKET = 'WEBSOCKET',
  OPTIONS = 'WEBSOCKET_OPTIONS'
}

export enum WSEventType {
  CLOSE = 'close',
  ERROR = 'error',
  MESSAGE = 'message',
  OPEN = 'open',
  PING = 'ping',
  PONG = 'pong',
  UNEXPECTED = 'unexpected-response',
  UPGRADE = 'upgrade'
}
