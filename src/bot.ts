import Telegraf from 'telegraf'
import { MyContext } from './types'

const token = process.env.TEST_BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

export default new Telegraf<MyContext>(token, {contextType: MyContext})
