import "./modules/undavar-compendios.js";

// ============================================================
//  UNDAVAR — Sistema Foundry VTT v12
// ============================================================


const OFICIOS_UNDAVAR = [
  { id:"medico",           nombre:"Médico",              descripcion:"Se dedica a curar o prevenir las enfermedades.", facultades:"• Crear los elixires curativos.\n• Encontrar cualquier recurso medicinal sin dificultad. +3 de aciertos al iniciar.\n• Curar +2 a otros jugadores o a sí mismo sin necesidad de elixires. Cura +2 por cada rango.\n• +5 PE al iniciar.\n• +2 PD.\n• +1 Salud.", bonos:{pe:5,pd:2,salud:1} },
  { id:"cazador",          nombre:"Cazador",             descripcion:"Se encarga de cazar animales, bestias o seres de forma profesional.", facultades:"• Convertir cualquier arma común en arma especial. +1 Fuerza y +1 Velocidad al atacar.\n• Al obtener +3 de aciertos gana +1 PD y +1 PP.\n• +5 PP al iniciar.\n• +3 PD.\n• +1 Fuerza.", bonos:{pp:5,pd:3,fuerza:1} },
  { id:"domador",          nombre:"Domador",             descripcion:"Domar animales salvajes o exhibir y manejar animales domados.", facultades:"• Cántico del domador: controla cualquier bestia que escuche su voz por un corto lapso.\n• Sello del domador: permite domar bestias permanentemente.\n• +2 PD.\n• +5 PP al iniciar.\n• +2 S al iniciar.", bonos:{pp:5,pd:2,s:2} },
  { id:"alquimista",       nombre:"Alquimista",          descripcion:"Persona que se dedica a la alquimia.", facultades:"• Crear cualquier tipo de elixires exceptuando curativos. +2 de aciertos al lanzar.\n• +5 PR al iniciar.\n• +3 PD.\n• +1 S al iniciar.", bonos:{pr:5,pd:3,s:1} },
  { id:"asesino",          nombre:"Asesino",             descripcion:"Se encargan de las personas o seres que no quieres ver respirar.", facultades:"• Visión nocturna.\n• Convertir objetos filosos en especiales. +2 en velocidad, +2 en aciertos.\n• +3 PP al iniciar.", bonos:{pp:3} },
  { id:"cartografo",       nombre:"Cartógrafo",          descripcion:"Técnica de trazar los mapas.", facultades:"• Saber dónde está cada lugar conocido en el mapa. Al conseguir +5 de aciertos obtiene +3 suerte.\n• Crear nuevos mapas.\n• +7 PC al iniciar.\n• +2 S.", bonos:{pc:7,s:2} },
  { id:"astronomo",        nombre:"Astrónomo",           descripcion:"Conoce y estudia todo sobre el cielo y el universo.", facultades:"• Usar las estrellas como brújulas. Al conseguir +5 de aciertos obtiene +3 suerte cada 2 turnos.\n• Mantener una buena memoria. +1 PC al finalizar cada sección.\n• Invocar otras estrellas durante el día. +1 de aciertos asegurado.\n• +2 PE al iniciar.\n• +1 S al iniciar.", bonos:{pe:2,s:1} },
  { id:"maestro_constructor", nombre:"Maestro Constructor", descripcion:"Se encarga de construir y reparar casas y edificios.", facultades:"• +5 en PR facilitando obtención de materiales. Cada 4 turnos.\n• Crear refugios en cualquier lugar (niveles 1 al 6).\n• +4 Fuerza.\n• +3 PD al iniciar.", bonos:{pr:5,pd:3,fuerza:4} },
  { id:"artesano_guerra",  nombre:"Artesano de Guerra",  descripcion:"Obtiene materiales minerales y de bestias, crea armas y armaduras únicas.", facultades:"• Encontrar materiales en cualquier lugar. +2 de aciertos asegurado.\n• Crear armas y armaduras.\n• +2 Fuerza.\n• +1 S al iniciar.\n• +2 PD al iniciar.", bonos:{fuerza:2,s:1,pd:2} },
  { id:"herrero",          nombre:"Herrero",             descripcion:"Oficio de fabricar o trabajar objetos de hierro.", facultades:"• Crear objetos de hierro con encanto especial.\n• Crear objetos de hierro resistentes a cualquier factor.\n• +5 Fuerza total.\n• +3 PC al iniciar o aprender.", bonos:{fuerza:5,pc:3} },
  { id:"ebanista",         nombre:"Ebanista",            descripcion:"Oficio de trabajar con maderas finas y construir muebles de calidad.", facultades:"• Diseñar objetos de madera con cualquier tipo de encanto especial.\n• Encontrar maderas de calidad. +3 de aciertos asegurado.\n• +3 PD al iniciar.", bonos:{pd:3} },
  { id:"peleteria",        nombre:"Peletería",           descripcion:"Confeccionamiento de prendas y objetos de piel de calidad.", facultades:"• Crear prendas y objetos encantados.\n• Crear prendas resistentes a algún elemento.\n• Confeccionar objetos resistentes al tiempo, ataques de segundo nivel y fuego.\n• +5 PD al iniciar.\n• +3 S al iniciar.", bonos:{pd:5,s:3} },
  { id:"esclavista",       nombre:"Esclavista",          descripcion:"Comercia los esclavos de manera legal (prohibido comerciar humanos).", facultades:"• Marca de control: obliga al esclavo a obedecer.\n• Azote de esclavista: controla cualquier ser y animal al tocarlo o azotarlo.\n• +5 Fuerza.\n• +3 PP al iniciar.\n• +1 S al iniciar.", bonos:{fuerza:5,pp:3,s:1} },
  { id:"sastre",           nombre:"Sastre",              descripcion:"Se encargan de diseñar y arreglar todo lo que tenga que ver con telas.", facultades:"• Diseñar y crear ropas casi tan resistentes como las armaduras.\n• +7 PD al iniciar o aprender.\n• +3 Velocidad.", bonos:{pd:7,velocidad:3} },
  { id:"cocinero",         nombre:"Cocinero",            descripcion:"Los mejores platos ayudan a recuperar la vitalidad.", facultades:"• +2 en puntos de conveniencia en conflictos pasivos.\n• +5 de recuperación del hambre.\n• Distinguir si un alimento es bueno o malo.\n• Resistencia al veneno.\n• +1 Salud.", bonos:{salud:1} },
  { id:"pescador",         nombre:"Pescador",            descripcion:"Se encarga de la pesca.", facultades:"• Pesca rápida.\n• +2 de recuperación del hambre.\n• +5 S al iniciar o aprender.", bonos:{s:5} },
  { id:"vendedor",         nombre:"Vendedor",            descripcion:"Se encarga de todo tipo de ventas: casas, objetos, elixires, ropas, armaduras.", facultades:"• Permiso de venta: comerciar en cualquier lugar sin ser arrestado.\n• Convencimiento: puede forzar un conflicto para que compren algo de su arsenal.\n• +6 S al iniciar o aprender.", bonos:{s:6} },
  { id:"granjero",         nombre:"Granjero",            descripcion:"Se encargan de la producción de la comida del reino.", facultades:"• Conseguir cualquier tipo de recurso alimenticio.\n• Distinguir entre cualquier planta, fruta, vegetal o carne.\n• +2 S en conflictos pasivos.\n• +1 Salud.", bonos:{s:2,salud:1} }
];

// ============================================================
Hooks.once("init", () => {
  console.log("UNDAVAR | Iniciando...");
  CONFIG.Combat.initiative.formula = "4d6";
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("undavar", UndavarPersonajeSheet, { types:["personaje"], makeDefault:true, label:"Ficha de Personaje" });
  Actors.registerSheet("undavar", UndavarTiendaSheet, { types:["tienda"], label:"Tienda de Undavar" });
  Actors.registerSheet("undavar", UndavarNPCSheet,       { types:["npc"],        makeDefault:true, label:"Ficha NPC" });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("undavar", UndavarItemSheet, { makeDefault:true, label:"Objeto UNDAVAR" });
  CONFIG.Actor.documentClass = UndavarActor;
});

// ============================================================
//  HELPERS
// ============================================================
function calcularRango(pv) {
  pv = Number(pv)||0;
  if(pv>=564)return"Lairazul";
  if(pv>=440)return"Leyenda";
  if(pv>=329)return"Lait Betsu";
  if(pv>=231)return"Wonrixay";
  if(pv>=146)return"Sedrein";
  if(pv>=74) return"Breintin";
  if(pv>=15) return"Astrei";
  return"Sin rango";
}
function calcularPAMax(pv) {
  pv = Number(pv)||0;
  let bonus = 0;
  for (const umbral of [15,74,146,231,329,440,564]) { if(pv>=umbral) bonus+=2; }
  return 2 + bonus;
}
function costoSuerte(pv) {
  const r = calcularRango(pv);
  return {Astrei:3,Breintin:6,Sedrein:9,Wonrixay:12,"Lait Betsu":15,Leyenda:18,Lairazul:21}[r] ?? 3;
}
function costoPCAccion(pv) {
  const r = calcularRango(pv);
  return {Astrei:15,Breintin:20,Sedrein:25,Wonrixay:30,"Lait Betsu":35,Leyenda:40,Lairazul:45}[r] ?? 15;
}
function costoPANivel(n)  { return ({0:2,1:4,2:6,3:8,4:10})[Number(n)] ?? 0; }
function costoPVNivel(n)  { return ({0:0,1:15,2:30,3:45,4:75})[Number(n)] ?? 15; }
function bonusCombate(n)  { return ({0:0,1:0,2:1,3:2,4:3})[Number(n)] ?? 0; }

// Conversor de Erianas (Lógica de UNDAVAR)
function calcularCambioErianas(cantidad, desde, hacia) {
  const tasas = {
    "oro": 1,
    "rubi": 100,      // 1 Rubí = 100 Oro
    "diamante": 10000 // 1 Diamante = 100 Rubíes = 10,000 Oro
  };
  const totalEnOro = cantidad * tasas[desde];
  return totalEnOro / tasas[hacia];
}

// Convierte "system.datos.nombre" + valor en { "system.datos.nombre": valor }
// para pasarlo directamente a actor.update() en dot-notation
function parseInputValue(input) {
  const name = input.name;
  let value;
  if (input.type === "checkbox") {
    value = input.checked;
  } else if (input.type === "number") {
    value = input.value === "" ? null : Number(input.value);
  } else {
    value = input.value;
  }
  return { [name]: value };
}


// ============================================================
//  TIRADAS
// ============================================================
async function tiradaEstandar(actor, label="Tirada") {
  const roll = new Roll("4d6");
  await roll.evaluate();
  
  // 🎲 MAGIA 3D
  if (game.dice3d) await game.dice3d.showForRoll(roll, game.user, true);

  const ds  = roll.dice[0].results.map(r => r.result);
  const ac  = ds.filter(d => [1,3,5].includes(d)).length;
  const pe  = ds.filter(d => [2,4,6].includes(d)).length;
  const pv  = ds.filter(d => [1,3,5].includes(d)).reduce((a,b) => a+b, 0);
  const suma = ds.reduce((a,b) => a+b, 0);
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    content: `<div class="undavar-roll"><h3>${label}</h3>
      <div class="dados-resultado">${ds.map(d=>`<span class="dado ${[1,3,5].includes(d)?'acierto':'perdida'}">${d}</span>`).join("")}</div>
      <table class="roll-tabla">
        <tr><td><b>Aciertos</b></td><td>${ac}</td></tr>
        <tr><td><b>Pérdidas</b></td><td>${pe}</td></tr>
        <tr><td><b>PV ganados</b></td><td>${pv}</td></tr>
        <tr><td><b>Suerte</b></td><td>${suma>12?"✨ Buena":"💀 Mala"}</td></tr>
      </table></div>`
  });
}

async function tiradaAtaque(actor, label="Ataque") {
  const roll = new Roll("2d6");
  await roll.evaluate();

  // 🎲 MAGIA 3D
  if (game.dice3d) await game.dice3d.showForRoll(roll, game.user, true);

  const ds   = roll.dice[0].results.map(r => r.result);
  const dano = ds.filter(d => [2,4,6].includes(d)).length;
  const pv   = ds.filter(d => [1,3,5].includes(d)).reduce((a,b)=>a+b,0);
  const suma = ds.reduce((a,b)=>a+b,0);
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    content: `<div class="undavar-roll"><h3>${label}</h3>
      <div class="dados-resultado">${ds.map(d=>`<span class="dado ${[1,3,5].includes(d)?'acierto':'perdida'}">${d}</span>`).join("")}</div>
      <table class="roll-tabla">
        <tr><td><b>Daño</b></td><td>${dano}</td></tr>
        <tr><td><b>PV ganados</b></td><td>${pv}</td></tr>
        <tr><td><b>Suerte</b></td><td>${suma>12?"✨ Buena":"💀 Mala"}</td></tr>
      </table></div>`
  });
}

async function tiradaDanoNivel(actor, nivel, atr=0, label="Daño") {
  nivel = (nivel !== undefined && nivel !== null && nivel !== "") ? Number(nivel) : 0;
  atr   = Number(atr) || 0;

  // 1. Determinamos cuántos dados lanzar y el bono fijo de daño extra
  let numDados = 2;
  let bonoFijo = 0;

  if (nivel === 0) { numDados = 2; bonoFijo = 0; }
  else if (nivel === 1) { numDados = 2; bonoFijo = 2; }
  else if (nivel === 2) { numDados = 2; bonoFijo = 3; }
  else if (nivel === 3) { numDados = 3; bonoFijo = Math.floor(atr/3); }
  else { numDados = 4; bonoFijo = Math.floor(atr/2); } // Nivel 4 en adelante

  // Lanzamos solo la cantidad de dados, sin sumar nada aún
  const roll = new Roll(`${numDados}d6`);
  await roll.evaluate();
  
  // 🎲 MAGIA 3D (Ahora solo se ejecutará una vez)
  if (game.dice3d) await game.dice3d.showForRoll(roll, game.user, true);

  // 2. LÓGICA UNDAVAR (Solo pares hacen daño)
  const ds = roll.dice[0].results.map(r => r.result);
  let danoPorDados = 0;
  let dadosHtml = "";

  for (let d of ds) {
    if ([2, 4, 6].includes(d)) {
      danoPorDados += 1; // Pares hacen 1 de daño
      dadosHtml += `<span class="dado perdida">${d}</span>`; // Color rojo para el daño
    } else {
      // Impares no hacen daño
      dadosHtml += `<span class="dado acierto">${d}</span>`; // Color verde
    }
  }

// --- NUEVA LÓGICA PV Y SUERTE ---
  const pv = ds.filter(d => [1,3,5].includes(d)).reduce((a,b) => a+b, 0);
  const sumaTotal = ds.reduce((a,b) => a+b, 0);
  const danoTotal = danoPorDados + bonoFijo;
  let desgloseBono = bonoFijo > 0 ? `<tr><td><b>Bono (Nv/Atr)</b></td><td>+${bonoFijo}</td></tr>` : "";

  const chatHtml = `
    <div class="undavar-roll">
      <h3>${label} (Nv.${nivel})</h3>
      <div class="dados-resultado" style="justify-content:center;">${dadosHtml}</div>
      <table class="roll-tabla">
        <tr><td><b>Daño de dados (Pares)</b></td><td>${danoPorDados}</td></tr>
        ${desgloseBono}
        <tr><td><b>DAÑO TOTAL</b></td><td><b style="color:var(--undavar-rojo);">${danoTotal}</b></td></tr>
        <tr><td><b>PV ganados</b></td><td>${pv}</td></tr>
        <tr><td><b>Suerte</b></td><td>${sumaTotal > 12 ? "✨ Buena" : "💀 Mala"}</td></tr>
      </table>
    </div>`;

  // Al no enviarle el "rolls: [roll]" a Foundry, no se duplica la animación 3D
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    content: chatHtml
  });
}

async function tiradaRebote(actor) {
  const roll = new Roll("4d6");
  await roll.evaluate();
    // 🎲 MAGIA 3D
  if (game.dice3d) await game.dice3d.showForRoll(roll, game.user, true);

  const ds = roll.dice[0].results.map(r => r.result);
  const s = roll.total;
  const pv = ds.filter(d => [1,3,5].includes(d)).reduce((a,b) => a+b, 0);

  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    content: `<div class="undavar-roll"><h3>Rebote</h3>
      <div class="dados-resultado" style="justify-content:center;">
        ${ds.map(d=>`<span class="dado ${[1,3,5].includes(d)?'acierto':'perdida'}">${d}</span>`).join("")}
      </div>
      <p style="text-align:center;">Suma: <b>${s}</b> → ${s===3?"⚡ +1 Cansancio":s>3?"🔥 +1 Fatiga":"✅ Sin rebote"}</p>
      <table class="roll-tabla">
        <tr><td><b>PV ganados</b></td><td>${pv}</td></tr>
        <tr><td><b>Suerte</b></td><td>${s > 12 ? "✨ Buena" : "💀 Mala"}</td></tr>
      </table></div>`
  });
}

async function tiradaDespertar(actor) {
  const roll = new Roll("4d6");
  await roll.evaluate();
    // 🎲 MAGIA 3D
  if (game.dice3d) await game.dice3d.showForRoll(roll, game.user, true);

  const ds = roll.dice[0].results.map(r => r.result);
  const ac = ds.filter(d => [1,3,5].includes(d)).length;
  const pv = ds.filter(d => [1,3,5].includes(d)).reduce((a,b) => a+b, 0);
  const sumaTotal = ds.reduce((a,b) => a+b, 0);

  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    content: `<div class="undavar-roll"><h3>Despertar</h3>
      <div class="dados-resultado">${ds.map(d=>`<span class="dado ${[1,3,5].includes(d)?'acierto':'perdida'}">${d}</span>`).join("")}</div>
      <p style="text-align:center;">Aciertos: <b>${ac}</b>/4 — ${ac>=4?"✅ ¡Despierta!":"❌ No despierta."}</p>
      <table class="roll-tabla">
        <tr><td><b>PV ganados</b></td><td>${pv}</td></tr>
        <tr><td><b>Suerte</b></td><td>${sumaTotal > 12 ? "✨ Buena" : "💀 Mala"}</td></tr>
      </table></div>`
  });
}

// ============================================================
//  CLASE ACTOR CUSTOM (El Alma del Sistema)
// ============================================================
class UndavarActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();
    
    const sys = this.system;
    if (this.type === "personaje") {
      
      // 1. Estados
      const hambre = Number(sys.extensionEstado?.hambre?.value) || 0;
      const sed = Number(sys.extensionEstado?.sed?.value) || 0;
      const cansancio = Number(sys.extensionEstado?.cansancio?.value) || 0;
      const fatiga = Number(sys.extensionEstado?.fatiga?.value) || 0;
      
      const totalEstados = hambre + sed + cansancio + fatiga;
      const bonusHeridas = Math.floor(totalEstados / 2);
      
      // 2. ¡NUEVO! Límite estricto de 8 Heridas
      let heridasBase = Number(sys.estado?.ptHerida?.value) || 0;
      if (heridasBase > 8) {
        heridasBase = 8;
        sys.estado.ptHerida.value = 8; // Si escriben 9 o más, lo baja a 8
      }
      
      let heridasTotales = heridasBase + bonusHeridas;
      if (heridasTotales > 8) {
        heridasTotales = 8; // El total jamás superará 8, aunque tengas muchos estados
      }
      
      // 3. Escaneamos los oficios para sumar la Salud extra
      let bonoSalud = 0;
      for (let item of this.items) {
        if (item.type === "oficio") {
          bonoSalud += Number(item.system.bonos?.salud) || 0;
        }
      }
      
      // La salud base es 8 + los bonos de tus oficios
      const saludBaseTotal = 8 + bonoSalud;
      
      // 4. Lógica de Salud (Control de límites)
      const penalizacionSalud = Math.floor(heridasTotales / 4);
      
      // El límite real es: 8 + bonos de oficios - penalización por heridas
      const limiteReal = (8 + bonoSalud) - penalizacionSalud;
      
      // Si intentas escribir un número más alto que tu límite real, 
      // el sistema te lo baja automáticamente.
      if (Number(sys.estado.ptSalud.value) > limiteReal) {
        sys.estado.ptSalud.value = limiteReal;
      }
      
      // IMPORTANTE: Forzamos el .max a 8 para que la ficha siempre entienda que el tope es 8
      sys.estado.ptSalud.max = 8; 
      
      // Guardamos estos datos para que el HTML sepa qué numeritos poner en los avisos
      this.calc = this.calc || {};
      this.calc.bonusHeridas = bonusHeridas;
      this.calc.saludPorHeridas = penalizacionSalud;
      this.calc.heridasTotales = heridasTotales;
    }
//Limita los atributos a nueve solo para personajes
    if (this.type === "personaje" && sys.atributos) {
      for (let [key, val] of Object.entries(sys.atributos)) {
        if (Number(val) > 9) {
          sys.atributos[key] = 9;
        }
      }
}

  }
  
}

// ============================================================
//  HOJA PERSONAJE
// ============================================================
class UndavarPersonajeSheet extends ActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes:  ["undavar","sheet","personaje"],
      template: "systems/undavar/templates/actor/personaje-sheet.hbs",
      width: 820, height: 740,
      tabs: [{ navSelector:".sheet-tabs", contentSelector:".sheet-body", initial:"datos" }],
      resizable: true,
      // Guardado estándar de Foundry: cada cambio envía el formulario,
      // pero la hoja no se cierra al guardar.
      closeOnSubmit: false,
    });
  }

  getData() {
    const ctx  = super.getData();
    const s    = this.actor.system;
    const pvVal = Number(s?.pv?.value ?? 0);
    ctx.calc = {
      rango:        calcularRango(pvVal),
      paMaximo:     calcularPAMax(pvVal),
      costoSuerte:  costoSuerte(pvVal),
      costoPCAccion: costoPCAccion(pvVal),
      // Añadimos las variables calculadas por el alma del sistema
      bonusHeridas: this.actor.calc?.bonusHeridas || 0,
      saludPorHeridas: this.actor.calc?.saludPorHeridas || 0,
      heridasTotales: this.actor.calc?.heridasTotales || 0
    };
    const enrichItem = i => ({
      id: i.id, img: i.img, name: i.name, type: i.type,
      system: Object.assign(foundry.utils.duplicate(i.system), {
        costo_pa_real: costoPANivel(i.system.nivel ?? 0)
      })
    });
    ctx.artes    = this.actor.items.filter(i => i.type==="arte").map(enrichItem);
    ctx.armas    = this.actor.items.filter(i => i.type==="arma").map(enrichItem);
    ctx.objetos  = this.actor.items.filter(i => i.type==="objeto");
    ctx.elixires = this.actor.items.filter(i => i.type==="elixir");
    ctx.oficios  = this.actor.items.filter(i => i.type==="oficio");
    ctx.equipos  = this.actor.items.filter(i => i.type==="equipo");
    const usados = ctx.oficios.map(o => o.system.oficioId).filter(Boolean);
    ctx.catalogoOficios = OFICIOS_UNDAVAR.filter(o => !usados.includes(o.id));
    return ctx;
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;

    const root = html instanceof HTMLElement ? html : html[0];
    if (!root) return;

    // ── GUARDADO EN TIEMPO REAL POR CAMPO ───────────────────────────────────
    // Cualquier input/select/textarea con name guarda directamente en el actor.
    root.querySelectorAll("input[name], select[name], textarea[name]").forEach(el => {
      el.addEventListener("change", async ev => {
        const input = ev.currentTarget;
        const name  = input.name;
        if (!name) return;

        // Nombre del actor (cabecera)
        if (name === "actor-name") {
          const val = input.value.trim();
          if (val) await this.actor.update({ name: val });
          return;
        }

        // Cualquier campo system.* usa dot-notation
        if (name.startsWith("system.")) {
          await this.actor.update(parseInputValue(input));
        }
      });
    });

    // ── TIRADAS ─────────────────────────────────────────────────────────────
    root.querySelectorAll(".roll-estandar").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        tiradaEstandar(this.actor, ev.currentTarget.dataset.label || "Tirada");
      });
    });
    root.querySelectorAll(".roll-ataque").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        tiradaAtaque(this.actor, ev.currentTarget.dataset.label || "Ataque");
      });
    });
    root.querySelectorAll(".roll-rebote").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        tiradaRebote(this.actor);
      });
    });
    root.querySelectorAll(".roll-despertar").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        tiradaDespertar(this.actor);
      });
    });
    root.querySelectorAll(".roll-erianas").forEach(btn => {
      btn.addEventListener("click", async ev => {
        ev.preventDefault();
        const roll = new Roll("4d6");
        await roll.evaluate();
        
        // 🎲 MAGIA 3D ERIANAS
        if (game.dice3d) await game.dice3d.showForRoll(roll, game.user, true);

        const total = roll.total * 10;
        ChatMessage.create({
          speaker: ChatMessage.getSpeaker({actor:this.actor}),
          content: `<div class="undavar-roll"><h3>Erianas Iniciales</h3><p>${roll.total} × 10 = <b>${total} Oro</b></p></div>`
        });
        await this.actor.update({ "system.erianas.oro": total });
      });
    });

    // Calculadora

   const sheet = this.element;

  sheet.on("click", ".btn-abrir-calc", ev => {
    ev.preventDefault();
    console.log("CALC CLICK OK");
    this._abrirCalculadora();
  });



    // ── OFICIOS ──────────────────────────────────────────────────────────────
    const oficioSelect  = root.querySelector("#oficio-selector");
    const oficioPreview = root.querySelector("#oficio-preview");
    if (oficioSelect) {
      oficioSelect.addEventListener("change", ev => {
        const id = ev.currentTarget.value;
        const d  = OFICIOS_UNDAVAR.find(o => o.id === id);
        if (!oficioPreview) return;
        if (!d) {
          oficioPreview.style.display = "none";
          return;
        }
        const nombreEl      = oficioPreview.querySelector(".oficio-info-nombre");
        const descEl        = oficioPreview.querySelector(".oficio-info-desc");
        const facultadesEl  = oficioPreview.querySelector(".oficio-info-facultades");
        if (nombreEl)     nombreEl.textContent     = d.nombre;
        if (descEl)       descEl.textContent       = d.descripcion;
        if (facultadesEl) facultadesEl.textContent = d.facultades;
        oficioPreview.style.display = "";
      });
    }

    const btnAgregarOficio = root.querySelector("#btn-agregar-oficio");
    if (btnAgregarOficio && oficioSelect) {
      btnAgregarOficio.addEventListener("click", async ev => {
        ev.preventDefault();
        const id = oficioSelect.value;
        if (!id) { ui.notifications.warn("Selecciona un oficio primero."); return; }
        const d = OFICIOS_UNDAVAR.find(o => o.id === id);
        if (!d) return;
        await Item.create({
          name: d.nombre, type: "oficio",
          system: {
            oficioId: d.id, descripcion: d.descripcion, facultades: d.facultades,
            puntos: 0, maximo: 7, logro: false, pol_requeridos: 5,
            bonos: {
              pe: d.bonos.pe??0, pp: d.bonos.pp??0, pd: d.bonos.pd??0,
              pc: d.bonos.pc??0, pr: d.bonos.pr??0, s:  d.bonos.s??0,
              fuerza: d.bonos.fuerza??0, velocidad: d.bonos.velocidad??0,
              agilidad: d.bonos.agilidad??0, inteligencia: d.bonos.inteligencia??0,
              salud: d.bonos.salud??0
            }
          }
        }, { parent: this.actor });
        oficioSelect.value = "";
        if (oficioPreview) oficioPreview.style.display = "none";
      });
    }

    // Puntos de oficio inline
    root.querySelectorAll(".oficio-pts-input").forEach(input => {
      input.addEventListener("change", async ev => {
        const itemId = ev.currentTarget.dataset.itemId;
        const val    = Math.max(0, Math.min(7, parseInt(ev.currentTarget.value)||0));
        const item   = this.actor.items.get(itemId);
        if (item) await item.update({ "system.puntos": val });
      });
    });

    // ── ITEMS ────────────────────────────────────────────────────────────────
    root.querySelectorAll(".item-crear").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        const tipo = ev.currentTarget.dataset.tipo || "objeto";
        if (tipo === "oficio") return;
        Item.create({ name:"Nuevo "+tipo, type:tipo }, { parent:this.actor });
      });
    });

    root.querySelectorAll(".item-editar").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        const id = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
        if (id) this.actor.items.get(id)?.sheet.render(true);
      });
    });

    root.querySelectorAll(".item-eliminar").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        const id   = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
        const item = id ? this.actor.items.get(id) : null;
        if (!item) return;
        Dialog.confirm({
          title: "Eliminar",
          content: `<p>¿Eliminar <b>${item.name}</b>?</p>`,
          yes: () => item.delete()
        });
      });
    });

    root.querySelectorAll(".item-usar").forEach(btn => {
      btn.addEventListener("click", async ev => {
        ev.preventDefault();
        const id   = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
        const item = id ? this.actor.items.get(id) : null;
        if (!item) return;
        const nivel  = Number(item.system.nivel ?? 1);
        const costPA = costoPANivel(nivel);
        const paAct  = Number(this.actor.system.pa?.value ?? 0);
        if (paAct < costPA) {
          ui.notifications.warn(`PA insuficientes (necesitas ${costPA}, tienes ${paAct}).`);
          return;
        }
        const atr = item.type==="arte"
          ? Number(this.actor.system.atributos?.inteligencia ?? 0)
          : Number(this.actor.system.atributos?.fuerza ?? 0);
        const cans = Number(this.actor.system.extensionEstado?.cansancio?.value ?? 0);
        await this.actor.update({
          "system.pa.value": paAct - costPA,
          "system.extensionEstado.cansancio.value": Math.min(cans+1, 9)
        });

        tiradaDanoNivel(this.actor, nivel, atr, item.name);
        ui.notifications.info(`${item.name} — −${costPA} PA · +1 Cansancio`);
      });
    });

    // Listener para subir atributos
    html.find('.btn-up-atr').click(ev => {
    const btn = ev.currentTarget;
    const atr = btn.dataset.atr;
    const moneda = btn.dataset.pago;
    const actual = Number(this.actor.system.atributos[atr]);

    if (actual >= 9) return ui.notifications.warn("Este atributo ya está al máximo (9).");

    new Dialog({
      title: `Mejorar ${atr.toUpperCase()}`,
      content: `
        <p style="text-align:center">Actualmente tienes <b>${actual}</b> en ${atr}.</p>
        <div style="margin-bottom: 10px;">
          <label>¿Cuántos puntos quieres subir? (Límite 9):</label>
          <input type="number" id="cant-subir" value="1" min="1" max="${9 - actual}">
        </div>
        <p><small>* Cada punto cuesta 4 ${moneda.toUpperCase()}.</small></p>
      `,
      buttons: {
       confirmar: {
          label: "Comprar",
          callback: (html) => {
            const cantidad = parseInt(html.find('#cant-subir').val());
           if (cantidad > 0) this._procesarMejoraMultiple(atr, moneda, cantidad);
          }
        },
        cancelar: { label: "Cancelar" }
      }
    }).render(true);
});  

console.log("Botón calc:", html.find(".btn-abrir-calc").length);
console.log("calc test:", this.element[0].querySelector(".btn-abrir-calc"));

}

 async _procesarMejoraMultiple(atr, moneda, cantidad) {
  const actual = Number(this.actor.system.atributos[atr]) || 0;
  const costoTotal = cantidad * 4;
  const saldo = Number(this.actor.system.pdc[moneda]) || 0;

  // 1. Verificamos saldo
  if (saldo < costoTotal) {
    return ui.notifications.warn(`No tienes suficientes ${moneda.toUpperCase()}. Necesitas ${costoTotal}.`);
  }

  // 2. Verificamos límite de 9
  if (actual + cantidad > 9) {
    return ui.notifications.warn("No puedes superar el nivel 9 en los atributos.");
  }

  // 3. Aplicamos el cambio
  await this.actor.update({
    [`system.pdc.${moneda}`]: saldo - costoTotal,
    [`system.atributos.${atr}`]: actual + cantidad
  });

  ui.notifications.info(`¡${atr.toUpperCase()} subió +${cantidad}! Gastaste ${costoTotal} ${moneda.toUpperCase()}.`);
}

_abrirCalculadora() {
  new Dialog({
    title: "Calculadora de Cambio - UNDAVAR",
    content: `
      <div style="text-align:center; padding:15px; background: rgba(0,0,0,0.05);">
        <p style="font-weight:bold; margin-bottom:15px;">Conversor de Erianas</p>
        <input type="number" id="c-monto" placeholder="Cantidad..." style="width:100%; margin-bottom:10px; text-align:center;">
        <div style="display:flex; gap:10px; align-items:center; justify-content:center;">
          <select id="c-desde">
            <option value="oro">Oro</option>
            <option value="rubi">Rubí</option>
            <option value="diamante">Diamante</option>
          </select>
          <span>→</span>
          <select id="c-hacia">
            <option value="rubi">Rubí</option>
            <option value="oro">Oro</option>
            <option value="diamante">Diamante</option>
          </select>
        </div>
        <div id="c-resultado" style="margin-top:20px; font-size:1.8em; color:#8b2e2e; font-weight:bold;">0.00</div>
        <p style="font-size:0.8em; margin-top:10px; opacity:0.7;">1 Rubí = 100 Oro | 1 Diamante = 100 Rubíes</p>
      </div>
    `,
    buttons: { cerrar: { label: "Cerrar" } },
    render: (html) => {
      const tasas = { oro: 1, rubi: 100, diamante: 10000 };
      const monto  = html.find("#c-monto")[0];
      const desde  = html.find("#c-desde")[0];
      const hacia  = html.find("#c-hacia")[0];
      const result = html.find("#c-resultado")[0];

      const update = () => {
        const v = parseFloat(monto.value) || 0;
        const final = (v * tasas[desde.value]) / tasas[hacia.value];
        result.innerText = final.toLocaleString() + " " + hacia.value.toUpperCase();
      };

      monto.addEventListener("input", update);
      desde.addEventListener("change", update);
      hacia.addEventListener("change", update);
    }
  }).render(true);
}

// ============================================================
  // INTERCEPTAR OBJETOS AL SOLTAR EN EL PERSONAJE (AGRUPACIÓN)
  // ============================================================
  async _onDropItemCreate(itemData) {
    let itemsDataArray = itemData instanceof Array ? itemData : [itemData];
    let itemsParaCrear = [];
    let itemsParaActualizar = [];

    for ( let iData of itemsDataArray ) {
      // Buscamos si el personaje ya tiene el objeto
      let existente = this.actor.items.find(i => i.name === iData.name && i.type === iData.type);

      if ( existente ) {
        // Si existe, preparamos la suma
        let cantActual = Number(existente.system.cantidad) || 1;
        let cantNueva = Number(iData.system?.cantidad) || 1;
        
        itemsParaActualizar.push({
          _id: existente.id,
          "system.cantidad": cantActual + cantNueva
        });
      } else {
        // Si no existe, lo preparamos para crearlo nuevo
        if (!iData.system) iData.system = {};
        if (iData.system.cantidad === undefined) iData.system.cantidad = 1;
        
        itemsParaCrear.push(iData);
      }
    }

    // Ejecutamos la suma para los que ya existían
    if ( itemsParaActualizar.length > 0 ) {
      await this.actor.updateEmbeddedDocuments("Item", itemsParaActualizar);
      ui.notifications.info("Se han sumado objetos al inventario.");
    }
    
    // Ejecutamos la creación de los nuevos
    if ( itemsParaCrear.length > 0 ) {
      return super._onDropItemCreate(itemsParaCrear);
    }
  }

}





// ============================================================
//  HOJA NPC
// ============================================================
class UndavarNPCSheet extends ActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes:  ["undavar","sheet","npc"],
      template: "systems/undavar/templates/actor/npc-sheet.hbs",
      width: 600, height: 520,
      resizable: true,
      closeOnSubmit: false,
    });
  }

  getData() {
    const ctx  = super.getData();
    ctx.artes  = this.actor.items.filter(i => ["arte","arma"].includes(i.type));
    return ctx;
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;

    const root = html instanceof HTMLElement ? html : html[0];
    if (!root) return;

    root.querySelectorAll(".roll-estandar").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        tiradaEstandar(this.actor, "NPC");
      });
    });
    root.querySelectorAll(".roll-ataque").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        tiradaAtaque(this.actor, "Ataque NPC");
      });
    });
    root.querySelectorAll(".item-crear").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        Item.create({ name:"Nueva habilidad", type:ev.currentTarget.dataset.tipo||"arte" }, { parent:this.actor });
      });
    });
    root.querySelectorAll(".item-editar").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        const id = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
        if (id) this.actor.items.get(id)?.sheet.render(true);
      });
    });
    root.querySelectorAll(".item-eliminar").forEach(btn => {
      btn.addEventListener("click", ev => {
        ev.preventDefault();
        const id   = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
        const item = id ? this.actor.items.get(id) : null;
        if (item) Dialog.confirm({
          title:"Eliminar",
          content:`<p>¿Eliminar <b>${item.name}</b>?</p>`,
          yes: () => item.delete()
        });
      });
    });

  }
}

// ============================================================
//  HOJA ÍTEM
// ============================================================
class UndavarItemSheet extends ItemSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes:  ["undavar","sheet","item"],
      template: "systems/undavar/templates/item/item-sheet.hbs",
      width: 520, height: 460,
      resizable: true,
      closeOnSubmit: false,
    });
  }

  getData() {
    const ctx   = super.getData();
    ctx.niveles = [0, 1, 2, 3, 4];
    ctx.slots   = { cabeza:"Cabeza", superior:"Superior", collares:"Collares",
                    accesorios:"Accesorios", inferior:"Inferior", pies:"Pies" };
    const n     = Number(this.item.system.nivel ?? 0);
    ctx.calc    = {
      costoPANivel: costoPANivel(n),
      costoPVNivel: costoPVNivel(n),
      bonusNivel:   bonusCombate(n)
    };
    if (this.item.type === "oficio") {
      const def = OFICIOS_UNDAVAR.find(o => o.id === this.item.system.oficioId);
      ctx.oficioDescripcion = this.item.system.descripcion || def?.descripcion || "";
      ctx.oficioFacultades  = this.item.system.facultades  || def?.facultades  || "";
    }
    return ctx;
  }

  activateListeners(html) {
    super.activateListeners(html);
    
    new Tabs(html.find(".tabs"), {
    initial: "objetos"
  });
    if (!this.isEditable) return;
  

    const root = html instanceof HTMLElement ? html : html[0];

      root.querySelectorAll(".btn-comprar").forEach(btn => {
    btn.addEventListener("click", ev => this._comprar(ev));
  });

    if (!root) return;

    
    // Solo listeners personalizados adicionales; el guardado de datos
    // se maneja con el flujo estándar de Foundry (_updateObject).
  }

  
}



// ============================================================
//  HOJA DE TIENDA (SISTEMA DE COMERCIO UNDAVAR)
// ============================================================
class UndavarTiendaSheet extends ActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["undavar", "sheet", "tienda"],
      template: "systems/undavar/templates/actor/tienda-sheet.hbs",
      width: 620,
      height: 650,
      resizable: true,
      // 1. Activa las pestañas para que el contenido deje de ser invisible
      tabs: [{ navSelector: ".tienda-tabs", contentSelector: ".sheet-body", initial: "objetos" }],
      //2. IMPORTANTE: dropSelector en null permite soltar en toda la ficha
      dragDrop: [{ dragSelector: ".tienda-item", dropSelector: null }]
    });
  }

  // ============================================================
  // DATOS DE LA HOJA
  // ============================================================
  getData() {
    const ctx = super.getData();

    const items = this.actor.items;

    ctx.objetos = items.filter(i => i.type === "objeto");
    ctx.armas = items.filter(i => i.type === "arma");
    ctx.elixires = items.filter(i => i.type === "elixir");
    ctx.equipo = items.filter(i => i.type === "equipo");

    return ctx;
  }

  // ============================================================
  // INTERCEPTAR OBJETOS AL SOLTAR (AGRUPACIÓN)
  // ============================================================
  async _onDropItemCreate(itemData) {
    // Foundry a veces envía un solo objeto y a veces un array, nos aseguramos de que sea un array
    let itemsDataArray = itemData instanceof Array ? itemData : [itemData];
    let itemsParaCrear = [];
    let itemsParaActualizar = [];

    for ( let iData of itemsDataArray ) {
      // 1. Buscamos si ya existe un objeto en la tienda con el MISMO NOMBRE y MISMO TIPO
      let existente = this.actor.items.find(i => i.name === iData.name && i.type === iData.type);

      if ( existente ) {
        // 2. Si existe, no lo creamos. Calculamos la nueva cantidad.
        let cantActual = Number(existente.system.cantidad) || 1;
        let cantNueva = Number(iData.system?.cantidad) || 1;
        
        itemsParaActualizar.push({
          _id: existente.id,
          "system.cantidad": cantActual + cantNueva
        });
      } else {
        // 3. Si no existe, nos aseguramos de que tenga cantidad 1 por defecto y lo mandamos a crear
        if (!iData.system) iData.system = {};
        if (iData.system.cantidad === undefined) iData.system.cantidad = 1;
        
        itemsParaCrear.push(iData);
      }
    }

    // 4. Ejecutamos las actualizaciones (sumar stock a los que ya existen)
    if ( itemsParaActualizar.length > 0 ) {
      await this.actor.updateEmbeddedDocuments("Item", itemsParaActualizar);
      ui.notifications.info("Se ha aumentado el stock de objetos existentes.");
    }
    
    // 5. Ejecutamos la creación (los objetos totalmente nuevos)
    if ( itemsParaCrear.length > 0 ) {
      return super._onDropItemCreate(itemsParaCrear);
    }
  }

  // ============================================================
  // LISTENERS
  // ============================================================
  activateListeners(html) {
    super.activateListeners(html);

    const root = html instanceof HTMLElement ? html : html[0];

    root.querySelectorAll(".btn-comprar").forEach(btn => {
      btn.addEventListener("click", ev => this._comprar(ev));
    });
  }

  // ============================================================
  // SISTEMA DE COMPRA
  // ============================================================
  async _comprar(ev) {

    const itemId = ev.currentTarget.dataset.itemId;
    const item = this.actor.items.get(itemId);

    const comprador = canvas.tokens.controlled[0]?.actor;

    if (!comprador)
      return ui.notifications.warn("Selecciona tu personaje.");

    // ========================================================
    // STOCK
    // ========================================================
    const stock = item.system.cantidad ?? 1;

    if (stock <= 0)
      return ui.notifications.warn("Este objeto está agotado.");

    // ========================================================
    // PRECIOS
    // ========================================================
    const tasas = {
      oro: 1,
      rubi: 100,
      diamante: 10000
    };

    let precio = 0;
    let moneda = "oro";

    if (item.system.precio_diamante > 0) {
      moneda = "diamante";
      precio = item.system.precio_diamante;
    }
    else if (item.system.precio_rubi > 0) {
      moneda = "rubi";
      precio = item.system.precio_rubi;
    }
    else {
      precio = item.system.precio_oro;
    }

    const precioOro = precio * tasas[moneda];

    // ========================================================
    // DINERO DEL JUGADOR
    // ========================================================
    const erianas = comprador.system.erianas;

    const totalOro =
      (erianas.oro || 0) +
      (erianas.rubi || 0) * 100 +
      (erianas.diamante || 0) * 10000;

    if (totalOro < precioOro)
      return ui.notifications.error("No tienes suficientes Erianas.");

    // ========================================================
    // RESTANTE
    // ========================================================
    const restante = totalOro - precioOro;

    const diamante = Math.floor(restante / 10000);
    const rubi = Math.floor((restante % 10000) / 100);
    const oro = restante % 100;

    await comprador.update({
      "system.erianas.oro": oro,
      "system.erianas.rubi": rubi,
      "system.erianas.diamante": diamante
    });

    // ========================================================
    // ENTREGAR OBJETO
    // ========================================================
    // Usamos .contents.find() que es la forma infalible de buscar en Foundry
    const existente = comprador.items.contents.find(i => i.name === item.name);

    if (existente) {
      // Si el personaje ya lo tiene, le sumamos +1 a SU propia cantidad
      let cantActual = Number(existente.system.cantidad) || 0;
      await existente.update({ "system.cantidad": cantActual + 1 });
      
    } else {
      // Si NO lo tiene, construimos los datos desde cero para que Foundry no nos ignore
      let datosNuevoObjeto = {
        name: item.name,
        type: item.type,
        img: item.img,
        system: foundry.utils.deepClone(item.system) // Copiamos sus efectos/stats
      };
      
      // Le inyectamos la cantidad 1 por la fuerza
      datosNuevoObjeto.system.cantidad = 1; 
      
      // Creamos el objeto en la ficha del jugador
      await comprador.createEmbeddedDocuments("Item", [datosNuevoObjeto]);
    }
    
    // ========================================================
    // REDUCIR STOCK
    // ========================================================
    await item.update({
      "system.cantidad": stock - 1
    });

    ui.notifications.info(
      `${comprador.name} compró ${item.name} por ${precio} ${moneda}`
    );

    this.render();
  }
}