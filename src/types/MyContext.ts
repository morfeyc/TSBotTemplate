import { Context } from 'telegraf'
import { Logger } from 'winston'
import { logger } from '../utils'

export class MyContext extends Context {
  logger: Logger
  constructor (update, telegram, options) {
    super(update, telegram, options)
    this.logger = logger
  }
}
