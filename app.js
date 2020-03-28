let MAX = 100;
let imgpP = 10;
let pag = 1;
let nPags = 2;

function init() {
    pag = 1;
    nPags = Math.floor(MAX / imgpP);

    setPags();
    getImgs();
}

function getImgs() {
    var imagenes = document.getElementById("pubImgs");
    const url = `https://picsum.photos/v2/list?page=${pag}&limit=${imgpP}`;
    const xh = new XMLHttpRequest();

    xh.open('GET', url, true);

    xh.onload = function() {
        try {
            if(this.status === 200) {
                const imgs = JSON.parse(this.responseText) ;

                imagenes.innerHTML = " ";

                imgs.forEach(imagen => {
                    const addImg = `<div class="col-m-7 col-s-12 divprop">
                                            <img src="${imagen.download_url}" class="caractImg" alt="">
                                    </div>`
                    imagenes.innerHTML += addImg;
                });
            }
        } catch (e) {
        }
    }

    try {
        xh.send();
    } catch (e) {
    }
}

function setPags() {
    var pags = document.getElementById("sigsPags");
    pags.innerHTML = "";

    let numPags = "";
    for(var i = 0; i < nPags; i++) {
        if(i === 0) {
            numPags += `<div class="pag ActPag" onclick="clickSigPag(this);">${i+1}</div>`;
        } else {
            numPags += `<div class="pag" onclick="clickSigPag(this);">${i+1}</div>`;
        }
    }

    numPags += `<div class="pag" onclick="clickSigPag(this);">Sig</div>`;

    pags.innerHTML = numPags;
}

function clickSigPag(e) {
    window.scrollTo(0, 0); 
    var pages = document.getElementById("sigsPags");
    pages.children[pag-1].classList = "pag";

    if(e.innerText === "Sig") {
        if (pag < nPags) {
            pag++;
        }
    } else {
        pag = e.innerText;
    }

    pages.children[pag-1].classList = "pag ActPag";

    getImgs();
}

function cambioImgspP(e) {
    imgpP = e.value;
    pag = 1;
    nPags = Math.floor(MAX / imgpP);
    
    setPags();
    getImgs();
}