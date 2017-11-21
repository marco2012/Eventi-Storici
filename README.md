# **PROGETTO RETI DI CALCOLATORI**
Il progetto consiste nella realizzazione di un servizio REST accedibile via Web

## **Persone nel gruppo**

Tra 3 e 5 (in casi eccezzionali si può violare questo vincolo).
Più è numeroso il gruppo più deve essere sostanzioso il progetto

## **Requisiti**
- [ ] Il servizio REST implementato deve interfacciare almeno due servizi REST *esterni*, cioè non su localhost
- [ ] Almeno uno dei servizi REST esterni deve essere *commerciale* (es: twitter, google, facebook, pubnub, parse, firbase etc)
- [ ] Almeno uno dei servizi REST esterni deve essere acceduto con oauth
- [ ] Si devono usare Websocket e AMQP (RabbitMQ) (o simili es MQTT)
- [x] Il progetto deve essere su GITHUB
- [ ] Le API del servizio REST implementato devono essere documentate su GITHUB

## **Dipendenze**

Per installare le dipendenze basta eseguire `npm install`, verranno lette dal file *package.json* e installate.


## **Descrizione**

Il progetto utilizza le API fornite da http://history.muffinlabs.com/ per prendere tutti gli evevnti storici avvenuti in un giorno particolare.

Una volta ottenuti gli eventi storici relativi alla data, l'applicazione si connette tramite outh a Google Drive e crea un file contenente una lista di eventi con i link alla relativa pagina wikipedia (e se c'è tempo anche i link di video presi da youtube).

Oltre all'operazione di scrittura dul Drive, gli eventi vengono salvati su CouchDB attraverso Working queue fornita da RabbitMQ.

## **Compiti (Provvisori)**

### Marco:
1. [ ] Autenticazione a Google Drive tramite Outh

### Francesca
2. [ ] Creazione di un file sul drive
3. [ ] Scrittura degli eventi sul file Google Drive

### Francesco
3. [ ] Reperimento dei dati da http://history.muffinlabs.com/date/

### Aldo
4. [ ] Reperimento dei link ai video storici tramite youtube

### Giuseppe
7. [ ] Scrittura dei dati dei CouchDB

### Gruppo
?. WebSocket
6. [ ] Creazione del processo scrittore tramite RabbitMQ

## **Cose utili**

**Repository GitHub**
https://github.com/marco2012/Docker

**Guida Git**
https://rogerdudler.github.io/git-guide/index.it.html

**Account Google**
```
email: dockervrun@gmail.com
pass:  behdaicapolavoro
```

**Google API**
https://console.developers.google.com/

**Google calendar**
https://developers.google.com/google-apps/calendar/create-events

**Varie API**
https://www.programmableweb.com/

<p align="center">
  <img width="400" height="100%" src="/Materiale_di_Riferimento/docker_image.png">
</p>
