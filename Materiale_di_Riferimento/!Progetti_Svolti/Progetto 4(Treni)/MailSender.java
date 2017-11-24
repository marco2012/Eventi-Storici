package fers;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.codemonkey.simplejavamail.Mailer;
import org.codemonkey.simplejavamail.TransportStrategy;
import org.codemonkey.simplejavamail.email.Email;



public class MailSender {
	
	private String user;
	private String password;
	
	public MailSender() throws Exception{
		
		//Prendo le credenziali dal file config.txt:
		BufferedReader r = new BufferedReader(new InputStreamReader
				(this.getClass().getClassLoader().getResourceAsStream("mailsenderaccount.txt")));
	
		String input = r.readLine();
		String[] credenziali = input.split(",");
		r.close();
		
		//Setto le credenziali:
		this.user = credenziali[0];
		this.password = credenziali[1];
		
	}
	
	public void sendMessage(String mailAddress, String numTreno, String message, boolean isLast) throws Exception{
		String username = this.user;
		String password = this.password;
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class",
				"javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "465");

		Session session = Session.getDefaultInstance(props,
			new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(username,password);
				}
			});

		try {

			Message msg = new MimeMessage(session);
			//Imposto le caratteristiche necessarie:
			//Da:
			InternetAddress ia = new InternetAddress(username, "FalconEye - Monitoraggio Treni");
			msg.setFrom(ia);
			//A:
			msg.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(mailAddress));
			
			//Prendo il momento attuale:
			long msattuali = System.currentTimeMillis();
			SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");    
			String ora = new Time(msattuali).toString();
			
			if(isLast == true){
				msg.setSubject("[ULTIMO MONITORAGGIO] Stato del Treno: " + numTreno + " alle ore " + ora);
			}
			else {
				msg.setSubject("Stato del Treno: " + numTreno + " alle ore " + ora  );
			}
			
			//Setto il testo:
			msg.setText(message);
			
			//Invio l'Email:
			Transport.send(msg);

			System.out.println("Email inviata!");

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}
	
	
	}


	

