import { Sequelize } from 'sequelize/types'

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: 'Europe/Kiev',
    logging: false
  }
)
