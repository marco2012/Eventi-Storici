//Semplice metodo ausiliario che data una stringa indicante un intero restituisce il mese corrispondente con il suo nome letterale
exports.resolveMonth = function(month) {
    switch (month){
        case "01":
            return "January"
            break
        case "02":
            return "February"
            break
        case "03":
            return "March"
            break
        case "04":
            return "April"
            break
        case "05":
            return "May"
            break
        case "06":
            return "June"
            break
        case "07":
            return "July"
            break
        case "08":
            return "August"
            break
        case "09":
            return "September"
            break
        case "10":
            return "October"
            break
        case "11":
            return "November"
            break
        case "12":
            return "December"
            break
    }
}

//Restituisce il significato del codice di errore
exports.resolveStatusCode = function(code) {
    switch (code){
        case -2:
            return "Errore di rete"
            break
        case -1:
            return "Record non presente in CouchDB "
            break
        case 0:
            return "Record gia' presente in CouchDB "
            break
    }
}
