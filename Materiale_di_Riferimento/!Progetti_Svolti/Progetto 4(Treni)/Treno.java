package fers;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;

import com.google.gson.annotations.SerializedName;

public class Treno {
	
	@SerializedName("numeroTreno")
	private int numeroTreno;
	@SerializedName("categoria")
	private String categoria;
	@SerializedName("origine")
	private String origine;
	@SerializedName("destinazione")
	private String destinazione;
	@SerializedName("nonPartito")
	private boolean nonPartito = false;
	@SerializedName("ritardo")
	private int ritardo;
	@SerializedName("oraUltimoRilevamento")
	private String oraUltimoRilevamento;
	@SerializedName("stazioneUltimoRilevamento")
	private String stazioneUltimoRilevamento;
	
	//Definire una collezione di fermate
	@SerializedName("fermate")
	private LinkedList<Fermata> fermate;
	
	private LinkedList<Fermata> fermateAggiornate;
	
	//Costruttore
	public Treno(int nt, String cat, 
			String or, String dest, boolean np, 
			int rit, String our, String str, 
			LinkedList<Fermata> ferm){
		
		this.numeroTreno = nt;
		this.categoria = cat;
		this.origine = or;
		this.destinazione = dest;
		this.nonPartito = np;
		this.ritardo = rit;
		this.oraUltimoRilevamento = our;
		this.stazioneUltimoRilevamento = str;
		this.fermate = ferm;
		
		//Se il treno non fa fermate, restituisce la lista vuota:
		if (this.fermate == null) this.fermate = new LinkedList<Fermata>();
	}
	
	//Getter
	public int getNumeroTreno(){
		return this.numeroTreno;
	}
	
	public String getCategoria(){
		return this.categoria;
	}
	
	public String getOrigine(){
		return this.origine;
	}
	
	public String getDestinazione(){
		return this.destinazione;
	}
	
	public boolean getNonPartito(){
		return this.nonPartito;
	}
	
	public int getRitardo(){
		return this.ritardo;
	}
	
	public String getOraUltimoRilevamento(){
		return this.oraUltimoRilevamento;
	}
	
	public String getStazioneUltimoRilevamento(){
		return this.stazioneUltimoRilevamento;
	}
	
	public LinkedList<Fermata> getFermate(){
		return this.fermate;
	}
	
	public LinkedList<Fermata> getFermateAggiornate(){
		return this.fermateAggiornate;
	}
	
	public LinkedList<Fermata> getProssimeFermate(int ritardo){
		
		//Prendo la lista delle fermate e la copio in una lista di appoggio
		LinkedList<Fermata> listagrezza = this.fermate;
		//Creo una nuova lista in cui vado a porre le fermate arricchite dei dettagli sul ritardo:
		LinkedList<Fermata> lista = new LinkedList<Fermata>();
		//Prendo l'istante attuale:
		Long ora = System.currentTimeMillis();
		//Scorro la lista grezza e la svuoto:
		while(listagrezza.isEmpty()==false){
			//Fermata di appoggio:
			Fermata f = listagrezza.getFirst();
			//La aggiorno con le informazioni sul ritardo:
			f.setReale(ritardo);
			
			//Se f e' la stazione di partenza, verifico se sia partito o meno:
			if(f.getArrivo_Teorico().equals("Stazione di Partenza")){
				//Se il treno non e' partito, considero la stazione di partenza come "fermata mancante":
				if(this.getNonPartito()==true) lista.addLast(f);
				//Altrimenti non la aggiungo
			}
			//Se sono invece ad analizzare altre fermate:
			else{
			//Effettuo il confronto sull'orario: se ora e' prima dell'arrivo reale alla prossima fermata,
			//aggiungo la fermata alla lista, altrimenti niente:
			Long arrivo = Long.decode(f.getArrivoReale());
			if(ora < arrivo) lista.addLast(f);
			
			
			}
			
			//Comunque vada, rimuovo f dalla lista di partenza:
			listagrezza.remove(f);
		}	
		
		
		//Aggiorno la variabile locale:
		this.fermateAggiornate = lista;
		
		return lista;	
	}
	
	public static String EpochConverter(String epoch){
		String conversione = "";
		if(epoch == null) return "";
		
		if(epoch.equals("Dato non disponibile") || epoch.equals("Stazione di Arrivo") || epoch.equals("Stazione di Partenza")){
			return epoch;
		}
		
		Long epochlong = Long.decode(epoch);
		SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm");
		Time orario = new Time(epochlong);
		
		conversione = sdf1.format(orario);
		
		return conversione;
	}
	//Definire un buon ToString per avere le informazioni ben formattate
	public String toString(){
		String tostring = "";
		
		//Definisco il treno:
		tostring = tostring + "Treno: " + this.categoria + this.numeroTreno + " ";
		//Proveniente da:
		tostring = tostring + "proveniente da: " + this.origine + " ";
		//Diretto a:
		tostring = tostring + "e diretto a: " + this.destinazione + " \n";
		//Se il treno non e' ancora partito, lo indico, altrimenti riporto l'ultimo rilevamento:
		if(this.nonPartito==true){
			tostring = tostring + "Attenzione: il treno non e' ancora partito! \n";
		}
		//Se il treno e' partito, ma ancora non si ha un orario di ultimo rilevamento:
		if(this.nonPartito==false && (this.oraUltimoRilevamento == null)){
			tostring = tostring + "Ultimo rilevamento non ancora disponibile\n";
		} else {
		//Se il treno e' partito e si ha un orario di ultimo rilevamento:
			tostring = tostring + "Ultimo rilevamento a : " + this.stazioneUltimoRilevamento + 
						 " alle ore: " + EpochConverter(this.oraUltimoRilevamento) + " \n\n";
			//Comportamento del treno:
			if(getRitardo()<0) tostring = tostring + "Il treno è in anticipo di " + getRitardo() + " minuti\n";
			if(getRitardo()==0) tostring = tostring + "Il treno è puntuale\n";
			if(getRitardo()>0) tostring = tostring + "Il treno è in ritardo di " + getRitardo() + " minuti\n";			 
		}
		//Lascio una riga vuota:
		tostring = tostring + "\n";
		
		//Se l'ultimo rilevamento e' maggiore a 10 minuti rispetto all'orario attuale,
		//espongo il problema con un messaggio ed evito di stampare dati erronei sulle prossime
		//stazioni in cui effettuare fermata:
		Long ora = System.currentTimeMillis();
		if(getOraUltimoRilevamento() != null){
		Long urpiu10 = Long.decode(getOraUltimoRilevamento()) + 10 * 60 * 1000;
		
		//System.out.println("Ora sono le: " + EpochConverter(ora.toString()));
		//System.out.println("Ultimo rilevamento + 10 minuti vale: " + EpochConverter(urpiu10.toString()));
		
		if(getStazioneUltimoRilevamento().equals(getDestinazione())){
			tostring = tostring + "Il treno è arrivato a destinazione";
			return tostring;
		}
		
		if(urpiu10 <= ora){
			
			tostring = tostring + " I dati circa questo treno non sono aggiornati poiche' l'ultimo "
					+ "passaggio rilevato risale a più di dieci minuti fa";
			return tostring;
		}
		} else {
			
			tostring = tostring + "Informazione circa l'ultimo rilevamento non valida\n";
		}
			
		LinkedList<Fermata> prossime = getFermateAggiornate();
		//Se il treno non ha fermate intermedie, la lista prossima e' vuota: aggiungo quindi un messaggio
		//informativo; altrimenti stampo le informazioni circa le fermate mancanti:
		if(prossime.isEmpty()==true){
			tostring = tostring + " Non sono previste fermate intermedie prima della destinazione. \n";
		}
		
		tostring = tostring + "Mancano " + prossime.size() + " fermate all'arrivo a destinazione. \n";
		if(prossime.isEmpty()==false){
			tostring = tostring + "Prossime Fermate: \n";
			while(prossime.isEmpty()==false){
				Fermata f = prossime.getFirst();
				tostring = tostring + f.toString();
				//Lascio una riga vuota ogni fermata letta:
				tostring = tostring + "\n";
				prossime.removeFirst();
			}
			
		}
		
		return tostring;
		
	}
}
