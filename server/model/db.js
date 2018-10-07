const MongoClient = require('mongodb').MongoClient
const dbconfig = require('../config/db.config.json').local
var conn = null 

const DatabaseConnection = {
    connect: (cb) => {
        // console.log('anis')
        let url = dbconfig.host+':'+dbconfig.port+'/' +dbconfig.dbname
        MongoClient.connect(url, (err, db) => {
            if(!err){
                conn = db.db(dbconfig.dbname)
            }
            cb(err, db)
        })
    },
    getConnection: () => {
        return conn
    } //callback
}

module.exports = DatabaseConnection