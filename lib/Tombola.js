/*
 * Tombola
 * https://github.com/mirko/Tombola
 *
 * Copyright (c) 2015 Mirko Squadrani
 * Licensed under the GPL license.
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

// Handler for .ready() called. Eseguito al caricamento della pagina.
jq(function() {
  
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
  
  jq('div[id="dlgnotifiche"]').on('click',function(){
      jq(this).slideUp('slow');  
  });
  
  /*jq('#dlgnotifiche').dialog({
      resizable: false,
      height:100,
      width:100,
      show: { effect: "puff", duration: 700 },
      modal: false,
      autoOpen:false,
      title:'',
      buttons: {
        "OK": function() {
          jq( this ).dialog( "close" );
        },
        Cancel: function() {
          jq( this ).dialog( "close" );
        }
      }
    });*/
});



function estrai(){
    while(1){
        var n=Math.floor((Math.random() * 90) + 1);
        //Controllo che non sia già estratto
        if(lista_numeri.indexOf(n)==-1){
            lista_numeri.push(n);
            jq('#numero_estratto').text(n);
            jq('#dlgnotifiche').slideDown('slow');
            jq.cookie(NUMERI_ESTRATTI,lista_numeri.toString(),{expires:1});
            //setCookie(NUMERI_ESTRATTI, lista_numeri.toString());
            //setTimeout("jq('#dlgnotifiche').slideUp('slow');",5000);
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
    tabinfo = '#tabellone_info';
    jq(container).empty();
    var n=1;
	for(var r=1; r<10; r++){
	    row = jQuery('<div/>', {
            id:'row-'+r, 
            class:'row'
        }).appendTo(container);
        for(var i=1; i<=10; i++,n++){
    		cell = jQuery('<div/>', {
    			id:'cella-'+n, 
    			class:'col-md-1 col-xs-1 cell text-center img-circle'
    		}).appendTo(row);
    		
    		span = jQuery('<span/>', {
    			id:'numero-'+n, 
    			class:'',
    			text: n
    		}).appendTo(cell);
    		
    		if(lista_numeri.indexOf(n)!=-1){
                cell.addClass('selected');                
                //Stampa gli ultimi 10 numeri estratti
                jq(tabinfo).empty();
                h1 = jQuery('<h3/>', {
                    id:'titleinfo', 
                    class:'text-center', text:'Ultimi numeri estratti'
                }).appendTo(tabinfo);
                for(var k=lista_numeri.length-1; k>=(lista_numeri.length<10? 0:lista_numeri.length-10); k--){
                    divinfo = jQuery('<div/>', {
                        id:'tabinfo-'+k, 
                        class:'cell img-circle',
                    }).appendTo(tabinfo); 
                    span = jQuery('<span/>', {
                        id:'numero-'+n, 
                        class:'',
                        text:lista_numeri[k]
                    }).appendTo(divinfo);                   
                }
            }
        }
	}
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
