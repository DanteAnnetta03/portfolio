#!/usr/bin/env node
// Herramienta local para agregar/editar/eliminar contenido de src/data/*.ts
// (perfil, logros, proyectos) sin tocar el código a mano. No se usa en producción.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PROFILE_PATH = path.join(ROOT, "src/data/profile.ts");
const PROFILE_MARKER = "export const profile = ";

const ACHIEVEMENTS_PATH = path.join(ROOT, "src/data/achievements.ts");
const ACHIEVEMENTS_MARKER = "export const achievements: Achievement[] = ";

const PROJECTS_PATH = path.join(ROOT, "src/data/projects.ts");
const PROJECTS_MARKER = "export const projects: Project[] = ";

const ENV_LOCAL_PATH = path.join(ROOT, ".env.local");

const rl = createInterface({ input: stdin, output: stdout });

// ---------------------------------------------------------------------------
// Lectura/escritura de los archivos de datos.
//
// Los .ts de src/data solo tienen tipos + un literal exportado (sin lógica),
// así que podemos: 1) cortar el archivo justo después del "export const X = ",
// 2) evaluar el literal que sigue como JS, 3) editarlo en memoria, y
// 4) volver a serializarlo. Todo lo anterior al marcador (comentarios, tipos)
// se preserva tal cual.
// ---------------------------------------------------------------------------

function loadDataFile(filePath, marker) {
  const src = fs.readFileSync(filePath, "utf8");
  const idx = src.indexOf(marker);
  if (idx === -1) {
    throw new Error(
      `No se encontró "${marker.trim()}" en ${path.relative(ROOT, filePath)}. ` +
        "¿Se modificó el formato del archivo a mano?",
    );
  }
  const prefix = src.slice(0, idx + marker.length);
  const literalText = src.slice(idx + marker.length).replace(/;\s*$/, "");

  let value;
  try {
    value = new Function(`"use strict"; return (${literalText});`)();
  } catch (err) {
    throw new Error(`No se pudo interpretar ${path.relative(ROOT, filePath)}: ${err.message}`);
  }
  return { prefix, value };
}

function saveDataFile(filePath, prefix, value) {
  fs.writeFileSync(filePath, `${prefix}${serializeValue(value, 0)};\n`, "utf8");
}

function isPrimitive(v) {
  return v === null || ["string", "number", "boolean"].includes(typeof v);
}

function serializeKey(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
}

function serializeValue(value, indent) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);

  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean" || typeof value === "number") return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    if (value.every(isPrimitive)) {
      const inline = `[${value.map((v) => serializeValue(v, indent)).join(", ")}]`;
      if (inline.length <= 76) return inline;
    }
    const items = value.map((v) => `${padIn}${serializeValue(v, indent + 1)},`).join("\n");
    return `[\n${items}\n${pad}]`;
  }

  if (typeof value === "object" && value !== null) {
    const keys = Object.keys(value).filter((k) => value[k] !== undefined);
    if (keys.length === 0) return "{}";
    const entries = keys
      .map((k) => `${padIn}${serializeKey(k)}: ${serializeValue(value[k], indent + 1)},`)
      .join("\n");
    return `{\n${entries}\n${pad}}`;
  }

  throw new Error(`Tipo de valor no soportado: ${typeof value}`);
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

async function ask(question, defaultValue = "") {
  const suffix = defaultValue ? ` [${defaultValue}]` : "";
  const answer = (await rl.question(`${question}${suffix}: `)).trim();
  return answer === "" ? defaultValue : answer;
}

async function askRequired(question) {
  let answer = "";
  while (!answer) {
    answer = (await rl.question(`${question}: `)).trim();
    if (!answer) console.log("  Este campo es obligatorio.");
  }
  return answer;
}

// Para ALTA: vacío = se omite el campo.
async function askOptional(question) {
  const answer = (await rl.question(`${question} (opcional): `)).trim();
  return answer === "" ? undefined : answer;
}

// Para EDICIÓN: Enter mantiene el valor actual, "-" lo vacía.
async function askUpdateOptional(question, current) {
  const label = current !== undefined ? `${question} [${current}] (Enter=mantener, "-"=vaciar)` : `${question} (opcional)`;
  const answer = (await rl.question(`${label}: `)).trim();
  if (answer === "") return current;
  if (answer === "-") return undefined;
  return answer;
}

async function askUpdateRequired(question, current) {
  const answer = (await rl.question(`${question} [${current}]: `)).trim();
  return answer === "" ? current : answer;
}

async function confirm(question) {
  const answer = (await rl.question(`${question} (s/N): `)).trim().toLowerCase();
  return ["s", "si", "sí", "y", "yes"].includes(answer);
}

async function confirmUpdate(question, current) {
  const answer = (await rl.question(`${question} (actual: ${current ? "sí" : "no"}) [s/n, Enter=mantener]: `))
    .trim()
    .toLowerCase();
  if (answer === "") return current;
  return ["s", "si", "sí", "y", "yes"].includes(answer);
}

function slugify(text) {
  const slug = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
  return slug || "item";
}

function uniqueSlug(base, existingIds) {
  if (!existingIds.includes(base)) return base;
  let n = 2;
  while (existingIds.includes(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

// ---------------------------------------------------------------------------
// Proyectos
// ---------------------------------------------------------------------------

function loadProjects() {
  return loadDataFile(PROJECTS_PATH, PROJECTS_MARKER);
}
function saveProjects(prefix, projects) {
  saveDataFile(PROJECTS_PATH, prefix, projects);
}

function printProjectsList(projects) {
  if (projects.length === 0) {
    console.log("  (no hay proyectos cargados)");
    return;
  }
  projects.forEach((p, i) => {
    const status = p.inProgress ? "EN DESARROLLO" : "FINALIZADO";
    const featuredTag = p.featured ? " — ★ DESTACADO" : "";
    console.log(`  ${i + 1}. [${p.id}] ${p.title} — ${status}${featuredTag}`);
  });
}

async function pickProject(projects, action) {
  if (projects.length === 0) {
    console.log("  No hay proyectos cargados todavía.\n");
    return null;
  }
  printProjectsList(projects);
  const id = await ask(`\nID del proyecto a ${action}`);
  const project = projects.find((p) => p.id === id);
  if (!project) {
    console.log(`  No se encontró un proyecto con id "${id}".\n`);
    return null;
  }
  return project;
}

async function listProjects() {
  const { value: projects } = loadProjects();
  console.log("\n--- Proyectos ---");
  printProjectsList(projects);
  console.log();
}

async function addProject() {
  const { prefix, value: projects } = loadProjects();
  console.log("\n--- Nuevo proyecto ---");

  const title = await askRequired("Título");
  const suggestedId = uniqueSlug(
    slugify(title),
    projects.map((p) => p.id),
  );
  let id = await ask("ID (slug único)", suggestedId);
  while (projects.some((p) => p.id === id)) {
    console.log(`  Ya existe un proyecto con id "${id}".`);
    id = await askRequired("ID (slug único)");
  }

  const project = {
    id,
    title,
    description: {
      es: await askRequired("Descripción (ES)"),
      en: await askRequired("Descripción (EN)"),
    },
    tags: (await ask("Tags (separados por coma)"))
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    imageUrl: await ask("Imagen (ruta en /public)", "/project-placeholder.svg"),
    liveUrl: await askOptional("URL demo"),
    repoUrl: await askOptional("URL repositorio"),
    inProgress: (await confirm("¿Está en desarrollo?")) || undefined,
    year: await askOptional("Año"),
    role: await askOptional("Rol"),
    version: await askOptional("Versión"),
    lastUpdate: await askOptional("Última actualización"),
    category: await askOptional("Categoría"),
    architecture: (await askOptional("Arquitectura (capas separadas por coma)"))
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    note: (await confirm("¿Agregar nota técnica?"))
      ? { es: await askRequired("Nota técnica (ES)"), en: await askRequired("Nota técnica (EN)") }
      : undefined,
  };

  projects.push(project);
  saveProjects(prefix, projects);
  console.log(`\n✔ Proyecto "${title}" agregado.\n`);
}

async function editProject() {
  const { prefix, value: projects } = loadProjects();
  const project = await pickProject(projects, "editar");
  if (!project) return;

  console.log(`\n--- Editando "${project.title}" (Enter = mantener valor actual) ---`);
  project.title = await askUpdateRequired("Título", project.title);
  project.description.es = await askUpdateRequired("Descripción (ES)", project.description.es);
  project.description.en = await askUpdateRequired("Descripción (EN)", project.description.en);
  project.tags = (await ask("Tags (separados por coma)", project.tags.join(", ")))
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  project.imageUrl = await askUpdateRequired("Imagen", project.imageUrl);
  project.liveUrl = await askUpdateOptional("URL demo", project.liveUrl);
  project.repoUrl = await askUpdateOptional("URL repositorio", project.repoUrl);
  project.inProgress = (await confirmUpdate("¿En desarrollo?", project.inProgress)) || undefined;
  project.year = await askUpdateOptional("Año", project.year);
  project.role = await askUpdateOptional("Rol", project.role);
  project.version = await askUpdateOptional("Versión", project.version);
  project.lastUpdate = await askUpdateOptional("Última actualización", project.lastUpdate);
  project.category = await askUpdateOptional("Categoría", project.category);

  const archInput = await askUpdateOptional(
    "Arquitectura (capas separadas por coma)",
    project.architecture?.join(", "),
  );
  project.architecture = archInput
    ? archInput.split(",").map((s) => s.trim()).filter(Boolean)
    : undefined;

  const wantNote = await confirmUpdate("¿Nota técnica?", project.note !== undefined);
  if (!wantNote) {
    project.note = undefined;
  } else if (project.note) {
    project.note.es = await askUpdateRequired("Nota técnica (ES)", project.note.es);
    project.note.en = await askUpdateRequired("Nota técnica (EN)", project.note.en);
  } else {
    project.note = {
      es: await askRequired("Nota técnica (ES)"),
      en: await askRequired("Nota técnica (EN)"),
    };
  }

  saveProjects(prefix, projects);
  console.log(`\n✔ Proyecto "${project.title}" actualizado.\n`);
}

async function deleteProject() {
  const { prefix, value: projects } = loadProjects();
  const project = await pickProject(projects, "eliminar");
  if (!project) return;

  const ok = await confirm(`¿Confirmás eliminar "${project.title}" (${project.id})?`);
  if (!ok) {
    console.log("  Cancelado.\n");
    return;
  }
  saveProjects(
    prefix,
    projects.filter((p) => p.id !== project.id),
  );
  console.log(`\n✔ Proyecto "${project.title}" eliminado.\n`);
}

async function setFeaturedProject() {
  const { prefix, value: projects } = loadProjects();
  if (projects.length === 0) {
    console.log("  No hay proyectos cargados todavía.\n");
    return;
  }

  console.log(
    "\n--- Marcar proyecto destacado ---\n" +
      "Es el que se muestra en la sección \"Proyecto destacado\" (con arquitectura,\n" +
      "nota técnica y ficha completa). El resto solo aparece en la tabla comparativa.\n",
  );
  const project = await pickProject(projects, "destacar");
  if (!project) return;

  for (const p of projects) {
    p.featured = p.id === project.id ? true : undefined;
  }

  saveProjects(prefix, projects);
  console.log(`\n✔ "${project.title}" es ahora el proyecto destacado.\n`);
}

// ---------------------------------------------------------------------------
// Logros
// ---------------------------------------------------------------------------

function loadAchievements() {
  return loadDataFile(ACHIEVEMENTS_PATH, ACHIEVEMENTS_MARKER);
}
function saveAchievements(prefix, achievements) {
  saveDataFile(ACHIEVEMENTS_PATH, prefix, achievements);
}

function printAchievementsList(achievements) {
  if (achievements.length === 0) {
    console.log("  (no hay logros cargados)");
    return;
  }
  achievements.forEach((a, i) => {
    console.log(`  ${i + 1}. [${a.id}] ${a.title.es} — ${a.date}`);
  });
}

async function pickAchievement(achievements, action) {
  if (achievements.length === 0) {
    console.log("  No hay logros cargados todavía.\n");
    return null;
  }
  printAchievementsList(achievements);
  const id = await ask(`\nID del logro a ${action}`);
  const achievement = achievements.find((a) => a.id === id);
  if (!achievement) {
    console.log(`  No se encontró un logro con id "${id}".\n`);
    return null;
  }
  return achievement;
}

async function listAchievements() {
  const { value: achievements } = loadAchievements();
  console.log("\n--- Logros ---");
  printAchievementsList(achievements);
  console.log();
}

async function addAchievement() {
  const { prefix, value: achievements } = loadAchievements();
  console.log("\n--- Nuevo logro ---");

  const titleEs = await askRequired("Título (ES)");
  const suggestedId = uniqueSlug(
    slugify(titleEs),
    achievements.map((a) => a.id),
  );
  let id = await ask("ID (slug único)", suggestedId);
  while (achievements.some((a) => a.id === id)) {
    console.log(`  Ya existe un logro con id "${id}".`);
    id = await askRequired("ID (slug único)");
  }

  const achievement = {
    id,
    title: { es: titleEs, en: await askRequired("Título (EN)") },
    description: {
      es: await askRequired("Descripción (ES)"),
      en: await askRequired("Descripción (EN)"),
    },
    date: await askRequired("Fecha (ej: 2025, Marzo 2025)"),
  };

  achievements.push(achievement);
  saveAchievements(prefix, achievements);
  console.log(`\n✔ Logro "${titleEs}" agregado.\n`);
}

async function editAchievement() {
  const { prefix, value: achievements } = loadAchievements();
  const achievement = await pickAchievement(achievements, "editar");
  if (!achievement) return;

  console.log(`\n--- Editando "${achievement.title.es}" (Enter = mantener valor actual) ---`);
  achievement.title.es = await askUpdateRequired("Título (ES)", achievement.title.es);
  achievement.title.en = await askUpdateRequired("Título (EN)", achievement.title.en);
  achievement.description.es = await askUpdateRequired("Descripción (ES)", achievement.description.es);
  achievement.description.en = await askUpdateRequired("Descripción (EN)", achievement.description.en);
  achievement.date = await askUpdateRequired("Fecha", achievement.date);

  saveAchievements(prefix, achievements);
  console.log(`\n✔ Logro actualizado.\n`);
}

async function deleteAchievement() {
  const { prefix, value: achievements } = loadAchievements();
  const achievement = await pickAchievement(achievements, "eliminar");
  if (!achievement) return;

  const ok = await confirm(`¿Confirmás eliminar "${achievement.title.es}" (${achievement.id})?`);
  if (!ok) {
    console.log("  Cancelado.\n");
    return;
  }
  saveAchievements(
    prefix,
    achievements.filter((a) => a.id !== achievement.id),
  );
  console.log(`\n✔ Logro eliminado.\n`);
}

// ---------------------------------------------------------------------------
// CV (Google Drive) — no vive en src/data/*.ts sino en .env.local:
// GOOGLE_DRIVE_CV_ES_FILE_ID / GOOGLE_DRIVE_CV_EN_FILE_ID. El usuario pega el
// link para compartir de Drive y acá se extrae el File ID.
// ---------------------------------------------------------------------------

function extractDriveFileId(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const patterns = [
    // https://drive.google.com/file/d/FILE_ID/view
    // https://docs.google.com/document/d/FILE_ID/edit
    // https://docs.google.com/spreadsheets/d/FILE_ID/edit
    // https://docs.google.com/presentation/d/FILE_ID/edit
    /\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/, // https://drive.google.com/open?id=FILE_ID
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }

  // No matchea una URL conocida de Drive: aceptarlo si ya parece un File ID
  // "pelado" (sin espacios/barras, los IDs de Drive suelen tener 25+ caracteres).
  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

function readEnvLocal() {
  if (!fs.existsSync(ENV_LOCAL_PATH)) {
    return { content: "", values: new Map(), existed: false };
  }
  const content = fs.readFileSync(ENV_LOCAL_PATH, "utf8");
  const values = new Map();
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (match) values.set(match[1], match[2]);
  }
  return { content, values, existed: true };
}

function setEnvVar(content, key, value) {
  const lines = content.length ? content.split(/\r?\n/) : [];
  if (lines.length && lines[lines.length - 1] === "") lines.pop();

  const idx = lines.findIndex((line) => line.startsWith(`${key}=`));
  if (idx !== -1) {
    lines[idx] = `${key}=${value}`;
  } else {
    lines.push(`${key}=${value}`);
  }
  return lines.join("\n") + "\n";
}

async function updateCvFileIds() {
  console.log("\n--- CV (Google Drive) ---");
  console.log(
    "Pegá el link para compartir de cada CV: sirve tanto un PDF subido a Drive como un\n" +
      "Google Doc nativo (éste último se exporta a PDF al vuelo en cada descarga, así que\n" +
      "siempre refleja la última versión guardada). También podés pegar el File ID solo.\n" +
      "Se guarda en .env.local — profile.cvUrl sigue apuntando a /api/cv/es y /api/cv/en,\n" +
      "eso no cambia acá.\n",
  );

  const { content: initialContent, values, existed } = readEnvLocal();
  let content = initialContent;

  const targets = [
    { key: "GOOGLE_DRIVE_CV_ES_FILE_ID", label: "CV en español — link o File ID de Drive" },
    { key: "GOOGLE_DRIVE_CV_EN_FILE_ID", label: "CV en inglés — link o File ID de Drive" },
  ];

  let changed = false;
  for (const target of targets) {
    const current = values.get(target.key) || "";
    const raw = await ask(target.label, current);
    if (!raw) continue;

    const fileId = extractDriveFileId(raw);
    if (!fileId) {
      console.log(`  No pude reconocer un File ID válido en "${raw}". Se dejó sin cambios.`);
      continue;
    }

    content = setEnvVar(content, target.key, fileId);
    changed = true;
    console.log(`  ✔ ${target.key} actualizado.`);
  }

  if (!changed) {
    console.log("\nNada para guardar.\n");
    return;
  }

  fs.writeFileSync(ENV_LOCAL_PATH, content, "utf8");
  console.log(
    "\n✔ .env.local actualizado. Reiniciá `npm run dev` (o redeploy en Vercel) para tomar los cambios.",
  );
  if (!existed) {
    console.log(
      "  Este .env.local es nuevo: todavía te faltan GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET\n" +
        "  y GOOGLE_OAUTH_REFRESH_TOKEN — completalos a mano (ver .env.local.example).",
    );
  }
  console.log("");
}

// ---------------------------------------------------------------------------
// Perfil (objeto único: solo edición)
// ---------------------------------------------------------------------------

function loadProfile() {
  return loadDataFile(PROFILE_PATH, PROFILE_MARKER);
}
function saveProfile(prefix, profile) {
  saveDataFile(PROFILE_PATH, prefix, profile);
}

async function editProfile() {
  const { prefix, value: profile } = loadProfile();
  console.log("\n--- Perfil (Enter = mantener valor actual) ---");

  profile.name = await askUpdateRequired("Nombre completo", profile.name);
  profile.role.es = await askUpdateRequired("Rol (ES)", profile.role.es);
  profile.role.en = await askUpdateRequired("Rol (EN)", profile.role.en);
  profile.bio.es = await askUpdateRequired("Bio (ES)", profile.bio.es);
  profile.bio.en = await askUpdateRequired("Bio (EN)", profile.bio.en);
  profile.avatarUrl = await askUpdateRequired("Avatar (ruta en /public)", profile.avatarUrl);

  console.log(
    "\nCV: se sirve dinámicamente desde Google Drive vía OAuth2, así que no se edita acá.\n" +
      "  - Si es un PDF subido a Drive: reemplazá el archivo existente (mismo File ID) —\n" +
      "    no hay nada que tocar en el portfolio.\n" +
      "  - Si es un Google Doc: simplemente editalo y guardá — se exporta a PDF al vuelo\n" +
      "    en cada descarga, siempre con la última versión.\n" +
      "  - Para apuntar a un archivo distinto (File ID nuevo): usá la opción\n" +
      '    "CV (Google Drive)" del menú principal.\n',
  );

  profile.socials.github = await askUpdateRequired("GitHub", profile.socials.github);
  profile.socials.linkedin = await askUpdateRequired("LinkedIn", profile.socials.linkedin);
  profile.socials.email = await askUpdateRequired("Email (mailto:...)", profile.socials.email);

  profile.location = await askUpdateRequired("Ubicación", profile.location);
  profile.yearsActive = await askUpdateRequired("Años activo", profile.yearsActive);
  profile.availability.es = await askUpdateRequired("Disponibilidad (ES)", profile.availability.es);
  profile.availability.en = await askUpdateRequired("Disponibilidad (EN)", profile.availability.en);
  profile.focus = (await ask("Áreas de foco (separadas por coma)", profile.focus.join(", ")))
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  profile.languages.es = (
    await ask("Idiomas ES (separados por coma)", profile.languages.es.join(", "))
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  profile.languages.en = (
    await ask("Idiomas EN (separados por coma)", profile.languages.en.join(", "))
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  saveProfile(prefix, profile);
  console.log("\n✔ Perfil actualizado.\n");
}

// ---------------------------------------------------------------------------
// Menús
// ---------------------------------------------------------------------------

async function runMenu(title, options) {
  while (true) {
    console.log(`\n=== ${title} ===`);
    options.forEach((opt, i) => console.log(`  ${i + 1}) ${opt.label}`));
    console.log("  0) Volver");
    const choice = await ask("Opción");
    if (choice === "0") return;
    const option = options[Number(choice) - 1];
    if (!option) {
      console.log("  Opción inválida.");
      continue;
    }
    try {
      await option.action();
    } catch (err) {
      console.log(`\n✖ Error: ${err.message}\n`);
    }
  }
}

async function projectsMenu() {
  await runMenu("Proyectos", [
    { label: "Listar", action: listProjects },
    { label: "Agregar", action: addProject },
    { label: "Editar", action: editProject },
    { label: "Eliminar", action: deleteProject },
    { label: "Marcar como destacado", action: setFeaturedProject },
  ]);
}

async function achievementsMenu() {
  await runMenu("Logros", [
    { label: "Listar", action: listAchievements },
    { label: "Agregar", action: addAchievement },
    { label: "Editar", action: editAchievement },
    { label: "Eliminar", action: deleteAchievement },
  ]);
}

async function mainMenu() {
  console.log("Herramienta de contenido — portfolio");
  console.log("Edita src/data/*.ts de forma guiada. Uso local, no se usa en producción.");
  await runMenu("Menú principal", [
    { label: "Proyectos", action: projectsMenu },
    { label: "Logros", action: achievementsMenu },
    { label: "Perfil", action: editProfile },
    { label: "CV (Google Drive)", action: updateCvFileIds },
  ]);
  console.log("Listo.");
}

const isMain = path.resolve(process.argv[1] ?? "") === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  try {
    await mainMenu();
  } finally {
    rl.close();
  }
}

// Exportado para poder testear la lectura/escritura sin pasar por los prompts.
export {
  loadDataFile,
  saveDataFile,
  serializeValue,
  slugify,
  uniqueSlug,
  extractDriveFileId,
  setEnvVar,
  readEnvLocal,
};
