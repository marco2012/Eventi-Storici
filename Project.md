# Progetto Reti di Calcolatori

## **Descrizione**

Il progetto utilizza le API fornite da http://history.muffinlabs.com/date/ per prendere tutti gli evevnti storici avvenuti in un giorno particolare.

Una volta ottenuti gli eventi storici relativi alla data, l'applicazione si connette tramite outh a Google Drive e crea un file contenente una lista di eventi con i link alla relativa pagina wikipedia (e se c'è tempo anche i link di video presi da youtube).

Oltre all'operazione di scrittura dul Drive, gli eventi vengono salvati su CouchDB attraverso Working queue fornita da RabbitMQ.

## Compiti (Provvisori)

### Marco:
1. [ ] Autenticazione a Google Drive tramite Outh

### Francesca
2. [ ] Creazione di un file sul drive
3. [ ] Scrittura degli eventi sul file Google Drive

### Francesco
3. [ ] Reperimento dei dati da http://history.muffinlabs.com/date/, ciclo sugli eventi
4. [ ] Reperimento dei link ai video storici tramite youtube

### Aldo
6. [ ] Creazione del processo scrittore tramite RabbitMQ

###
?. WebSocket

### Giuseppe
7. [ ] Scrittura dei dati dei CouchDB
