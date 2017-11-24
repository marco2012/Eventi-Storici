package fers;


import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.annotation.Repeatable;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;


@Path("/service")
public class FalconEyeRestService {
	
	private static final Logger logger = Logger.getLogger(FalconEyeRestService.class);
	
	@GET
	@Path("/check/{numTreno}/{nomeStazione}")
	@Produces(MediaType.APPLICATION_JSON)
	public String check(@PathParam("numTreno") String numTreno, 
						 @PathParam("nomeStazione") String nomeStazione) throws Exception{
		if (logger.isDebugEnabled()) {
			logger.debug("Start check");
			logger.debug("Numero Treno '" + numTreno + "' e Nome Stazione '" + nomeStazione + "'");
			}

		
		Check c = new Check(numTreno, nomeStazione);
		
		boolean b = c.getRisultato();
		String json = "";
		//Se il check va a buon fine, estrapolo le informazioni necessarie
		if(b==true){
			
			String idStazione = c.getidStazione();
			json = "{ \"idStazione\" : \""+ idStazione +'"' + " }";
			
		}
		System.out.println(json);
		
		return json;
		
		
		
	}
	
	@GET
	@Path("/accoda/{numTreno}/{idStazione}/{nextMon}/{lastMon}/{mailAddr}")
    @Produces(MediaType.APPLICATION_JSON)
	public String accoda(@PathParam("numTreno") String numTreno ,
			@PathParam("idStazione") String idStazione,
			@PathParam("nextMon") String nextMon,
			@PathParam("lastMon") String lastMon,
			@PathParam("mailAddr") String mailAddr) throws Exception {

		if (logger.isDebugEnabled()) {
			logger.debug("Start accoda");
			logger.debug("Numero Treno '" + numTreno + "'");
			logger.debug("ID Stazione '" + idStazione + "'");
			logger.debug("Prossimo Monitoraggio '" + nextMon + "'");
			logger.debug("Ultimo Monitoraggio '" + lastMon + "'");
			logger.debug("Indirizzo Mail '" + mailAddr + "'");
		}
		
		//Booleano di controllo
		boolean b = false;
		
		
		//Controllo la validità dell'indirizzo mail:
		if(mailSyntaxCheck(mailAddr)==true) b = true;
		else b = false;
		
		//Controllo la validita' dell'orario del prossimo monitoraggio:
		long ora = System.currentTimeMillis();
		long nm = Long.decode(nextMon);
		if(nm>ora) b = true;
		else b = false;
		
		//Controllo la validita' dell'orario dell'ultimo monitoraggio:
		long lm = Long.decode(lastMon);
		//L'ultimo monitoraggio deve essere, a sua volta, dopo il prossimo:
		if(lm>ora && lm>nm) b = true;
		else b = false;
		
		/*Verifico infine che i dati numTreno e idStazione non diano risultato
		nullo*/
		String indirizzo = "http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/andamentoTreno/" +
					idStazione + "/" + numTreno;
		URL url = new URL(indirizzo);
		BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
		String risposta;
		String jsontreno = "";
		while ((risposta = in.readLine()) != null){
		jsontreno = jsontreno + risposta;
		}
		in.close();
		if(!jsontreno.equals("")) b = true;
		else b = false;
		
		/*Giunti a questo punto, se tutti i controlli sono andati a buon fine,
		lancio un nuovo accodatore per i monitoraggi, e ritorno un messaggio Json
		di Ok, altrimenti ritorno un messaggio di errore*/
		
		String response = "";
		
		if(b==true){
			
			Accodatore a = new Accodatore(numTreno, idStazione, nextMon, lastMon, mailAddr);
			response = "{ " + '"' + "Stato del Monitoraggio" +'"' + " : " + '"' + "Ok" + '"' + " }";
			
		}
		
		else response = "{ " + '"' + "Stato del Monitoraggio" +'"' + " : " + '"' + "Errore" + '"' + " }";;
		
       
        return response;	
	}

	@PUT
	@Path("/<add method name here>")
    @Produces(MediaType.TEXT_PLAIN)
	public String putSomething(@FormParam("request") String request ,  @DefaultValue("1") @FormParam("version") int version) {
		return "";	
	}

	@DELETE
	@Path("/<add method name here>")
	public void deleteSomething(@FormParam("request") String request ,  @DefaultValue("1") @FormParam("version") int version) {
		
	}
	
	
	//Metodo privato per la validazione dell'indirizzo mail
	private boolean mailSyntaxCheck(String email)
	   {
	        // Create the Pattern using the regex
	        Pattern p = Pattern.compile(".+@.+\\.[a-z]+");
	 
	        // Match the given string with the pattern
	        Matcher m = p.matcher(email);
	 
	        // check whether match is found
	        boolean matchFound = m.matches();
	 
	        StringTokenizer st = new StringTokenizer(email, ".");
	        String lastToken = null;
	        while (st.hasMoreTokens()) {
	            lastToken = st.nextToken();
	        }
	 
	    // validate the country code
	        if (matchFound && lastToken.length() >= 2
	                && email.length() - 1 != lastToken.length()) {
	 
	            return true;
	        } else {
	            return false;
	        }
	 
	    }
	
	
	
}
