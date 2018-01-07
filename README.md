# 📖 EVENTI STORICI 📖

# **PROGETTO RETI DI CALCOLATORI**
Il progetto consiste nella realizzazione di un servizio REST accedibile via Web

## **Persone nel gruppo**
- Aldo
- Giuseppe
- Francesca
- Francesco
- Marco

## **Requisiti**
- [x] Il servizio REST implementato deve interfacciare almeno due servizi REST *esterni*, cioè non su localhost
- [x] Almeno uno dei servizi REST esterni deve essere *commerciale* (es: twitter, google, facebook, pubnub, parse, firbase etc)
- [x] Almeno uno dei servizi REST esterni deve essere acceduto con oauth
- [x] Si deve usare AMQP (RabbitMQ) (o simili es MQTT)
- [x] Si devono usare Websocket
- [x] Il progetto deve essere su GITHUB
- [x] Le API del servizio REST implementato devono essere documentate su GITHUB

## **Avvio**

- Per installare le dipendenze eseguire `npm install`, verranno lette dal file *package.json* e installate.

- Per avviare il server eseguire `node app` (**RabbitMQ e CouchDB devono essere in esecuzione** su localhost).


## **Descrizione**

Il progetto utilizza le API fornite da http://history.muffinlabs.com/ per cercare tutti gli eventi storici avvenuti in un giorno particolare.

Una volta ottenuti, tali eventi storici vengono salvati, con i link alla relativa pagina wikipedia, in un file su Dropbox acceduto tramite Oauth.

Inoltre gli eventi vengono salvati su CouchDB attraverso working queue fornita da RabbitMQ e un evento casuale viene pubblicato su Twitter e Telegram con link wikipedia, link vide youtube, immagine con relativa descrizione fornita da intelligenza artificiale.


## [Descrizione dettagliata](https://github.com/marco2012/Docker/wiki#descrizione-dettagliata)


## [**API reference**](https://github.com/marco2012/Docker/wiki)


## **Link Utili**

- [Canale Telegram](https://t.me/behdaicapolavoro)

- [Profilo Twitter](https://twitter.com/dockervrun)

- [Dropbox Oauth](https://www.dropbox.com/developers/documentation/http/documentation#oauth2-authorize)

- [Guida Oauth](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)

- [Guida WebSockets](https://websocket.org/aboutwebsocket.html)
