const racer = require('racer')
const shareDbMongo = require('sharedb-mongo')
const Redis = require('ioredis')
const redisPubSub = require('sharedb-redis-pubsub')

module.exports = (mongoUrl, redisUrl) => {
  const shareMongo = shareDbMongo(mongoUrl, {
    allowAllQueries: true
  })


  if (redisUrl) {
    const redis1 = new Redis(redisUrl)
    const redis2 = new Redis(redisUrl)

    const pubsub = redisPubSub({client: redis1, observer: redis2})
    return racer.createBackend({db: shareMongo, pubsub})
  }

  return racer.createBackend({db: shareMongo})
}