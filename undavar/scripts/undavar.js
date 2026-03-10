// ============================================================
//  UNDAVAR — Sistema Foundry VTT v12
// ============================================================

Hooks.once("init", function () {
  console.log("UNDAVAR | Iniciando...");
  CONFIG.Combat.initiative.formula = "4d6";

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("undavar", UndavarPersonajeSheet, {
    types: ["personaje"], makeDefault: true, label: "Ficha de Personaje",
  });
  Actors.registerSheet("undavar", UndavarNPCSheet, {
    types: ["npc"], makeDefault: true, label: "Ficha NPC",
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("undavar", UndavarItemSheet, {
    makeDefault: true, label: "Objeto UNDAVAR",
  });
});

Hooks.once("ready", () => console.log("UNDAVAR | Sistema listo."));

// ============================================================
//  HELPERS PUROS (no tocan el actor)
// ============================================================

function calcularRango(pv) {
  pv = Number(pv) || 0;
  if (pv >= 564) return "Lairazul";
  if (pv >= 464) return "Leyenda, Delta";
  if (pv >= 462) return "Leyenda, Gamma";
  if (pv >= 460) return "Leyenda, Beta";
  if (pv >= 458) return "Leyenda, Alpha";
  if (pv >= 440) return "Leyenda";
  if (pv >= 351) return "Lait Betsu, Delta";
  if (pv >= 349) return "Lait Betsu, Gamma";
  if (pv >= 347) return "Lait Betsu, Beta";
  if (pv >= 345) return "Lait Betsu, Alpha";
  if (pv >= 329) return "Lait Betsu";
  if (pv >= 251) return "Wonrixay, Delta";
  if (pv >= 249) return "Wonrixay, Gamma";
  if (pv >= 247) return "Wonrixay, Beta";
  if (pv >= 245) return "Wonrixay, Alpha";
  if (pv >= 231) return "Wonrixay";
  if (pv >= 164) return "Sedrein, Delta";
  if (pv >= 162) return "Sedrein, Gamma";
  if (pv >= 160) return "Sedrein, Beta";
  if (pv >= 158) return "Sedrein, Alpha";
  if (pv >= 146) return "Sedrein";
  if (pv >= 90)  return "Breintin, Delta";
  if (pv >= 88)  return "Breintin, Gamma";
  if (pv >= 86)  return "Breintin, Beta";
  if (pv >= 84)  return "Breintin, Alpha";
  if (pv >= 74)  return "Breintin";
  if (pv >= 29)  return "Astrei, Delta";
  if (pv >= 27)  return "Astrei, Gamma";
  if (pv >= 25)  return "Astrei, Beta";
  if (pv >= 23)  return "Astrei, Alpha";
  if (pv >= 15)  return "Astrei";
  return "Sin rango";
}

function calcularPAMax(pv) {
  pv = Number(pv) || 0;
  let extra = 0;
  for (const u of [15, 74, 146, 231, 329, 440, 564]) { if (pv >= u) extra += 2; }
  return 2 + extra;
}

function costoSuerte(pv) {
  const r = calcularRango(pv).split(",")[0].trim();
  return {"Astrei":3,"Breintin":6,"Sedrein":9,"Wonrixay":12,"Lait Betsu":15,"Leyenda":18,"Lairazul":21}[r] ?? 3;
}

function costoPCAccion(pv) {
  const r = calcularRango(pv).split(",")[0].trim();
  return {"Astrei":15,"Breintin":20,"Sedrein":25,"Wonrixay":30,"Lait Betsu":35,"Leyenda":40,"Lairazul":45}[r] ?? 15;
}

function costoPANivel(n)  { return {1:4,2:6,3:8,4:10}[n]  ?? 4;  }
function costoPVNivel(n)  { return {1:15,2:30,3:45,4:75}[n] ?? 15; }
function bonusCombate(n)  { return {1:0,2:1,3:2,4:3}[n]    ?? 0;  }

// Lectura segura de rutas anidadas
function seg(obj, path, def = 0) {
  try { return path.split(".").reduce((o, k) => o?.[k], obj) ?? def; }
  catch { return def; }
}

// ============================================================
//  TIRADAS
// ============================================================

async function tiradaEstandar(actor, etiqueta = "Tirada") {
  const roll = new Roll("4d6");
  await roll.evaluate();
  const ds   = roll.dice[0].results.map(r => r.result);
  const ac   = ds.filter(d => [1,3,5].includes(d)).length;
  const pe   = ds.filter(d => [2,4,6].includes(d)).length;
  const suma = ds.reduce((a,b) => a+b, 0);
  const pv   = ds.filter(d => [1,3,5].includes(d)).reduce((a,b) => a+b, 0);
  const suerte = suma > 12 ? "✨ Buena suerte" : "💀 Mala suerte";
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    content: `<div class="undavar-roll"><h3>${etiqueta}</h3>
      <div class="dados-resultado">${ds.map(d=>`<span class="dado ${[1,3,5].includes(d)?'acierto':'perdida'}">${d}</span>`).join("")}</div>
      <table class="roll-tabla">
        <tr><td><b>Aciertos</b></td><td>${ac}</td></tr>
        <tr><td><b>Pérdidas</b></td><td>${pe}</td></tr>
        <tr><td><b>PV ganados</b></td><td>${pv}</td></tr>
        <tr><td><b>Suerte</b></td><td>${suerte}</td></tr>
      </table></div>`,
  });
}

async function tiradaAtaque(actor, etiqueta = "Ataque") {
  const roll = new Roll("4d6");
  await roll.evaluate();
  const ds   = roll.dice[0].results.map(r => r.result);
  const dano = ds.filter(d => [2,4,6].includes(d)).length;
  const pv   = ds.filter(d => [1,3,5].includes(d)).reduce((a,b) => a+b, 0);
  const suma = ds.reduce((a,b) => a+b, 0);
  const suerte = suma > 12 ? "✨ Buena suerte" : "💀 Mala suerte";
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    content: `<div class="undavar-roll"><h3>${etiqueta}</h3>
      <div class="dados-resultado">${ds.map(d=>`<span class="dado ${[1,3,5].includes(d)?'acierto':'perdida'}">${d}</span>`).join("")}</div>
      <table class="roll-tabla">
        <tr><td><b>Daño</b></td><td>${dano}</td></tr>
        <tr><td><b>PV ganados</b></td><td>${pv}</td></tr>
        <tr><td><b>Suerte</b></td><td>${suerte}</td></tr>
      </table></div>`,
  });
}

async function tiradaDanoNivel(actor, nivel, atributo = 0, etiqueta = "Daño") {
  nivel    = Number(nivel)    || 1;
  atributo = Number(atributo) || 0;
  const formula = nivel===1 ? "2d6+2"
    : nivel===2 ? "2d6+3"
    : nivel===3 ? `3d6+${Math.floor(atributo/3)}`
    : `4d6+${Math.floor(atributo/2)}`;
  const roll = new Roll(formula);
  await roll.evaluate();
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    flavor: `${etiqueta} — Nv.${nivel}`,
    rolls: [roll],
    type: CONST.CHAT_MESSAGE_TYPES?.ROLL ?? 5,
  });
}

async function tiradaRebote(actor) {
  const roll = new Roll("4d6");
  await roll.evaluate();
  const s   = roll.total;
  const res = s === 3 ? "⚡ +1 Cansancio" : s > 3 ? "🔥 +1 Fatiga" : "✅ Sin rebote";
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    content: `<div class="undavar-roll"><h3>Rebote</h3><p>Suma: <b>${s}</b> → ${res}</p></div>`,
  });
}

async function tiradaDespertar(actor) {
  const roll = new Roll("4d6");
  await roll.evaluate();
  const ds = roll.dice[0].results.map(r => r.result);
  const ac = ds.filter(d => [1,3,5].includes(d)).length;
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    content: `<div class="undavar-roll"><h3>Despertar</h3>
      <div class="dados-resultado">${ds.map(d=>`<span class="dado ${[1,3,5].includes(d)?'acierto':'perdida'}">${d}</span>`).join("")}</div>
      <p>Aciertos: <b>${ac}</b>/4 — ${ac >= 4 ? "✅ ¡Despierta!" : "❌ No despierta."}</p></div>`,
  });
}

async function tiradaErianas(actor) {
  const roll = new Roll("4d6");
  await roll.evaluate();
  const total = roll.total * 10;
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({actor}),
    content: `<div class="undavar-roll"><h3>Erianas Iniciales</h3><p>${roll.total} × 10 = <b>${total} Oro</b></p></div>`,
  });
  return total;
}

// ============================================================
//  HOJA PERSONAJE
// ============================================================

class UndavarPersonajeSheet extends ActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["undavar","sheet","personaje"],
      template: "systems/undavar/templates/actor/personaje-sheet.hbs",
      width: 820, height: 740,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "datos" }],
      resizable: true,
    });
  }

  // ──────────────────────────────────────────────────────────
  // CRÍTICO: NO sobreescribir ctx.system nunca.
  // Foundry V12 usa ctx.system internamente para mapear los
  // inputs name="system.xxx" al actor. Si lo reemplazamos,
  // los cambios del formulario se pierden.
  // Los datos calculados van en ctx.calc (objeto separado).
  // ──────────────────────────────────────────────────────────
  getData() {
    const ctx = super.getData();

    // Leemos system directamente desde el actor (solo lectura)
    const s = this.actor.system;

    // Valores seguros con fallback
    const pvVal   = seg(s, "pv.value", 0);
    const herida  = seg(s, "estado.ptHerida.value", 0);
    const ham     = seg(s, "extensionEstado.hambre.value", 0);
    const sed     = seg(s, "extensionEstado.sed.value", 0);
    const can     = seg(s, "extensionEstado.cansancio.value", 0);
    const fat     = seg(s, "extensionEstado.fatiga.value", 0);

    // Objeto SEPARADO para datos calculados — Foundry no lo toca
    ctx.calc = {
      rango:              calcularRango(pvVal),
      paMaximo:           calcularPAMax(pvVal),
      costoSuerte:        costoSuerte(pvVal),
      costoPCAccion:      costoPCAccion(pvVal),
      bonusHeridas:       Math.floor(ham/2) + Math.floor(sed/2) + Math.floor(can/2) + Math.floor(fat/2),
      saludPorHeridas:    Math.floor(herida / 4),
    };

    // Ítems separados por tipo
    ctx.artes    = this.actor.items.filter(i => i.type === "arte");
    ctx.armas    = this.actor.items.filter(i => i.type === "arma");
    ctx.objetos  = this.actor.items.filter(i => i.type === "objeto");
    ctx.elixires = this.actor.items.filter(i => i.type === "elixir");
    ctx.oficios  = this.actor.items.filter(i => i.type === "oficio");
    ctx.equipos  = this.actor.items.filter(i => i.type === "equipo");

    return ctx;
  }

  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable) return;

    html.find(".roll-estandar").click(ev =>
      tiradaEstandar(this.actor, ev.currentTarget.dataset.label || "Tirada"));
    html.find(".roll-ataque").click(ev =>
      tiradaAtaque(this.actor, ev.currentTarget.dataset.label || "Ataque"));
    html.find(".roll-dano-nivel").click(ev => {
      const { nivel=1, atributo=0, label="Daño" } = ev.currentTarget.dataset;
      tiradaDanoNivel(this.actor, nivel, atributo, label);
    });
    html.find(".roll-rebote").click(()    => tiradaRebote(this.actor));
    html.find(".roll-despertar").click(() => tiradaDespertar(this.actor));
    html.find(".roll-erianas").click(async () => {
      const total = await tiradaErianas(this.actor);
      await this.actor.update({ "system.erianas.oro": total });
    });

    // Crear ítem
    html.find(".item-crear").click(ev => {
      const tipo = ev.currentTarget.dataset.tipo || "objeto";
      Item.create({ name: "Nuevo " + tipo, type: tipo }, { parent: this.actor });
    });

    // Editar ítem
    html.find(".item-editar").click(ev => {
      const id = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
      if (id) this.actor.items.get(id)?.sheet.render(true);
    });

    // Eliminar ítem
    html.find(".item-eliminar").click(ev => {
      const id = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
      const item = id ? this.actor.items.get(id) : null;
      if (!item) return;
      Dialog.confirm({
        title: "Eliminar",
        content: `<p>¿Eliminar <b>${item.name}</b>?</p>`,
        yes: () => item.delete(),
      });
    });

    // Usar arte/arma (gasta PA, suma cansancio, tira daño)
    html.find(".item-usar").click(async ev => {
      const id   = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
      const item = id ? this.actor.items.get(id) : null;
      if (!item) return;

      const nivel  = item.system.nivel ?? 1;
      const costPA = costoPANivel(nivel);
      const paAct  = this.actor.system.pa?.value ?? 0;

      if (paAct < costPA) {
        ui.notifications.warn(`PA insuficientes (necesitas ${costPA}, tienes ${paAct}).`);
        return;
      }
      const atr = item.type === "arte"
        ? (this.actor.system.atributos?.inteligencia ?? 0)
        : (this.actor.system.atributos?.fuerza       ?? 0);

      await this.actor.update({ "system.pa.value": paAct - costPA });

      const canAct = this.actor.system.extensionEstado?.cansancio?.value ?? 0;
      await this.actor.update({ "system.extensionEstado.cansancio.value": Math.min(canAct + 1, 9) });

      tiradaDanoNivel(this.actor, nivel, atr, item.name);
      ui.notifications.info(`${item.name} — −${costPA} PA · +1 Cansancio`);
    });
  }
}

// ============================================================
//  HOJA NPC
// ============================================================

class UndavarNPCSheet extends ActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["undavar","sheet","npc"],
      template: "systems/undavar/templates/actor/npc-sheet.hbs",
      width: 600, height: 520, resizable: true,
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

    html.find(".roll-estandar").click(() => tiradaEstandar(this.actor, "NPC"));
    html.find(".roll-ataque").click(()   => tiradaAtaque(this.actor, "Ataque NPC"));

    html.find(".item-crear").click(ev =>
      Item.create({ name: "Nueva habilidad", type: ev.currentTarget.dataset.tipo || "arte" }, { parent: this.actor }));
    html.find(".item-editar").click(ev => {
      const id = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
      if (id) this.actor.items.get(id)?.sheet.render(true);
    });
    html.find(".item-eliminar").click(ev => {
      const id   = ev.currentTarget.closest("[data-item-id]")?.dataset.itemId;
      const item = id ? this.actor.items.get(id) : null;
      if (item) Dialog.confirm({
        title: "Eliminar", content: `<p>¿Eliminar <b>${item.name}</b>?</p>`, yes: () => item.delete(),
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
      classes: ["undavar","sheet","item"],
      template: "systems/undavar/templates/item/item-sheet.hbs",
      width: 520, height: 440, resizable: true,
    });
  }

  getData() {
    const ctx       = super.getData();
    // Solo añadimos datos extra, no reemplazamos ctx.system
    ctx.niveles     = [1, 2, 3, 4];
    ctx.slots       = { cabeza:"Cabeza", superior:"Superior", collares:"Collares", accesorios:"Accesorios", inferior:"Inferior", pies:"Pies" };
    const n         = this.item.system.nivel ?? 1;
    ctx.calc        = { costoPANivel: costoPANivel(n), costoPVNivel: costoPVNivel(n), bonusNivel: bonusCombate(n) };
    return ctx;
  }
}
