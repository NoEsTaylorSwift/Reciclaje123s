const upcycleLibrary = {
  textile: {
    label: "Tela o ropa", icon: "👕",
    keywords: ["ropa", "camisa", "camiseta", "playera", "pantalon", "pantalón", "jean", "mezclilla", "vestido", "sueter", "suéter", "sudadera", "calcetin", "calcetín", "tela", "sabana", "sábana", "toalla"],
    safety: "Usa únicamente textiles limpios y completamente secos. Si tienen moho, aceite o sustancias desconocidas, no los reutilices.",
    projects: [
      { title: "Bolsa reutilizable sin desperdicio", purpose: "home", levels: ["beginner"], time: "35–50 min", icon: "▱", summary: "Convierte la tela resistente en una bolsa ligera para compras, libros o uso diario.", tools: ["Tijeras para tela", "Hilo y aguja o pegamento textil", "Regla y marcador lavable"], steps: ["Extiende la prenda y recorta dos rectángulos del mismo tamaño, conservando las costuras útiles.", "Coloca las caras exteriores una frente a otra y une los costados y la base.", "Corta dos tiras para las asas y fíjalas con varias puntadas o uniones reforzadas.", "Da vuelta la bolsa, revisa las uniones y prueba primero con poco peso."], safety: "No cargues objetos pesados hasta comprobar que todas las costuras resisten." },
      { title: "Organizador colgante de bolsillos", purpose: "storage", levels: ["beginner", "intermediate"], time: "45–70 min", icon: "▥", summary: "Aprovecha bolsillos y retazos para organizar cables, útiles o accesorios en la pared.", tools: ["Tijeras", "Aguja e hilo", "Una percha o varilla reutilizada"], steps: ["Recorta una pieza grande de tela que funcionará como base.", "Retira bolsillos de otras prendas o forma pequeños rectángulos con los retazos.", "Distribuye los bolsillos sobre la base y sujétalos antes de coser.", "Forma un canal en la parte superior, introduce la varilla y cuelga el organizador."], safety: "Cuélgalo con una fijación adecuada y evita colocar objetos cortantes o demasiado pesados." },
      { title: "Funda de cojín con historia", purpose: "decor", levels: ["beginner"], time: "30–45 min", icon: "◇", summary: "Conserva estampados o detalles especiales creando una funda decorativa removible.", tools: ["Tijeras", "Alfileres", "Hilo y aguja o máquina de coser"], steps: ["Mide el cojín y corta una pieza frontal y dos piezas traseras con 2 cm extra por lado.", "Haz un dobladillo en los bordes que se superpondrán en la parte trasera.", "Coloca las piezas con las caras exteriores hacia dentro y cose todo el contorno.", "Voltea la funda, introduce el cojín y acomoda las esquinas."], safety: "Retira botones o adornos sueltos si la funda estará al alcance de niños pequeños." },
      { title: "Cesta tejida con tiras de tela", purpose: "storage", levels: ["intermediate"], time: "90–120 min", icon: "◎", summary: "Transforma varias prendas desgastadas en una cesta flexible para objetos livianos.", tools: ["Tijeras", "Hilo fuerte", "Aguja gruesa"], steps: ["Corta la tela en tiras largas de ancho similar y únelas hasta formar tres cordones.", "Trenza los cordones con tensión uniforme.", "Enrolla la trenza en espiral y cose cada vuelta con la anterior.", "Continúa levantando las vueltas para formar las paredes y remata el extremo."], safety: "Usa dedal si trabajas con tela gruesa y reserva la cesta para objetos secos y livianos." }
    ]
  },
  wood: {
    label: "Madera", icon: "▦",
    keywords: ["palet", "pallet", "tarima", "madera", "tabla", "cajon de madera", "cajón de madera", "caja de madera"],
    safety: "Reutiliza solo madera seca, firme y sin moho. En palets, evita los marcados MB y prefiere los sellados HT.",
    projects: [
      { title: "Jardín vertical con palet", purpose: "garden", levels: ["intermediate"], time: "3–4 h", icon: "♧", summary: "Convierte la madera recuperada en un soporte vertical para plantas aromáticas o decorativas.", tools: ["Lija y cepillo", "Tornillos para madera", "Tela geotextil", "Destornillador o taladro"], steps: ["Comprueba que la madera esté firme, seca y libre de clavos salientes.", "Lija toda la superficie y redondea las esquinas ásperas.", "Refuerza las tablas flojas con tornillos y forma bolsillos con tela geotextil.", "Añade sustrato y plantas de raíces pequeñas.", "Fija el jardín a una pared o base estable antes de regar."], safety: "Usa guantes, gafas y mascarilla al lijar. No plantes alimentos si desconoces el tratamiento químico de la madera." },
      { title: "Estante rústico de pared", purpose: "storage", levels: ["intermediate"], time: "2–3 h", icon: "▤", summary: "Recupera las tablas más rectas para crear un estante pequeño y funcional.", tools: ["Sierra", "Lija", "Tornillos", "Escuadras y nivel"], steps: ["Selecciona una tabla firme y marca la longitud del estante.", "Corta con apoyo estable, lija caras y cantos, y limpia todo el polvo.", "Aplica un acabado al agua y deja secar según sus instrucciones.", "Instala las escuadras niveladas y atornilla la tabla.", "Prueba la resistencia con poco peso antes de utilizarlo."], safety: "La fijación debe corresponder al tipo de pared. Pide ayuda adulta si no tienes experiencia con sierra o taladro." },
      { title: "Mesa auxiliar de madera recuperada", purpose: "home", levels: ["intermediate"], time: "4–6 h", icon: "▰", summary: "Ensambla tablas sanas para formar una mesa compacta junto al sofá o la cama.", tools: ["Sierra y lija", "Tornillos para madera", "Escuadra", "Acabado al agua"], steps: ["Diseña una cubierta pequeña y cuatro patas de la misma altura.", "Corta y lija cada pieza hasta eliminar astillas y bordes filosos.", "Une las patas con travesaños y verifica que la estructura quede a escuadra.", "Atornilla la cubierta, nivela la mesa y aplica el acabado.", "Deja curar completamente antes de colocar objetos."], safety: "No utilices tablas rajadas o debilitadas. Sujeta cada pieza antes de cortarla o perforarla." },
      { title: "Panel decorativo para fotografías", purpose: "decor", levels: ["beginner"], time: "60–90 min", icon: "▧", summary: "Una tabla recuperada puede convertirse en un panel para notas y fotografías.", tools: ["Lija", "Pintura al agua", "Cordel", "Pinzas pequeñas"], steps: ["Lija la tabla y elimina polvo y cualquier grapa o clavo antiguo.", "Pinta solo algunas zonas para conservar parte de la textura natural.", "Rodea la tabla con varias líneas de cordel bien tensas.", "Sujeta fotos o notas con pinzas pequeñas y coloca un soporte trasero."], safety: "Cuelga el panel con un anclaje apropiado para su peso y mantén las astillas cubiertas." }
    ]
  },
  glass: {
    label: "Vidrio", icon: "◇",
    keywords: ["frasco", "tarro", "vidrio", "botella de vidrio", "botella de vino", "botella de cerveza"],
    safety: "Trabaja únicamente con vidrio entero, sin grietas ni bordes cortantes. No intentes perforarlo o cortarlo sin equipo especializado.",
    projects: [
      { title: "Organizador transparente de despensa", purpose: "storage", levels: ["beginner"], time: "25–40 min", icon: "▥", summary: "Convierte frascos completos en recipientes visibles para alimentos secos u objetos pequeños.", tools: ["Agua caliente y jabón", "Etiquetas", "Pintura al agua para las tapas"], steps: ["Retira etiquetas y adhesivo, y lava el frasco y la tapa por separado.", "Deja secar completamente para evitar humedad en el interior.", "Decora la tapa y prepara una etiqueta clara para el contenido.", "Llena el frasco solo con productos secos y colócalo en una superficie estable."], safety: "No reutilices envases que contuvieron químicos. Para alimentos, usa tapas limpias y sin óxido." },
      { title: "Estación de propagación", purpose: "garden", levels: ["beginner"], time: "20–30 min", icon: "♧", summary: "Usa recipientes de vidrio como pequeños propagadores para esquejes de plantas.", tools: ["Agua", "Esquejes saludables", "Cordel o etiquetas"], steps: ["Lava y enjuaga muy bien el recipiente.", "Llena dos tercios con agua limpia.", "Retira las hojas que quedarían bajo el agua e introduce el esqueje.", "Colócalo con luz indirecta y cambia el agua cada pocos días.", "Trasplanta cuando las raíces tengan el tamaño adecuado."], safety: "Coloca el recipiente lejos de bordes y revisa que no tenga grietas antes de cada cambio de agua." },
      { title: "Lámpara ambiental con luces LED", purpose: "decor", levels: ["beginner"], time: "25–45 min", icon: "✦", summary: "Transforma un frasco en una luz decorativa sin calor para una mesa o repisa.", tools: ["Guirnalda LED a pilas", "Papel translúcido o cordel", "Pegamento al agua"], steps: ["Lava, seca y comprueba que el vidrio esté intacto.", "Decora el exterior sin cubrir totalmente la transparencia.", "Introduce una guirnalda LED y deja accesible el interruptor.", "Coloca la tapa sin presionar el cable y prueba la iluminación."], safety: "Usa únicamente luces LED de bajo voltaje. Nunca coloques una vela o llama dentro del frasco." },
      { title: "Dispensador de materiales creativos", purpose: "home", levels: ["beginner"], time: "20–35 min", icon: "◎", summary: "Agrupa lápices, pinceles o retazos en recipientes transparentes y fáciles de identificar.", tools: ["Jabón", "Pintura o cinta decorativa", "Protectores adhesivos para la base"], steps: ["Lava el frasco y elimina por completo los restos del contenido anterior.", "Protege la base con puntos adhesivos para evitar golpes contra la mesa.", "Decora una franja exterior sin ocultar el contenido.", "Clasifica objetos livianos y coloca los más largos en recipientes altos."], safety: "No lo sobrecargues ni lo uses para herramientas puntiagudas al alcance de niños." }
    ]
  },
  plastic: {
    label: "Plástico", icon: "♳",
    keywords: ["plastico", "plástico", "botella plastica", "botella plástica", "envase plastico", "envase plástico", "cubeta", "bidon", "bidón", "tapa"],
    safety: "Lava el envase y confirma que no haya contenido químicos, pesticidas o combustibles. No lo expongas al fuego ni a altas temperaturas.",
    projects: [
      { title: "Maceta autorregable", purpose: "garden", levels: ["intermediate"], time: "40–60 min", icon: "♧", summary: "Separa una botella resistente en dos piezas para crear una reserva sencilla de agua.", tools: ["Tijeras fuertes o cúter", "Cordón de algodón", "Sustrato y planta pequeña"], steps: ["Lava la botella y marca una línea alrededor de la mitad.", "Pide ayuda adulta para realizar un corte uniforme y suaviza el borde con cinta resistente.", "Perfora la tapa, pasa el cordón y vuelve a enroscarla.", "Invierte la parte superior, añade sustrato y colócala dentro de la base con agua.", "Comprueba que el cordón toque el agua y evita que las raíces permanezcan inundadas."], safety: "Los cortes de plástico pueden quedar filosos. Usa guantes y pide ayuda adulta para emplear cúter." },
      { title: "Organizadores modulares", purpose: "storage", levels: ["beginner"], time: "30–50 min", icon: "▦", summary: "Convierte envases limpios en módulos para lápices, tornillos u objetos pequeños.", tools: ["Tijeras", "Cinta resistente", "Etiquetas"], steps: ["Elige varios envases del mismo tamaño y retira tapas y etiquetas.", "Marca una altura común y corta con cuidado.", "Cubre todos los bordes con cinta resistente.", "Une los módulos por los costados y añade etiquetas.", "Coloca una base de cartón rígido si necesitas mover el conjunto."], safety: "Reserva los módulos para objetos secos y livianos. Cubre por completo cualquier borde áspero." },
      { title: "Jardín vertical de botellas", purpose: "garden", levels: ["intermediate"], time: "75–100 min", icon: "♧", summary: "Crea una serie de macetas livianas para hierbas u ornamentales pequeñas.", tools: ["Tijeras o cúter", "Cordel resistente", "Sustrato", "Punzón"], steps: ["Lava las botellas y marca una abertura lateral en cada una.", "Realiza las aberturas y pequeños orificios de drenaje con ayuda adulta.", "Pasa dos líneas de cordel y haz nudos debajo de cada botella.", "Añade poco sustrato y plantas pequeñas.", "Cuelga el conjunto en un soporte firme y riega con moderación."], safety: "No lo instales sobre zonas de paso. Verifica periódicamente que el cordel y el soporte estén firmes." },
      { title: "Pantalla decorativa de tapas", purpose: "decor", levels: ["beginner"], time: "45–70 min", icon: "◉", summary: "Organiza tapas por color para formar un mosaico reutilizable sobre una base recuperada.", tools: ["Tapas limpias", "Cartón grueso o madera fina", "Pegamento adecuado"], steps: ["Lava, seca y separa las tapas por color y tamaño.", "Dibuja un patrón sencillo sobre la base.", "Prueba la composición sin pegamento y ajusta los espacios.", "Fija cada tapa, deja secar y añade un soporte en la parte trasera."], safety: "No uses tapas que hayan contenido químicos y mantén las piezas pequeñas lejos de niños pequeños." }
    ]
  },
  metal: {
    label: "Metal", icon: "◉",
    keywords: ["lata", "aluminio", "metal", "envase metalico", "envase metálico", "bote de conserva"],
    safety: "Comprueba que el metal esté limpio y sin óxido profundo. Cubre todos los bordes cortantes antes de utilizarlo.",
    projects: [
      { title: "Organizador de escritorio", purpose: "storage", levels: ["beginner"], time: "30–45 min", icon: "▥", summary: "Agrupa latas seguras para ordenar lápices, pinceles y pequeños materiales.", tools: ["Lija fina", "Cinta para bordes", "Pintura al agua", "Base recuperada"], steps: ["Lava y seca las latas y verifica que no queden rebabas.", "Lija suavemente y cubre cada borde con cinta resistente.", "Decora las superficies y deja secar.", "Fija las latas sobre una base para evitar que vuelquen."], safety: "Descarta cualquier lata con borde imposible de cubrir o con óxido avanzado." },
      { title: "Maceta con drenaje", purpose: "garden", levels: ["beginner"], time: "35–50 min", icon: "♧", summary: "Una lata limpia puede alojar una planta pequeña en una repisa protegida.", tools: ["Clavo y martillo", "Lija", "Pintura", "Sustrato"], steps: ["Lava la lata y cubre el borde superior.", "Con apoyo estable y ayuda adulta, realiza pequeños orificios en la base.", "Lija, pinta y deja secar por completo.", "Añade piedras pequeñas, sustrato y una planta adecuada.", "Coloca un plato debajo para recoger el agua."], safety: "Usa guantes y gafas al perforar. No dejes bordes metálicos expuestos." },
      { title: "Farol LED perforado", purpose: "decor", levels: ["intermediate"], time: "50–75 min", icon: "✦", summary: "Forma un patrón de puntos que proyectará una luz suave mediante una vela LED.", tools: ["Clavo y martillo", "Marcador", "Pintura", "Vela LED"], steps: ["Llena la lata con agua y congélala para que conserve su forma.", "Dibuja un patrón y perfora los puntos con la lata apoyada de forma segura.", "Deja descongelar, seca, lija y cubre los bordes.", "Pinta el exterior y coloca una vela LED en el interior."], safety: "Pide ayuda adulta para perforar y usa solo iluminación LED, nunca una llama real." },
      { title: "Soporte para utensilios", purpose: "home", levels: ["beginner"], time: "25–40 min", icon: "▤", summary: "Reutiliza un recipiente metálico ancho para mantener utensilios secos y visibles.", tools: ["Protector para bordes", "Pintura al agua", "Base antideslizante"], steps: ["Lava, seca y revisa cuidadosamente todo el borde.", "Cubre el borde y añade una base antideslizante.", "Decora únicamente el exterior y deja secar.", "Distribuye los utensilios sin sobrecargar el recipiente."], safety: "No lo uses si el interior tiene óxido o si no puedes eliminar por completo las partes cortantes." }
    ]
  },
  paper: {
    label: "Papel o cartón", icon: "▤",
    keywords: ["carton", "cartón", "caja", "papel", "periodico", "periódico", "revista", "tubo de carton", "tubo de cartón"],
    safety: "El papel y el cartón deben estar secos, limpios y sin grasa. Evita materiales con moho o contaminación.",
    projects: [
      { title: "Divisores para cajones", purpose: "storage", levels: ["beginner"], time: "30–45 min", icon: "▦", summary: "Convierte cartón firme en compartimentos hechos a la medida de un cajón.", tools: ["Regla", "Tijeras o cúter", "Pegamento al agua", "Papel decorativo"], steps: ["Mide el interior del cajón y decide el tamaño de los compartimentos.", "Corta tiras de cartón con la altura del cajón.", "Haz ranuras a la mitad de cada tira y ensámblalas en forma de rejilla.", "Forra o pinta la estructura y colócala en el cajón."], safety: "Pide ayuda adulta para usar cúter y trabaja sobre una base de corte." },
      { title: "Semilleros biodegradables", purpose: "garden", levels: ["beginner"], time: "25–40 min", icon: "♧", summary: "Utiliza tubos o cartón sin recubrimiento para iniciar pequeñas plantas.", tools: ["Tijeras", "Sustrato", "Semillas", "Bandeja reutilizada"], steps: ["Corta el tubo en secciones del mismo tamaño.", "Haz cuatro cortes cortos en un extremo y dobla las pestañas para cerrar la base.", "Coloca los recipientes en una bandeja y añade sustrato.", "Siembra, etiqueta y riega con poca agua.", "Trasplanta el semillero completo cuando la planta esté lista."], safety: "No uses cartón brillante, plastificado o contaminado con grasa." },
      { title: "Cuenco de papel en capas", purpose: "decor", levels: ["intermediate"], time: "2 h + secado", icon: "◡", summary: "Superpone tiras de papel para formar un recipiente decorativo destinado a objetos secos.", tools: ["Papel", "Pegamento blanco diluido", "Pincel", "Un cuenco como molde"], steps: ["Protege el molde con una capa removible.", "Corta papel en tiras y aplica varias capas cruzadas con pegamento.", "Deja secar por completo antes de separar la pieza del molde.", "Recorta el borde y añade una última capa decorativa.", "Sella con producto al agua si deseas mayor duración."], safety: "Úsalo solo para objetos secos; no es apto para alimentos ni líquidos." },
      { title: "Bandeja para llaves y correspondencia", purpose: "home", levels: ["beginner"], time: "40–60 min", icon: "▱", summary: "Refuerza una caja baja para crear un punto de entrada ordenado.", tools: ["Caja de cartón firme", "Pegamento", "Papel recuperado", "Regla"], steps: ["Recorta la caja a una altura baja y uniforme.", "Refuerza la base y las esquinas con una segunda capa de cartón.", "Forra el interior y el exterior con papel recuperado.", "Añade divisiones pequeñas para separar llaves y correspondencia."], safety: "Mantén la bandeja lejos del agua y no guardes objetos calientes o muy pesados." }
    ]
  },
  furniture: {
    label: "Mueble", icon: "▰",
    keywords: ["mueble", "silla", "mesa", "cajon", "cajón", "gaveta", "estante", "repisa", "banco", "armario"],
    safety: "Antes de modificar un mueble, comprueba que no tenga plagas, moho, piezas estructurales rotas ni pinturas antiguas que puedan contener sustancias peligrosas.",
    projects: [
      { title: "Cajón convertido en repisa", purpose: "storage", levels: ["intermediate"], time: "2–3 h", icon: "▤", summary: "Un cajón sólido puede convertirse en una repisa cerrada para objetos livianos.", tools: ["Lija", "Pintura al agua", "Tornillos y anclajes", "Nivel"], steps: ["Retira herrajes flojos y comprueba que todas las uniones estén firmes.", "Lija, limpia y aplica un acabado al agua.", "Marca dos puntos de fijación en la parte posterior.", "Instala anclajes adecuados a la pared y cuelga el cajón nivelado.", "Prueba primero con objetos livianos."], safety: "Usa fijaciones apropiadas para el peso y tipo de pared. No reutilices una pieza debilitada." },
      { title: "Silla convertida en soporte para plantas", purpose: "garden", levels: ["intermediate"], time: "3–4 h", icon: "♧", summary: "Una silla estable puede sostener una maceta y añadir altura a un rincón verde.", tools: ["Lija", "Pintura para exterior al agua", "Maceta con plato", "Tornillos"], steps: ["Revisa patas y uniones; refuerza cualquier movimiento antes de continuar.", "Lija y aplica un acabado apropiado para el lugar donde se usará.", "Centra la maceta sobre el asiento y añade topes para evitar deslizamientos.", "Coloca la silla en una superficie nivelada y protegida del exceso de lluvia."], safety: "Esta transformación es decorativa: no vuelvas a usar la silla como asiento." },
      { title: "Banco renovado con pintura", purpose: "home", levels: ["intermediate"], time: "4–6 h", icon: "▰", summary: "Renueva una pieza estructuralmente sana mediante limpieza, ajustes y un acabado nuevo.", tools: ["Destornillador", "Lija", "Pintura al agua", "Brocha"], steps: ["Comprueba que la estructura soporte peso sin moverse ni crujir.", "Aprieta tornillos y reemplaza únicamente herrajes equivalentes.", "Lija el acabado superficial usando protección respiratoria.", "Limpia el polvo, pinta en capas delgadas y respeta el tiempo de curado.", "Prueba de forma gradual antes de usar el banco."], safety: "Si hay grietas estructurales o pintura antigua desconocida, consulta a una persona profesional." },
      { title: "Mesa auxiliar con mosaico recuperado", purpose: "decor", levels: ["intermediate"], time: "4 h + secado", icon: "◇", summary: "Renueva la cubierta de una mesa firme con piezas decorativas seguras y de bordes suaves.", tools: ["Lija", "Piezas decorativas sin filos", "Adhesivo", "Sellador al agua"], steps: ["Confirma que la mesa esté firme y nivela la cubierta.", "Lija y limpia la superficie.", "Diseña el patrón con todas las piezas antes de fijarlas.", "Adhiere desde el centro hacia los bordes y deja secar.", "Sella la cubierta y espera el tiempo recomendado antes de usarla."], safety: "No emplees vidrio roto ni cerámica con filos. Usa únicamente piezas preparadas para mosaico." }
    ]
  },
  electronics: {
    label: "Electrónico", icon: "⚡",
    keywords: ["electronico", "electrónico", "celular", "telefono", "teléfono", "computadora", "laptop", "teclado", "mouse", "raton", "ratón", "control remoto", "televisor", "radio", "cargador", "bateria", "batería"],
    safety: "No abras ni cortes aparatos eléctricos o baterías. Pueden conservar carga, contener sustancias peligrosas o provocar incendios.",
    projects: []
  }
};

const materialMatchers = ["electronics", "furniture", "glass", "textile", "wood", "metal", "paper", "plastic"];
const materialLabels = Object.fromEntries(Object.entries(upcycleLibrary).map(([key, value]) => [key, value.label]));
const levelLabels = { beginner: "Fácil", intermediate: "Intermedia" };
const hazardousTerms = ["pesticida", "insecticida", "gasolina", "combustible", "solvente", "thinner", "quimico", "químico", "aceite de motor", "medicamento", "moho", "asbesto", "bateria hinchada", "batería hinchada"];

const upcycleForm = document.getElementById("upcycle-form");
const upcycleItem = document.getElementById("upcycle-item");
const upcycleMaterial = document.getElementById("upcycle-material");
const upcycleCondition = document.getElementById("upcycle-condition");
const upcyclePurpose = document.getElementById("upcycle-purpose");
const upcycleLevel = document.getElementById("upcycle-level");
const upcyclePhoto = document.getElementById("upcycle-photo");
const upcyclePreview = document.getElementById("upcycle-preview");
const upcyclePhotoStatus = document.getElementById("upcycle-photo-status");
const recipePlaceholder = document.getElementById("recipe-placeholder");
const recipeLoading = document.getElementById("recipe-loading");
const recipeResult = document.getElementById("recipe-result");
let upcycleModelsPromise = null;
let upcycleAnalysisId = 0;
let recipeOffset = 0;
let lastRecipeTitle = "";
let previewUrl = "";

const normalizeUpcycle = value => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

function inferMaterial(description, selectedMaterial = "auto") {
  if (selectedMaterial !== "auto" && upcycleLibrary[selectedMaterial]) return selectedMaterial;
  const normalized = normalizeUpcycle(description);
  return materialMatchers.find(key => upcycleLibrary[key].keywords.some(keyword => normalized.includes(normalizeUpcycle(keyword)))) || null;
}

function hashText(value) {
  return [...value].reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 7);
}

function prepareItemName(value) {
  return value.trim().replace(/[<>]/g, "");
}

function conditionPreparation(item, condition, material) {
  if (condition === "worn") return `Limpia y seca ${item}; revisa costuras, uniones y zonas débiles antes de transformarlo.`;
  if (condition === "damaged") return `Separa las partes todavía firmes de ${item} y descarta de forma segura cualquier pieza con filos, contaminación o daño estructural.`;
  const verb = material === "paper" ? "Limpia en seco" : "Lava o limpia";
  return `${verb} ${item} y deja que seque completamente antes de comenzar.`;
}

function unsafeReason(item, material, condition) {
  const normalized = normalizeUpcycle(item);
  if (hazardousTerms.some(term => normalized.includes(normalizeUpcycle(term)))) return "El objeto puede estar contaminado con una sustancia que no debe manipularse en un proyecto doméstico.";
  if (material === "glass" && condition === "damaged") return "El vidrio roto o agrietado puede causar cortes y no debe transformarse con herramientas domésticas.";
  if (material === "electronics") return "Los aparatos y baterías no deben abrirse ni convertirse en manualidades; pueden conservar carga o contener materiales peligrosos.";
  if (material === "wood" && condition === "damaged") return "La madera astillada, podrida o contaminada puede fallar y no es segura para construir un objeto nuevo.";
  return "";
}

function blockedProject(item, material, reason) {
  const label = materialLabels[material] || "Material no identificado";
  return {
    blocked: true, icon: "!", label: "NO ES SEGURO TRANSFORMARLO", title: "Detén este proyecto",
    summary: `${reason} La opción responsable es aislar ${item} y consultar un punto de recolección adecuado.`,
    time: "Prioriza la seguridad", level: "Sin proyecto", material: label,
    materials: ["Guantes adecuados al residuo", "Un recipiente o envoltura firme", "Información del servicio local de recolección"],
    steps: ["Evita seguir manipulando, cortando o desmontando el objeto.", "Aísla las partes dañadas para que nadie entre en contacto accidentalmente.", "Consulta las reglas municipales o un gestor autorizado para ese material.", "Transporta el residuo protegido y explica su estado al personal de recepción."],
    safety: upcycleLibrary[material]?.safety || "No manipules un material cuyo origen o contenido desconozcas."
  };
}

function chooseProject(item, material, purpose, level) {
  const projects = upcycleLibrary[material].projects;
  const preferred = projects.filter(project => project.purpose === purpose && project.levels.includes(level));
  const samePurpose = projects.filter(project => project.purpose === purpose);
  const sameLevel = projects.filter(project => project.levels.includes(level));
  let candidates = preferred.length ? preferred : samePurpose.length ? samePurpose : sameLevel.length ? sameLevel : projects;
  if (recipeOffset > 0 && projects.length > 1) {
    const alternatives = projects.filter(project => project.title !== lastRecipeTitle);
    if (alternatives.length) candidates = alternatives;
  }
  const index = (hashText(normalizeUpcycle(item)) + recipeOffset) % candidates.length;
  return candidates[index];
}

function composeProject(item, material, condition, purpose, level) {
  const danger = unsafeReason(item, material, condition);
  if (danger) return blockedProject(item, material, danger);
  const definition = upcycleLibrary[material];
  const project = chooseProject(item, material, purpose, level);
  lastRecipeTitle = project.title;
  return {
    blocked: false, icon: project.icon, label: "PROYECTO RECOMENDADO", title: project.title,
    summary: `${project.summary} Esta receta está adaptada para ${item}.`,
    time: project.time, level: levelLabels[level], material: definition.label,
    materials: [`Tu objeto: ${item}`, ...project.tools],
    steps: [conditionPreparation(item, condition, material), ...project.steps],
    safety: `${definition.safety} ${project.safety}`
  };
}

function renderList(elementId, items) {
  const list = document.getElementById(elementId);
  list.replaceChildren(...items.map(item => {
    const entry = document.createElement("li");
    entry.textContent = item;
    return entry;
  }));
}

function renderProject(project) {
  document.getElementById("recipe-icon").textContent = project.icon;
  document.getElementById("recipe-label").textContent = project.label;
  document.getElementById("recipe-title").textContent = project.title;
  document.getElementById("recipe-summary").textContent = project.summary;
  document.getElementById("recipe-time").textContent = `◷ ${project.time}`;
  document.getElementById("recipe-level").textContent = `◎ ${project.level}`;
  document.getElementById("recipe-material").textContent = `♻ ${project.material}`;
  document.getElementById("recipe-safety").textContent = project.safety;
  renderList("recipe-materials", project.materials);
  renderList("recipe-steps", project.steps);
  document.getElementById("recipe-alternative").hidden = project.blocked;
  recipePlaceholder.hidden = true;
  recipeLoading.hidden = true;
  recipeResult.hidden = false;
}

function generateUpcycleProject({ alternative = false } = {}) {
  const item = prepareItemName(upcycleItem.value);
  if (!item) {
    upcyclePhotoStatus.textContent = "Describe el objeto o elige una fotografía antes de generar el proyecto.";
    upcycleItem.focus();
    return false;
  }
  const material = inferMaterial(item, upcycleMaterial.value);
  if (!material) {
    upcyclePhotoStatus.textContent = "No pude identificar el material. Selecciónalo manualmente para generar una receta segura.";
    upcycleMaterial.focus();
    return false;
  }
  if (!alternative) recipeOffset = 0;
  const project = composeProject(item, material, upcycleCondition.value, upcyclePurpose.value, upcycleLevel.value);
  recipePlaceholder.hidden = true;
  recipeResult.hidden = true;
  recipeLoading.hidden = false;
  window.setTimeout(() => renderProject(project), 420);
  return true;
}

upcycleForm?.addEventListener("submit", event => {
  event.preventDefault();
  generateUpcycleProject();
});

document.querySelectorAll("[data-upcycle-example]").forEach(button => button.addEventListener("click", () => {
  upcycleItem.value = button.dataset.upcycleExample;
  upcycleMaterial.value = button.dataset.material;
  upcyclePhotoStatus.textContent = "Ejemplo seleccionado. Ajusta las opciones y genera el proyecto.";
}));

document.getElementById("recipe-alternative")?.addEventListener("click", () => {
  recipeOffset += 1;
  generateUpcycleProject({ alternative: true });
});

function resetUpcycle() {
  upcycleAnalysisId += 1;
  upcycleForm.reset();
  recipeOffset = 0;
  lastRecipeTitle = "";
  recipeResult.hidden = true;
  recipeLoading.hidden = true;
  recipePlaceholder.hidden = false;
  upcyclePreview.hidden = true;
  upcyclePreview.removeAttribute("src");
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = "";
  upcyclePhotoStatus.textContent = "La foto se procesa en este dispositivo y no se guarda.";
  upcycleItem.focus();
}

document.getElementById("recipe-reset")?.addEventListener("click", resetUpcycle);

async function loadUpcycleModels() {
  if (upcycleModelsPromise) return upcycleModelsPromise;
  if (typeof tf === "undefined" || typeof cocoSsd === "undefined" || typeof mobilenet === "undefined") throw new Error("No se pudieron cargar los modelos de reconocimiento. Revisa tu conexión a internet.");
  upcycleModelsPromise = (async () => {
    await tf.ready();
    const [detector, classifier] = await Promise.all([
      cocoSsd.load({ base: "mobilenet_v2" }),
      mobilenet.load({ version: 2, alpha: 1.0 })
    ]);
    return { detector, classifier };
  })();
  try {
    return await upcycleModelsPromise;
  } catch (error) {
    upcycleModelsPromise = null;
    throw error;
  }
}

function preparePhotoSource(image, maxDimension = 1400) {
  const largestSide = Math.max(image.naturalWidth, image.naturalHeight);
  if (!largestSide || largestSide <= maxDimension) return image;
  const scale = maxDimension / largestSide;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.naturalWidth * scale);
  canvas.height = Math.round(image.naturalHeight * scale);
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

const detectedObjects = {
  bottle: { object: "botella", material: null }, cup: { object: "vaso o taza", material: null }, bowl: { object: "recipiente", material: null },
  vase: { object: "florero", material: "glass" }, chair: { object: "silla", material: "furniture" }, bench: { object: "banco", material: "furniture" },
  "dining table": { object: "mesa", material: "furniture" }, book: { object: "libro", material: "paper" },
  "potted plant": { object: "maceta", material: null }, handbag: { object: "bolso viejo", material: "textile" }, tie: { object: "corbata vieja", material: "textile" },
  backpack: { object: "mochila vieja", material: "textile" }, laptop: { object: "computadora portátil", material: "electronics" },
  keyboard: { object: "teclado", material: "electronics" }, mouse: { object: "ratón de computadora", material: "electronics" },
  remote: { object: "control remoto", material: "electronics" }, "cell phone": { object: "teléfono celular", material: "electronics" },
  tv: { object: "televisor", material: "electronics" }, microwave: { object: "microondas", material: "electronics" },
  toaster: { object: "tostadora", material: "electronics" }, refrigerator: { object: "refrigerador", material: "electronics" }
};

const visionMaterialRules = [
  { terms: ["jersey", "sweatshirt", "cardigan", "poncho", "shirt", "t-shirt", "jean", "denim", "sock", "apron", "backpack", "handbag", "purse"], object: "prenda o accesorio de tela", material: "textile" },
  { terms: ["pallet", "crate", "wooden spoon", "bookcase"], object: "objeto de madera", material: "wood" },
  { terms: ["mason jar", "jar", "beer bottle", "wine bottle", "vase", "goblet"], object: "frasco o botella de vidrio", material: "glass" },
  { terms: ["plastic bag", "bucket", "shower cap", "pop bottle", "water bottle"], object: "envase u objeto plástico", material: "plastic" },
  { terms: ["tin can", "oil filter", "chain", "padlock"], object: "recipiente u objeto metálico", material: "metal" },
  { terms: ["carton", "envelope", "book jacket", "comic book"], object: "papel o cartón", material: "paper" },
  { terms: ["rocking chair", "folding chair", "studio couch", "dining table", "wardrobe", "desk"], object: "mueble", material: "furniture" },
  { terms: ["laptop", "notebook computer", "keyboard", "computer mouse", "cellular telephone", "remote control", "monitor", "radio", "digital clock", "electric fan", "hair dryer"], object: "aparato electrónico", material: "electronics" }
];

function recognizeUpcycleObject(detections, predictions) {
  const detected = detections.filter(item => item.score >= .35).sort((a, b) => b.score - a.score).find(item => detectedObjects[item.class]);
  if (detected) return { ...detectedObjects[detected.class], confidence: detected.score };
  for (const prediction of predictions) {
    if (prediction.probability < .1) continue;
    const label = prediction.className.toLowerCase();
    const rule = visionMaterialRules.find(candidate => candidate.terms.some(term => label.includes(term)));
    if (rule) return { object: rule.object, material: rule.material, confidence: prediction.probability };
  }
  return null;
}

async function analyzeUpcyclePhoto() {
  const runId = ++upcycleAnalysisId;
  upcyclePhotoStatus.textContent = "Preparando el reconocimiento de la fotografía...";
  try {
    const models = await loadUpcycleModels();
    if (runId !== upcycleAnalysisId) return;
    upcyclePhotoStatus.textContent = "Reconociendo el objeto...";
    const source = preparePhotoSource(upcyclePreview);
    const [detections, predictions] = await Promise.all([
      models.detector.detect(source, 8, .2),
      models.classifier.classify(source, 7)
    ]);
    if (runId !== upcycleAnalysisId) return;
    const recognition = recognizeUpcycleObject(detections, predictions);
    if (!recognition) {
      upcyclePhotoStatus.textContent = "No pude reconocer el objeto con suficiente seguridad. Descríbelo y selecciona su material.";
      upcycleItem.focus();
      return;
    }
    upcycleItem.value = recognition.object;
    if (recognition.material) {
      upcycleMaterial.value = recognition.material;
      upcyclePhotoStatus.textContent = `Objeto reconocido. Preparando una receta para ${recognition.object}.`;
      generateUpcycleProject();
    } else {
      upcycleMaterial.value = "auto";
      upcyclePhotoStatus.textContent = `Reconocí ${recognition.object}, pero necesito que confirmes su material.`;
      upcycleMaterial.focus();
    }
  } catch (error) {
    if (runId === upcycleAnalysisId) upcyclePhotoStatus.textContent = error.message || "No fue posible analizar esta fotografía.";
  }
}

upcyclePhoto?.addEventListener("change", event => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    upcyclePhotoStatus.textContent = "Selecciona un archivo de imagen válido.";
    event.target.value = "";
    return;
  }
  if (file.size > 20 * 1024 * 1024) {
    upcyclePhotoStatus.textContent = "La fotografía supera 20 MB. Elige una imagen más pequeña.";
    event.target.value = "";
    return;
  }
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = URL.createObjectURL(file);
  upcyclePreview.onload = analyzeUpcyclePhoto;
  upcyclePreview.onerror = () => { upcyclePhotoStatus.textContent = "No se pudo abrir esa fotografía."; };
  upcyclePreview.src = previewUrl;
  upcyclePreview.hidden = false;
});

window.addEventListener("pagehide", () => {
  upcycleAnalysisId += 1;
  if (previewUrl) URL.revokeObjectURL(previewUrl);
});
