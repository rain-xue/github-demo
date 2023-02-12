import { Sequelize, Options } from 'sequelize'

const env = process.env.NODE_ENV || 'development'

const configs = {
  dialect: "postgres",
  database: "resvu_api_dev",
  username: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432
}

const config = (configs as {[key: string]: Options})

const db: Sequelize = new Sequelize(config)

export default db