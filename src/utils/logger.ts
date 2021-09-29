import { transports, format, addColors, createLogger } from 'winston'
const { colorize, combine, timestamp, printf, prettyPrint, splat } = format

function syntaxHighlight (json: Object, colors?: Object): string {
  if (!colors)
    colors = {
      key: '\x1b[34m', //'\x1b[1m',
      boolean: '\x1b[31m',
      string: '\x1b[32m',
      number: '\x1b[33m',
      null: '\x1b[36m',
      undefined: '\x1b[35m'
    }

  let jsonStr = JSON.stringify(
    json,
    function (k, v) {
      return v === undefined ? '9bFf2G6n' : v
    },
    2
  )

  jsonStr = jsonStr
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  //
  return jsonStr
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null|undefined)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = 'number'
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key'
            match = match.replace(/"/g, '')
          } else {
            if (match == '"9bFf2G6n"') {
              cls = 'undefined'
              match = 'undefined'
            } else cls = 'string'
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean'
        } else if (/null/.test(match)) {
          cls = 'null'
        } else if (/undefined/.test(match)) {
          cls = 'null'
        }
        return `${colors[cls]}` + (match ? match : 'nulll') + '\x1b[0m'
      }
    )
    .replace(/,/g, '\x1b[8m' + ',' + '\x1b[0m')
}
const myFormats = {
  consoleFormat: combine(
    colorize(),
    prettyPrint(),
    splat(),
    printf(info => {
      if (info.message && info.message.constructor === Object) {
        let message = syntaxHighlight(info.message)
        return `${info.level}\n${message}`
      }
      return (
        `${info.level}` +
        `${info.message && info.message.indexOf('\n') !== -1 ? '\n' : ' '}` +
        `${info.message}`
      )
    })
  ),
  fileFormat: combine(
    timestamp({ format: 'dd/MM/YYYY HH:mm:ss.SSS' }),
    printf(info => {
      let message = info.message
      if (info.message && info.message.constructor === Object) {
        message = JSON.stringify(info.message)
        return `[${info.timestamp}][${info.level}] ${message}`
      }
      return (
        `[${info.timestamp}][${info.level}]` +
        `${info.message && info.message.indexOf('\n') !== -1 ? '\n' : ' '}` +
        `${message}`
      )
    })
  )
}
addColors({
  debug: 'blue',
  info: 'green',
  warn: 'yellowBG red',
  error: 'red',
  crit: 'redBG white'
})

export const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      format: myFormats.consoleFormat
    }),
    new transports.File({
      filename: 'dist/tmp/error.log',
      level: 'error',
      format: myFormats.fileFormat
    }),
    new transports.File({
      filename: 'dist/tmp/full.log',
      format: myFormats.fileFormat
    })
  ],
  exitOnError: false
})
