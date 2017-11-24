package fers;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.LinkedList;
import java.util.concurrent.TimeoutException;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;

import org.jboss.resteasy.plugins.server.servlet.ServletUtil;
import org.jboss.resteasy.spi.ResteasyConfiguration;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializer;
import com.google.gson.annotations.SerializedName;

//Import per il client
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.DefaultConsumer;

import com.rabbitmq.client.*;




public class Test {

	public static void main(String[] args) throws IOException, Exception{
		
		//Test sull'invio di messaggi a RabbitMQ
			
		
		String nomeCoda = "Test";
			
		
		long ora = System.currentTimeMillis();
		System.out.println(ora);
		long next = ora + (long)(1*60*1000);
		System.out.println(next);
		long ultimo = ora + (long)(2*60*1000);
		System.out.println(ultimo);
		
		String indirizzo = "http://localhost:8080/FalconEyeRestService/rest/service/accoda/724/S12349/" + next + "/" + ultimo + "/occhiodifalco2016@gmail.com";
		String indirizzo2 = "http://localhost:8080/FalconEyeRestService/rest/service/accoda/1560/S11781/" + next + "/" + ultimo + "/occhiodifalco2016@gmail.com";
		String indirizzo3 = "http://localhost:8080/FalconEyeRestService/rest/service/accoda/598/S08409/" + next + "/" + ultimo + "/occhiodifalco2016@gmail.com";

		System.out.println(indirizzo);
		System.out.println();
		System.out.println(indirizzo2);
		System.out.println();
		System.out.println(indirizzo3);
		//Accodatore a = new Accodatore("724", "S12349", next+"", ultimo+"" , "occhiodifalco2016@gmail.com");
		
		//String mailAddress = "occhiodifalco2016@gmail.com";
		
		//MailSender a = new MailSender();
			
		//a.sendMessage(mailAddress, "724", "Prime Prove", false);
		
		//TestInvio(nomeCoda);
		//Consumatore c = new Consumatore();
		//TestConsumo(nomeCoda);
		//System.out.println(System.currentTimeMillis());
		
		
	}
	
	
	
	
		
		
	public static String EpochConverter(String epoch){
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
	
	
	


	
}
