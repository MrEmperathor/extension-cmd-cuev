var title = document.querySelector("h1.Title").innerText;
var SubTitle = document.querySelector("h2.SubTitle").innerText;
let cont = 0;
var arr = document.querySelectorAll("td");
var image = document.querySelector(".Image>figure>img").currentSrc.replace("https://image.tmdb.org/t/p/w185_and_h278_bestv2","")
var backdrop = document.querySelector(".Objf>img").currentSrc.replace("https://image.tmdb.org/t/p/w1280","")
var year = document.querySelectorAll("p>span")[1].innerText;
let tmdb;

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
    } catch (error) {
        console.log(error);
    }
}
cu(SubTitle, year, image, backdrop);


const js = {
    "latino": [],
    "sub": [],
    "esp": []
};
var cm = "";
arr.forEach(a => {
    var b = a.innerText
    if (b.includes("Uptobox")){
        servidor = arr[cont].innerText;
        idioma = arr[cont+1].innerText;
        calidad = arr[cont+2].innerText;
        url = arr[cont+3].lastElementChild.href;

        if (idioma.includes("Latino")) {
            // cm += `de3 -n '${title}' -i "LATINO" -c HD -K HD -e ${uri_up} -t 232323`
            js["latino"]["servidor"] = "uptobox";
            js["latino"]["idioma"] = "LATINO";
            js["latino"]["calidad"] = calidad;
            js["latino"]["url"] = url;
            
        }else if(idioma.includes("Subtitulado")){

            js["sub"]["servidor"] = "uptobox";
            js["sub"]["idioma"] = "SUB";
            js["sub"]["calidad"] = calidad;
            js["sub"]["url"] = url;
        }else if(idioma.includes("Español")){

            js["esp"]["servidor"] = "uptobox";
            js["esp"]["idioma"] = "CASTELLANO";
            js["esp"]["calidad"] = calidad;
            js["esp"]["url"] = url;
        }
    }
    cont++
});
console.log(js);


function curll(url, idiom) {

    var url_parse = new URL(url);
    var path = url_parse.search.replace("?h=", "");
    var urll = "https://cors-anywhere.herokuapp.com/https://apitest.maxpeliculas.net/panel/inc/modelo/app.php?u="+path;

    fetch(urll)
    .then(function(response) {
        return response.text();
    })
    .then(data => {
        if(data){
            var obj = JSON.parse(data);
            // console.log(obj["message"]["url"]);
            uri_up = obj["message"]["url"].replace("#Synchronization+S","");
            cm += `de3 -n '${title}' -i "${idiom}" -c HD -K HD -e '${uri_up}' -t ${tmdb}; `
            console.log(cm);
            alert(cm)
        }
    });
}



async function getDatos() {

    for (const p in js){
        // if (!js[p].length === 0)
        console.log(js[p]);
        console.log(js[p].length);
        const awaiData = await curll(js[p]["url"], js[p]["idioma"]);
    }
}

getDatos();
