package fers;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import com.google.gson.Gson;

public class Monitoraggio {
	
	//Informazioni necessarie:
	private String idStazione;
	private String numTreno;
	
	//Risultato:
	private String result;
	
	public Monitoraggio(String id, String num) throws IOException{
		this.idStazione = id;
		this.numTreno = num;
		
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
	     //Aggiornare i dati sulle fermate con apposita chiamata del metodo:
	     train.getProssimeFermate(train.getRitardo());
	     //Valorizzo il risultato	     
	     this.result = train.toString();
	}
	
	//Getter
	public String getResult(){
		return this.result;
	}
	
	public String getNumTreno(){
		return this.numTreno;
	}
}
