$(document).ready(function() {
  // dichiaro variabili per settare la data
  var setYear = 2018;
  var setMonth = 1;
  // mostro Gennaio 2018 all'avvio della pagina
  printMonth(setYear, setMonth);

  // al click su next cambia il calendario al mese successivo
  $("#next").click(function() {
    if (setMonth < 12) {
      setMonth++;
      printMonth(setYear, setMonth);
    }
  });
  // al click su prev cambia il calendario al mese precedente
  $("#prev").click(function() {
    if (setMonth > 1) {
      setMonth--;
      printMonth(setYear, setMonth);
    }
  });

});
// end document ready


// funzioni

function printMonth(year, month) {
  // resetta calendario attuale
  $(".day_box").remove();
  // ottengo oggetto momentjs
  var momentDate = setMomentDate(year, month);
  // ricava il mese attuale in indice array (parte da zero)
  var monthIndex = momentDate.months();
  // ricavo il numero dei giorni del mese
  var daysInMonth = momentDate.daysInMonth();
  // ricavo nome del mese
  var monthInPrinting = momentDate.format("MMMM");

  // stampo  schermo nell'header il mese e l'anno
  printHeaderDate(year, monthInPrinting);

  //crea template dei giorni del calendario
  var source = $("#day-template").html();
  var dayTemplate = Handlebars.compile(source);

  // faccio chiamata al server per scaricare la lista festivita del mese richiesto
  $.ajax(
   {
    "url": "https://flynn.boolean.careers/exercises/api/holidays",
    "data": {
      "year": year,
      "month": monthIndex
    },
    "method": "GET",
    "success": function (data) {
      var dataHoliday = data;
      // ricava un array con le festivita
      var holidayList = data.response;

      // crea un ciclo per compilare il template
      for (var i = 0; i < daysInMonth; i++) {
        // trasforma l'oggetto moment in stringa
        var momentDateInFormat = momentDate.format("YYYY-MM-DD");

        // dichiaro la variabile holydayName che andro a compilare se
        // momentDateInFormat e' un festivo
        var holidayName = "";
        // salvo il giorno reale corrente nel ciclo
        var currentDay = i+1;

        // verifica giorni festivi e se presente aggiungo nome nel template
        for (var j = 0; j < holidayList.length; j++) {
          // ricava una alla volta le date e nomi delle festivita'
          var holidayDate = holidayList[j].date;
          // condizione che controlla se la data festivo corrisponde
          if (holidayDate == momentDateInFormat) {
            holidayName = holidayList[j].name
          }

        }
        // end for J

        // compila il dayTemplate con giorno festivo
        var context = {
          "day": currentDay,
          "month": monthInPrinting,
          "dataMoment": momentDateInFormat,
          "holiday": holidayName
        };
        // appendi in html
        var html = dayTemplate(context);
        $(".days").append(html);
        // se la variabile holidayName non e' vuota aggiungo classe holiday
        if (holidayName != "") {
          $(".day_box:nth-child("+currentDay+")").addClass("holiday");
        }
        // aggiungi un giorno
        momentDate.add(1, "day");
      }
      // end for i
    },
    "error": function (err) {
      alert("E avvenuto un errore. "+ errore);
    }
  });
  // end server call ajax

}

// trasformo la data in oggetto momentJS
function setMomentDate(year, month) {
  return moment(year + " " + month, "YYYY M");
}

// trasforma i numeri < 10 con lo 0 davanti
function checkZero(numb) {
  if (numb < 10) {
    return "0" + numb;
  }
  return numb;
}

// stampa a schermo nell'heeader mese e anno
function printHeaderDate(year, month) {
  $(".actual_date").text(month + " " + year);
}
