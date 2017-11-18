var db = require("../db")

exports.insert = function(text, cb) {

    var comment = {
        text: text,
        date: new Date().toString
    }

    db.save(comment, function(err, doc) {
        if (err) return cb("Unable to connect")
        cb(null, doc)
    })

}

exports.getById = function(id, cb) {
    db.fetch(id, function(err, doc) {
        if (err) return cb("Unable to connect")
        cb(null, doc)
    })
}
