# Websocket Client
Websocket client built with ws for use in nestjs applications. Nest has great support for creating websocket servers but it's a little lacking in the client department. This package aims to fix that.

[![continuous integration](https://github.com/cascadeplus/websocket-client/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/cascadeplus/websocket-client/actions/workflows/continuous-integration.yml)

## Installation

```bash
$ npm i --save @cascadeplus/websocket-client
```

## Usage
Due to how the `ws` library works creating an instance automatically tries to connect. When registering
the `WebsocketClientModule` pass it the url and use the service to listem to/send events.

```js
// your-module.ts
@Module({
  imports: [
    WebsocketClientModule.register({ url: 'ws://localhost:8080' })
  ],
  providers: [
    YourService
  ]
})
export class YourModule {}

// your-service.ts
@Injectable()
export class YourService {
  private readonly logger = new Logger(YourService.name)

  constructor (private readonly websocket: WebsocketClientService) {}

  public example (): void {
    this.websocket.onOpen(() => {
      this.logger.log('websocket connection opened')
    })

    this.websocket.onClose(() => {
      this.logger.log('websocket connection closed')
    })

    this.websocket.send({ foo: 'bar' })

    this.websocket.onMessage((message: string) => {
      this.logger.log(message)
    })
  }
}
```

Close the app when the websocket connection closes:
```js
// main.ts
async function bootstrap (): Promise<void> {
  // ...

  const websocket = app.get(WebsocketClientService)
  websocket.onClose(() => {
    app.close()
  })

  // ...
}
```

## Test

```bash
# lint
$ npm run lint

# unit tests
$ npm run test
```
