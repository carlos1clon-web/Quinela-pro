let picks={}
let precio=10
let total=0
let quinelas=[]

function pick(partido,valor,btn){

if(!picks[partido]){
picks[partido]=[]
}

if(picks[partido].includes(valor)){

picks[partido]=picks[partido].filter(v=>v!==valor)
btn.style.background=""

}else{

picks[partido].push(valor)
btn.style.background="green"

}

}

function limpiar(){

picks={}

document.querySelectorAll("table button").forEach(b=>{
b.style.background=""
})

}

function aleatorio(){

document.querySelectorAll("tr").forEach((fila,i)=>{

if(i==0)return

let botones=fila.querySelectorAll("button")

let r=Math.floor(Math.random()*3)

botones[r].click()

})

}

function agregar(){

quinelas.push({...picks})

total+=precio

document.getElementById("total").innerText=total

limpiar()

}

function enviar(){

let nombre=document.getElementById("nombre").value

let texto="QUINIELAS MÉXICO\n\n"

texto+="Participante: "+nombre+"\n\n"

quinelas.forEach((q,i)=>{

texto+="Quiniela "+(i+1)+"\n"

for(let p in q){

texto+="Partido "+p+" : "+q[p].join("/")+"\n"

}

texto+="\n"

})

texto+="Total: $"+total

let url="https://wa.me/524531467407?text="+encodeURIComponent(texto)

window.open(url)

}
