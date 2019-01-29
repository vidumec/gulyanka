var express = require("express");
var router = express.Router();
var utils = require("../../utils");
var mongo = require("mongodb").MongoClient;
var assert = require("assert");

router.get("/", function(req, res, next) {
  if (req.session.auth != "user") {
    res.redirect("/api/auth");
  }
  console.log("**-----------------------------------------------------**");
  console.log(
    "Sumbitting WillGo for user: " + req.session.oauth.data.screen_name
  );
  console.log("place ID : " + req.query.q);
  console.log("**-----------------------------------------------------**");

  mongo.connect(
    utils.mongourl,
    (err, db) => {
      if (err) throw err;
      var dbo = db.db(utils.db);
      dbo
        .collection(utils.collection)
        .findOneAndUpdate(
          { place_id: req.query.q },
          { $push: { goers: req.session.oauth.data.id } },
          { upsert: true },
          (err, doc) => {
            assert.equal(err, null);
            console.log(doc);
            db.close();
            console.log("sent :^)");
          }
        );
    }
  );

  res.status(200).send(JSON.stringify({ message: "ok" }));
});

module.exports = router;
