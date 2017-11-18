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



### Dipendenze

Per installare le dipendenze basta eseguire `npm install`, verranno lette dal file `package.json` e installate.

### Struttura Repository

`tree -d -I 'node_modules|materiale_RC*'`
```
.
├── Materiale_di_Riferimento
│   ├── !Progetti_Svolti
│   │   ├── Progetto\ 1\ (Google\ Drive)
│   │   │   ├── progetto
│   │   │   ├── retiEs1
│   │   │   ├── retiEs2
│   │   │   ├── retiEs3
│   │   │   └── retiEs4
│   │   ├── Progetto\ 2\ (Goodreads)
│   │   └── Progetto\ 3
│   ├── ExpressMockup
│   │   ├── config
│   │   ├── models
│   │   ├── public
│   │   ├── routes
│   │   └── views
│   ├── spotify-web-api-examples
│   │   ├── authorization_code
│   │   │   └── public
│   │   ├── client_credentials
│   │   └── implicit_grant
│   │       └── public
│   └── update_repo_script
├── Pattern_MVC
│   ├── controllers
│   └── views
│       ├── home
│       └── layouts
├── test_couchdb
│   └── controllers
└── test_mvc
    ├── Controllers
    └── Models
```

<p align="center">
  <img width="400" height="100%" src="/Materiale_di_Riferimento/docker_image.png">
</p>
