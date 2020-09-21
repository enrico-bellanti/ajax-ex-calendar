// METODO CHE STAMPA LE FESTIVITA SUCCESSIVAMENTE ALLA CREAZIONE DEL CALENDARIO
$(document).ready(function() {
  // dichiaro variabili per settare la data
  var setYear = 2018;
  var setMonth = 1;
  // mostro Gennaio 2018 all'avvio della pagina
  printMonth(setYear, setMonth);
  printHolidays(setYear, setMonth);

  // al click su next cambia il calendario al mese successivo
  $("#next").click(function() {
    if (setMonth < 12) {
      setMonth++;
      printMonth(setYear, setMonth);
      printHolidays(setYear, setMonth);
    } else {
      setMonth = 1;
      setYear++;
      printMonth(setYear, setMonth);
      printHolidays(setYear, setMonth);
    }
  });
  // al click su prev cambia il calendario al mese precedente
  $("#prev").click(function() {
    if (setMonth > 1) {
      setMonth--;
      printMonth(setYear, setMonth);
      printHolidays(setYear, setMonth);
    } else {
      setMonth = 12;
      setYear--;
      printMonth(setYear, setMonth);
      printHolidays(setYear, setMonth);
    }
  });

});
// end document ready


// funzioni

function printMonth(year, month) {
  // resetta calendario attuale
  $(".day_box").remove();
  // ottengo oggetto momentjs
  var momentDate = getMomentDate(year, month);
  // ricavo il numero dei giorni del mese
  var daysInMonth = momentDate.daysInMonth();
  // ricavo nome del mese
  var monthInPrinting = momentDate.format("MMMM");

  // stampo  schermo nell'header il mese e l'anno
  printHeaderDate(year, monthInPrinting);

  //crea template dei giorni del calendario
  var source = $("#day-template").html();
  var dayTemplate = Handlebars.compile(source);


      // crea un ciclo per compilare il template
      for (var i = 0; i < daysInMonth; i++) {
        // trasforma l'oggetto moment in stringa
        var momentDateInFormat = momentDate.format("YYYY-MM-DD");
        // salvo il giorno reale corrente nel ciclo
        var currentDay = i+1;

        // compila il dayTemplate con giorno festivo
        var context = {
          "day": currentDay,
          "month": monthInPrinting,
          "dataMoment": momentDateInFormat
        };
        // appendi in html
        var html = dayTemplate(context);
        $(".days").append(html);

        // aggiungi un giorno
        momentDate.add(1, "day");
      }
      // end for i

  // end server call ajax

}

// crea funzione per stampare i giorni festivi
function printHolidays(year, month) {
  // conzione se l'anno e' diverso da 2018
  if (year == 2018) {
    // ricava il mese attuale in indice array (parte da zero)
    var monthIndex = month-1;
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
        // ricava un array con le festivita
        var holidayList = data.response;

        for (var i = 0; i < holidayList.length; i++) {
          var holidayName = holidayList[i].name;
          var holidayDate = holidayList[i].date;
          var dayOfHoliday = moment(holidayDate).format("D");
          console.log(dayOfHoliday);
          $(".day_box:nth-child("+dayOfHoliday+")").addClass("holiday");
          $(".day_box:nth-child("+dayOfHoliday+") .name_holiday").text(holidayName);
        }

      },
      "error": function (err) {
        alert("E avvenuto un errore. " + err);
      }
    });
  }
}
// trasformo la data in oggetto momentJS
function getMomentDate(year, month) {
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
