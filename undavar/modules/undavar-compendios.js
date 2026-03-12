/* ============================================================
   UNDAVAR — Módulo de Compendios v4.0
   Archivo: modules/undavar-compendios.js

   INSTALACIÓN:
   1. Copia este archivo a: systems/undavar/modules/undavar-compendios.js
   2. En tu undavar.js principal agrega al inicio:
        import "./modules/undavar-compendios.js";

   CAMBIOS v4.0:
   - Iconos corregidos (rutas absolutas del core de Foundry V12)
   - Organización en carpetas por tipo dentro de cada compendio
   - Los compendios existentes NO se modifican (comportamiento previo)
   ============================================================ */

/* ── Iconos — rutas 100% verificadas con FilePicker en esta instalación ── */
const ICO = {
  // Pociones
  pocion_amarilla:    "icons/consumables/potions/bottle-conical-corked-yellow.webp",
  pocion_naranja:     "icons/consumables/potions/bottle-round-corked-orange.webp",
  pocion_roja:        "icons/consumables/potions/bottle-round-corked-red.webp",
  pocion_azul:        "icons/consumables/potions/potion-flask-corked-blue.webp",
  pocion_verde:       "icons/consumables/potions/potion-flask-corked-green.webp",
  pocion_violeta:     "icons/consumables/potions/bottle-bulb-corked-purple.webp",

  // Comida
  manzana:            "icons/consumables/food/berries-ration-round-red.webp",
  carne:              "icons/consumables/food/cooked-drumstick-bone-brown.webp",
  sopa:               "icons/consumables/food/pot-soup-white.webp",
  pan:                "icons/consumables/food/bread-toast-tan.webp",
  pastel:             "icons/consumables/food/honey-beehive-brown.webp",
  banquete:           "icons/consumables/food/cooked-ribs-rack-glazed-bones-brown-white.webp",

  // Bebidas
  agua:               "icons/consumables/drinks/water-jug-clay-brown.webp",
  vino:               "icons/consumables/drinks/wine-amphora-clay-blue.webp",
  te:                 "icons/consumables/drinks/tea-jug-glowing-brown-pink.webp",
  licor:              "icons/consumables/drinks/alcohol-spirits-bottle-blue.webp",
  jarabe:             "icons/consumables/drinks/alcohol-jug-spirits-brown.webp",
  nectar:             "icons/consumables/drinks/wine-bottle-glass-white.webp",

  // Equipamiento — collar/cuello
  collar:             "icons/equipment/neck/amulet-round-gold-red.webp",
  pulsera:            "icons/equipment/neck/choker-chain-thick-gold.webp",

  // Equipamiento — anillos
  anillo_plata:       "icons/equipment/finger/ring-band-engraved-scrolls-silver.webp",
  anillo_oro:         "icons/equipment/finger/ring-band-engraved-scrolls-gold.webp",

  // Equipamiento — guantes y armaduras
  guante:             "icons/equipment/hand/gauntlet-plate-steel-grey.webp",
  armadura_cuero:     "icons/equipment/chest/breastplate-layered-leather-brown.webp",
  armadura_hierro:    "icons/equipment/chest/breastplate-banded-steel-grey.webp",
  armadura_encantada: "icons/equipment/chest/breastplate-cuirass-steel-blue.webp",
  armadura_oro:       "icons/equipment/chest/breastplate-banded-steel-gold.webp",

  // Armas — espadas
  espada:             "icons/weapons/swords/sword-guard-brown.webp",
  espada_oscura:      "icons/weapons/swords/sword-guard-worn-brown.webp",
  espada_azul:        "icons/weapons/swords/sword-guard-blue.webp",
  espada_verde:       "icons/weapons/swords/sword-guard-steel-green.webp",
  espada_morada:      "icons/weapons/swords/sword-guard-flanged-purple.webp",

  // Armas — arrojadizas y otras
  chakram:            "icons/weapons/thrown/shuriken-blue.webp",
  daga:               "icons/weapons/daggers/dagger-curved-black.webp",
  kusarigama:         "icons/weapons/daggers/dagger-twin-curved-black.webp",  // flails no existe, mejor alternativa
  orbe:               "icons/weapons/wands/wand-gem-violet.webp",

  // Documentos
  mapa:               "icons/sundries/documents/document-torn-diagram-tan.webp",
  libro:              "icons/sundries/books/book-embossed-blue.webp",
  pluma:              "icons/sundries/documents/document-writing-brown.webp",
  contrato:           "icons/sundries/documents/document-sealed-signatures-red.webp",
  carta:              "icons/sundries/documents/envelope-sealed-red-tan.webp",

  // Criaturas — mammals (humanoids no existe)
  humanoide_oscuro:   "icons/creatures/mammals/humanoid-wolf-dog-blue.webp",
  humanoide_rojo:     "icons/creatures/mammals/bull-horned-blue.webp",
  humanoide_azul:     "icons/creatures/mammals/humanoid-fox-cat-archer.webp",
  humanoide_piedra:   "icons/creatures/mammals/beast-horned-scaled-glowing-orange.webp",
  humanoide_sombra:   "icons/creatures/mammals/humanoid-cat-skulking-teal.webp",
  hada:               "icons/creatures/mammals/unicorn-horned-white.webp",

  // Criaturas — aves
  ave_ave:            "icons/creatures/birds/raptor-hawk-flying.webp",
  ave_dorada:         "icons/creatures/birds/raptor-owl-flying-moon.webp",
  ave_negra:          "icons/creatures/birds/corvid-watchful-glowing-green.webp",

  // Criaturas — mamíferos
  gato_blanco:        "icons/creatures/mammals/cat-hunched-glowing-red.webp",
  gato_gris:          "icons/creatures/mammals/humanoid-cat-skulking-teal.webp",
  oso_blanco:         "icons/creatures/mammals/ox-buffalo-horned-green.webp",
  oso_marron:         "icons/creatures/mammals/ox-bull-horned-glowing-orange.webp",
  lobo:               "icons/creatures/mammals/wolf-shadow-black.webp",
  leon:               "icons/creatures/mammals/wolf-howl-moon-black.webp",
  zorro:              "icons/creatures/mammals/humanoid-fox-cat-archer.webp",
  huron:              "icons/creatures/mammals/rodent-rat-green.webp",
  reptil_gris:        "icons/creatures/mammals/deer-antlers-blue.webp",

  // Magia
  sombra:             "icons/magic/unholy/silhouette-robe-evil-glow.webp",
  elementalAire:      "icons/magic/air/air-burst-spiral-blue-gray.webp",
  construccion:       "icons/magic/earth/construct-stone.webp",
  espiritu_azul:      "icons/magic/unholy/orb-glowing-purple.webp",
  tierra:             "icons/magic/earth/strike-fist-stone-gray.webp",
  rayo:               "icons/magic/lightning/bolt-blue.webp",
};

/* ══════════════════════════════════════════════════════════
   DATOS — Objetos y Elixires
   Cada entrada tiene una propiedad _folder que indica
   en qué carpeta del compendio se ubicará.
══════════════════════════════════════════════════════════ */

const OBJETOS = [
  // ── Elixires ──────────────────────────────────────────────
  { name: "Elixir de Potenciación", type: "elixir", img: ICO.pocion_amarilla, _folder: "Elixires",
    system: { descripcion: "Potencia todas las habilidades del portador.", efecto: "+2 habilidades (lvl 1); +3 habilidades (lvl 2).", duracion: "1 min (lvl 1) / 2 min (lvl 2). Tiempo al azar hasta usarlo.", nivel: 1, precio_oro: 0, precio_rubi: 5, precio_diamante: 0, cantidad: 1, ofensivo: false, notas: "Nivel máximo: 2." }},
  { name: "Elixir de Aumento Físico", type: "elixir", img: ICO.pocion_naranja, _folder: "Elixires",
    system: { descripcion: "Aumenta las capacidades físicas del usuario.", efecto: "Mejora las capacidades físicas del portador.", duracion: "3 minutos.", nivel: 0, precio_oro: 0, precio_rubi: 10, precio_diamante: 0, cantidad: 1, ofensivo: false, notas: "" }},
  { name: "Elixir de la Vida", type: "elixir", img: ICO.pocion_roja, _folder: "Elixires",
    system: { descripcion: "Elixir de alto nivel. Cierra heridas en minutos y revitaliza al cuerpo.", efecto: "Regeneración rápida + restaura 30% de salud (pt.Salud / pt.Herida × 0.3).", duracion: "2 turnos.", nivel: 0, precio_oro: 0, precio_rubi: 0, precio_diamante: 15, cantidad: 1, ofensivo: false, notas: "Elixir de alto nivel." }},
  { name: "Elixir de Armamento", type: "elixir", img: ICO.pocion_azul, _folder: "Elixires",
    system: { descripcion: "Se vierte el contenido para forjar un arma temporal. Única arma mágica de los magos; no es un arma, es un elixir.", efecto: "Crea un arma mágica temporal al verter el contenido.", duracion: "3 usos.", nivel: 0, precio_oro: 0, precio_rubi: 0, precio_diamante: 15, cantidad: 1, ofensivo: true, notas: "" }},

  // ── Objetos ───────────────────────────────────────────────
  { name: "Collar de Astra", type: "objeto", img: ICO.collar, _folder: "Objetos",
    system: { descripcion: "Aumenta tu poder mágico.", efecto: "+2 de daño a habilidades mágicas.", duracion: "3 minutos.", enfriamiento: "2 turnos.", precio_oro: 50, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "" }},
  { name: "Pulsera Arc", type: "objeto", img: ICO.pulsera, _folder: "Objetos",
    system: { descripcion: "Se transforma en cuchillas al cerrar los puños.", efecto: "Genera cuchillas al cerrar los puños.", duracion: "/", enfriamiento: "/", precio_oro: 45, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "" }},
  { name: "Anillo Espacial (55 espacios)", type: "objeto", img: ICO.anillo_plata, _folder: "Objetos",
    system: { descripcion: "Permite guardar objetos en su interior.", efecto: "Inventario extra de 55 espacios.", duracion: "/", enfriamiento: "/", precio_oro: 0, precio_rubi: 3, precio_diamante: 0, cantidad: 1, notas: "Tamaño pequeño." }},
  { name: "Anillo Espacial (20 espacios)", type: "objeto", img: ICO.anillo_plata, _folder: "Objetos",
    system: { descripcion: "Permite guardar objetos en su interior.", efecto: "Inventario extra de 20 espacios.", duracion: "/", enfriamiento: "/", precio_oro: 99, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Tamaño normal." }},
  { name: "Anillo Espacial Ampliado (100 espacios)", type: "objeto", img: ICO.anillo_oro, _folder: "Objetos",
    system: { descripcion: "Permite guardar objetos en su interior.", efecto: "Inventario extra de 100 espacios.", duracion: "/", enfriamiento: "/", precio_oro: 0, precio_rubi: 0, precio_diamante: 3, cantidad: 1, notas: "Tamaño ampliado." }},
  { name: "Pluma y Tinta", type: "objeto", img: ICO.pluma, _folder: "Objetos",
    system: { descripcion: "Sin pluma no escribes.", efecto: "Permite la escritura.", duracion: "20 escrituras.", enfriamiento: "/", precio_oro: 10, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "" }},
  { name: "Mapa de Undavar", type: "objeto", img: ICO.mapa, _folder: "Objetos",
    system: { descripcion: "Permite ver ubicaciones en todo Undavar.", efecto: "Muestra ubicaciones del mundo.", duracion: "/", enfriamiento: "/", precio_oro: 15, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "" }},
  { name: "Contrato de Domador", type: "objeto", img: ICO.contrato, _folder: "Objetos",
    system: { descripcion: "Contrato oficial de domador.", efecto: "/", duracion: "Uso único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 0, precio_diamante: 50, cantidad: 1, notas: "" }},
  { name: "Acta de Divorcio", type: "objeto", img: ICO.carta, _folder: "Objetos",
    system: { descripcion: "Separa a dos personas unidas en matrimonio.", efecto: "Disuelve un contrato de matrimonio.", duracion: "Uso único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 100, precio_diamante: 0, cantidad: 1, notas: "" }},
  { name: "Acta de Matrimonio", type: "objeto", img: ICO.contrato, _folder: "Objetos",
    system: { descripcion: "Une a dos personas en matrimonio. Las experiencias son compartidas.", efecto: "Une a dos personajes; comparten experiencia.", duracion: "Uso único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 10, precio_diamante: 0, cantidad: 1, notas: "" }},
  { name: "Libro en Blanco", type: "objeto", img: ICO.libro, _folder: "Objetos",
    system: { descripcion: "Sirve para escribir notas de interés.", efecto: "Almacena notas escritas.", duracion: "150 páginas.", enfriamiento: "/", precio_oro: 15, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "" }},
  { name: "Daga Común", type: "objeto", img: ICO.daga, _folder: "Objetos",
    system: { descripcion: "No necesita magia y no se puede combinar con magia.", efecto: "Arma física básica sin componente mágico.", duracion: "/", enfriamiento: "/", precio_oro: 25, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "" }},
  { name: "Carta del Santuario del Conocimiento", type: "objeto", img: ICO.carta, _folder: "Objetos",
    system: { descripcion: "Carta oficial del Santuario del Conocimiento.", efecto: "/", duracion: "Uso único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 0, precio_diamante: 70, cantidad: 1, notas: "" }},

  // ── Armaduras ─────────────────────────────────────────────
  { name: "Armadura de Cuero", type: "equipo", img: ICO.armadura_cuero, _folder: "Armaduras",
    system: { descripcion: "Protección básica de cuero.", efecto: "-1 de daño recibido.", reduccion_dano: 1, slot: "superior", precio_oro: 0, precio_rubi: 10, precio_diamante: 0, cantidad: "", notas: "" }},
  { name: "Ropa Encantada", type: "equipo", img: ICO.armadura_encantada, _folder: "Armaduras",
    system: { descripcion: "Ropa con encantamiento defensivo.", efecto: "-2 de daño recibido.", reduccion_dano: 2, slot: "superior", precio_oro: 0, precio_rubi: 15, precio_diamante: 0, cantidad: "", notas: "" }},
  { name: "Armadura de Hierro", type: "equipo", img: ICO.armadura_hierro, _folder: "Armaduras",
    system: { descripcion: "Armadura de hierro estándar.", efecto: "-3 de daño recibido.", reduccion_dano: 3, slot: "superior", precio_oro: 0, precio_rubi: 80, precio_diamante: 0, cantidad: "", notas: "" }},
  { name: "Armadura de Hierro Encantado", type: "equipo", img: ICO.armadura_encantada, _folder: "Armaduras",
    system: { descripcion: "Armadura de hierro con encantamiento mágico.", efecto: "-4 de daño recibido.", reduccion_dano: 4, slot: "superior", precio_oro: 0, precio_rubi: 0, precio_diamante: 2.5, cantidad: "", notas: "" }},
  { name: "Armadura de Oro", type: "equipo", img: ICO.armadura_oro, _folder: "Armaduras",
    system: { descripcion: "Armadura de oro de alta calidad.", efecto: "-6 de daño recibido.", reduccion_dano: 6, slot: "superior", precio_oro: 0, precio_rubi: 0, precio_diamante: 80, cantidad: "", notas: "" }},

  // ── Alimentos sólidos ──────────────────────────────────────
  { name: "Manzana Dorada", type: "objeto", img: ICO.manzana, _folder: "Alimentos",
    system: { descripcion: "Una deliciosa manzana bañada en miel de oro.", efecto: "Elimina 1 marca de hambre.", duracion: "Único.", enfriamiento: "/", precio_oro: 5, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Alimento." }},
  { name: "Filete de Lobo Asado", type: "objeto", img: ICO.carne, _folder: "Alimentos",
    system: { descripcion: "Jugoso filete de lobo asado a la perfección.", efecto: "Elimina 2 marcas de hambre.", duracion: "Único.", enfriamiento: "/", precio_oro: 15, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Alimento." }},
  { name: "Sopa de Verduras", type: "objeto", img: ICO.sopa, _folder: "Alimentos",
    system: { descripcion: "Reconfortante sopa cargada de verduras frescas.", efecto: "Elimina 3 marcas de hambre.", duracion: "Único.", enfriamiento: "/", precio_oro: 12, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Alimento." }},
  { name: "Estofado de Carne", type: "objeto", img: ICO.sopa, _folder: "Alimentos",
    system: { descripcion: "Estofado caliente con trozos tiernos de carne y vegetales.", efecto: "Elimina 4 marcas de hambre.", duracion: "Único.", enfriamiento: "/", precio_oro: 20, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Alimento." }},
  { name: "Bollo de Miel", type: "objeto", img: ICO.pan, _folder: "Alimentos",
    system: { descripcion: "Suave bollo horneado con miel dorada.", efecto: "Elimina 2 marcas de hambre.", duracion: "Único.", enfriamiento: "/", precio_oro: 7, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Alimento." }},
  { name: "Chuleta de Dragón a la Parrilla", type: "objeto", img: ICO.carne, _folder: "Alimentos",
    system: { descripcion: "Jugosa chuleta de dragón sazonada y asada a la parrilla.", efecto: "Elimina 5 marcas de hambre.", duracion: "Único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 2, precio_diamante: 0, cantidad: 1, notas: "Alimento." }},
  { name: "Pastel de Oro Celestial", type: "objeto", img: ICO.pastel, _folder: "Alimentos",
    system: { descripcion: "Pastel con ingredientes exóticos y láminas de oro comestible.", efecto: "Elimina 6 marcas de hambre.", duracion: "Único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 5, precio_diamante: 0, cantidad: 1, notas: "Alimento." }},
  { name: "Sopa de Néctar de Hadas", type: "objeto", img: ICO.sopa, _folder: "Alimentos",
    system: { descripcion: "Suntuosa sopa con néctar de hadas. Propiedades curativas y revitalizantes.", efecto: "Elimina 8 marcas de hambre.", duracion: "Único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 0, precio_diamante: 8, cantidad: 1, notas: "Alimento." }},
  { name: "Elixir de Rejuvenecimiento (alimento)", type: "objeto", img: ICO.pocion_verde, _folder: "Alimentos",
    system: { descripcion: "Restaura la vitalidad y rejuvenece el cuerpo y la mente.", efecto: "Elimina 6 marcas de cansancio.", duracion: "Único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 0, precio_diamante: 4, cantidad: 1, notas: "Alimento / Consumible." }},
  { name: "Banquete de los Dioses", type: "objeto", img: ICO.banquete, _folder: "Alimentos",
    system: { descripcion: "Exquisito banquete con los ingredientes más raros de Undavar.", efecto: "Elimina TODAS las marcas de hambre y sed.", duracion: "Único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 10, precio_diamante: 0, cantidad: 1, notas: "Alimento." }},

  // ── Bebidas ───────────────────────────────────────────────
  { name: "Agua de Manantial", type: "objeto", img: ICO.agua, _folder: "Bebidas",
    system: { descripcion: "Agua cristalina del manantial más puro de Undavar.", efecto: "Elimina 1 marca de sed.", duracion: "Único.", enfriamiento: "/", precio_oro: 3, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Bebida." }},
  { name: "Jarabe de Bayas del Bosque", type: "objeto", img: ICO.jarabe, _folder: "Bebidas",
    system: { descripcion: "Jarabe de bayas silvestres del corazón del bosque.", efecto: "Elimina 1 marca de sed.", duracion: "Único.", enfriamiento: "/", precio_oro: 8, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Bebida." }},
  { name: "Agua de Coco", type: "objeto", img: ICO.agua, _folder: "Bebidas",
    system: { descripcion: "Refrescante agua de coco.", efecto: "Elimina 2 marcas de sed.", duracion: "Único.", enfriamiento: "/", precio_oro: 6, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Bebida." }},
  { name: "Té de Hierbas", type: "objeto", img: ICO.te, _folder: "Bebidas",
    system: { descripcion: "Infusión reconfortante de hierbas aromáticas.", efecto: "Elimina 1 marca de sed.", duracion: "Único.", enfriamiento: "/", precio_oro: 4, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Bebida." }},
  { name: "Vino de Frutas Exóticas", type: "objeto", img: ICO.vino, _folder: "Bebidas",
    system: { descripcion: "Vino elaborado con variedad de frutas exóticas.", efecto: "Elimina 3 marcas de sed.", duracion: "Único.", enfriamiento: "/", precio_oro: 25, precio_rubi: 0, precio_diamante: 0, cantidad: 1, notas: "Bebida." }},
  { name: "Agua de Manantial Cristalino", type: "objeto", img: ICO.agua, _folder: "Bebidas",
    system: { descripcion: "Agua pura de un manantial sagrado en las profundidades de Undavar.", efecto: "Elimina 5 marcas de sed.", duracion: "Único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 0, precio_diamante: 1.5, cantidad: 1, notas: "Bebida." }},
  { name: "Vino de la Cosecha Celestial", type: "objeto", img: ICO.nectar, _folder: "Bebidas",
    system: { descripcion: "Vino fino de uvas de la mítica viña celestial.", efecto: "Elimina 7 marcas de sed.", duracion: "Único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 0, precio_diamante: 5, cantidad: 1, notas: "Bebida." }},
  { name: "Té de la Eternidad", type: "objeto", img: ICO.te, _folder: "Bebidas",
    system: { descripcion: "Té místico de rejuvenecimiento. Rumoreado por prolongar la vida.", efecto: "Elimina 8 marcas de cansancio.", duracion: "Único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 0, precio_diamante: 6, cantidad: 1, notas: "Bebida." }},
  { name: "Néctar de la Diosa Lunar", type: "objeto", img: ICO.nectar, _folder: "Bebidas",
    system: { descripcion: "Bebida divina que restaura completamente el cuerpo y el espíritu.", efecto: "Elimina TODAS las marcas de hambre, sed y cansancio.", duracion: "Único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 0, precio_diamante: 10, cantidad: 1, notas: "Bebida divina." }},
  { name: "Licor de Fuego de Dragón", type: "objeto", img: ICO.licor, _folder: "Bebidas",
    system: { descripcion: "Licor destilado de esencia de fuego de dragón.", efecto: "Elimina 4 marcas de sed.", duracion: "Único.", enfriamiento: "/", precio_oro: 0, precio_rubi: 3, precio_diamante: 0, cantidad: 1, notas: "Bebida." }}
];

/* ══════════════════════════════════════════════════════════
   DATOS — Armas Especiales
══════════════════════════════════════════════════════════ */

const ARMAS = [
  // ── Armas de Par ──────────────────────────────────────────
  { name: "Hermanas Maydo y Tsuida", type: "arma", img: ICO.espada_morada, _folder: "Armas de Par",
    system: { descripcion: "Par de armas inseparables. Con una sola no harás más que con una espada común.\n\nCapacidades con ambas:\n• Teletransporte instantáneo hasta donde esté la otra arma.\n• Duplicación de existencia: la copia tiene el mismo poder, inteligencia y decisión (no es clon menor).\n• Movimiento con el viento: agilidad y flexibilidad extraordinarias.", nivel: 0, costo_pa: 2, sellos: "", cantidad: "1", notas: "Requiere poseer AMBAS para activar sus poderes." }},

  // ── Armas Oscuras ─────────────────────────────────────────
  { name: "Voltex Oscuro", type: "arma", img: ICO.espada_oscura, _folder: "Armas Oscuras",
    system: { descripcion: "Armas de los demonios de las sombras.\n\nCapacidades:\n• Deshacerse en partículas de sombra y rearmarse, moviéndose libremente.\n• En estado físico: velocidad muy alta y detección de seres a varios kilómetros.\n• Sus cortes generan heridas que la regeneración no puede sanar fácilmente.", nivel: 0, costo_pa: 2, sellos: "", cantidad: "1", notas: "" }},
  { name: "Kusarigama de las Sombras", type: "arma", img: ICO.kusarigama, _folder: "Armas Oscuras",
    system: { descripcion: "El mejor arma de sigilo. Velocidad y silencio la definen.\n\nCapacidades:\n• Esconder ataques en las sombras del enemigo o del entorno.\n• Ocultarse a uno mismo en las sombras.\n• Crear clones-sombra literales: oscuros como la noche, solo se mueven entre sombras.\n• Gran filo físico innato.", nivel: 0, costo_pa: 2, sellos: "", cantidad: "1", notas: "" }},

  // ── Armas Elementales ─────────────────────────────────────
  { name: "Guante de Terak", type: "arma", img: ICO.guante, _folder: "Armas Elementales",
    system: { descripcion: "Absorbe energía eléctrica, rayos y truenos para descargarlos con violencia.\n\nCapacidades:\n• Descarga eléctrica directa o potenciador de golpes.\n• Crea campos eléctricos activos en zonas para control de área.\n\n⚠ Los campos también pueden afectar al portador.", nivel: 0, costo_pa: 2, sellos: "", cantidad: "1", notas: "Cuidado: los campos eléctricos no distinguen aliados." }},
  { name: "Espada Friolenta", type: "arma", img: ICO.espada_azul, _folder: "Armas Elementales",
    system: { descripcion: "Permite crear y manipular hielo a voluntad.\n\nTiene efecto de parálisis: congela todo lo que toca. Si no se controla puede congelar al propio portador. Mientras esté activa, todo contacto externo crea una capa de hielo.", nivel: 0, costo_pa: 2, sellos: "", cantidad: "1", notas: "Control constante requerido para evitar autocongelación." }},
  { name: "Elemento Tóxico", type: "arma", img: ICO.espada_verde, _folder: "Armas Elementales",
    system: { descripcion: "Arma totalmente tóxica. Poder más maleable que Friolenta, igualmente peligroso sin control.\n\nCapacidades:\n• Envenena gravemente a cualquier ser vivo herido.\n• Crea una densa niebla de alta toxicidad para control de área.", nivel: 0, costo_pa: 2, sellos: "", cantidad: "1", notas: "Pérdida de control afecta también al portador." }},
  { name: "Electro Chakram", type: "arma", img: ICO.chakram, _folder: "Armas Elementales",
    system: { descripcion: "Emite energía eléctrica en toda el arma excepto en el mango central.\n\nAl ser lanzado, los giros aumentan progresivamente su energía. Al impactar descarga toda la energía acumulada.", nivel: 0, costo_pa: 2, sellos: "", cantidad: "1", notas: "Mayor tiempo en el aire = mayor daño al impactar." }},

  // ── Armas Legendarias ─────────────────────────────────────
  { name: "Núcleo", type: "arma", img: ICO.orbe, _folder: "Armas Legendarias",
    system: { descripcion: "Mientras el portador use esta arma, prácticamente no se agotará.\n\nCapacidades:\n• Rápido reembolso de energía; resistencia al agotamiento.\n• Lanza energía materializada en forma de cortes proyectados.", nivel: 0, costo_pa: 2, sellos: "", cantidad: "1", notas: "" }},
  { name: "Sello de Sedra", type: "arma", img: ICO.espada, _folder: "Armas Legendarias",
    system: { descripcion: "Espada larga de metal oscuro con energía negra permanente. Existe desde hace siglos; pocos la han controlado.", nivel: 0, costo_pa: 2,
      sellos: "1er Sello: Daño acumulativo — cada golpe es más fuerte que el anterior.\n2do Sello: Absorbe poder solar (insolación) o lunar (quemaduras frías). Permite ataques a distancia.\n3er Sello: Aumenta velocidad de ataque y de movimiento.\n4to Sello: Crea ilusiones tangibles para el objetivo.\n5to Sello: Absorbe los ataques recibidos (no los devuelve).",
      cantidad: "1", notas: "Liberar sellos sin control puede ser peligroso para el portador." }}
];

/* ══════════════════════════════════════════════════════════
   DATOS — Bestiario
══════════════════════════════════════════════════════════ */

const BESTIARIO = [
  // ── Seres Salvajes ─────────────────────────────────────────
  { name: "Enoji", type: "npc", img: ICO.humanoide_oscuro, _folder: "Seres Salvajes",
    system: { datos: { nombre: "Enoji", raza: "Enoji", tipo: "ser", descripcion: "Humanoide de piel mayormente oscura y constitución imponente. Estatura: hombres 1.5–1.6 m, mujeres 1.3–1.5 m. Usan pinturas corporales lavables; evitan tatuajes.\n\nARTES:\n• Destello Feroz: Ilumina al usuario desde puños hasta antebrazos, orejas y pies hasta muslos. Cuerpo prácticamente invulnerable a ataques físicos. Todos los atributos +1 temporalmente." }, atributos: { fuerza: 6, velocidad: 4, agilidad: 3, inteligencia: 6 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Krintal", type: "npc", img: ICO.ave_ave, _folder: "Seres Salvajes",
    system: { datos: { nombre: "Krintal", raza: "Krintal", tipo: "ser", descripcion: "Humanoide-ave de 2.2 m con plumaje exquisito. Pacífico y solitario. No usa magia.\n\nARTES:\n• Ventisca tormentosa: Vuela 2 m y agita las alas derribando a todo ser vivo. 1 turno en el aire (+1/nivel). Nv1:2 Nv2:3 Nv3:4 Nv4:5.\n• Chillido Bandada: Confusión masiva; sordera temporal o permanente.\n• Vuelo: 3 m, 3 turnos (+1/nivel). Nv1:4 Nv2:5 Nv3:6 Nv4:7." }, atributos: { fuerza: 2, velocidad: 6, agilidad: 3, inteligencia: 6 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Lethur", type: "npc", img: ICO.elementalAire, _folder: "Seres Salvajes",
    system: { datos: { nombre: "Lethur", raza: "Lethur", tipo: "ser", descripcion: "Raza elemental. Apariencia ligada a su elemento (fuego: piel pedregosa magma; agua: azul marino; aire: piel pálida; tierra: verde u oscura).\n\nARTES (el SR puede expandirlas):\n• Explosión de magma (fuego): Derrite el terreno de un área.\n• Impacto oceánico (agua): Gran masa de agua contra un objetivo.\n• Destello solar: Radio de luz 4 m (+1/nivel). Daño en área. Nv1:5 Nv2:6 Nv3:7 Nv4:8." }, atributos: { fuerza: 1, velocidad: 4, agilidad: 6, inteligencia: 5 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Larius", type: "npc", img: ICO.rayo, _folder: "Seres Salvajes",
    system: { datos: { nombre: "Larius", raza: "Larius", tipo: "ser", descripcion: "Raza sin cuerpo físico permanente. Puede convertirse en cargas eléctricas. Evitan los sellos de control.\n\nARTES:\n• Electro metamorfosis: Convierte su cuerpo en cargas eléctricas; imposible tocarlo.\n• Carga eléctrica: Lanza cargas eléctricas contra cualquier objetivo.\n• Destello: Se mueve a velocidad que parece teletransportación." }, atributos: { fuerza: 6, velocidad: 8, agilidad: 2, inteligencia: 5 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Vhrazars", type: "npc", img: ICO.sombra, _folder: "Seres Salvajes",
    system: { datos: { nombre: "Vhrazars", raza: "Vhrazars", tipo: "ser", descripcion: "Seres de las sombras permanentemente invisibles. Tono negro absoluto.\n\nARTES:\n• Distorsión: El objetivo solo ve lo que ellos desean. Pueden pasar por humanos.\n• Sombra: Su cuerpo se convierte en humo y se desvanece en el aire." }, atributos: { fuerza: 1, velocidad: 4, agilidad: 4, inteligencia: 5 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},

  // ── Seres Domésticos ───────────────────────────────────────
  { name: "Elck", type: "npc", img: ICO.oso_blanco, _folder: "Seres Domésticos",
    system: { datos: { nombre: "Elck", raza: "Elck", tipo: "ser", descripcion: "Ser esponjoso de pelaje blanco muy suave. Parlanchín y pacífico. Adultos: ~500 cm.\n\nARTES:\n• Peso cero: Reduce a cero el peso de cualquier cosa al tocarlo.\n• Peso máximo: Hace los objetos extremadamente pesados." }, atributos: { fuerza: 1, velocidad: 6, agilidad: 4, inteligencia: 5 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Calci", type: "npc", img: ICO.oso_marron, _folder: "Seres Domésticos",
    system: { datos: { nombre: "Calci", raza: "Calci", tipo: "ser", descripcion: "Aspecto de oso polar humanoide de hasta 3 m. Poderoso pero cobarde. Con confianza se transforma en gran aliado.\n\nARTES (aplicables sobre sí mismo):\n• Ablandar: Hace algo tan blando que los objetos se hunden sin romperlo.\n• Endurecer: Hace un cuerpo tan duro que nada puede romperlo." }, atributos: { fuerza: 8, velocidad: 4, agilidad: 3, inteligencia: 4 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Elfaris", type: "npc", img: ICO.hada, _folder: "Seres Domésticos",
    system: { datos: { nombre: "Elfaris", raza: "Elfaris", tipo: "ser", descripcion: "Humanoides con alas de mariposa (hombres: rojizas; mujeres: celeste). Orejas finas y puntiagudas. Mujeres: 1.7 pies; hombres: 2 pies.\n\nARTES:\n• Cambia forma: Se transforma en cualquier ser; mantiene su tamaño original siempre.\n• Factor veloz: Alta velocidad; con alas la velocidad se duplica.\n• Vuelo: 3 m, 3 turnos (+1/nivel). Nv1:4 Nv2:5 Nv3:6 Nv4:7." }, atributos: { fuerza: 1, velocidad: 7, agilidad: 6, inteligencia: 8 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Tómers", type: "npc", img: ICO.humanoide_piedra, _folder: "Seres Domésticos",
    system: { datos: { nombre: "Tómers", raza: "Tómers", tipo: "ser", descripcion: "Humanoides con piel gruesa y manos robustas. Altura hasta 2.3 m. Siempre llevan bolsas de tierra. Constructores excepcionales.\n\nARTES:\n• Control de tierra: Controlan toda la tierra en radio de 10 metros.\n• Cambio elemental: Transforman la tierra en cualquier elemento existente por un breve periodo." }, atributos: { fuerza: 4, velocidad: 3, agilidad: 6, inteligencia: 6 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Mairux", type: "npc", img: ICO.humanoide_azul, _folder: "Seres Domésticos",
    system: { datos: { nombre: "Mairux", raza: "Mairux", tipo: "ser", descripcion: "Humanoides de piel azul claro y cabello lacio rojizo. Altura ~3.2 m. Maestros de la creación melódica.\n\nARTES:\n• Cántico fragmentado: Al cantar, todos los que escuchan quedan aturdidos.\n• Nota Nocturn.: Al cantar, todos los que escuchan caen dormidos." }, atributos: { fuerza: 1, velocidad: 2, agilidad: 6, inteligencia: 5 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},

  // ── Bestias Salvajes ───────────────────────────────────────
  { name: "Bestia Desconocida (Cancerbero)", type: "npc", img: ICO.lobo, _folder: "Bestias Salvajes",
    system: { datos: { nombre: "??", raza: "Desconocida", tipo: "bestia", descripcion: "Presencia de cancerbero. Al descansar se vuelve completamente invisible. Velocidad: 57 km/h.\n\nARTES:\n• Cambia forma: Toma la forma de cualquier ser. Cada forma tiene su propio set de artes. +1/nivel: Nv0:1 Nv1:2 Nv2:3 Nv3:4 Nv4:5.\n• Invisibilidad: Nv0: cualquier golpe | Nv1: 2d6+2 | Nv2: 2d6+3 | Nv3: 3d6+INT/3 | Nv4: 4d6+INT/2.\n• Zarpa: Se transforma en cancerbero y ataca con sus grandes garras." }, atributos: { fuerza: 8, velocidad: 8, agilidad: 4, inteligencia: 8 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Cent-wai", type: "npc", img: ICO.leon, _folder: "Bestias Salvajes",
    system: { datos: { nombre: "Cent-wai", raza: "Cent-wai", tipo: "bestia", descripcion: "Aparenta ser una bestia doméstica. Altura: 1.2 m en cuatro patas. Peligrosamente agresivo ante mujeres hermosas. Puede modificar su anatomía para parecer humano.\n\nARTES:\n• Control melódico: Modifica sus cuerdas vocales para controlar la mente de cualquier ser vivo.\n• Grito destructor: Grito capaz de destruir grandes estructuras." }, atributos: { fuerza: 4, velocidad: 1, agilidad: 8, inteligencia: 4 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Chlasgot", type: "npc", img: ICO.zorro, _folder: "Bestias Salvajes",
    system: { datos: { nombre: "Chlasgot", raza: "Chlasgot", tipo: "bestia", descripcion: "Cánido interdimensional. Solo visibles sus ojos caninos y cola de zorro. Altura hasta 3.7 m.\n\nARTES:\n• Aliento de fuego: Exhala fuego capaz de destruir aldeas completas.\n• Dimenrutas: Viaja entre dimensiones y reaparece instantáneamente en cualquier lugar." }, atributos: { fuerza: 4, velocidad: 3, agilidad: 2, inteligencia: 5 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Naigy", type: "npc", img: ICO.gato_blanco, _folder: "Bestias Salvajes",
    system: { datos: { nombre: "Naigy", raza: "Naigy", tipo: "bestia", descripcion: "Félino de pelaje blanco y alas azules. Tamaño: 50 cm / 14 kg. Sin razonamiento. Defiende su territorio atacando sin aviso.\n\nARTES:\n• Umbranébula: Crea una neblina tan pesada que es imposible diferenciar objetos.\n• Vuelo: 3 m, 3 turnos (+1/nivel). Nv1:4 Nv2:5 Nv3:6 Nv4:7." }, atributos: { fuerza: 3, velocidad: 5, agilidad: 3, inteligencia: 3 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Sonelat", type: "npc", img: ICO.gato_gris, _folder: "Bestias Salvajes",
    system: { datos: { nombre: "Sonelat", raza: "Sonelat", tipo: "bestia", descripcion: "Félido gris de 70 cm y 310 kg. Depredador sigiloso experto en distorsionar sonidos.\n\nARTES:\n• Anomalía acústica: Controla todos los sonidos de una zona.\n• Garra resonante: Vibraciones en las garras; daño y desorientación al impacto.\n• Zarpazo sónico: Pulso sonoro dirigido que causa daño interno sin contacto físico.\n• Aullido extremo: Onda acústica lineal que daña estructuras y derriba enemigos." }, atributos: { fuerza: 1, velocidad: 3, agilidad: 3, inteligencia: 3 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},

  // ── Bestias Domésticas ─────────────────────────────────────
  { name: "Planzúl", type: "npc", img: ICO.ave_dorada, _folder: "Bestias Domésticas",
    system: { datos: { nombre: "Planzúl", raza: "Planzúl", tipo: "bestia", descripcion: "Ave de cuatro patas y plumaje dorado/bronceado. Alcanza mach 10.\n\nARTES:\n• Anomalía acústica: Controla los sonidos de una zona.\n• Garra resonante: Vibraciones en las garras; daño y desorientación.\n• Zarpazo sónico: Pulso sonoro dirigido que causa daño interno.\n• Aullido extremo: Onda acústica lineal que daña estructuras y derriba enemigos." }, atributos: { fuerza: 5, velocidad: 9, agilidad: 7, inteligencia: 4 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Terl", type: "npc", img: ICO.huron, _folder: "Bestias Domésticas",
    system: { datos: { nombre: "Terl", raza: "Terl", tipo: "bestia", descripcion: "Pelaje negro, patas cortas, cuerpo alargado. Erguido: ~25 cm. Sin habilidades de combate. Inspira respeto natural en otras especies.\n\nARTES:\n• Resurrección: Puede resucitar a cualquier ser vivo (consume mucha energía).\n• Curación: Cura cualquier condición física o mental." }, atributos: { fuerza: 2, velocidad: 3, agilidad: 1, inteligencia: 6 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Dragcoin", type: "npc", img: ICO.reptil_gris, _folder: "Bestias Domésticas",
    system: { datos: { nombre: "Dragcoin", raza: "Dragcoin", tipo: "bestia", descripcion: "Reptiliano con escamas grises y cola alargada. Hasta 65 cm / ~40 kg. Con solo una mirada controla toda la naturaleza.\n\nARTES:\n• Control Totalus: Controla cualquier animal, planta o elemento en radio de 100 metros. No puede generar elementos." }, atributos: { fuerza: 4, velocidad: 8, agilidad: 8, inteligencia: 5 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Loraiz", type: "npc", img: ICO.ave_negra, _folder: "Bestias Domésticas",
    system: { datos: { nombre: "Loraiz", raza: "Loraiz", tipo: "bestia", descripcion: "Ave rapaz con pico amarillo, alas negras, cuerpo blanco y patas amarillas. Envergadura hasta 167 cm. Controla el clima a voluntad.\n\nARTES:\n• Control Totalus: Controla cualquier animal, planta o elemento en radio de 100 metros. No puede generar elementos." }, atributos: { fuerza: 8, velocidad: 5, agilidad: 6, inteligencia: 7 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Cathexin", type: "npc", img: ICO.oso_marron, _folder: "Bestias Domésticas",
    system: { datos: { nombre: "Cathexin", raza: "Cathexin", tipo: "bestia", descripcion: "Pelaje marrón, orejas redondas, nariz chata. Altura hasta 3 m. Inusualmente tiernos. Sin inteligencia estratégica.\n\nARTES:\n• Vórtice Aéreo: Genera vórtices de aire para manipular objetos, desviar ataques y levitar.\n• Esfera de Viento: Esfera de aire densificado lanzable como proyectil o usable como barrera." }, atributos: { fuerza: 8, velocidad: 7, agilidad: 8, inteligencia: 1 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},

  // ── Oscuros ────────────────────────────────────────────────
  { name: "Dradchra", type: "npc", img: ICO.humanoide_rojo, _folder: "Oscuros",
    system: { datos: { nombre: "Dradchra", raza: "Dradchra", tipo: "oscuro", descripcion: "Raza de las sombras. Nadie que los haya enfrentado ha sobrevivido.\nApariencia: Humanoides 2.5 m, piel escamosa rojo intenso, protuberancias en frente, ojos miel, nariz fina, labios pequeños.\n\nARTES: Definidas por el SR." }, atributos: { fuerza: 7, velocidad: 6, agilidad: 8, inteligencia: 7 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Chwelt (Variante 1)", type: "npc", img: ICO.humanoide_sombra, _folder: "Oscuros",
    system: { datos: { nombre: "Chwelt", raza: "Chwelt", tipo: "oscuro", descripcion: "Ningún humano convencional ha osado enfrentarlos.\nApariencia: 3 m, orejas puntiagudas, piel oscura, ojos marrón avellana, robusto, cabello rizado.\n\nARTES: Definidas por el SR." }, atributos: { fuerza: 8, velocidad: 7, agilidad: 6, inteligencia: 6 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Chwelt (Variante 2)", type: "npc", img: ICO.sombra, _folder: "Oscuros",
    system: { datos: { nombre: "Chwelt", raza: "Chwelt", tipo: "oscuro", descripcion: "Demonio destructor de ciudades.\nApariencia: Piel negra opaca con destellos violetas, ojos amatista, cabello púrpura oscuro, tatuajes tribales luminosos, ropa índigo y ébano.\n\nARTES: Definidas por el SR." }, atributos: { fuerza: 7, velocidad: 8, agilidad: 8, inteligencia: 7 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Gertas", type: "npc", img: ICO.espiritu_azul, _folder: "Oscuros",
    system: { datos: { nombre: "Gertas", raza: "Gertas", tipo: "oscuro", descripcion: "Pequeños pero de poder colosal. Dominio mental, ilusiones y fuerza descomunal. Buscan controlar, no destruir.\nApariencia: Piel translúcida azul cian, ojos sin pupilas con patrones hipnóticos, cabello luminoso etéreo. Algunos con alas traslúcidas u otros con cuernos iridiscentes.\n\nARTES: Definidas por el SR." }, atributos: { fuerza: 7, velocidad: 6, agilidad: 6, inteligencia: 8 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }},
  { name: "Ghirley", type: "npc", img: ICO.tierra, _folder: "Oscuros",
    system: { datos: { nombre: "Ghirley", raza: "Ghirley", tipo: "oscuro", descripcion: "Maestros de los sismos. Pueden hundir civilizaciones con un gesto.\nApariencia: Piel de mármol con vetas grises y tierras, musculatura prominente, ojos centelleantes, cabello ensortijado en mechones sísmicos.\n\nARTES: Definidas por el SR." }, atributos: { fuerza: 6, velocidad: 6, agilidad: 7, inteligencia: 7 }, estado: { ptHerida: { value: 0, min: 0, max: 8 }, ptSalud: { value: 8, min: 0, max: 8 } }, pa: { value: 6, min: 0, max: 6 } }}
];

/* ══════════════════════════════════════════════════════════
   DEFINICIÓN DE PACKS
══════════════════════════════════════════════════════════ */
const PACKS_UNDAVAR = [
  { id: "undavar-objetos-elixires", label: "UNDAVAR — Objetos y Elixires", tipo: "Item",   datos: OBJETOS   },
  { id: "undavar-armas-especiales", label: "UNDAVAR — Armas Especiales",    tipo: "Item",   datos: ARMAS     },
  { id: "undavar-bestiario",        label: "UNDAVAR — Bestiario",            tipo: "Actor",  datos: BESTIARIO }
];

/* ══════════════════════════════════════════════════════════
   HELPER — Obtiene o crea una carpeta dentro de un compendio
══════════════════════════════════════════════════════════ */
async function obtenerOCrearCarpeta(pack, nombreCarpeta, tipo) {
  // Buscar si ya existe una carpeta con ese nombre en este compendio
  const existente = pack.folders.find(f => f.name === nombreCarpeta);
  if (existente) return existente;

  // Crear la carpeta
  const nuevaCarpeta = await Folder.create(
    { name: nombreCarpeta, type: tipo, sorting: "a" },
    { pack: pack.collection }
  );
  return nuevaCarpeta;
}

/* ══════════════════════════════════════════════════════════
   INICIALIZACIÓN — Se ejecuta una sola vez al cargar el mundo
   Los compendios que ya existan NO se modifican.
══════════════════════════════════════════════════════════ */
Hooks.once("ready", async () => {
  // Solo el GM puede crear compendios
  if (!game.user.isGM) return;

  let creados = 0;

  for (const pack of PACKS_UNDAVAR) {
    const clave = `world.${pack.id}`;

    // ── Si el pack ya existe, no hacer nada ──────────────────
    if (game.packs.get(clave)) {
      console.log(`UNDAVAR | Compendio ya existe, omitiendo: "${pack.label}"`);
      continue;
    }

    // ── Crear el compendio ───────────────────────────────────
    try {
      const nuevoPack = await CompendiumCollection.createCompendium({
        name:   pack.id,
        label:  pack.label,
        type:   pack.tipo,
        system: game.system.id
      });

      // ── Cachear carpetas para no crearlas múltiples veces ──
      const carpetaCache = {};

      // ── Poblar agrupando por carpeta ───────────────────────
      const cls = nuevoPack.documentClass;

      for (const doc of pack.datos) {
        const nombreCarpeta = doc._folder ?? "Sin categoría";

        // Obtener (o crear) la carpeta
        if (!carpetaCache[nombreCarpeta]) {
          carpetaCache[nombreCarpeta] = await obtenerOCrearCarpeta(
            nuevoPack, nombreCarpeta, pack.tipo
          );
        }
        const carpeta = carpetaCache[nombreCarpeta];

        // Crear el documento eliminando la prop auxiliar _folder
        const { _folder, ...docData } = doc;
        await cls.create(
          { ...docData, folder: carpeta.id },
          { pack: nuevoPack.collection }
        );
      }

      console.log(`UNDAVAR | ✅ Compendio creado: "${pack.label}" (${pack.datos.length} entradas)`);
      creados++;

    } catch (err) {
      console.error(`UNDAVAR | ❌ Error creando "${pack.label}":`, err);
    }
  }

  if (creados > 0) {
    ui.notifications.info(`UNDAVAR | ${creados} compendio(s) creado(s) correctamente.`);
  }
});
