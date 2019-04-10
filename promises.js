const puppeteer = require("puppeteer");

(async()=>{
    try{
        const browser = await puppeteer.launch({headless:true});
        const page1 = await browser.newPage();
		await page1.goto('https://es.wikipedia.org/wiki/Justin_Bieber',{timeout:250000})
		await page1.screenshot({path:"putinobieber.png"})
		/*await page1.evaluate(() => { document.getElementById("pt-login").children[0].click(); });
		console.log("primera tarea completada");
		await page1.waitFor('input[id=wpName1]','input[id=wpPassword1]','button[type=submit]');
		console.log("segunda tarea completada");
		await page1.$eval("input[id=wpName1",el => el.value="mataqque");
		await page1.$eval("input[id=wpPassword1",el => el.value="11310868");
		await page1.click('button[type="submit"]');
		console.log("ingreso con exito");
		await page1.waitForNavigation()
		console.log("ingreso a wiki")*/
		
		const titulo = await page1.evaluate(() => {
				const titulos=[...document.querySelectorAll("h1,h2")].map((titulos)=>titulos.innerText+"\n")
				return titulos;
		});
		for(var i=0;i<titulo.length;i++){
		console.log(`titulo:${i} ${titulo[i]}`)
		}
        const page = await browser.newPage();
		await page.goto('https://m.facebook.com/',{timeout:250000})
		await page.waitFor('input[id=m_login_email]','input[id=m_login_password]','input[id=u_0_5]');
		console.log("primera tarea completada");
		await page.$eval("input[id=m_login_email]",el => el.value="mataqque.100@gmail.com");
		await page.$eval("input[id=m_login_password]",el => el.value="flavio123");
		await page.click('button[id=u_0_5]');
		await page.waitForNavigation()
		await page.mouse.click(442,320);//entrada
		console.log("ingreso con exito");
		await page.waitForNavigation()		
		
		await page.$eval("textarea[name=xc_message]",function(el,titulo){el.value=(()=>{
			var n="";
		for(var i=0;i<=titulo.length;i++){
			n+=titulo[i];
			}
			return n;
			})();},titulo);
			
		
		await page.click('input[value=Publicar]');
		console.log("publicacion en facebook terminada")
		console.log("Texto "+con+" "+"Publicado: "+ titulo)
	}
	catch(e){
		
	}
})();
