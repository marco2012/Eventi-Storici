package fers;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.LinkedList;

import com.google.gson.Gson;

public class Check {

	private boolean risultato = false;
	private String numTreno;
	private String stazione;
	private String idStazione;
	public Check(String numTreno, String stazione) throws IOException{
		
		//Costruttore:
		this.numTreno = numTreno;
		this.stazione = stazione;
		
		stazione = stazione.toUpperCase();
		String url = "http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/cercaNumeroTrenoTrenoAutocomplete/" + numTreno;	
		//Creo la URL:
				URL treno = new URL(url);
				//Apro il buffer di lettura:
				BufferedReader in = new BufferedReader(new InputStreamReader(treno.openStream()));
			    //Imposto due stringhe: una di appoggio e una per la conservazione del risultato della lettura:
				String risposta;
				String jsontreno = "";
				//Leggo:
				LinkedList<String> lista = new LinkedList<String>();
				 while ((risposta = in.readLine()) != null){
			    	 System.out.println(risposta);
					 jsontreno = jsontreno + risposta;
					 lista.add(risposta);
					 
			     }
				 //System.out.println("La dimensione della lista e': " + lista.size());
				 
				 in.close();
			     
			     //System.out.println("La lista e' vuota? " + lista.isEmpty());
			     
			     /*Se il JSon di ritorno e' vuoto perche' il treno non esiste, non posso
			     lanciare monitoraggi, quindi riporto una stringa di errore:*/
			     if(lista.isEmpty()==true){
			     System.out.println("Errore! Treno " + numTreno + " non riconosciuto! Verifica la numerazione!");
			     risultato = false;
			     } else{
			     String codiceStazione = checkCoerenza(lista, stazione,numTreno);
			     if(codiceStazione.equals("Errore!")){
			    	 System.out.println("Errore di Coerenza: il treno " + numTreno + " non nasce / non si ferma / non arriva a " + stazione);
			    	 risultato = false;
			     } else {
			    
			     System.out.println("Il treno di interesse e' il: " + numTreno + " con codice stazione: " + codiceStazione);
			     risultato = true;
			     this.idStazione = codiceStazione;
			     }
			     }
				
		
	}
		
	private String checkCoerenza(LinkedList<String> treni, String stazione, String numTreno) throws IOException{
		
		String codice = "";
		Boolean b = false;
		//Ciclo piu' esterno per scorrere la lista dei treni arrivati in risposta da viaggiatreno:
		while(treni.isEmpty() == false){
			String appoggio = treni.getFirst();
			String idStazione = appoggio.substring(appoggio.length()-6, appoggio.length());
			//System.out.println("Ho rilevato il codice stazione: " +idStazione + " per il treno: " + numTreno);
			
			//Provo a leggere le informazioni dei treni rilevati:
			
			/*Porzione dell'url generica di risposta di viaggiatreno a cui concatenare le informazioni
			passate per parametro*/
			String url = "http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/andamentoTreno/"
					+ idStazione + "/" + numTreno ;
			
			//Creo la URL:
			URL treno = new URL(url);
			//Apro il buffer di lettura:
			BufferedReader in = new BufferedReader(new InputStreamReader(treno.openStream()));
		    
			//Imposto due stringhe: una di appoggio e una per la conservazione del risultato della lettura:
			String risposta;
			String jsontreno = "";
			//Leggo:
			 while ((risposta = in.readLine()) != null){
		    	 jsontreno = jsontreno + risposta;
		    		
		     }
			 //Chiudo il buffer:
		     in.close();
		     //Creo una istanza di GSon:
		     Gson gs = new Gson();
		     //Ricavo il treno:
		     Treno train = gs.fromJson(jsontreno, Treno.class);
		     //Prendo la lista grezza delle stazioni:
		     LinkedList<Fermata> fermate = train.getFermate();
		     		//Ciclo annidato per verificare la presenza o meno della stazione di riferimento tra le fermate:
		     		while(fermate.isEmpty()==false){
		     			//Prendo una fermata di appoggio
		     			Fermata f = fermate.getFirst();
		     			//Prendo il nome della stazione e lo rendo, per sicurezza, tutto maiuscolo
		     			String nome = f.getStazione().toUpperCase();
		     			//Stampo il risultato
		     			//System.out.println("Ho trovato la stazione di: " + nome);
		     			//Verifico l'eventuale uguaglianza:
		     			if(nome.equals(stazione)){
		     				//Aggiorno il booleano
		     				b = true;
		     				//Aggiorno il codice da dare in return al metodo:
		     				codice = idStazione;
		     				//Interrompo il ciclo:
		     				break;
		     			}
		     			//Rimuovo la fermata:
		     			fermate.removeFirst();
		     		}
			
			
			//Se a seguito di una qualche iterazione, trovo il treno corretto, interrompo il ciclo:
			if(b==true){
				break;
			}
			
			
			treni.removeFirst();
		}
		
		if (b == false) codice = "Errore!";
		return codice;
		
	}
	
	//Getter:
	public boolean getRisultato(){
		return this.risultato;
	}
	
	public String getidStazione(){
		return this.idStazione;
	}
}
