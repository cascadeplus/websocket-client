import { ClientRequest, IncomingMessage } from 'http'

export type IOnCloseHandler = (code: number, reason: string) => void

export type IOnErrorHandler = (error: Error) => void

export type IOnMessageHandler = (message: string, isBinary: boolean) => void

export type IOnOpenHandler = () => void

export type IOnPingHandler = (data: string) => void

export type IOnUnexpectedHandler = (request: ClientRequest, response: IncomingMessage) => void

export type IOnUpgradeHandler = (request: IncomingMessage) => void

export type IOnPongHandler = (data: string) => void
