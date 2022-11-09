import { DynamicModule, Module } from '@nestjs/common'

import { WebsocketClientConstants } from './websocket-client.enums'
import { WebsocketClientOptions } from './websocket-client.options'
import { WebsocketClientService } from './websocket-client.service'
import { WebsocketProvider } from './websocket-client.provider'

@Module({})
export class WebsocketClientModule {
  static register (options: WebsocketClientOptions): DynamicModule {
    return {
      module: WebsocketClientModule,
      providers: [
        { provide: WebsocketClientConstants.OPTIONS, useValue: options },
        WebsocketClientService,
        WebsocketProvider
      ],
      exports: [WebsocketClientService]
    }
  }
}
