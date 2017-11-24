# Smartphone-Finder

## Progetto reti di calcolatori

### Introduzione
Smartphone Finder è un' applicazione web basata su architettura REST con la quale è possibile trovare e visualizzare le specifiche tecniche di alcuni smartphone in commercio. L'applicazione restituisce le seguenti informazioni:
- Modello
- Cpu
- Dimensione memoria interna
- Massima dimensione memoria esterna supportata
- Dimensione Ram
- Sistema Operativo
- Dimensioni
- Peso
- Capienza batteria
- Grandezza del display
- Fotocamera

### Servizi implementati ([Routes](https://github.com/zeusm9/Smartphone-Finder/blob/master/app/routes.js))
- /login : login al servizio in locale
- /signup: registrazione al servizio in locale
- /smartphone: restituzione delle specifiche del modello di smartphone cercato
- /search: barra di ricerca per trovare il modello desiderato
- /auth/facebook: possibilità di login tramite Facebook
- /auth/google: possibilità di login tramite Google

### Api esterne implementate:
Facebook Login: Utilizza OAuth2. E' stato utilizzato per dare la possibilità all'utente di effettuare il login tramite Facebook.
Google Sign-In: Utilizza OAuth2. E' stato utilizzato per dare la possibilità all'utente di effettuare il login tramite Google.

### Servizio notifica asincrona:
E' stato utilizzato RabbitMq per notificare agli amministratori dell'applicazione, tramite un [log](https://github.com/zeusm9/Smartphone-Finder/tree/master/log), le ricerche effettuate dagli utenti.


Il servizio è stato testato al seguente link: https://smartphone-finder-zeusm.c9users.io/
