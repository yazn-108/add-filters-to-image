"use strict";
let 
saturate = document.querySelector("#saturate"),
contrast = document.querySelector("#contrast"),
brightness = document.querySelector("#brightness"),
sepia = document.querySelector("#sepia"),
grayscale = document.querySelector("#grayscale"),
blurFilter = document.querySelector("#blur"),
hueRotate = document.querySelector("#hue-rotate");

let imgBox = document.querySelector(".img-box");
let upload = document.querySelector("#upload-img");
let img = document.querySelector("#img");
let download = document.querySelector("#download");
let reset = document.querySelector("#reset");

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

function resetValues() {
    context.filter = "none";
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayscale.value = "0";
    blurFilter.value = "0";
    hueRotate.value = "0";
    context.drawImage(img,0,0,canvas.width,canvas.height);
};

upload.onchange = () => {
    resetValues();
    document.querySelector("a").style = `pointer-events: all;`;
    let file  = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = () => img.src = file.result;
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display = 'none';
    };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener("input", () => {
        context.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blurFilter.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
        filterValues();
        context.drawImage(img,0,0,canvas.width,canvas.height);
    });
});
reset.onclick = () => resetValues();
download.onclick = () => download.href = canvas.toDataURL();

function filterValues() {
document.querySelector(`label[for=${filters[0].id}] span`).innerHTML = saturate.value;
document.querySelector(`label[for=${filters[1].id}] span`).innerHTML = contrast.value;
document.querySelector(`label[for=${filters[2].id}] span`).innerHTML = brightness.value;
document.querySelector(`label[for=${filters[3].id}] span`).innerHTML = sepia.value;
document.querySelector(`label[for=${filters[4].id}] span`).innerHTML = grayscale.value;
document.querySelector(`label[for=${filters[5].id}] span`).innerHTML = blurFilter.value;
document.querySelector(`label[for=${filters[6].id}] span`).innerHTML = hueRotate.value;
};
filterValues();