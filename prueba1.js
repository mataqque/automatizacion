const puppeteer = require("puppeteer")
const readline = require("readline-sync")
const server = require('./server')

async function start(){
	const contenido = {}
	contenido.lista	= await EsperarPreguntas()
	const publicacion = await server.PublicarFacebook(contenido.lista)
	const hora = await server.hora()
	
}
async function EsperarPreguntas(){
	 const prefijos = await ejecutar()
	 const peticion = await prefijos[1][readline.keyInSelect(prefijos[0])]
	 const busqueda = await server.BuscarGestion(peticion)
	 return busqueda
}
start();
 
async function ejecutar(){
    try{
        const browser = await puppeteer.launch({headless:true});
        const page1 = await browser.newPage();
		page1.goto('https://gestion.pe/')
		await page1.waitFor("div[class=mxm-items]");
		const titulo = await page1.evaluate(() => {
			const titulos=[...document.querySelectorAll(".mxm-items>article")].map((titulos)=>titulos.innerText+"\n\n")
			const links=[...document.querySelectorAll(".mxm-items>article>div>h3>a")].map((links)=>links.href)
			const conjunto=[titulos,links];
				return conjunto
		});
		
		for(var i=0;i<titulo[0].length;i++){
		titulo[0][i]=`${titulo[0][i].substr(8,titulo[0][i].length)}`
		//console.log(titulo[0][i])
		}
		await browser.close()
		return titulo
		}catch(e){
		//console.log(e);
		}
};
