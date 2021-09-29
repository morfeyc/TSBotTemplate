import TelegrafI18n from 'telegraf-i18n'
import path from 'path'

export const i18n = new TelegrafI18n({
  defaultLanguage: 'en',
  defaultLanguageOnMissing: true,
  directory: path.resolve(__dirname, '../locales')
})
