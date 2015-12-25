/*
 * Tombola
 * https://github.com/mirko/Tombola
 *
 * Copyright (c) 2015 Mirko Squadrani
 * Licensed under the MIT license.
 */
var jq=jQuery.noConflict();
var NUMERI_ESTRATTI = 'numeri';
var lista_numeri = [];

/*
(function(exports) {

  exports.awesome = function() {
    return 'awesome';
  };

}(typeof exports === 'object' && exports || this));
*/

jq(function() {
  // Handler for .ready() called. Eseguito al caricamento della pagina.
  //Crea la tabella dei mesi
  var mesi = new Array();
     mesi[0] = 'Gennaio';
     mesi[1] = 'Febbraio';
     mesi[2] = 'Marzo';
     mesi[3] = 'Aprile';
     mesi[4] = 'Maggio';
     mesi[5] = 'Giugno';
     mesi[6] = 'Luglio';
     mesi[7] = 'Agosto';
     mesi[8] = 'Settembre';
     mesi[9] = 'Ottobre';
     mesi[10] = 'Novembre';
     mesi[11] = 'Dicembre';
  var data = new Date();
  date = data.getDate() 
  +' '+ mesi[data.getMonth()]
  +' '+data.getFullYear();
  jq('#head-title').text('Tombola del '+date);
  document.title ='Tombola del '+date;
  //Carica i dati recenti
  //lista_numeri = getCookie(NUMERI_ESTRATTI);
  console.log(lista_numeri);
  genera_tabella("#tabellone");
  
  jq('button[id="reset"]').on('click',function(){
    if(confirm('Vuoi veramente cancellare tutto?')){
        lista_numeri=[];
        jq.removeCookie(NUMERI_ESTRATTI);
        //eraseCookie(NUMERI_ESTRATTI); 
        genera_tabella("#tabellone");
        console.log('reset cookie! lista_numeri='+lista_numeri);
    }
  });
  jq('button[id="estrai"]').on('click',function(){
        estrai();
        genera_tabella("#tabellone");
    });
});

function estrai(){
    while(1){
        var n=Math.floor((Math.random() * 90) + 1);
        //Controllo che non sia già estratto
        if(lista_numeri.indexOf(n)==-1){
            lista_numeri.push(n);
            jq.cookie(NUMERI_ESTRATTI,lista_numeri.toString(),{expires:1});
          //setCookie(NUMERI_ESTRATTI, lista_numeri.toString());
            break;
        } else {
            if(lista_numeri.length==90){
                alert('Ops Hai finito i numeri!!');
                console.log('Ops Hai finito i numeri!!');
                break;
            } 
        }
    }
}


function genera_tabella(container){	
    jq(container).empty();
	for(var i=0; i<90; i++){
		cell = jQuery('<div/>', {
			id:'cella-'+i, 
			class:'col-md-2 col-xs-2 cell text-center '
		}).appendTo(container);
		
		span = jQuery('<span/>', {
			id:'span-'+i, 
			class:'',
			text: i+1
		}).appendTo(cell);
		
		if(lista_numeri.indexOf(i+1)!=-1){
            cell.addClass('selected');
        }
	};
}

/** COOKIE FUNCTIONS **/
function setCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    setCookie(name, "", -1);
}
