package fers;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.sun.corba.se.impl.ior.GenericTaggedComponent;

public class Accodatore {
	
	private String numTreno;
	private String idStazione;
	private String nextMon;
	private String lastMon;
	private String mail;
	public Accodatore(String numTreno, String idStazione, String nextMon, String lastMon, String mail) throws Exception{
	
		this.numTreno = numTreno;
		this.idStazione = idStazione;
		this.nextMon = nextMon;
		this.lastMon = lastMon;
		this.mail = mail;
		
		//Lancio il metodo di accodamento:
		Accoda();
	}	
	
	private void Accoda() throws Exception{	
	
	//Prendo le credenziali dal file config.txt:
	BufferedReader r = new BufferedReader(new InputStreamReader
				(this.getClass().getClassLoader().getResourceAsStream("config.txt")));
	String input = r.readLine();
	String[] credenziali = input.split(",");
	r.close();
	
	//Mi connetto:
	ConnectionFactory factory = new ConnectionFactory();
	factory.setHost(credenziali[0]);
	factory.setUsername(credenziali[1]);
	factory.setPassword(credenziali[2]);
	String nomeCoda = credenziali[3];
	
	Connection connection = factory.newConnection();
	
	Channel channel = connection.createChannel();
	
	channel.queueDeclare(nomeCoda, true, false, false, null);
	//Ogni dettaglio del messaggio e' separato da spazio:	
	String message = this.numTreno + " " + this.idStazione + " " + this.nextMon + " " + this.lastMon 
			+ " " + this.mail;
	
	channel.basicPublish("", nomeCoda, null, message.getBytes("UTF-8"));
	
	System.out.println("[X] Sent '" + message + "'");
	
	channel.close();
	connection.close();
	}
	
}
