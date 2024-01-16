function BackgroundMusic(audioName, x) {
    if (x == true) {
        let audio = new Audio(audioName);
        audio.loop = true;
        audio.play();
    } else {
        let audio2 = new Audio(nepostojeci);
        audio2.loop = true;
        audio2.play();
    }
}

function dohvatiLocalStorage(key) {
    let retString = localStorage.getItem(key) //dohvaćanje postojećih igrača iz browsera
    let retArray = JSON.parse(retString) //vraćanje iz JSONa u array
    return retArray
}

function posaljiLocalStorage(key, value) {
    let string = JSON.stringify(value) //prebacivanje u JSON
    window.localStorage.setItem(key, string); //slanje na browser
}

let x = true;
BackgroundMusic("/animations/BackgroundMusic.mp3", x);
let Igraci = [];

class Igrac {
    constructor(ime, email, lozinka) {
        this.ime = ime;
        this.email = email;
        this.lozinka = lozinka;
        this.bodovi = 0;
    }

    provjeri() {
        let retArray = dohvatiLocalStorage("Igraci") //dohvaćanje postojećih igrača iz browsera
        //console.log(retArray);
        if(retArray){
            for (let i = 0; i < retArray.length; i++) {
                if (retArray[i] && retArray[i].ime == this.ime) { //ako nije null i ako je ime iskorišteno
                    console.log(`Igrač ${this.ime} već postoji u Igraci dictionary.`);
                    return false;
                }
            }

        }
     
        return true;
    }

    dodaj() {
        this.bodovi = 0;
        let retArray = dohvatiLocalStorage("Igraci") //dohvaćanje postojećih igrača iz browsera
        if(retArray){        
            Igraci = retArray
        }
        Igraci[Igraci.length] = this; //dodavanje novog
        posaljiLocalStorage("Igraci", Igraci); //slanje na browser
        console.log(`Igrač ${this.ime} dodan u Igraci dictionary.`);
    }
}

function provjeriLozinku(ime, lozinka) {
    let retArray = dohvatiLocalStorage("Igraci") //dohvaćanje postojećih igrača iz browsera
    //console.log(retArray);
    for (let i = 0; i < retArray.length; i++) {
        if (retArray[i] && retArray[i].ime == ime && retArray[i].lozinka == lozinka) { //ako nije null i ako ime i lozinka se poklapaju
            console.log(`Igrač ${ime} autoriziran.`);
            return true;
        }
    }
    return false;
}

