const gameStorage = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Los juegos funcionan aunque no se pueda guardar. */ }
  }
};

function savedRewards() {
  try {
    const value = JSON.parse(gameStorage.get("eco-rewards") || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

const storedPoints = Number(gameStorage.get("eco-points") || 0);
const gameState = { points: Number.isFinite(storedPoints) && storedPoints >= 0 ? storedPoints : 0, rewarded: savedRewards() };
function updateProfile() {
  const levels = gameState.points >= 220 ? ["🌳", "Guardián del planeta", 100] : gameState.points >= 100 ? ["🌿", "Explorador ecológico", (gameState.points - 100) / 120 * 100] : ["🌱", "Semilla verde", gameState.points];
  document.getElementById("total-points").textContent = gameState.points; document.getElementById("level-icon").textContent = levels[0]; document.getElementById("level-name").textContent = levels[1]; document.getElementById("level-message").textContent = gameState.points >= 220 ? "¡Sigue mejorando tus récords!" : `${gameState.points < 100 ? 100 - gameState.points : 220 - gameState.points} puntos para el siguiente nivel`; document.getElementById("level-progress").style.width = `${Math.min(100, levels[2])}%`;
}


const sortItems = [
  ["🍌", "Cáscara de banano", "organico", "Puede convertirse en composta."], ["🥤", "Botella plástica limpia", "plastico", "Enjuágala, sécala y aplástala."], ["📦", "Caja de cartón limpia", "papel", "Dóblala para ahorrar espacio."], ["🍾", "Frasco de vidrio", "vidrio", "Retira la tapa y evita romperlo."], ["🔋", "Pila usada", "especial", "Llévala a un punto de recolección."], ["🍂", "Hojas secas", "organico", "Son excelentes para la composta."], ["📰", "Periódico seco", "papel", "Debe permanecer limpio y seco."], ["🧴", "Envase de champú", "plastico", "Vacía, enjuaga y seca el envase."], ["💡", "Bombilla dañada", "especial", "Necesita manejo especial; no va con vidrio."], ["🫙", "Tarro de vidrio", "vidrio", "Reutilízalo o entrégalo limpio."]
];

const memoryPairs = [["🍎", "Restos de fruta"], ["📰", "Periódico"], ["🍌", "Orgánico"], ["🧴", "Plástico"], ["📦", "Papel"], ["🫙", "Vidrio"], ["🔋", "Especial"], ["🥫", "Metal"]];
const truths = [["Las botellas y envases deben estar vacíos, limpios y secos antes de reciclarse.", true, "Los restos de comida contaminan otros materiales."], ["Una caja de pizza con mucha grasa puede ir completa al contenedor de papel.", false, "La parte grasosa no se recicla; separa únicamente el cartón limpio."], ["Reutilizar un frasco es preferible a desecharlo de inmediato.", true, "Reutilizar alarga la vida del objeto y evita residuos."], ["Las pilas usadas pueden mezclarse con la basura común.", false, "Las pilas necesitan un punto de recolección especial."], ["Aplastar las botellas plásticas secas ayuda a ahorrar espacio.", true, "Compactarlas facilita su almacenamiento y transporte."], ["Todo objeto de vidrio se recicla junto con las botellas.", false, "Espejos, bombillas y cerámica tienen composiciones diferentes."], ["Reducir el consumo debe ocurrir antes que reciclar.", true, "La mejor opción es evitar generar el residuo."], ["Una servilleta usada pertenece al contenedor de papel limpio.", false, "La humedad y los restos orgánicos impiden reciclarla como papel."]];

const $ = id => document.getElementById(id);
const shuffle = list => { const a = [...list]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
function reward(key, score) {
 const bestKey='eco-best-'+key, best=Math.max(0,Number(gameStorage.get(bestKey))||0);
 const previous=Number(gameStorage.get('eco-paid-'+key)) || (gameState.rewarded[key] ? best || score : 0);
 const earned=Math.max(0,score-previous);
 gameStorage.set(bestKey,Math.max(best,score)); gameStorage.set('eco-paid-'+key,Math.max(previous,score));
 gameState.points+=earned; gameStorage.set('eco-points',gameState.points); updateProfile();
 return {earned,best:Math.max(best,score)};
}
const templates={sort:$('sort-game').querySelector('.play-card').innerHTML,truth:$('truth-game').querySelector('.play-card').innerHTML};
function celebrate(panel){panel.classList.remove('celebrating'); void panel.offsetWidth; panel.classList.add('celebrating');}
function complete(kind,score,max,detail){
 const result=reward(kind,score), panel=$(kind+'-game').querySelector('.play-card');
 panel.innerHTML='<div class="game-complete"><span>🏆</span><h3>'+ (score>=max*.8?'¡Eres una estrella verde!':'¡Cada intento te hace mejor!')+'</h3><p>'+detail+'</p><div class="result-stars" aria-label="'+(score>=max*.8?3:score>=max*.5?2:1)+' estrellas">'+(score>=max*.8?'★ ★ ★':score>=max*.5?'★ ★ ☆':'★ ☆ ☆')+'</div><p><b>'+score+' puntos</b> · Récord: '+result.best+'<br>+'+result.earned+' EcoPuntos nuevos en tu perfil.</p><small>Mejora tu récord para ganar más EcoPuntos.</small><button class="button button-primary" data-replay="'+kind+'">Volver a jugar ↻</button></div>';
 celebrate(panel);
}
let current='sort';
const tabs=[...document.querySelectorAll('.game-tab')];
tabs.forEach((tab,i)=>{
 tab.id='tab-'+tab.dataset.game; tab.setAttribute('aria-controls',tab.dataset.game+'-game'); tab.tabIndex=i? -1:0;
 const panel=$(tab.dataset.game+'-game'); panel.setAttribute('role','tabpanel'); panel.setAttribute('aria-labelledby',tab.id);
 tab.addEventListener('click',()=>{current=tab.dataset.game; tabs.forEach(t=>{const active=t===tab;t.classList.toggle('active',active);t.setAttribute('aria-selected',active);t.tabIndex=active?0:-1;}); document.querySelectorAll('.game-panel').forEach(p=>p.hidden=p.dataset.panel!==current);});
 tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%3;if(e.key==='ArrowLeft')next=(i+2)%3;if(e.key==='Home')next=0;if(e.key==='End')next=2;if(next!==undefined){e.preventDefault();tabs[next].click();tabs[next].focus();}});
});
let sortOrder,sortIndex,sortScore,sortAnswered,sortStreak,sortHint;
function startSort(){ $('sort-game').querySelector('.play-card').innerHTML=templates.sort; sortOrder=shuffle(sortItems);sortIndex=sortScore=sortStreak=0;renderSort(); }
function renderSort(){
 sortAnswered=false;sortHint=false;const item=sortOrder[sortIndex];
 $('sort-icon').textContent=item[0];$('sort-name').textContent=item[1];$('sort-score').textContent=sortScore;
 $('sort-round').textContent='Objeto '+(sortIndex+1)+' de '+sortOrder.length;
 $('sort-progress').style.width=sortIndex/sortOrder.length*100+'%';$('sort-feedback').textContent='';$('sort-next').hidden=true;
 document.querySelectorAll('#bin-options button').forEach(b=>{b.disabled=false;b.classList.remove('correct','wrong');});
 let tools=$('sort-tools');if(!tools){tools=document.createElement('div');tools.id='sort-tools';tools.className='game-tools';$('bin-options').before(tools);}
 tools.innerHTML='<span>🔥 Racha: '+sortStreak+'</span><button type="button" id="sort-hint">💡 Pedir pista</button>';
}
function answerSort(button){
 if(sortAnswered)return;sortAnswered=true;const item=sortOrder[sortIndex],correct=button.dataset.bin===item[2];
 sortStreak=correct?sortStreak+1:0;const bonus=correct&&!sortHint?Math.min(15,(sortStreak-1)*5):0;
 if(correct)sortScore+=(sortHint?5:10)+bonus;
 $('sort-score').textContent=sortScore;document.querySelectorAll('#bin-options button').forEach(b=>{b.disabled=true;b.classList.toggle('correct',b.dataset.bin===item[2]);});if(!correct)button.classList.add('wrong');
 $('sort-feedback').textContent=(correct?'¡Bien! +'+((sortHint?5:10)+bonus)+' puntos. ':'La próxima sale mejor. ')+item[3];
 $('sort-tools').firstElementChild.textContent='🔥 Racha: '+sortStreak;$('sort-hint').disabled=true;$('sort-next').hidden=false;$('sort-next').textContent=sortIndex===sortOrder.length-1?'Ver resultados 🏆':'Siguiente objeto →';
}
let memoryFirst=null,memoryLock=false,memoryMoves=0,memoryMatches=0,memoryTimer,memoryCount=6,memoryPeek=false;
function buildMemory(){
 clearTimeout(memoryTimer);memoryFirst=null;memoryLock=false;memoryMoves=memoryMatches=0;memoryPeek=false;
 const chosen=shuffle(memoryPairs).slice(0,memoryCount),cards=shuffle(chosen.flatMap((p,id)=>[{id,text:p[0]},{id,text:p[1]}]));
 $('memory-board').innerHTML=cards.map((c,i)=>'<button class="memory-card" data-pair="'+c.id+'" aria-label="Tarjeta '+(i+1)+', oculta"><span class="card-back">♻</span><span class="card-front">'+c.text+'</span></button>').join('');
 $('memory-moves').textContent=0;$('memory-message').textContent='Encuentra '+memoryCount+' parejas. ¡Observa y recuerda!';$('memory-peek').disabled=false;
}
function flip(card){card.classList.add('flipped');card.setAttribute('aria-label',card.querySelector('.card-front').textContent);}
function hideCard(card){card.classList.remove('flipped');card.setAttribute('aria-label','Tarjeta oculta');}
function selectCard(card){
 if(memoryLock||card.disabled||card===memoryFirst)return;flip(card);if(!memoryFirst){memoryFirst=card;return;}
 memoryMoves++;$('memory-moves').textContent=memoryMoves;const first=memoryFirst;memoryFirst=null;
 if(first.dataset.pair===card.dataset.pair){[first,card].forEach(c=>{c.classList.add('matched');c.disabled=true;});memoryMatches++;$('memory-message').textContent='¡Pareja encontrada! '+memoryMatches+' de '+memoryCount;
 if(memoryMatches===memoryCount){const score=Math.max(10,memoryCount*20-(memoryMoves-memoryCount)*5-(memoryPeek?15:0)),r=reward('memory-'+memoryCount,score);$('memory-message').textContent='🏆 ¡Completado en '+memoryMoves+' movimientos! '+score+' puntos · Récord: '+r.best+' · +'+r.earned+' EcoPuntos nuevos.';celebrate($('memory-board'));$('memory-peek').disabled=true;}return;}
 memoryLock=true;$('memory-message').textContent='Observa sus posiciones y prueba otra pareja.';memoryTimer=setTimeout(()=>{hideCard(first);hideCard(card);memoryLock=false;},900);
}
let truthOrder,truthIndex,truthScore,truthAnswered,truthStreak,truthCorrect;
function startTruth(){ $('truth-game').querySelector('.play-card').innerHTML=templates.truth;truthOrder=shuffle(truths);truthIndex=truthScore=truthStreak=truthCorrect=0;renderTruth(); }
function renderTruth(){truthAnswered=false;const item=truthOrder[truthIndex];$('truth-statement').textContent=item[0];$('truth-score').textContent=truthCorrect;$('truth-round').textContent='Decisión '+(truthIndex+1)+' de '+truthOrder.length+' · 🔥 '+truthStreak;$('truth-progress').style.width=truthIndex/truthOrder.length*100+'%';$('truth-feedback').textContent='';$('truth-next').hidden=true;document.querySelectorAll('.truth-options button').forEach(b=>{b.disabled=false;b.classList.remove('correct','wrong');});}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.replay){if(b.dataset.replay==='sort')startSort();else startTruth();return;}
 if(b.closest('#bin-options')){answerSort(b);return;}
 if(b.id==='sort-hint'&&!sortAnswered){sortHint=true; b.disabled=true;$('sort-feedback').textContent='💡 '+sortOrder[sortIndex][3]+' Un acierto con pista vale 5 puntos y no añade bonificación.';return;}
 if(b.id==='sort-next'&&sortAnswered){if(++sortIndex<sortOrder.length)renderSort();else complete('sort',sortScore,220,'¡Rescataste '+sortOrder.length+' objetos!');return;}
 if(b.classList.contains('memory-card')){selectCard(b);return;}
 if(b.closest('.truth-options')&&!truthAnswered){truthAnswered=true;const item=truthOrder[truthIndex],correct=(b.dataset.value==='true')===item[1];truthStreak=correct?truthStreak+1:0;const earned=correct?10+Math.min(10,(truthStreak-1)*5):0;truthScore+=earned;if(correct)truthCorrect++;$('truth-score').textContent=truthCorrect;document.querySelectorAll('.truth-options button').forEach(o=>{o.disabled=true;o.classList.toggle('correct',(o.dataset.value==='true')===item[1]);});if(!correct)b.classList.add('wrong');$('truth-feedback').textContent=(correct?'¡Acertaste! +'+earned+' puntos. ':'Misterio resuelto: ')+item[2];$('truth-next').hidden=false;$('truth-next').textContent=truthIndex===truthOrder.length-1?'Ver resultados 🏆':'Siguiente decisión →';return;}
 if(b.id==='truth-next'&&truthAnswered){if(++truthIndex<truthOrder.length)renderTruth();else complete('truth',truthScore,145,truthCorrect+' respuestas correctas de '+truthOrder.length+'.');}
});
const controls=document.createElement('div');controls.className='game-tools';controls.innerHTML='<label for="memory-size">Tu desafío <select id="memory-size"><option value="4">Fácil · 4 parejas</option><option value="6" selected>Normal · 6 parejas</option><option value="8">Experto · 8 parejas</option></select></label><button id="memory-peek" type="button">👀 Vistazo · −15 puntos</button>';$('memory-board').before(controls);
$('memory-size').addEventListener('change',e=>{memoryCount=Number(e.target.value);buildMemory();});
$('memory-restart').addEventListener('click',buildMemory);
$('memory-peek').addEventListener('click',()=>{if(memoryLock||memoryPeek)return;memoryPeek=true;memoryLock=true;$('memory-peek').disabled=true;const cards=[...document.querySelectorAll('.memory-card:not(.matched)')];const first=memoryFirst;cards.forEach(flip);memoryTimer=setTimeout(()=>{cards.forEach(c=>{if(c!==first)hideCard(c);});memoryLock=false;},1800);});
updateProfile();startSort();buildMemory();startTruth();
