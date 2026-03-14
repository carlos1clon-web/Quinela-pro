let picks={}
let precio=10
let total=0
let quinelas=[]

function pick(p,v,b){

picks[p]=v

let fila=b.parentNode.parentNode

fila.querySelectorAll("button").forEach(x=>x.style.background="")

b.style.background="green"

}

function limpiar(){

picks={}

document.querySelectorAll("button").forEach(b=>b.style.background="")

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

total += precio

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

texto+="Partido "+p+" : "+q[p]+"\n"

}

texto+="\n"

})

texto+="Total: $"+total

let url="https://wa.me/524531467407?text="+encodeURIComponent(texto)

window.open(url)

}
