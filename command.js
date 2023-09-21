// Desencriptar enlaces hdpaste.com
if (window.location.host === "hdpastes.com") {
  const arrayEnlacesCrudos = document.querySelectorAll("a");
  const fromEnlaces = Array?.from(arrayEnlacesCrudos);

  const regex = /go\.php\?out=([^&]+)/;

  fromEnlaces?.map((e, index) => {
    const url = e?.href;
    const match = url?.match(regex);
    if (match) {
      const param = match[1]; // El valor deseado estará en el índice 1 del arreglo de coincidencias
      const urlDecode = atob(param);
      const paramDecodeROT13 = decryptROT13(urlDecode);
      e.href = paramDecodeROT13;
      document.querySelectorAll("a")[index].href =
        decodeURIComponent(paramDecodeROT13);
    } else {
      console.log("No se encontró el valor en la URL.");
    }
  });
}

// Desencriptar free de pelisenhsd.com
if (window.location.host === "pelisenhd.org") {
  console.log("window.location.host", window.location.host);
  const url = document.querySelector(".box_links.hdpastes\\.com a").href;
  const query = url.split("s.php?i=")[1];

  document.querySelector(".box_links.hdpastes\\.com a").href = atob(
    atob(atob(atob(atob(query))))
  );
  const urlDecode = decryptROT13(
    document.querySelector(".box_links.hdpastes\\.com a").href
  );
  const urlDecodeFianal = urlDecode.replace("|pehd", "");

  const nodeList = document.querySelectorAll(".box_links.hdpastes\\.com a");

  // Itera a través de la NodeList y obtén los valores de "href"
  nodeList.forEach(function (element) {
    if (element.getAttribute("href")) {
      element.setAttribute("href", urlDecodeFianal);
    }
  });

  // Obtener el contenedor
  const contenedor = document.querySelector(".details__cover");

  // Crear un elemento botón
  const boton = document.createElement("a");
  boton.textContent = "Ver enlaces Free";
  boton.href = urlDecodeFianal;
  boton.target = "_blank";
  boton.classList.add("details__trailer"); // Agregar clases si es necesario

  // Agregar el botón al contenedor
  contenedor.appendChild(boton);

  // window.open(urlDecodeFianal, "_blank");
}

function decryptROT13(ciphertext) {
  return ciphertext.replace(/[a-zA-Z]/g, function (char) {
    var code = char.charCodeAt(0);
    var base =
      code >= "a".charCodeAt(0) ? "a".charCodeAt(0) : "A".charCodeAt(0);
    return String.fromCharCode(base + ((code - base + 13) % 26));
  });
}

// Desencriptar enlace free
if (window.location.host === "www.descargatepelis.com") {
  const url = document.querySelectorAll(".boxdescargas>a")[1].href;
  const query = url.split("l=")[1];
  document.querySelectorAll(".boxdescargas>a")[1].href = atob(
    atob(atob(atob(atob(query))))
  );
  // alert(document.querySelectorAll('.boxdescargas>a')[1].href);
  const urlDecode = document.querySelectorAll(".boxdescargas>a")[1].href;
  // window.location.href = document.querySelectorAll('.boxdescargas>a')[1].href;
  window.open(urlDecode, "_blank");
}

// Desencriptar enlace free
if (window.location.host === "www.megapeliculasrip.net") {
  const query = document.querySelector("fieldset a").href.split("/?")[1];
  // const query = url.split("l=")[1];
  // document.querySelectorAll(".boxdescargas>a")[1].href = atob(
  //   atob(atob(atob(atob(query))))
  document.querySelector("fieldset a").href = atob(query);
  // alert(document.querySelectorAll('.boxdescargas>a')[1].href);
  const urlDecode = document.querySelector("fieldset a").href;
  // window.location.href = document.querySelectorAll('.boxdescargas>a')[1].href;
  window.open(urlDecode, "_blank");
}

if (window.location.host === "pastes.descargatepelis.com") {
  const listEnalcesNode = document.querySelectorAll(".tab_container>div>a");
  const listEnalces = Array.from(listEnalcesNode);
  let drive = [];
  let pocicionArray = 0;
  listEnalces.map((e) => {
    console.log("e.href", e.href);
    const stringId = e.href.match(/#.*/g)[0].slice(1);
    console.log("stringId", stringId);
    const enlaceDesencriptado = atob(stringId);
    console.log("enlaceDesencriptado", enlaceDesencriptado);
    document.querySelectorAll(".tab_container>div>a")[pocicionArray].href =
      enlaceDesencriptado;
    pocicionArray = pocicionArray + 1;
  });
}

if (window.location.host === "hdpastes.com") {
  function mostrarHrefEtiquetasConInnerText(texto) {
    let elementos = document.getElementsByTagName("*");
    const hrefEtiquetas = [];

    for (let i = 0; i < elementos.length; i++) {
      if (
        elementos[i].innerText === texto &&
        elementos[i].hasAttribute("href")
      ) {
        hrefEtiquetas.push(elementos[i].getAttribute("href"));
      }
    }

    let contentElemento = document.querySelector(".content");

    // Crear el elemento <textarea>
    let textareaElemento = document.createElement("textarea");
    textareaElemento.rows = "10";
    textareaElemento.cols = "50";

    // Construir la lista enumerada de hrefs
    let listaEnumerada = "";
    for (let j = 0; j < hrefEtiquetas.length; j++) {
      listaEnumerada += j + 1 + ". " + hrefEtiquetas[j] + "\n";
    }

    textareaElemento.value = listaEnumerada;

    // Limpiar el contenido previo dentro del elemento content
    contentElemento.innerHTML = "";

    // Agregar el textarea al elemento content
    contentElemento.appendChild(textareaElemento);
  }

  // Ejemplo de uso:
  mostrarHrefEtiquetasConInnerText("Uptobox.com");
}

//obtener enlaces de new1.gdtot.sbs para subirlos remotamente

const sitesAvalibles = ["new1.gdtot.sbs", "new2.gdtot.sbs"];
if (sitesAvalibles.includes(window.location.host)) {
  const listEnalcesNode = document.querySelectorAll(".card-body>.text-light");
  const listEnalces = Array.from(listEnalcesNode);
  let drive = [];
  listEnalces.map((e) => {
    const expresion = /https:\/\/(.*).gdtot.(.*)\/file\/.*/g;
    const arrayMatchUrl = e.href.match(expresion);
    arrayMatchUrl && drive.push(arrayMatchUrl[0].replace("file/", "dld?id="));
  });

  let myWindow;

  function openWin(e) {
    myWindow = window.open(
      e,
      e,
      "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=600,height=600,left=390,top=50"
    );
  }

  function closeWin() {
    myWindow.close();
  }

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }

  drive.map((e) => {
    openWin(e);
    sleep(2000);
    closeWin();
  });
}

var title = document.querySelector("h1.Title").innerText;
const titlee = document.querySelector("h1.Title").innerText;
var SubTitle = document.querySelector("h2.SubTitle").innerText;
let cont = 0;
var arr = document.querySelectorAll("td");
var image = document
  .querySelector(".Image>figure>img")
  .currentSrc.replace("https://image.tmdb.org/t/p/w185_and_h278_bestv2", "");
var backdrop = document
  .querySelector(".Objf>img")
  .currentSrc.replace("https://image.tmdb.org/t/p/w1280", "");
var year = document.querySelectorAll("p>span")[1].innerText;
let tmdb;
try {
  var premiun_lat =
    "https:" + document.querySelector("#OptL1>iframe").dataset["src"];
  var ifr_forma_lat = document
    .querySelector("#OptL1>iframe")
    .dataset["src"].replace(
      "//apialfa.tomatomatela.club/ir/player.php?h=",
      "https://formatearwindows.net/player.php?url="
    );
} catch (error) {
  console.error(error);
  var premiun_lat = false;
  var ifr_forma_lat = false;
}

try {
  var premiun_sub =
    "https:" + document.querySelector("#OptS1>iframe").dataset["src"];
  var ifr_forma_sub = document
    .querySelector("#OptS1>iframe")
    .dataset["src"].replace(
      "//apialfa.tomatomatela.club/ir/player.php?h=",
      "https://formatearwindows.net/player.php?url="
    );
} catch (error) {
  console.error(error);
  var premiun_sub = false;
  var ifr_forma_sub = false;
}

try {
  var premiun_esp =
    "https:" + document.querySelector("#OptE1>iframe").dataset["src"];
  var ifr_forma_esp = document
    .querySelector("#OptE1>iframe")
    .dataset["src"].replace(
      "//apialfa.tomatomatela.club/ir/player.php?h=",
      "https://formatearwindows.net/player.php?url="
    );
} catch (error) {
  console.error(error);
  var premiun_esp = false;
  var ifr_forma_esp = false;
}

function addElement() {
  var mi_cuadro = document.createElement("div");
  mi_cuadro.className = "_1EGcQ_0";
  mi_cuadro.innerHTML = `<textarea id="mi_cuarto" name="textarea" rows="10" cols="10" style="font-size: 13px !important;"></textarea>`;

  const app = document.querySelector("._1EGcQ_0");
  app.insertAdjacentElement("beforebegin", mi_cuadro);
}
addElement();
mi_cuarto = document.querySelector(
  "#mi_cuarto"
).value += `LAT: ${ifr_forma_lat}\n`;
mi_cuarto = document.querySelector(
  "#mi_cuarto"
).value += `ESP: ${ifr_forma_esp}\n`;
mi_cuarto = document.querySelector(
  "#mi_cuarto"
).value += `SUB: ${ifr_forma_sub}\n\n`;
const cu = async (title, yea, img, backdrop) => {
  var t = encodeURIComponent(title);
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
      } else if (obj["results"][key]["backdrop_path"] == backdrop) {
        tmdb = obj["results"][key]["id"];
      }
    }
    if (tmdb === undefined) tmdb = obj["results"][0]["id"];
    console.log(tmdb);
    mi_cuarto = document.querySelector("#mi_cuarto").value += `\n\n`;
    if (premiun_lat)
      mi_cuarto = document.querySelector(
        "#mi_cuarto"
      ).value += `de3 -n '${titlee}' -t ${tmdb} -i "LATINO" -c HD -K HD -e "${ifr_forma_lat}" -W "${ifr_forma_lat}"; `;
    if (premiun_sub)
      mi_cuarto = document.querySelector(
        "#mi_cuarto"
      ).value += `de3 -n '${titlee}' -t ${tmdb} -i "SUB" -c HD -K HD -e "${ifr_forma_sub}" -W "${ifr_forma_sub}"; `;
    if (premiun_esp)
      mi_cuarto = document.querySelector(
        "#mi_cuarto"
      ).value += `de3 -n '${titlee}' -t ${tmdb} -i "CASTELLANO" -c HD -K HD -e "${ifr_forma_esp}" -W "${ifr_forma_esp}"; `;
    mi_cuarto = document.querySelector("#mi_cuarto").value += `\n\n`;
  } catch (error) {
    console.log(error);
  }
};
cu(SubTitle, year, image, backdrop);

const js = {};
var cm = "";
p_lat = premiun_lat ? `"${premiun_lat}"` : "";
p_sub = premiun_sub ? `"${premiun_sub}"` : "";
p_esp = premiun_esp ? `"${premiun_esp}"` : "";
cm += p_lat;
cm += p_sub;
cm += p_esp;
arr.forEach((a) => {
  var b = a.innerText;
  if (b.includes("Uptobox")) {
    servidor = arr[cont].innerText;
    idioma = arr[cont + 1].innerText;
    calidad = arr[cont + 2].innerText;
    url = arr[cont + 3].lastElementChild.href;

    if (idioma.includes("Latino")) {
      // cm += `de3 -n '${title}' -i "LATINO" -c HD -K HD -e ${uri_up} -t 232323`
      js["latino"] = [];
      js["latino"]["servidor"] = "uptobox";
      js["latino"]["idioma"] = "LATINO";
      js["latino"]["calidad"] = calidad;
      js["latino"]["url"] = url;
      js["latino"]["iframe"] = p_lat;
    } else if (idioma.includes("Subtitulado")) {
      js["sub"] = [];
      js["sub"]["servidor"] = "uptobox";
      js["sub"]["idioma"] = "SUB";
      js["sub"]["calidad"] = calidad;
      js["sub"]["url"] = url;
      js["sub"]["iframe"] = p_sub;
    } else if (idioma.includes("Español")) {
      js["esp"] = [];
      js["esp"]["servidor"] = "uptobox";
      js["esp"]["idioma"] = "CASTELLANO";
      js["esp"]["calidad"] = calidad;
      js["esp"]["url"] = url;
      js["esp"]["iframe"] = p_esp;
    }
  }
  cont++;
});
console.log(js);

function curll(url, idiom, iframe) {
  var url_parse = new URL(url);
  var path = url_parse.search.replace("?h=", "");
  // var urll = "https://cors-anywhere.herokuapp.com/http://51.195.148.50:4000/";
  var urll = "https://51.195.148.50:4000/";

  fetch(urll + "cue/" + path)
    .then(function (response) {
      return response.text();
    })
    .then((data) => {
      if (data) {
        var obj = JSON.parse(data);
        // console.log(obj["message"]["url"]);
        uri_up = obj["message"]["url"].replace("#Synchronization+S", "");
        cm += `de3 -n '${title}' -i "${idiom}" -c HD -K HD -e '${uri_up}' -t ${tmdb} -W ${iframe}; `;
        cmm = `de3 -n '${title}' -i "${idiom}" -c HD -K HD -e '${uri_up}' -t ${tmdb} -W ${iframe}; `;
        console.log(cm);
        // alert(cm)
        mi_cuarto = document.querySelector("#mi_cuarto").value += cmm;
      }
    });
}

async function getDatos() {
  for (const p in js) {
    // if (!js[p].length === 0)
    // if (js[p].length == 0) continue;
    console.log("ESTA SERIA EL ARRAY" + js[p]);
    console.log("ESTA SERIA EL ARRAY CANTIDAD" + js[p].length);
    console.log("NUEMERO DE AR" + js[p].length);
    const awaiData = await curll(
      js[p]["url"],
      js[p]["idioma"],
      js[p]["iframe"]
    );
  }
}

getDatos();

function decryptROT13(ciphertext) {
  return ciphertext.replace(/[a-zA-Z]/g, function (char) {
    var code = char.charCodeAt(0);
    var base =
      code >= "a".charCodeAt(0) ? "a".charCodeAt(0) : "A".charCodeAt(0);
    return String.fromCharCode(base + ((code - base + 13) % 26));
  });
}
