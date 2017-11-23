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
- [ ] Si devono usare Websocket e AMQP (RabbitMQ) (o simili es MQTT)
- [x] Il progetto deve essere su GITHUB
- [ ] Le API del servizio REST implementato devono essere documentate su GITHUB

## **Dipendenze**

Per installare le dipendenze basta eseguire `npm install`, verranno lette dal file *package.json* e installate.


## **Descrizione**

Il progetto utilizza le API fornite da http://history.muffinlabs.com/ per prendere tutti gli evevnti storici avvenuti in un giorno particolare.

Una volta ottenuti gli eventi storici relativi alla data, l'applicazione si connette tramite outh a Google Drive e crea un file contenente una lista di eventi con i link alla relativa pagina wikipedia (e se c'è tempo anche i link di video presi da youtube).

Oltre all'operazione di scrittura dul Drive, gli eventi vengono salvati su CouchDB attraverso Working queue fornita da RabbitMQ.


## **Compiti**

### Marco:
- [x] Autenticazione a Google Drive tramite Oauth

### Francesca
- [ ] Creazione di un file sul drive
- [ ] Scrittura degli eventi sul file Google Drive

### Francesco
- [x] Reperimento dei dati da http://history.muffinlabs.com/date/2/14 e salvataggio in variabili

### Aldo
- [ ] Reperimento dei link ai video storici tramite youtube (Necessario Oauth)
- [x] Pagina iniziale in HTMl

### Giuseppe
- [ ] Scrittura dei dati su CouchDB

### Gruppo
- [ ] WebSocket
- [ ] RabbitMQ


## **Cose utili**

**Account Google**
```
email: dockervrun@gmail.com
pass:  behdaicapolavoro
```
- [Guida Git](https://rogerdudler.github.io/git-guide/index.it.html)

- [Google API](https://console.developers.google.com/)
  - [Google calendar](https://developers.google.com/google-apps/calendar/create-events)
  - [Google drive oauth](https://developers.google.com/identity/protocols/OAuth2WebServer)

- [Oauth](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)

- [API Varie](https://www.programmableweb.com/)

- [RabbitMQ Tutorial](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)

- [WebSockets](https://github.com/andreavitaletti/RC/wiki/Web-Sockets)



<p align="center">
  <img width="400" height="100%" src="/Materiale_di_Riferimento/docker_image.png">
</p>
