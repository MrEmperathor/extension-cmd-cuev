var title = document.querySelector("h1.Title").innerText;
const titlee = document.querySelector("h1.Title").innerText;
var SubTitle = document.querySelector("h2.SubTitle").innerText;
let cont = 0;
var arr = document.querySelectorAll("td");
var image = document.querySelector(".Image>figure>img").currentSrc.replace("https://image.tmdb.org/t/p/w185_and_h278_bestv2","")
var backdrop = document.querySelector(".Objf>img").currentSrc.replace("https://image.tmdb.org/t/p/w1280","")
var year = document.querySelectorAll("p>span")[1].innerText;
let tmdb;
try {
  var premiun_lat = "https:"+document.querySelector("#OptL1>iframe").dataset["src"];
  var ifr_forma_lat = document.querySelector("#OptL1>iframe").dataset["src"].replace("//api.cuevana3.io/ir/goto_ddh.php?h=","https://formatearwindows.net/embed.html#");
} catch (error) {
  console.error(error);
  var premiun_lat = false;
  var ifr_forma_lat = false;
}

try {
  var premiun_sub = "https:"+document.querySelector("#OptS1>iframe").dataset["src"];
  var ifr_forma_sub = document.querySelector("#OptS1>iframe").dataset["src"].replace("//api.cuevana3.io/ir/goto_ddh.php?h=","https://formatearwindows.net/embed.html#");

} catch (error) {
  console.error(error);
  var premiun_sub = false;
  var ifr_forma_sub = false;
}

try {
  var premiun_esp = "https:"+document.querySelector("#OptE1>iframe").dataset["src"];
  var ifr_forma_esp = document.querySelector("#OptE1>iframe").dataset["src"].replace("//api.cuevana3.io/ir/goto_ddh.php?h=","https://formatearwindows.net/embed.html#");

} catch (error) {
  console.error(error);
  var premiun_esp = false;
  var ifr_forma_esp = false;
}

function addElement () {
    
    var mi_cuadro = document.createElement("div");
    mi_cuadro.className = "_1EGcQ_0";
    mi_cuadro.innerHTML = `<textarea id="mi_cuarto" name="textarea" rows="10" cols="10" style="font-size: 13px !important;"></textarea>`


    const app = document.querySelector("._1EGcQ_0");
    app.insertAdjacentElement("beforebegin", mi_cuadro);

  }
addElement()
mi_cuarto = document.querySelector("#mi_cuarto").value += `LAT: ${ifr_forma_lat}\n`;
mi_cuarto = document.querySelector("#mi_cuarto").value += `ESP: ${ifr_forma_esp}\n`;
mi_cuarto = document.querySelector("#mi_cuarto").value += `SUB: ${ifr_forma_sub}\n\n`;
const cu = async (title, yea, img, backdrop) => {

    var t = encodeURIComponent(title)
    var uri = `https://api.themoviedb.org/3/search/movie?api_key=be58b29465062a3b093bc17dacef8bf3&query=${t}&year=${yea}`;

    try {
        const resPost = await fetch(uri);
        const post = await resPost.json();

        // var obj = JSON.parse(post);
        var obj = post;
        for (const key in obj["results"]) {
            console.log(obj["results"]);
            console.log(obj["results"][key]["id"]);

            if (obj["results"][key]["poster_path"] == img) {
                tmdb = obj["results"][key]["id"];

            }else if(obj["results"][key]["backdrop_path"] == backdrop){
                tmdb = obj["results"][key]["id"];
            }
        }
        if (tmdb === undefined) tmdb = obj["results"][0]["id"];
        console.log(tmdb);
        mi_cuarto = document.querySelector("#mi_cuarto").value += `\n\n`;
        if(premiun_lat) mi_cuarto = document.querySelector("#mi_cuarto").value += `de3 -n '${titlee}' -t ${tmdb} -i "LATINO" -c HD -K HD -e "${premiun_lat}" -W "${premiun_lat}"; `;
        if(premiun_sub) mi_cuarto = document.querySelector("#mi_cuarto").value += `de3 -n '${titlee}' -t ${tmdb} -i "SUB" -c HD -K HD -e "${premiun_sub}" -W "${premiun_sub}"; `;
        if(premiun_esp) mi_cuarto = document.querySelector("#mi_cuarto").value += `de3 -n '${titlee}' -t ${tmdb} -i "CASTELLANO" -c HD -K HD -e "${premiun_esp}" -W "${premiun_esp}"; `;
        mi_cuarto = document.querySelector("#mi_cuarto").value += `\n\n`;
    } catch (error) {
        console.log(error);
    }

}
cu(SubTitle, year, image, backdrop);



const js = {};
var cm = "";
p_lat = premiun_lat ? `"${premiun_lat}"` : "";
p_sub = premiun_sub ? `"${premiun_sub}"` : "";
p_esp = premiun_esp ? `"${premiun_esp}"` : "";
cm += p_lat;
cm += p_sub;
cm += p_esp;
arr.forEach(a => {
    var b = a.innerText
    if (b.includes("Uptobox")){
        servidor = arr[cont].innerText;
        idioma = arr[cont+1].innerText;
        calidad = arr[cont+2].innerText;
        url = arr[cont+3].lastElementChild.href;

        if (idioma.includes("Latino")) {
            // cm += `de3 -n '${title}' -i "LATINO" -c HD -K HD -e ${uri_up} -t 232323`
            js["latino"] = [];
            js["latino"]["servidor"] = "uptobox";
            js["latino"]["idioma"] = "LATINO";
            js["latino"]["calidad"] = calidad;
            js["latino"]["url"] = url;
            js["latino"]["iframe"] = p_lat;
            
        }else if(idioma.includes("Subtitulado")){

            js["sub"] = [];
            js["sub"]["servidor"] = "uptobox";
            js["sub"]["idioma"] = "SUB";
            js["sub"]["calidad"] = calidad;
            js["sub"]["url"] = url;
            js["sub"]["iframe"] = p_sub;
        }else if(idioma.includes("Español")){

            js["esp"] = [];
            js["esp"]["servidor"] = "uptobox";
            js["esp"]["idioma"] = "CASTELLANO";
            js["esp"]["calidad"] = calidad;
            js["esp"]["url"] = url;
            js["esp"]["iframe"] = p_esp;
        }
    }
    cont++
});
console.log(js);


function curll(url, idiom, iframe) {

    var url_parse = new URL(url);
    var path = url_parse.search.replace("?h=", "");
    // var urll = "https://cors-anywhere.herokuapp.com/http://51.195.148.50:4000/";
    var urll = "https://51.195.148.50:4000/";

    fetch(urll+"cue/"+path)
    .then(function(response) {
        return response.text();
    })
    .then(data => {
        if(data){
            var obj = JSON.parse(data);
            // console.log(obj["message"]["url"]);
            uri_up = obj["message"]["url"].replace("#Synchronization+S","");
            cm += `de3 -n '${title}' -i "${idiom}" -c HD -K HD -e '${uri_up}' -t ${tmdb} -W ${iframe}; `
            cmm = `de3 -n '${title}' -i "${idiom}" -c HD -K HD -e '${uri_up}' -t ${tmdb} -W ${iframe}; `
            console.log(cm);
            // alert(cm)
            mi_cuarto = document.querySelector("#mi_cuarto").value += cmm;
        }
    });
}



async function getDatos() {

    for (const p in js){
        // if (!js[p].length === 0)
        // if (js[p].length == 0) continue;
        console.log("ESTA SERIA EL ARRAY"+js[p]);
        console.log("ESTA SERIA EL ARRAY CANTIDAD"+js[p].length);
        console.log("NUEMERO DE AR"+js[p].length);
        const awaiData = await curll(js[p]["url"], js[p]["idioma"], js[p]["iframe"]);
    }
}

getDatos();
