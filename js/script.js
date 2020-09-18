// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
// (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0


$(document).ready(function() {
  // data iniziale calendario
  var date = "2018-12-01";

  var momentDate = moment(date);
  var daysInMonth = momentDate.daysInMonth();

  // ottengo i valori di anno e mese in Momentjs
  var momentMonth = momentDate.month();
  var momentYear = momentDate.year();



  // template dei giorni del calendario
  var source = $("#day-template").html();
  var template = Handlebars.compile(source)

  // faccio un ciclo per quanti sono i giorni del mese
  for (var i = 1; i <= daysInMonth; i++) {

    // compilo il template e lo appendo
    var context = {
      "day": i,
      "month": momentDate.format("MMMM")
    };

    var html = template(context);
    $(".days").append(html);
  }

  $.ajax(
   {
    "url": "https://flynn.boolean.careers/exercises/api/holidays",
    "data": {
      "year": momentYear,
      "month": momentMonth
    },
    "method": "GET",
    "success": function (data) {
      var holydayData = data.response;
      printHolyday(holydayData);
    },
    "error": function (err) {
      alert("E avvenuto un errore. "+ errore);
    }
  });

// end document ready
});


// funzioni

// scrivo una funzione che mi estrapoli i valori della data e del nome
// per ogni festivita' del mese prescelto
function printHolyday(holidays) {
  for (var i = 0; i < holidays.length; i++) {
    var holidayDate = holidays[i].date;
    // trasformo la data per momentjs e ricavo il numero del mese corrispondente
    var dayOfHoliday = moment(holidayDate).date();
    // ricavo il nome della festivita
    var holidayName = holidays[i].name;
    // gli applico la classe holyday e scrivo il nome della festa nell'html
    $(".day:nth-child("+dayOfHoliday+")").addClass("holyday");
    $(".day:nth-child("+dayOfHoliday+")").children(".name_holiday").text(" " + holidayName);

  }

}
