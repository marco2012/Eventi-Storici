# -*- coding: utf-8 -*-
from flask import Flask
import time
app = Flask(__name__)
from datetime import datetime
import pika, os, urlparse, logging
logging.basicConfig()
from flask import render_template
from flask import url_for
from flask import request
import requests
from flask import redirect
from flask import session

from flask_oauth import OAuth
from flask_googlemaps import GoogleMaps, Map
import googlemaps
import geocoder
import simplejson
from googleplaces import GooglePlaces, types, lang
import urllib,urllister
import sys 
from amazonproduct import API, AWSError
reload(sys)  
sys.setdefaultencoding('utf8')

Pp='chiaveprivata'
Pl='chiaveprivata'
Pk='chiaveprivata'

RabbitURL = os.environ.get('CLOUDAMQP_URL', 'privato')
params = pika.URLParameters(RabbitURL)
params.socket_timeout = 5



from flask_restful import reqparse, abort, Api, Resource
import yaml
apiREST = Api(app)

class SmartLibro(Resource):
    def get(self, libro):
        session['TitoloLIB']="Non disponibile"
        
        
    
    #eliminare caratteri non supportati nell'input -> mettere su amazon una ricerca di prodotti simili se non va a buon fine la prima volta
        libro=libro.encode('ascii',errors='ignore')
        libro=libro.replace(',',' ')
        libro=libro.replace('.','')
        libro=libro.replace("""''""",'')
        libro=libro.replace('!','')
        libro=libro.replace('?','')
        libro=libro.replace(';','')
        libro=libro.replace(':','')
        libro=libro.replace('<','')
        libro=libro.replace('>','')
        libro=libro.replace('"','')
        libro=libro.replace('-_-',' ')

        pA=float(prezzoAmz(libro.lower()))
        pL=float(prezzoLib(libro.lower()))
        titAMZ=str(session.get('titoloAMZ', None))
        tL=str(session.get('TitoloLIB', None))
        tL = tL.replace("&egrave;","è")
        tL = tL.replace("&eacute;","é")
        tL = tL.replace("&agrave;","à")
        tL = tL.replace("&ugrave;","ù")
        tL = tL.replace("&ograve;","ò")
        tL = tL.replace("&igrave;","ì")
        tL = tL.replace("&laquo;","<<")
        tL = tL.replace("&raquo;",">>")
        if """ml PUBLIC "-//W3C//DTD XHTML 1.0 Transitional""" in tL:
            tL = "Non disponibile"
        

        prezzolibro={
            'Amazon': {titAMZ:'Non trovato'},
            'Libreria':{tL:'Non trovato'}
        }
        if pA==999.00 and (pL==999.99 or pL==-1) :
            return prezzolibro
        else :
            prezzoAma=str(pA)
            prezzoLibr=str(pL)
            if pA==999.99 or pA==-1:
                prezzoAma='Non disponibile'
            if pL==999.99 or pL==-1:
                prezzoLibr='Non disponibile'
            prezzolibro={
            'Amazon': {titAMZ:prezzoAma},
            'Libreria':{tL: prezzoLibr}
        }
            return prezzolibro


class SmartLibrerie(Resource):
    def get(self, via):
        via=via.replace('-_-',' ')
        query_result = google_places.nearby_search(
        location=via, keyword='libreria',
        radius=50000, types=[types.TYPE_BOOK_STORE])
        placess={}
        
        for place in query_result.places:
            placess[place.name]=yaml.load(simplejson.dumps(place.geo_location).replace('\"',"'"))
        return placess

        
        


apiREST.add_resource(SmartLibro, '/smartlibro/<libro>')

apiREST.add_resource(SmartLibrerie, '/smartlibrerie/<via>')









@app.route('/message')
def message():
    session['Mess']=None
    queueID=session.get('QUEUEID',None)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    channel.queue_declare(queue=queueID)
    channel.queue_purge(queue=queueID)

    b=session.get('libro',None)
    channel.basic_publish(exchange='',
                      routing_key=queueID,
                      body='Hai cercato '+b)
    connection.close()
    
    return redirect('/home')


def price_offers(xxx):
    best=999.00
    one=True
    AutFin=""
    titFin=""
    api = API(Pp, Pl, 'it')
    try:items = api.item_search('Books', Keywords=xxx,AssociateTag=Pk)
    except Exception:
        return 999.00
    KK=0
    noDis=0
    try:
        for book in items:
            KK+=1
            if KK==6:
                break
            ID=book.ASIN
            try:
                AutP=str(book.ItemAttributes.Author)
                TitP=str(book.ItemAttributes.Title)
                url=str(book.DetailPageURL)
            
            except Exception as o:
                continue
            str_asin = str(ID)
            try:node = api.item_lookup(ItemId=str_asin, ResponseGroup='Offers', Condition='New', MerchantId='Amazon',AssociateTag=Pk)
            except AWSError:
                continue
            try:
            
                for a in node.Items.Item.Offers.Offer:
                    if("non disponibile" in str(a.OfferListing.Availability).lower()):
                        noDis=noDis+1

                        continue
                    prix=str(a.OfferListing.Price.FormattedPrice).replace("EUR ","").replace(",",".")
                
                    prox=float(prix)
                    if(prox<best and one):
                        best=prox
                        AutFin=AutP
                        titFin=TitP
                        one=False
                        session['titoloAMZ']=titFin
                        session['urlAMZ']=url
                    elif(prox<best and one==False and AutP==AutFin and TitP==titFin):
                        best=prox
                        session['titoloAMZ']=titFin
                        session['urlAMZ']=url
            except Exception as e:
                continue
        if(best==999.00 and noDis>=1):
            KK=0
            one=True
            AutFin=""
            titFin=""
            for book in items:
                KK+=1
                if KK==6:
                    break
                ID=book.ASIN
                try:
                    AutP=str(book.ItemAttributes.Author)
                    TitP=str(book.ItemAttributes.Title)
                    url=str(book.DetailPageURL)
            
                except Exception as o:
                    continue
                str_asin = str(ID)
                try:node = api.item_lookup(ItemId=str_asin, ResponseGroup='Offers', Availability='Available', Condition='New', MerchantId='Amazon',AssociateTag=Pk)
                except AWSError:
                    continue
            
                try:
            
                    for a in node.Items.Item.Offers.Offer:
                        if("non disponibile" not in str(a.OfferListing.Availability).lower()):
                            continue

                        prix=str(a.OfferListing.Price.FormattedPrice).replace("EUR ","").replace(",",".")
                
                        prox=float(prix)
                        if(prox<best and one):
                          best=prox
                          AutFin=AutP
                          titFin=TitP
                          one=False
                          session['titoloAMZ']=titFin+"(Attualmente non disponibile)"
                        
                          session['urlAMZ']=url
                        elif(prox<best and one==False and AutP==AutFin and TitP==titFin):
                            best=prox
                            session['titoloAMZ']=titFin+"(Attualmente non disponibile)"
                            session['urlAMZ']=url
                except Exception as e:
                    continue
    
        return best
    except Exception:
        return best

def prezzoAmz(s):
   return price_offers(s)

def cercaprezzo(s):
    
    try:sock=urllib.urlopen(s)
    except IOError:
        return -1
    html=sock.read()
    ricerca="""Nostro prezzo: </span><span class="product_our_price" >&euro;&nbsp;"""
    i=html.find(ricerca)
    l=len(ricerca)
    
    c=i+l
    j=c+4
    prezzo=html[c:j]
    try: float(prezzo)
    except ValueError:
        ricerca2="""Prezzo: </span><span class="product_price" >&euro;&nbsp;"""
        i=html.find(ricerca2)
        l=len(ricerca2)
    
        c=i+l
        j=c+4
        prezzo=html[c:j]
        try: float(prezzo)
        except ValueError:
            return -1
   
    
    return prezzo
    
def cercaTitolo(s):
     try:sock=urllib.urlopen(s)
     except IOError:
         return "URL NOT FOUND"
     html=sock.read()
     ricercaTitlo="""<h1 itemprop="name" class="fn product_heading_title">"""
     i=html.find(ricercaTitlo)
     l=len(ricercaTitlo)
     c=i+l
     contaS=0
     for u in range(c,c+100):
         if html[u]=='<':
             break
         contaS+=1
     j=c+contaS
     titoloLib=html[c:j]
     return titoloLib
def cercaAutore(s):
    ricerca="""di <a class="authors_url_html" href="""
    try:sock=urllib.urlopen(s)
    except IOError:
         return "URL NOT FOUND"
    html=sock.read()
    i=html.find(ricerca)
    
    l=len(ricerca)
    c=i+l
    contaX=0
    
    for jj in range(c,c+500):
        if html[jj]=='t' and html[jj+1]=='i' and html[jj+2]=='t'  and html[jj+3]=='l' and html[jj+4]=='e'and html[jj+5]=='=':
           
           contaX=jj+7
           break
    c=contaX 
    contaS=0
    for u in range(c,c+100):
        if html[u]=='"':
             break
        contaS+=1
    j=c+contaS
    
    Autore=html[c:j]
    if Autore != "<?xml version=":
        return Autore
    else:
        return "Not found"

def prezzoLib(s):
   
    one=False
    ris=-1
    good=False
    max=999.99
    x=s.replace(' ','+')
    
    x=x.encode("utf-8")
    
    url="http://www.libreriauniversitaria.it/ricerca/query/"+x
    
    try:sock= urllib.urlopen(url)
    except IOError:
        
        return -1
    
    parser = urllister.URLLister()
    
    z=s.split(' ')
    
    l=len(z)
    for pz in range(l-1):
        if len(z[pz])<2:
            z.pop(pz)
            pz=pz-1
    l=len(z)
    parser.feed(sock.read())
    if(l==0):
        return -1
    if l==1:
       eee=0
       for i in parser.urls:
          
         if(z[0] in i and "query" not in i and "libri"not in i):
               eee=eee+1
               ris =cercaprezzo(i)
               Tp=cercaTitolo(i)
               
               if(float(ris)<max and ris!=-1):
                  
                  session['TitoloLIB']=Tp
                  max=float(ris)
                  
               if(eee == 4):
                  break
               ris=-1
       return max
    z.sort(key=len)
    second=False
    PX=0
    count=0
    ki=0
    kount=0
    for i in parser.urls:
        kount+=1
        
        if l==2:
            if(z[0] in i and z[1] in i and "query" not in i and "libri" not in i):
                
                 ris=cercaprezzo(i)
                 PX=PX+1
        else:
            for j in range(l-1,0,-1):
                
                if(z[j] in i and "query" not in i and "libri" not in i):
                   
                   count=count+1
                  
                   if(count==l-2):
                      
                      ris=cercaprezzo(i)
                      PX=PX+1
                      ki=PX
                      
                      count=0
                      break
            count=0
        
        jk=float(ris)
        ris=-1
        if (PX>=ki-1 and jk<max and jk!=0.0 and jk!=-1):
            newT=cercaTitolo(i)
            
            newt=newT.lower()
            print(newT)
            
            potto=0
            
            for y in range(len(z)):
                
                if(z[y].lower() in newt):
                    
                    potto+=1
                    if potto==len(z):
                        good=True
                
            potto=0
            Aut=cercaAutore(i)
            
            if(one==False):
               if good :
                   max=jk
                   session['TitoloLIB']=newT
                    
                   good=False
                   one=True
                   AF=Aut
                   if PX==10 or kount==150:
                      break
                   continue
            elif one==True and second==False and Aut==AF:
                 
                 if good :
                    max=jk
                    session['TitoloLIB']=newT
                    
                    good=False
                    second=True
                    
                    if PX==10 or kount==150:
                       break
                    continue
            else:
                
                if good and (newt==s or ("ediz. integrale" in newt and s in newt)or ("edizione" in newt and s in newt))  and Aut==AF:
                    
                    max=jk
                    session['TitoloLIB']=newT
                    good=False
                   

            
                
        
        if PX==10 or kount==150:
           break
            
        
    sock.close()
    parser.close()
    return max

GOOGLE_KEY='chiaveprivata'
app.secret_key = 'super secret key'
oauth= OAuth()
google_places=GooglePlaces(GOOGLE_KEY)
GoogleMaps(app)
gmaps= googlemaps.Client(key= GOOGLE_KEY)

#LOGIN FACEBOOK 100% FUNZIONANTE
facebook = oauth.remote_app('facebook',
    base_url='https://graph.facebook.com/',
    request_token_url=None,
    access_token_url='/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
    consumer_key="chiaveprivata,
    consumer_secret="chiaveprivata",
    request_token_params={'scope': 'email'}
)

@facebook.tokengetter
def get_facebook_token():
    return session.get('facebook_token')

def pop_login_session():
    session.pop('logged_in', None)
    session.pop('facebook_token', None)

@app.route("/facebook_login")
def facebook_login():
    return facebook.authorize(callback=url_for('facebook_authorized',
        next=request.args.get('next'), _external=True))

@app.route("/facebook_authorized")
@facebook.authorized_handler
def facebook_authorized(resp):
    next_url = request.args.get('next') or url_for('home')
    if resp is None or 'access_token' not in resp:
        return redirect(next_url)

    session['logged_in'] = True
    session['facebook_token'] = (resp['access_token'], '')
    
    return redirect(next_url)

@app.route("/logout")
def logout():
    pop_login_session()
    return redirect(url_for('index'))

#FINE LOGIN

@app.route('/')
def index():
    return render_template('index.html')

def checkmessaggi():
    queueID=session.get('QUEUEID',None)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    channel.queue_declare(queue=queueID)
    status = channel.queue_declare(queue=queueID)
    print status.method.message_count
    if str(status.method.message_count) == '0':
        

        return
    else:
        channel.basic_consume(callback,
                      queue=queueID,
                      no_ack=True)
        while channel._consumer_infos:
              channel.connection.process_data_events(time_limit=1)
              
              break
        channel.start_consuming
        time.sleep(1)
        channel.stop_consuming
       
        connection.close()
        return
    
def callback(ch, method, properties, body):
    
    session['Mess']=body









@app.route('/home')
def home():
    """Renders the home page."""
    data = facebook.get('/me').data
    if 'id' in data and 'name' in data:
        user_id = data['id']
        user_name = data['name']
    
    session['QUEUEID']=str(user_id)
    if(session.get('init',None)=='0'):
        queueID=session.get('QUEUEID',None)
        connection = pika.BlockingConnection(params)
        channel = connection.channel()
        channel.queue_declare(queue=queueID)
        channel.queue_purge(queue=queueID)
        channel.close
        connection.close
        session['init']='1'
        session['oldBook']='Nessun Messaggio'
        return render_template(
        'home.html',
        
        user=user_name,
        messaggio='Nessun Messaggio'
        )
    checkmessaggi()
    mess=session.get('Mess',None)
    session['Mess']=None
    
    if mess==None:
        mess='Nessun Messaggio'
        session['oldBook']=mess
        return render_template(
        'home.html',
        user =user_name,
        messaggio=mess,
        colore='white'
        )
    else:
        session['oldBook']=mess

        return render_template(
        'home.html',
        user =user_name,
        messaggio=mess,
        colore='yellow'
        )


@app.route('/APII')
def APII():
    data = facebook.get('/me').data
    if 'id' in data and 'name' in data:
        user_id = data['id']
        user_name = data['name']
    return render_template(
        'API.html',
        user = user_name
    )
@app.route('/chisiamo')
def chisiamo():
    """Renders the contact page."""
    data = facebook.get('/me').data
    if 'id' in data and 'name' in data:
        user_id = data['id']
        user_name = data['name']
    return render_template(
        'chisiamo.html',
        user = user_name,
    )

@app.route('/messaggi')
def messaggi():
    """Renders the about page."""
    return render_template(
        'risultato.html'
    )

@app.route('/result',methods = ['POST'])
def result():
    session['TitoloLIB']="Non disponibile"
    libro=request.form['Libro']
    ind=request.form['Indirizzo']
    radio= request.form['viaggio']
    session['viaggio']=radio
    session['libro']=libro
    session['ind']=ind
    
    #eliminare caratteri non supportati nell'input -> mettere su amazon una ricerca di prodotti simili se non va a buon fine la prima volta
    libro1=libro.encode('ascii',errors='ignore')
    libro1=libro1.replace(',',' ')
    libro1=libro1.replace('.','')
    libro1=libro1.replace("""'""",' ')
    libro1=libro1.replace('!','')
    libro1=libro1.replace('?','')
    libro1=libro1.replace(';','')
    libro1=libro1.replace(':','')
    libro1=libro1.replace('<','')
    libro1=libro1.replace('>','')
    libro1=libro1.replace('"','')
    libro1=libro1.replace('  ',' ')
    session['prezzoAMZ']=prezzoAmz(libro.lower())
    
    session['prezzoLIB']=prezzoLib(libro1.lower())
    pA=float(session.get('prezzoAMZ', None))
    pL=float(session.get('prezzoLIB', None))
    if pA==999.00 and (pL==999.99 or pL==-1) :
        return redirect('/nontrovato')
    


    return  redirect('/risultati')

@app.route('/nontrovato')
def nontrovato():
    data = facebook.get('/me').data
    if 'id' in data and 'name' in data:
        user_id = data['id']
        user_name = data['name']
    return render_template("nontrovato.html",user=user_name)

@app.route('/risultati')
def risultati():

    data = facebook.get('/me').data
    if 'id' in data and 'name' in data:
        user_id = data['id']
        user_name = data['name']
    pA=float(session.get('prezzoAMZ', None))
    pL=float(session.get('prezzoLIB', None))
    titAMZ=str(session.get('titoloAMZ', None))
    linkAMZ=str(session.get('urlAMZ', None))

    if(pA==999.00):
        x="Non Trovato"
        titAMZ="Non Trovato"
        linkAMZ="http://www.amazon.it"
    else:
        j=str(pA)
        w=j.split('.')
        x=w[0]+'.'
        if(len(w[1])==1):
            x=x+w[1]+'0'
        else:
            x=x+w[1]
    
    if(pL==999.99 or pL==-1):
        xx="Non disponibile "
    else:
        yy=str(pL)
        ww=yy.split('.')
        xx=ww[0]+'.'
        if len(ww[1])==1:
            xx=xx+ww[1]+'0'
        else:
            xx=xx+ww[1]
    tL=str(session.get('TitoloLIB', None))
    
    tL = tL.replace("&egrave;","è")
    tL = tL.replace("&eacute;","é")
    tL = tL.replace("&agrave;","à")
    tL = tL.replace("&ugrave;","ù")
    tL = tL.replace("&ograve;","ò")
    tL = tL.replace("&igrave;","ì")
    tL = tL.replace("&laquo;","<<")
    tL = tL.replace("&raquo;",">>")
    if """ml PUBLIC "-//W3C//DTD XHTML 1.0 Transitional""" in tL:
        tL = "Non disponibile" 
        xx="Non disponibile"

    IndirizzoPartenza = str(session.get('ind', None))
    Libro = str(session.get('libro', None))
    Radio = str(session.get('viaggio', None))
    if session.get('oldBook',None)=='Nessun Messaggio':
        return render_template('risultato.html', 
                           ind=IndirizzoPartenza, 
                           lib=Libro, 
                           user=user_name, 
                           viaggio=Radio,
                           prezzo=x,
                           trovato=titAMZ,
                           link=linkAMZ,
                           prezzoOf=xx,
                           trovatoLib=tL,
                           messaggio=session.get('oldBook',None),
                           colore='white'
                           )
    else:
        return render_template('risultato.html', 
                           ind=IndirizzoPartenza, 
                           lib=Libro, 
                           user=user_name, 
                           viaggio=Radio,
                           prezzo=x,
                           trovato=titAMZ,
                           link=linkAMZ,
                           prezzoOf=xx,
                           trovatoLib=tL,
                           messaggio=session.get('oldBook',None),
                           colore='white'
                           )
        
if __name__ == '__main__':
    app.run()






#LE CHIAVI PER I SERVIZI AMAZON ,FACEBOOK,RABBITMQ E GOOGLE SONO STATE SOSTITUITE CON  "chiaveprivata"