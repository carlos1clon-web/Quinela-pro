let picks={}

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

function enviar(){

let nombre=document.getElementById("nombre").value

let texto="Quiniela de "+nombre+"\n\n"

for(let p in picks){

texto+="Partido "+p+" : "+picks[p]+"\n"

}

let url="https://wa.me/524531467407?text="+encodeURIComponent(texto)

window.open(url)

}
