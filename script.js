let quinelas = [];
let precio = 10;
let total = 0;

function calcularTotal(){

let totalGeneral = 0;

document.querySelectorAll(".quiniela").forEach(tabla => {

let partidos = {};

tabla.querySelectorAll("input[type=checkbox]").forEach(c => {

let partido = c.dataset.partido;

if(!partidos[partido]){
partidos[partido] = 0;
}

if(c.checked){
partidos[partido]++;
}

});

let combinaciones = 1;

for(let p in partidos){

let seleccionadas = partidos[p];

if(seleccionadas === 0){
seleccionadas = 1;
}

combinaciones *= seleccionadas;

}

totalGeneral += combinaciones * precio;

});

document.getElementById("total").innerText = "$" + totalGeneral;

}

document.addEventListener("change", function(e){
if(e.target.type === "checkbox"){
calcularTotal();
}
});

function limpiar(){

document.querySelectorAll("input[type=checkbox]").forEach(c => {
c.checked = false;
});

}

function aleatorio(){

limpiar();

for(let i=1;i<=9;i++){

let opcion = Math.floor(Math.random()*3);

let checkboxes = document.querySelectorAll(`input[data-partido="${i}"]`);

checkboxes[opcion].checked = true;

}

calcularTotal();

}

function agregar(){

let nombre = document.getElementById("nombre").value.trim();

if(nombre === ""){
alert("Debes escribir tu nombre");
return;
}

let seleccion = [];

for(let i=1;i<=9;i++){

let letra = "-";

document.querySelectorAll(`input[data-partido="${i}"]`).forEach((c,index)=>{

if(c.checked){

if(index===0) letra="L";
if(index===1) letra="E";
if(index===2) letra="V";

}

});

seleccion.push(letra);

}

if(seleccion.every(v=>v=="-")){
alert("Debes llenar la quiniela");
return;
}

quinelas.push(seleccion);

total += precio;

document.getElementById("total").innerText = "$" + total;

mostrarQuinielas();

limpiar();

}

function mostrarQuinielas(){

let contenedor = document.getElementById("listaQuinielas");

contenedor.innerHTML = "";

quinelas.forEach((q,i)=>{

let div = document.createElement("div");

div.className = "quinielaGuardada";

div.innerHTML = `
${q.join(" ")}
<button onclick="eliminar(${i})">❌</button>
`;

contenedor.appendChild(div);

});

}

function eliminar(i){

quinelas.splice(i,1);

total -= precio;

if(total < 0){
total = 0;
}

document.getElementById("total").innerText = "$" + total;

mostrarQuinielas();

}

function enviar(){

let nombre = document.getElementById("nombre").value;

if(nombre === ""){
alert("Debes escribir tu nombre");
return;
}

if(quinelas.length === 0){
alert("No hay quinielas agregadas");
return;
}

let texto = "QUINIELAS LIGA MX\n\n";

texto += "Participante: " + nombre + "\n\n";

quinelas.forEach((q,i)=>{

texto += "Quiniela " + (i+1) + "\n";

q.forEach((p,j)=>{
texto += "Partido " + (j+1) + ": " + p + "\n";
});

texto += "\n";

});

texto += "Total: $" + total;

let url = "https://wa.me/5215610791509?text=" + encodeURIComponent(texto);

window.open(url);

}
