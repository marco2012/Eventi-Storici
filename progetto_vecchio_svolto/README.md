##**PROGETTO DI RETI DI CALCOLATORI**
*trovato online*

Il progetto consiste nella realizzazione di un servizio REST accedibile via Web

**PERSONE NEL GRUPPO**

tra 3 e 5 (in casi eccezzionali si può violare questo vincolo). Chiaramente più è numeroso il gruppo più deve essere sostanzioso il progetto

###Progetto

**REQUISITI**

Il servizio REST implementato deve interfacciare almeno due servizi REST “esterni”
Almeno uno dei servizi REST esterni deve essere “commerciale” (es: twitter, google, facebook, pubnub, parse, firbase etc)
Almeno uno dei servizi REST esterni deve essere acceduto con oauth
Deve essere attivo un servizio di notifica asincrona (es. RABBITMQ)
Il progetto deve essere su GITHUB
Le API del servizio REST implementato devono essere documentate su GITHUB


###Esercizi

**Esercizio 1**

Implementare un robot via socket che vada sul sito http://www.ilmeteo.it/meteo/roma , prenda la temperatura minima e massima prevista per la giornata odierna, ed inserisca i dati prelevati su couchdb via API REST implementate con socket


**Esercizio 2**

Implementare un server HTTP per gestire il riscaldamento di casa. Implementare una classe termostato che fornisce i metodi per accendere e spegnere il termostato. Quando il server riceve una chiamata http opportuna (a voi definire quale, per esempio PUT per accendere e GET per spegner), accende o spegne il termostato interagendo con la classe java termostato.


**Esercizio 3**

Implementare un server in nodejs che sia in grado di fare una chiamata REST verso uno qualunque delle API REST offerte in http://www.programmableweb.com/ e visualizzi il risultato


**Esercizio 4**

Implementare il medesimo server, ma che si connetta verso un servizio REST che prevede l'autenticazione via OAUTH
