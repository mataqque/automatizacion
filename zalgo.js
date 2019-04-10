/*setInterval(llamarhora,10000)
function llamarhora(){
const fecha = new Date();
const hora = fecha.getHours();
const minuto = fecha.getMinutes();
llamada(hora,minuto)
}
llamarhora()





function llamada(hora,minuto){
	console.log("me llamaron")
	console.log(`Hora de la publicación: ${hora}:${minuto}`)
	}*/
	
console.log("Escribe tu nombre");
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    console.log("Tu nombre es: " + 
        d.toString().trim());
  });