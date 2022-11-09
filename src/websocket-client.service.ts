import type { ClientRequest, IncomingMessage } from 'http'
import type { IOnCloseHandler, IOnErrorHandler, IOnMessageHandler, IOnOpenHandler, IOnPingHandler, IOnPongHandler, IOnUnexpectedHandler, IOnUpgradeHandler } from './websocket-client.interfaces'
import { Inject, Injectable } from '@nestjs/common'
import WS, { WebSocket } from 'ws'
import { WSEventType, WebsocketClientConstants } from './websocket-client.enums'

@Injectable()
export class WebsocketClientService {
  constructor (@Inject(WebsocketClientConstants.WEBSOCKET) public readonly socket: WebSocket) {}

  public close (): void {
    this.socket.close()
  }

  public send (data: string): void {
    this.socket.send(data)
  }

  public onClose (handler: IOnCloseHandler): void {
    this.socket.on(WSEventType.CLOSE, (code: number, reason: string): void => {
      handler(code, reason.toString())
    })
  }

  public onError (handler: IOnErrorHandler): void {
    this.socket.on(WSEventType.ERROR, (error: Error) => {
      handler(error)
    })
  }

  public onMessage (handler: IOnMessageHandler): void {
    this.socket.on(WSEventType.MESSAGE, (data: WS.RawData, isBinary: boolean) => {
      const message = (data as Buffer).toString()
      handler(message, isBinary)
    })
  }

  public onOpen (handler: IOnOpenHandler): void {
    this.socket.on(WSEventType.OPEN, () => {
      handler()
    })
  }

  public onPing (handler: IOnPingHandler): void {
    this.socket.on(WSEventType.PING, (data: Buffer) => {
      handler(data.toString())
    })
  }

  public onPong (handler: IOnPongHandler): void {
    this.socket.on(WSEventType.PONG, (data: Buffer) => {
      handler(data.toString())
    })
  }

  public onUnexpected (handler: IOnUnexpectedHandler): void {
    this.socket.on(WSEventType.UNEXPECTED, (request: ClientRequest, response: IncomingMessage) => {
      handler(request, response)
    })
  }

  public onUpgrade (handler: IOnUpgradeHandler): void {
    this.socket.on(WSEventType.UPGRADE, (request: IncomingMessage) => {
      handler(request)
    })
  }
}
