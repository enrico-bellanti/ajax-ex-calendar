// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
// (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// API: https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0


$(document).ready(function() {
  // data iniziale calendario
  var date = "2018-01-01";

  var momentDate = moment(date);
  var daysInMonth = momentDate.daysInMonth();

  // template dei giorni del calendario
  var source = $("#day-template").html();
  var template = Handlebars.compile(source)

  // faccio un ciclo per quanti sono i giorni del mese
  for (var i = 1; i <= daysInMonth; i++) {
    var context = {
      "day": i,
      "month": momentDate.format("MMMM")
    };

    // compilo il template e lo appendo
    var html = template(context);
    $(".days").append(html);

  }

});
