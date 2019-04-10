const puppeteer = require('puppeteer')

module.exports = {
		BuscarGestion:async function(peticion){
		try{
        const browser = await puppeteer.launch({headless:true});
        const page1 = await browser.newPage();
		page1.goto(peticion) //PETICION
		await page1.waitFor('div[class=news-text]')
		const Gestion = await page1.evaluate(() => {
				const TitulosGestion=[...document.querySelectorAll(".news-text>div>p:nth-child(-n+8),h1")].map((titulos)=>titulos.innerText+"\n")
				const imagen = document.querySelector(".image>img").src
				TitulosGestion.push(imagen)
				return TitulosGestion;
		});
		return Gestion;
		await browser.close()
		}catch(e2){
		}
	},
	PublicarFacebook:async function(contenido){
		const titulo = contenido
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.goto('https://m.facebook.com/',{timeout:250000})
	
		await page.waitFor('input[id=m_login_email]','input[id=m_login_password]','input[id=u_0_5]');
		await page.$eval("input[id=m_login_email]",el => el.value="correo de facebook");
		await page.$eval("input[id=m_login_password]",el => el.value="contraseña");
		await page.click('button[id=u_0_5]');
		await page.waitForNavigation()
		await page.mouse.click(442,320);//entrada cambiar esto
		console.log("ingreso con exito");
		await page.waitForNavigation()	
		
		await page.$eval("textarea[name=xc_message]",function(el,titulo){el.value=(()=>{
			var n="";
				for(var i=0;i<titulo.length;i++){
				n+=titulo[i];
			}
			return n;
			})();},titulo);
		await page.click('input[value=Publicar]');
		console.log("se ha publicado con exito en facebook")
		await browser.close()
	},
	hora:async function(){
		const fecha = new Date();
		const hora = fecha.getHours();
		const minuto = fecha.getMinutes();
		console.log(`Hora de la publicación: ${hora}:${minuto}`)
	}
}
