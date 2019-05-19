var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

				init_all();
    }
};

function init_all() {
	document.body.innerHTML='<div id="cal">cal ...</div><div id="apps">Cargando apps ...</div>';
	init_cal();
	init_apps();
}

function init_cal() {
	var d0= new Date();
	var d1= new Date(d0.getTime()+1000000000);
	window.plugins.calendar.listEventsInRange(d0,d1,mostrar_cal)
}

function mostrar_cal(eventos) {
	var s='';
	for (var i=0; i<eventos.length; i++) { var ev= eventos[i];
		var ds= new Date(ev.dtstart)
		var dn= "Su Mo Tu We Th Fr Sa".split(/\s+/)[ds.getDay()]
		s+= '<div class="ev">'+
			dn+' '+
			(ds.getHours()+"").padStart(2,"0")+':'+
			(ds.getMinutes()+"").padStart(2,"0")+' '+
			(ds.getMonth()+"").padStart(2,"0")+'/'+
			(ds.getDate()+"").padStart(2,"0")+' '+
			ev.title +
			'</div>';
	}
	document.getElementById('cal').innerHTML= s;
}

function init_apps() {
	cordova.plugins.AppList.applist(mostrar_apps, x => alert("ERROR: ",x));
}

function mostrar_apps(apps_kv) {
	var s= '';
	var ks= Object.keys(apps_kv).sort( (a,b) => (apps_kv[a]>apps_kv[b] ? -1 : 0) );
	for (var i=0; i<ks.length; i++) { var k= ks[i];
		s+= '<a class="app" href="#" onclick="onapp(\''+k+'\')">'+apps_kv[k]+'</a><br>';
	}
	document.getElementById('apps').innerHTML= s;
}

function onapp(k) {
	cordova.plugins.AppList.appstart(k, x=> console.log("OK",k), x => alert("ERROR: ",x));
}

app.initialize();
