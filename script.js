const cats=["Todo","🆓 Gratis con propina","💸 De paga","🍓 Fresa","🥭 Mango","🍌 Plátano","🔥 Despecho","💋 Infieles"];
const novelas=[
 {t:"La Fresa Despechada - Cap 1 Gratis",emoji:"🍓",cat:"🍓 Fresa",tipo:"free",modelo:"propina",time:"8:32",views:"12k",author:"FresaFilms"},
 {t:"Mango Prohibido - Todo de paga $29",emoji:"🥭",cat:"🥭 Mango",tipo:"paid",modelo:"paid_all",precio:29,time:"15:20",views:"3.4k",author:"MangoStories"},
 {t:"Plátano Infiel - Cap 1 gratis resto $19",emoji:"🍌",cat:"💋 Infieles",tipo:"paid",modelo:"free_first",precio:19,time:"6:10",views:"22k",author:"PlátanoTV"},
 {t:"Sandía Enamorada - T1 gratis T2 $39",emoji:"🍉",cat:"🔥 Despecho",tipo:"paid",modelo:"season",precio:39,time:"10:05",views:"8k",author:"Sandía"},
];
let activeCat="Todo", query="", selectedRole="cliente";
const catBox=document.getElementById('categories');
cats.forEach(c=>{
 let b=document.createElement('button'); b.textContent=c; if(c===activeCat) b.classList.add('active');
 b.onclick=()=>{activeCat=c; document.querySelectorAll('.categories button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); render();};
 catBox.appendChild(b);
});
const grid=document.getElementById('grid');
function render(){
 grid.innerHTML='';
 let list=novelas.filter(n=>{
  let okCat = activeCat==="Todo" ? true : (activeCat==="🆓 Gratis con propina"? n.tipo==="free" : activeCat==="💸 De paga"? n.tipo==="paid" : n.cat===activeCat);
  let okSearch = n.t.toLowerCase().includes(query.toLowerCase());
  return okCat && okSearch;
 });
 list.forEach(n=>{
  let card=document.createElement('div'); card.className='card';
  card.innerHTML=`<div class="thumb">${n.emoji}<span class="time">${n.time}</span>${n.tipo==="paid"?`<span class="lock">🔒 $${n.precio}</span>`:`<span class="lock" style="background:#1f6b4a">🟢 PROPINA</span>`}</div><div class="info"><h4>${n.t}</h4><div class="meta"><span>${n.author}</span><span>${n.views}</span></div></div>`;
  card.onclick=()=>openVideo(n); grid.appendChild(card);
 });
}
render();
document.getElementById('searchInput').addEventListener('input',e=>{query=e.target.value; render();});

function openModal(type){
 const modal=document.getElementById('modal'); const c=document.getElementById('modal-content');
 if(type==='register'){
  c.innerHTML=`<h2>Crear cuenta</h2>
  <div class="role">
   <button id="btnCliente" class="active" onclick="setRole('cliente')">👀<br><b>Cliente</b></button>
   <button id="btnCreador" onclick="setRole('creador')">🎬<br><b>Creador/Cliente</b></button>
  </div>
  <input placeholder="Apodo"><input placeholder="Email"><input type="password" placeholder="Contraseña">
  <div id="creadorExtra" style="display:none"><input placeholder="Nombre titular"><input placeholder="CLABE/Tarjeta para recibir tu 70%"><select><option>Stripe / MercadoPago</option></select><p class="small">Tú eliges el modelo al subir. 70% para ti, 30% plataforma automático.</p></div>
  <div id="clienteExtra"><select><option>Plan: Gratis (propinas), $49/mes o PPV</option><option>Gratis</option><option>$49/mes ilimitado</option><option>Pago por video</option></select></div>
  <button class="btn" onclick="finishRegister()">Crear cuenta</button>`;
 } else if(type==='creator'){
  c.innerHTML=`<h2>Subir Frutinovela - Tú pones la soga 🤣</h2>
  <input id="title" placeholder="Título">
  <select id="catSel"><option>🍓 Fresa</option><option>🥭 Mango</option><option>🍌 Plátano</option><option>🍉 Sandía</option><option>🔥 Despecho</option><option>💋 Infieles</option></select>
  <select id="modelo">
   <option value="propina">1. Gratis con Propinas (30% para plataforma)</option>
   <option value="paid_all">2. Todo de Paga $ - PPV</option>
   <option value="free_first">3. Cap 1 Gratis, resto de Paga</option>
   <option value="season">4. T1 Gratis, T2 de Paga</option>
   <option value="sub">5. Solo Suscriptores $49/mes a mi canal</option>
  </select>
  <input id="price" type="number" placeholder="Precio PPV Ej 29" style="display:none">
  <input id="priceSub" type="number" placeholder="Precio suscripción Ej 49" style="display:none">
  <input placeholder="MP4 o link YouTube">
  <button class="btn" onclick="publish()">Publicar</button>
  <p class="small">Ej: Si pones Cap 1 gratis y cobras $19 del Cap 2 en adelante, tú recibes $5.7 automático por cada venta.</p>`;
  setTimeout(()=>{
   document.getElementById('modelo').addEventListener('change',e=>{
    let v=e.target.value;
    document.getElementById('price').style.display=(v==='paid_all'||v==='free_first'||v==='season')?'block':'none';
    document.getElementById('priceSub').style.display=v==='sub'?'block':'none';
   });
  },100);
 }
 modal.classList.remove('hidden');
 window.setRole=(r)=>{
  selectedRole=r;
  document.getElementById('btnCliente').classList.toggle('active',r==='cliente');
  document.getElementById('btnCreador').classList.toggle('active',r==='creador');
  document.getElementById('clienteExtra').style.display=r==='cliente'?'block':'none';
  document.getElementById('creadorExtra').style.display=r==='creador'?'block':'none';
 };
 window.finishRegister=()=>{closeModal(); alert(selectedRole==='creador'?'Cuenta creador creada! Ya puedes subir':'Cuenta cliente creada!');};
}
function openVideo(n){
 const c=document.getElementById('modal-content'); const modal=document.getElementById('modal');
 if(n.tipo==='free'){
  c.innerHTML=`<div style="text-align:center"><div style="font-size:50px">${n.emoji}</div><h3>${n.t}</h3><div style="background:#000;height:160px;border-radius:10px;margin:10px 0;display:flex;align-items:center;justify-content:center">▶️ REPRODUCIENDO GRATIS</div><button class="btn" onclick="alert('Propina enviada! $20 -> $6 para plataforma, $14 para creador')">Dejar propina $20 💖</button><p class="small">En este modelo tú cobras 30% de cada propina sin hacer nada.</p></div>`;
 } else {
  let texto = n.modelo==='free_first' ? `Cap 1 gratis, para ver el resto paga $${n.precio}` : n.modelo==='season' ? `T1 gratis, T2 en adelante $${n.precio}` : `Video de paga $${n.precio}`;
  c.innerHTML=`<div style="text-align:center"><div style="font-size:50px">${n.emoji}</div><h3>${n.t}</h3><p style="color:#aaa">${texto}</p><button class="btn" onclick="alert('Pago $${n.precio}: $${(n.precio*0.3).toFixed(2)} para ti, resto creador')">Pagar $${n.precio} y desbloquear</button></div>`;
 }
 modal.classList.remove('hidden');
}
window.publish=()=>{
 let t=document.getElementById('title').value||"Mi novela";
 let cat=document.getElementById('catSel').value;
 let modelo=document.getElementById('modelo').value;
 let precio=parseInt(document.getElementById('price').value)||parseInt(document.getElementById('priceSub').value)||29;
 let tipo = modelo==='propina' ? 'free' : 'paid';
 novelas.unshift({t,emoji:"🥝",cat,tipo,modelo,precio,time:"10:00",views:"0",author:"Tú"});
 render(); closeModal(); alert("Publicada con modelo: "+modelo);
};
function closeModal(){document.getElementById('modal').classList.add('hidden');}
window.openModal=openModal; window.closeModal=closeModal;
