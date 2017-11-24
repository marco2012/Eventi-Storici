package fers;
import java.sql.Time;
import java.text.SimpleDateFormat;

import com.google.gson.annotations.SerializedName;

public class Fermata {
	
	@SerializedName("stazione")
	private String stazione;
	@SerializedName("id")
	private String id;
	@SerializedName("partenza_teorica")
	private String partenza_teorica;
	@SerializedName("arrivo_teorico")
	private String arrivo_teorico;
	
	private String partenzaReale;
	private String arrivoReale;
	
	public Fermata (String st, String id, String pt, String at){
		
		this.stazione = st;
		this.id = id;
		this.partenza_teorica = pt;
		this.arrivo_teorico = at;
		
	}
	
	//Getter
	public String getStazione(){
		return this.stazione;
	}
	
	public String getId(){
		return this.id;
	}
	
	public String getPartenza_Teorica(){
		return this.partenza_teorica;
	}
	
	public String getArrivo_Teorico(){
		return this.arrivo_teorico;
	}
	
	//Setter necessari solo per aggiornamenti sull'andamento del treno:
	
	public void setReale(int ritardo){
		
		if(arrivo_teorico == null){
			arrivo_teorico = "Stazione di Partenza";
			this.arrivoReale = "Dato non disponibile";
			
		}
		
		if(partenza_teorica == null){
			partenza_teorica = "Stazione di Arrivo";
			this.partenzaReale = "Dato non disponibile";
			
		}
		
		if(this.arrivo_teorico.equals("Stazione di Partenza")){
			setPartenzaReale(ritardo);
			
		}
		
		if(this.partenza_teorica.equals("Stazione di Arrivo")){
			setArrivoReale(ritardo);
			
		}
		
		
		if(!this.partenza_teorica.equals("Stazione di Arrivo")){ 
			setPartenzaReale(ritardo);
		}
		
		if(!this.arrivo_teorico.equals("Stazione di Partenza")){
			setArrivoReale(ritardo);
		}
		
	}

	private void setPartenzaReale(int ritardo) {
		
		Long rit = (long) ritardo * 60 * 1000;
		Long partTeo = Long.decode(this.partenza_teorica);
		Long partReale =  partTeo + rit;
		this.partenzaReale = "" + partReale;
		
	}

	private void setArrivoReale(int ritardo) {
		Long rit = (long) ritardo * 60 * 1000;
		Long arrTeo = Long.decode(this.arrivo_teorico);
		Long arrReale =  arrTeo + rit;
		this.arrivoReale = "" + arrReale;
	}
	
	public String getArrivoReale(){
		return this.arrivoReale;
	}
	
	public String getPartenzaReale(){
		return this.partenzaReale;
	}
	
	public String EpochConverter(String epoch){
		String conversione = "";
		
		if(epoch.equals("Dato non disponibile") || epoch.equals("Stazione di Arrivo") || epoch.equals("Stazione di Partenza")){
			return epoch;
		}
		
		Long epochlong = Long.decode(epoch);
		SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm");
		Time orario = new Time(epochlong);
		
		conversione = sdf1.format(orario);
		
		return conversione;
	}
	
	public String toString(){
		
		String tostring = this.stazione + ":" + "\narrivo teorico: " + 
			EpochConverter(this.arrivo_teorico) + 
			 "\narrivo reale: " + 
			EpochConverter(this.arrivoReale) +
			"\npartenza teorica: " + 
			EpochConverter(this.partenza_teorica) +
			" \npartenza reale: " + 
			EpochConverter(this.partenzaReale);
		
		
		return tostring;
	}
}
