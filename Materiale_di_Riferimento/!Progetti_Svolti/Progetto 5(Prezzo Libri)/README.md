# Smartbooks
Progetto di reti di calcolatori (versione online)

https://mypythonapp-librosmart.rhcloud.com/

----------------------------------------------------------------------------------------------------------------------------------------
Come Utilizzare le APIs

Le nostre APIs sono destinate a sviluppatori esterni che vogliono integrare il nostro servizio nelle loro applicazioni. Comprendono, per il momento, di due GET. Per gli spazi usare il carattere speciale "--" ad esempio: "I--Malavoglia"

API SMARTLIBRO

Questa API restituisce nel formato json il libro cercato con relativo prezzo di Amazon e la media del prezzo delle librerie.

DA TERMINALE:

curl http://mypythonapp-librosmart.rhcloud.com/smartlibro/nomelibrodacercare

DA PYTHON INSERENDO "FROM REQUESTS IMPORT GET":

get('http://mypythonapp-librosmart.rhcloud.com/smartlibro/nomelibrodacercare').json() API SMARTLIBRERIE

Questa API restituisce nel formato json tutte le librerie nel raggio di 50km rispetto alla posizione della ricerca, includendo latitudine e longitudine.

DA TERMINALE:

curl http://mypythonapp-librosmart.rhcloud.com/smartlibrerie/viaincuicercare,città

DA PYTHON INSERENDO "FROM REQUESTS IMPORT GET":

get('http://mypythonapp-librosmart.rhcloud.com/smartlibro/viaincuicercare,città').json()

ESEMPI D'USO DISPONIBILI SUL SITO

----------------------------------------------------------------------------------------------------------------------------------------

I file qui presenti non includono i fogli di stile utilizzati nella versione online del sito.
Per utilizzare il layout (completamente gratuito) visita il sito 
https://html5up.net/phantom
