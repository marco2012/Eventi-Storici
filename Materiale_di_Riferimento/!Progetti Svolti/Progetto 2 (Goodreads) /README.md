#[Progetto-Reti-di-Calcolatori](https://github.com/LMeucci/Progetto-Reti-di-Calcolatori)

Il progetto consiste nella realizzazione di un servizio REST accedibile via Web

### PERSONE NEL GRUPPO
tra 3 e 5 (in casi eccezzionali si può violare questo vincolo). Chiaramente più è numeroso il gruppo più deve essere sostanzioso il progetto

### REQUISITI:
Il servizio REST implementato deve interfacciare almeno due servizi REST “esterni”
Almeno uno dei servizi REST esterni deve essere “commerciale” (es: twitter, google, facebook, pubnub, parse, firbase etc)
Almeno uno dei servizi REST esterni deve essere acceduto con oauth
Deve essere attivo un servizio di notifica asincrona (es. RABBITMQ)
Il progetto deve essere su GITHUB
Le API del servizio REST implementato devono essere documentate su GITHUB

------------------------------------------------------------------------------------------------------------------------------

### PRESENTAZIONE PROGETTO:
Il progetto presentato è stato realizzato da una sola persona ed è composto dai seguenti files:
appReti.js.js, oauthG.js, apiGreads.js, codaFinal2.js, success.html, error.html


### COSA:
appReti implementa un servizio rest verso Google Drive tramite oauth 2.0 ed implementa un secondo servizio rest verso Goodreads.com

E' utilizzato rabbitmq come servizio di notifica asincrona.


### COME:

appReti richiede all'utente i permessi per accedere a Drive tramite oauthG, scarica la lista dei file presenti
(in questo caso è importante, al fine di ottenere risultati consistenti, che siano presenti solo file che hanno per nome titoli di libri),
si connette a Goodreads, ottenendo la api key da apiGreads, e per ogni titolo scarica tutti dei metadati associati ad esso
(ad alcuni titoli possono corrispondere più libri).
Infine invia i dati appena ottenuti ad una coda gestita da rabbitmq.
codaFinal2 riceve i messaggi inviati da appReti tramite il broker di rabbitmq e per ogni libro crea un file xml contenente i suoi metadati.


#### Passaggio per passaggio:
1. Vengono avviati su due prompt dei comandi separati, codaFinal2 e appReti

2. appReti attiva il server chiamando oauthG.getAccess(callback).

3. L'utente inserisce localhost:3000 nel proprio browser per avviare il servizio rest.
	(Un modo più elegante di gestire questo passaggio consiste nel creare una propria pagina web con all'interno un pulsante per innescare l'autorizzazione dei permessi)

4. oauthG cattura la richiesta vuota("/") e ridirige l' utente alla maschera per la gestione dei permessi di google drive. Se l' utente non accetta viene aperta una pagina html di errore(è possibile ritentare reimmettendo nel browser localhost:3000), se invece accetta viene aperta  una pagina html che notifica l'esito positivo e prosegue con l'elaborazione.

5. Ottenuto l' authentication code oauthG apre una connessione verso l'authorization server di google e per scambiarlo con l'access token. Ottenuto l'access token lo invia ad appReti.

6. appReti chiama getListDrive(accessToken, callback) che apre una connessione con il resource server di google drive(inviando l'access token) per ottenere la lista dei file presenti in Drive.

7. appReti chiama apiGReads.getAccess(callback) per ottenere la apikey di Goodreads e per ogni file(titolo di un libro) presente nella lista chiama getMetadati(apikeyGoodreads, titolo, callback), il quale apre una connessione con Goodreads per scaricare i metadati associati ad ogni titolo e li invia al broker di rabbitmq.

8. codaFinal2 riceve i metadati che vengono salvati all' interno di un file che ha per nome il titolo del libro e la data corrente.
