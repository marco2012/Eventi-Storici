[CouchDB](http://couchdb.apache.org/) è un DB non relazionale di ultima generazione che offre API REST.

Per cominciare a lavoroarci
[Couch DB Tutorial](https://www.tutorialspoint.com/couchdb/index.htm)

N.B "rev", this indicates the revision id. Every time you revise (update or modify) a document a _rev value will be generated by CouchDB. If you want to update or delete a document, CouchDB expects you to include the _rev field of the revision you wish to change. When CouchDB accepts the change, it will generate a new revision number. This mechanism ensures concurrency control.

```
docker run -p 5984:5984 -d couchdb
```

[Futon](http://localhost:5984/_utils/) is the built-in, web based, administration interface of CouchDB. It provides a simple graphical interface using which you can interact with CouchDB.

[POSTMAN](https://www.getpostman.com/) ti consente di sperimentare con le API REST in modo effcicace.

[Open Wheather Map](https://openweathermap.org/api)

Prendi i dati su Roma
http://api.openweathermap.org/data/2.5/weather?q=Roma,IT&appid=bc1ddf2e6211920bf9d7988a7d67348f

```json
{"coord":{"lon":12.48,"lat":41.89},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"base":"stations","main":{"temp":291.72,"pressure":1012,"humidity":63,"temp_min":289.15,"temp_max":293.15},"visibility":9000,"wind":{"speed":3.1,"deg":210},"clouds":{"all":20},"dt":1508689200,"sys":{"type":1,"id":5848,"message":0.0035,"country":"IT","sunrise":1508650281,"sunset":1508689010},"id":3169070,"name":"Roma","cod":20
```

[Google Places API](https://developers.google.com/places/web-service/search?authuser=1)

https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.89,12.48&radius=500&types=food&key=AIzaSyAPVWnsyoIJ30JraxrqCR5HXt5UWu6Z0XE