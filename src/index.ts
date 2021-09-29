import dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import { i18n, logger } from './utils'
import bot from './bot'

bot.use(i18n.middleware())

bot.launch().then(() => {
  bot.telegram.getMe().then(me => {
    logger.info(i18n.t('en', 'bot.started'))
    logger.info(me)
  })
})
