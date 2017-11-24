package fers;
import java.awt.Toolkit;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;



public class Consumatore {
	
	public Consumatore() throws Exception{
	
	
	//Prendo le credenziali dal file config.txt:
	BufferedReader r = new BufferedReader(new InputStreamReader
			(this.getClass().getClassLoader().getResourceAsStream("config.txt")));

	String input = r.readLine();
	String[] credenziali = input.split(",");
	r.close();
	
	//Mi collego alla lista:		
	ConnectionFactory factory = new ConnectionFactory();
    factory.setHost(credenziali[0]);
    factory.setUsername(credenziali[1]);
	factory.setPassword(credenziali[2]);
	String nomeCoda = credenziali[3];
    final Connection connection = factory.newConnection();
    final Channel channel = connection.createChannel();

    channel.queueDeclare(nomeCoda, true, false, false, null);
    System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

    channel.basicQos(1);

    final Consumer consumer = new DefaultConsumer(channel) {
      @Override
      public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
        String message = new String(body, "UTF-8");

        System.out.println(" [x] Received '" + message + "'");
          
        	//Splitto il messaggio ricevuto; ogni dettaglio e' separato da spazio:
        	String[] split = message.split(" ");
        	String numTreno = split[0];
        	String idStazione = split[1];
        	String nextMon = split[2];
        	String lastMon = split[3];
        	String mail = split[4];
        	
        	long ora = System.currentTimeMillis();
        	long nm = Long.decode(nextMon);
        	long lm = Long.decode(lastMon);
        	//In questo passaggio analizzo i vari casi:
        	
        	//Copro tutto con un try - finally:
        	try{       
        	//Mi preparo a mandare una eventuale email:
        	MailSender ms = new MailSender();
        	
        	/*Primo caso. se e' giunto il momento del prossimo monitoraggio:
        	 * 	- Lancio il monitoraggio sul treno scelto
        	 *  - Ne prendo i risultati e li mando via mail all'indirizzo specificato
        	 *  - Calcolo l'orario del prossimo monitoraggio (+ 15 min)
        	 */
        	if(ora>=nm){
        		
        		//Se nm non e' uguale a lm:
        		if(nm!=lm){
        		Monitoraggio m = new Monitoraggio(idStazione, numTreno);
        		String risultato = m.getResult();
        		//Toolkit.getDefaultToolkit().beep();
        		//System.out.println("Monitoraggio in corso");
        		
        		ms.sendMessage(mail, numTreno, risultato, false);
        		nm = nm + (long)(15*60*1000);
        		
        		if(nm >= lm){
        			/*Se l'orario del prossimo monitoraggio e' maggiore 
        			 * di quello programmato come ultimo o uguale, setto nm = lm */
        			nm = lm;
        		}
        		
        		//Preparo il nuovo messaggio
        		Accodatore a = new Accodatore(numTreno, idStazione, nm+"", lm+"", mail);
        		   	//Thread.sleep(30000);
        		} 
        		/*Se nm = lm sono nell'ultimo monitoraggio, quindi lo eseguo, ma non 
        		 * accodo nella lista un nuovo messaggio per effettuare futuri monitoraggi 
        		 * (quindi non calcolo nemmeno il nuovo nm)*/
        		else{
        			
        			Monitoraggio m = new Monitoraggio(idStazione, numTreno);
        			String risultato = m.getResult();
        			
        			ms.sendMessage(mail, numTreno, risultato, true);
        			//System.out.println("Ultimo monitoraggio!");
        			//Toolkit.getDefaultToolkit().beep();
        			//Thread.sleep(30000);
        			
        		}
        	}
        	
        	/*Se invece non e' ancora il momento del monitoraggio, accodo un nuovo messaggio
        	 * con le informazioni in mio possesso senza variarle*/
        	else {
        		
        		Accodatore a = new Accodatore(numTreno, idStazione, nextMon, lastMon, mail);
        		//System.out.println("E' troppo presto per fare il nuovo monitoraggio!");
        	}
    
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}finally {
		System.out.println("[X] Done");
		channel.basicAck(envelope.getDeliveryTag(), false);
		
	}
    };
    };
    channel.basicConsume(nomeCoda, false, consumer);
}
}
	


