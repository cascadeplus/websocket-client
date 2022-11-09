import { Test, TestingModule } from '@nestjs/testing'
import { WSEventType, WebsocketClientConstants } from './websocket-client.enums'

import { IncomingMessage } from 'http'
import { WebSocket } from 'ws'
import { WebsocketClientService } from './websocket-client.service'

describe('WebsocketClientService', () => {
  let service: WebsocketClientService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebsocketClientService,
        {
          provide: WebsocketClientConstants.WEBSOCKET,
          useValue: {
            on: jest.fn(),
            send: jest.fn(),
            close: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<WebsocketClientService>(WebsocketClientService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('close()', () => {
    it('should close the websocket connection', () => {
      service.close()
      expect(service.socket.close).toHaveBeenCalled()
    })
  })

  describe('send()', () => {
    it('should send data to the websocket connection', () => {
      const data = 'test'
      service.send(data)
      expect(service.socket.send).toHaveBeenCalledWith(data)
    })
  })

  describe('onClose()', () => {
    it('should register a handler for the close event', () => {
      const onCallback = (event: string | symbol, listener: (...args: any[]) => void): WebSocket => {
        listener(1000, 'test')
        return service.socket
      }
      jest.spyOn(service.socket, 'on').mockImplementationOnce(onCallback)

      const handler = jest.fn()
      service.onClose(handler)

      expect(service.socket.on).toHaveBeenCalledWith(WSEventType.CLOSE, expect.any(Function))
      expect(handler).toHaveBeenCalledWith(1000, 'test')
    })
  })

  describe('onError()', () => {
    it('should register a handler for the error event', () => {
      const onCallback = (event: string | symbol, listener: (...args: any[]) => void): WebSocket => {
        listener(new Error('test'))
        return service.socket
      }
      jest.spyOn(service.socket, 'on').mockImplementationOnce(onCallback)

      const handler = jest.fn()
      service.onError(handler)

      expect(service.socket.on).toHaveBeenCalledWith(WSEventType.ERROR, expect.any(Function))
      expect(handler).toHaveBeenCalledWith(new Error('test'))
    })
  })

  describe('onMessage()', () => {
    it('should register a handler for the message event', () => {
      const onCallback = (event: string | symbol, listener: (...args: any[]) => void): WebSocket => {
        listener(Buffer.from('test'), false)
        return service.socket
      }
      jest.spyOn(service.socket, 'on').mockImplementationOnce(onCallback)

      const handler = jest.fn()
      service.onMessage(handler)

      expect(service.socket.on).toHaveBeenCalledWith(WSEventType.MESSAGE, expect.any(Function))
      expect(handler).toHaveBeenCalledWith('test', false)
    })
  })

  describe('onOpen()', () => {
    it('should register a handler for the open event', () => {
      const onCallback = (event: string | symbol, listener: (...args: any[]) => void): WebSocket => {
        listener()
        return service.socket
      }
      jest.spyOn(service.socket, 'on').mockImplementationOnce(onCallback)

      const handler = jest.fn()
      service.onOpen(handler)

      expect(service.socket.on).toHaveBeenCalledWith(WSEventType.OPEN, expect.any(Function))
      expect(handler).toHaveBeenCalled()
    })
  })

  describe('onPing()', () => {
    it('should register a handler for the ping event', () => {
      const onCallback = (event: string | symbol, listener: (...args: any[]) => void): WebSocket => {
        listener(Buffer.from('test'))
        return service.socket
      }
      jest.spyOn(service.socket, 'on').mockImplementationOnce(onCallback)

      const handler = jest.fn()
      service.onPing(handler)

      expect(service.socket.on).toHaveBeenCalledWith(WSEventType.PING, expect.any(Function))
      expect(handler).toHaveBeenCalledWith('test')
    })
  })

  describe('onPong()', () => {
    it('should register a handler for the pong event', () => {
      const onCallback = (event: string | symbol, listener: (...args: any[]) => void): WebSocket => {
        listener(Buffer.from('test'))
        return service.socket
      }
      jest.spyOn(service.socket, 'on').mockImplementationOnce(onCallback)

      const handler = jest.fn()
      service.onPong(handler)

      expect(service.socket.on).toHaveBeenCalledWith(WSEventType.PONG, expect.any(Function))
      expect(handler).toHaveBeenCalledWith('test')
    })
  })

  describe('onUnexpected()', () => {
    it('should register a handler for the unexpected event', () => {
      const onCallback = (event: string | symbol, listener: (...args: any[]) => void): WebSocket => {
        listener(1000, 'test')
        return service.socket
      }
      jest.spyOn(service.socket, 'on').mockImplementationOnce(onCallback)

      const handler = jest.fn()
      service.onUnexpected(handler)

      expect(service.socket.on).toHaveBeenCalledWith(WSEventType.UNEXPECTED, expect.any(Function))
      expect(handler).toHaveBeenCalledWith(1000, 'test')
    })
  })

  describe('onUpgrade()', () => {
    it('should register a handler for the upgrade event', () => {
      const onCallback = (event: string | symbol, listener: (...args: any[]) => void): WebSocket => {
        listener(IncomingMessage)
        return service.socket
      }
      jest.spyOn(service.socket, 'on').mockImplementationOnce(onCallback)

      const handler = jest.fn()
      service.onUpgrade(handler)

      expect(service.socket.on).toHaveBeenCalledWith(WSEventType.UPGRADE, expect.any(Function))
      expect(handler).toHaveBeenCalledWith(IncomingMessage)
    })
  })
})
