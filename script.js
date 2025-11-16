const canvas = document.getElementById("canvasEl");
const ctx = canvas.getContext("2d");



//Funkcija prikazuje BREAKOUT i press SPACE to begin na pocetku
let zastavicaTeksta = true;
const iscrtajZaslonIgre = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 36px Verdana";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseLine = "middle";
    ctx.fillText("BREAKOUT", canvas.width / 2, canvas.height / 2);

    ctx.font = "italics 18px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("Press SPACE to begin", canvas.width / 2, (canvas.height / 2) + 10 + 36 / 2 + 18 / 2);
};



//Generiraju se trenutni i ukupni rezultati igre
let polozajTrenutnihBodovaX = 20 + 5;
let polozajTrenutnihBodovaY = 20 + 5;
let polozajUkBodovaX = canvas.width - 100 - 5;
let polozajUkBodovaY = 20 + 5;
let ukBrojBodova;
if(localStorage.getItem("ukRez") == null){
    localStorage.setItem("ukRez", 0);
}else{
    ukBrojBodova = localStorage.getItem("ukRez");
}
let trenutniBrojBodova = 0;
const prikaziRezultate = () => {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText(trenutniBrojBodova, polozajTrenutnihBodovaX, polozajTrenutnihBodovaY);
    ctx.fillText(ukBrojBodova, polozajUkBodovaX, polozajUkBodovaY);
};



//Generiraju se 50 blokova koji se prvo spremaju u listu sa odgovarajucim parametrima, te se onda iscrtavaju na ekran
const sirinaBloka = 40;
const visinaBloka = 20;
const prviBlokX = (canvas.width - 10 * sirinaBloka - 9 * 30) / 2;
const prviBlokY = polozajTrenutnihBodovaY + 50;
let listaBlokova = [];
const generirajBlokove = () => {
    let razmakVertikalno = 0;
    for(let i = 0; i < 5; i += 1){
        let razmakHorizontalno = 0;
        for(let j = 0; j < 10; j += 1){
            let boja;
            switch(i){
                case 0:
                    boja = "rgb(153, 51, 0)";
                    break;
                case 1:
                    boja = "rgb(255, 0, 0)";
                    break;
                case 2:
                    boja = "rgb(255, 153, 204)";
                    break;
                case 3:
                    boja = "rgb(0, 255, 0)";
                    break;
                case 4:
                    boja = "rgb(255, 255, 153)";
                    break; 
            }
            listaBlokova.push({
                aktivnost: true,
                polozajX: prviBlokX + razmakHorizontalno,
                polozajY: prviBlokY + razmakVertikalno,
                sirinaBl: sirinaBloka,
                visinaBl: visinaBloka,
                bojaBl: boja,
                sjenaBl: 10,
                bojaSjeneBl: "white"
            });
            razmakHorizontalno = 30 + sirinaBloka + razmakHorizontalno;
        }
        razmakVertikalno = 15 + visinaBloka + razmakVertikalno;
    }
};
const iscrtajAktivneBlokove = () => {
    for(let i = 0; i < listaBlokova.length; i += 1){
        if(listaBlokova.at(i).aktivnost == true){
            ctx.fillStyle = listaBlokova.at(i).bojaBl;
            ctx.shadowBlur = listaBlokova.at(i).sjenaBl;
            ctx.shadowColor = listaBlokova.at(i).bojaSjeneBl;
            ctx.fillRect(listaBlokova.at(i).polozajX, listaBlokova.at(i).polozajY, listaBlokova.at(i).sirinaBl, listaBlokova.at(i).visinaBl);
        }
    }
};



//Generira se palica
let polozajPaliceX = canvas.width / 2 - 60 / 2;
let polozajPaliceY = canvas.height - 100;
const sirinaPalice = 150;
const visinaPalice = 10;
const generirajPalicu = () => {
    ctx.fillStyle = "white";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "red";
    ctx.fillRect(polozajPaliceX, polozajPaliceY, sirinaPalice, visinaPalice);
};
//Funkcija za micanje palice ali se pazi na rubove canvas ekrana
let lijevoUp = false;
let desnoUp = false;
let lijevoDown = false;
let desnoDown = false;
const promjenaPalice = 5;
const pomakniPalicu = () => {
    if(lijevoDown && !(polozajPaliceX <= 0)){
        polozajPaliceX -= promjenaPalice;
    }else if(desnoDown && !(polozajPaliceX + sirinaPalice >= canvas.width)){
        polozajPaliceX += promjenaPalice;
    }

    generirajPalicu();
};



//Funkcija koja se poziva pri kraju igre ako igrac izgubi
const ispisiKrajIgre = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 40px Verdana";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.textBaseLine = "middle";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
};
//Funkcija za provjeru pobjede
const provjeriPobjedu = () => {
    for(let i = 0; i < listaBlokova.length; i += 1){
        if(listaBlokova.at(i).aktivnost == true){
            return false;
        }
    }  

    return true;
};
//Funkcija koja se poziva pri kraju igre ako igrac pobijedi
let pobjedaIGRE = false;
const ispisiPobjedu = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 40px Verdana";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.textBaseLine = "middle";
    ctx.fillText("WIN", canvas.width / 2, canvas.height / 2);
};



//Funkcija za generiranje loptice
const sirinaLoptice = 10;
const visinaLoptice = 10;
let promjenaLoptice = 5;
let polozajLopticeX = polozajPaliceX + sirinaPalice / 2 - sirinaLoptice / 2;
let polozajLopticeY = polozajPaliceY - visinaLoptice;
const generirajLopticu = () => {
    ctx.fillStyle = "white";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "red";
    ctx.fillRect(polozajLopticeX, polozajLopticeY, sirinaLoptice, visinaLoptice);
};
let brzinaLopticeX = 2;
let brzinaLopticeY = -2;
let krajIGRE = false;
let pocSmjer;
let pocetakIgreSmjer;
const mjeraOdstupanjaKuta = 10;
const maxBrzina = 3.3;
//Funkcija za provjeru sudara loptice sa kutom bloka zbog ubrazanja
const provjeraKutnogUdarca = (polBx, polBy) => {
    if((Math.abs((polozajLopticeX + sirinaLoptice) - polBx) < mjeraOdstupanjaKuta) && (Math.abs(polozajLopticeY - (polBy + visinaBloka)) < mjeraOdstupanjaKuta)){
        //Gornji desni kut loptice sa donjim lijevim kutom bloka
        return true;
    }else if((Math.abs((polozajLopticeX + sirinaLoptice) - polBx) < mjeraOdstupanjaKuta) && (Math.abs((polozajLopticeY + visinaLoptice) - polBy) < mjeraOdstupanjaKuta)){
        //Donji desni kut loptice sa gornjim lijevim kutom bloka
        return true;
    }else if((Math.abs(polozajLopticeX - (polBx + sirinaBloka)) < mjeraOdstupanjaKuta) && (Math.abs(brzinaLopticeY - (polBy + visinaBloka) < mjeraOdstupanjaKuta))){
        //Gornji lijevi kut loptice sa donjim desnim kutom bloka
        return true;
    }else if((Math.abs(polozajLopticeX - (polBx + sirinaBloka)) < mjeraOdstupanjaKuta) && (Math.abs((polozajLopticeY + visinaLoptice) - polBy) < mjeraOdstupanjaKuta)){
        //Donji lijevi kut loptice sa gornjim desnim kutom bloka
        return true;
    }

    return false;
};
//Funkcija za provjeru sudara loptice sa nekim blokom
const provjeriSudarLopticeIBloka = (polozajLopX, polozajLopY) => {
    for(let i = 0; i < listaBlokova.length; i += 1){
        if(listaBlokova.at(i).aktivnost == true){
            if((polozajLopX + sirinaLoptice >= listaBlokova.at(i).polozajX) && (polozajLopX <= listaBlokova.at(i).polozajX + listaBlokova.at(i).sirinaBl) && (polozajLopY + visinaLoptice >= listaBlokova.at(i).polozajY) && (polozajLopY <= listaBlokova.at(i).polozajY + listaBlokova.at(i).visinaBl)){
                if(provjeraKutnogUdarca(listaBlokova.at(i).polozajX, listaBlokova.at(i).polozajY)){
                    if(Math.abs(brzinaLopticeX) < maxBrzina){
                        brzinaLopticeX *= 1.2;
                        brzinaLopticeY *= 1.2;
                    }
                }
                listaBlokova.at(i).aktivnost = false;
                brzinaLopticeY *= -1;
                return true;
            }
        }
    }    

    return false;
};
//Funkcija za pomicanje loptice
const pomakniLopticu = () => {
    if(krajIGRE == true){
        ispisiKrajIgre();
        return;
    }
    pobjedaIGRE = provjeriPobjedu();
    if(pobjedaIGRE){
        ispisiPobjedu();
        return;
    }

    //Obrada sudara loptice sa zidovima i palicom
    if(pocetakIgreSmjer == true){
        //Za lijevo ako je manje od 0.5
        if(pocSmjer < 0.5){
            brzinaLopticeX *= -1; 
        }
        pocetakIgreSmjer = false;
    }else{
        //Provjera sudara loptice sa desnom stranom ekrana
        if((polozajLopticeX + sirinaLoptice) >= canvas.width){
            brzinaLopticeX *= -1;
        }
        //Provjera sudara loptice sa lijevom stranom ekrana
        if(polozajLopticeX <= 0){
            brzinaLopticeX *= -1;
        }
        //Provjera sudara loptice sa gornjom stranom ekrana
        if(polozajLopticeY <= 0){
            brzinaLopticeY *= -1;
        }

        //Provjera sudara loptice sa stranama palice
        if((polozajLopticeY + visinaLoptice >= polozajPaliceY) && (polozajLopticeY <= polozajPaliceY + visinaPalice) && (polozajLopticeX + sirinaLoptice >= polozajPaliceX + sirinaPalice ) && (polozajLopticeX <= polozajPaliceX + sirinaPalice)){
            brzinaLopticeX = Math.abs(brzinaLopticeX);
            brzinaLopticeY = -Math.abs(brzinaLopticeY);
        }else if((polozajLopticeY + visinaLoptice >= polozajPaliceY) && (polozajLopticeY <= polozajPaliceY + visinaPalice) && (polozajLopticeX <= polozajPaliceX) && (polozajLopticeX + sirinaLoptice >= polozajPaliceX)){
            brzinaLopticeX = -Math.abs(brzinaLopticeX);
            brzinaLopticeY = -Math.abs(brzinaLopticeY);
        }
        else if((polozajLopticeY + visinaLoptice >= polozajPaliceY) && (polozajLopticeY <= polozajPaliceY + visinaPalice) && (polozajLopticeX <= polozajPaliceX + sirinaPalice) && (polozajLopticeX + sirinaLoptice >= polozajPaliceX)){
            //Provjera sudara loptice sa gornjom stranom palice
            brzinaLopticeY *= -1;
        }
        
        if(polozajLopticeY > canvas.height){
            krajIGRE = true;
        }
    }

    //Obrada sudara loptice sa blokovima
    let rezSudar = provjeriSudarLopticeIBloka(polozajLopticeX, polozajLopticeY);
    if(rezSudar == true){
        trenutniBrojBodova += 1;
        if(trenutniBrojBodova > ukBrojBodova){
            localStorage.setItem("ukRez", trenutniBrojBodova);
        }
    }

    polozajLopticeX += brzinaLopticeX;
    polozajLopticeY += brzinaLopticeY;

    generirajLopticu();
};



const pocetakIgre = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    prikaziRezultate();
    iscrtajAktivneBlokove();
    pomakniPalicu();
    pomakniLopticu();

    requestAnimationFrame(pocetakIgre);
};
iscrtajZaslonIgre();



//Listener za pocetak igre
document.addEventListener("keydown", (event) => {
    if(zastavicaTeksta && event.code === "Space"){
        zastavicaTeksta = false;
        generirajBlokove();
        pocSmjer = Math.random();
        pocetakIgreSmjer = true;
        pocetakIgre();
    }
});
//Listener za pomicanje palice
document.addEventListener("keydown", (event) => {
    if(event.code === "ArrowLeft"){
        lijevoDown = true;
        lijevoUp = false;
    }else if(event.code === "ArrowRight"){
        desnoDown = true;
        desnoUp = false;
    } 
});
//Listener za prestanak micanja palice
document.addEventListener("keyup", (event) => {
    if(event.code === "ArrowLeft"){
        lijevoUp = true;
        lijevoDown = false;
    }else if(event.code === "ArrowRight"){
        desnoUp = true;
        desnoDown = false;
    } 
});