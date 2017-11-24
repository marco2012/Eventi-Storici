# FalconEyeRestService
Progetto per l'Esame di Reti di Calcolatori

Il sistema mette a disposizione 2 API da utilizzare in sequenza:

- La prima API ha funzione di CHECK rispetto ai dati inseriti (numero del treno e nome della stazione di riferimento): in sostanza,
verifica che il treno cercato e la stazione di riferimento abbiano un legame (ad esempio se quest'ultima e' una delle fermate del treno
o la stazione di arrivo o partenza); cosi' facendo si evitano errori dovuti a treni con la stessa numerazione, ma in viaggio in
differenti parti d'Italia. Per effettuare la chiamata:

nomedominio.estensione:8080/FalconEyeRestService/rest/service/{numero treno}/{nome stazione di riferimento}

- La seconda API ha funzione di ACCODAMENTO: viene accodato un messaggio alla pila del broker RabbitMQ utilizzato, contenente le
informazioni sul monitoraggio richiesto. Nel dettaglio seguente si puo' capire facilmente come venga composto il messaggio passato alla
coda:

String message = this.numTreno + " " + this.idStazione + " " + this.nextMon + " " + this.lastMon + " " + this.mail;

      - NumTreno   = numerazione del treno senza indicazione della categoria (la stessa verra' ricavata automaticamente dal servizio)
      - idStazione = e' la stringa indicante l'ID della stazione di partenza del treno scelto; e' ottenuta dalla chiamata dell'api check
                     vista in precedenza: quando essa trova coerenza tra treno e stazione di riferimento, restituisce in formato JSON
                     l'ID Stazione utilizzato in questa chiamata.
      - nextMon    = e' l'indicazione temporale, in formato EPOCH, dell'orario del prossimo monitoraggio richiesto. 
      - lastMon    = e' l'indicazione temporale, in formato EPOCH, dell'orario dell'ultimo monitoraggio richiesto.
      - mail       = e' l'indirizzo email scelto a cui mandare i monitoraggi
Per effettuare la chiamata:

nomedominio.estensione:8080/FalconEyeRestService/rest/service/accoda/{numTreno}/{idStazione}/{nextMon}/{lastMon}/{mailAddr}

Il sistema e' settato per inviare email ogni 15 minuti ed e' robusto dall'inserimento di email con grafia errata.

Dettagli aggiuntivi:
- L'api CHECK, qualora verifichi effettivamente la coerenza tra treno e stazione inseriti, risponde con un JSON riportante l'ID 
  di quest'ultima; altrimenti restituisce un JSON vuoto (per precisione, una stringa vuota).
- L'api ACCODA, qualora attivi correttamente il monitoraggio, risponde con un JSON riportante il messaggio "Ok", altrimenti risponde
  con il messaggio "Errore!"

