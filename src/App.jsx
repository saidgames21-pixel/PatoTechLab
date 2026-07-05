import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Plus, Search, Pencil, Trash2, X, Check, Printer, Clock, Truck,
  AlertTriangle, CheckCircle2, TrendingUp, Wallet, PiggyBank, ListChecks,
  ChevronDown, Feather, Zap, Package, Download, Upload,
  HelpCircle, Banknote, CircleDollarSign, CircleSlash2, BadgeCheck,
  Trophy, Users, Repeat, Palette, Boxes, Sparkles, Medal, Hash, Copy,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

/* ---------------------------------------------------------------
   Datos semilla — importados del CSV original de Notion
--------------------------------------------------------------- */
const SEED_ORDERS = [{"id":"o1","cliente":"Vane 1","estado":"Completado","fecha":"2026-05-11","fechaTexto":"11 de mayo de 2026","notas":"2 Pokedex porta cartas con pokebola","precio":700.0,"prioridad":"Baja","tipo":"Main"},{"id":"o2","cliente":"Felipe","estado":"Completado","fecha":"2026-05-11","fechaTexto":"11 de mayo de 2026","notas":"Keycaps de eevee","precio":150.0,"prioridad":"Baja","tipo":"Main"},{"id":"o3","cliente":"Felipe","estado":"Pendiente","fecha":"2026-06-01","fechaTexto":"1 de junio de 2026","notas":"Pikachu con casco de master chief","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o4","cliente":"Cinthia","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Base con informacion de redes sociales FALTA PAGO","precio":280.0,"prioridad":"Baja","tipo":"Main"},{"id":"o5","cliente":"Jorge","estado":"Completado","fecha":"2026-05-06","fechaTexto":"6 de mayo de 2026","notas":"Bases para mosnter trucks x30","precio":500.0,"prioridad":"Baja","tipo":"Main"},{"id":"o6","cliente":"Felipe","estado":"Pendiente","fecha":"2026-05-04","fechaTexto":"4 de mayo de 2026","notas":"Lampara de Itachi","precio":null,"prioridad":"Alta","tipo":"Main"},{"id":"o7","cliente":"Andrea","estado":"Completado","fecha":"2026-05-04","fechaTexto":"4 de mayo de 2026","notas":"Galleta Oreo para cable de carga","precio":75.0,"prioridad":"Baja","tipo":"Main"},{"id":"o8","cliente":"Gina","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Soportes de controles x 2","precio":228.0,"prioridad":"Baja","tipo":"Main"},{"id":"o9","cliente":"Neto","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Porta latas de Green Bay","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o10","cliente":"Said y Dani","estado":"Completado","fecha":"2026-05-05","fechaTexto":"5 de mayo de 2026","notas":"Porta latas de bote de agua","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o11","cliente":"Alan","estado":"Completado","fecha":"2026-05-07","fechaTexto":"7 de mayo de 2026","notas":"Cajas para Panini x3","precio":648.0,"prioridad":"Baja","tipo":"Main"},{"id":"o12","cliente":"Cinthia","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Copas del mundial en llavero, 10 piezas","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o13","cliente":"Aldo","estado":"Completado","fecha":"2026-05-11","fechaTexto":"11 de mayo de 2026 → 13 de mayo de 2026","notas":"Caja del Panini ROJA","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o14","cliente":"Vane 2","estado":"Completado","fecha":"2026-05-12","fechaTexto":"12 de mayo de 2026 → 18 de mayo de 2026","notas":"Galletas Oreo 1 galleta de chocolate y 1 rosa","precio":150.0,"prioridad":"Baja","tipo":"Main"},{"id":"o15","cliente":"Vane 3","estado":"Completado","fecha":"2026-05-12","fechaTexto":"12 de mayo de 2026 → 18 de mayo de 2026","notas":"Kirby recopilador","precio":260.0,"prioridad":"Baja","tipo":"Main"},{"id":"o16","cliente":"Caja Panini (Cinthia 1)","estado":"Completado","fecha":"2026-05-10","fechaTexto":"10 de mayo de 2026 → 14 de mayo de 2026","notas":"Pedido de caja Panini NEGRA sin nombre","precio":220.0,"prioridad":"Baja","tipo":"Main"},{"id":"o17","cliente":"Caja Panini (Cinthia 2)","estado":"Completado","fecha":"2026-05-12","fechaTexto":"12 de mayo de 2026 → 14 de mayo de 2026","notas":"Pedido de caja Panini VERDE CON NOMBRE - Andres SR","precio":240.0,"prioridad":"Baja","tipo":"Main"},{"id":"o18","cliente":"Caja Panini (Cinthia 3)","estado":"Completado","fecha":"2026-05-12","fechaTexto":"12 de mayo de 2026 → 14 de mayo de 2026","notas":"Pedido de caja Panini VERDE sin nombre","precio":220.0,"prioridad":"Baja","tipo":"Main"},{"id":"o19","cliente":"Caja Panini (Cinthia 4)","estado":"Completado","fecha":"2026-05-12","fechaTexto":"12 de mayo de 2026 → 14 de mayo de 2026","notas":"Pedido de caja Panini 2 ROJAS CON NOMBRE - Luca - Patricio","precio":480.0,"prioridad":"Baja","tipo":"Main"},{"id":"o20","cliente":"Mariana","estado":"Completado","fecha":"2026-05-15","fechaTexto":"15 de mayo de 2026 → 21 de mayo de 2026","notas":"Stand de datos para pago pescaderia","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o21","cliente":"Caja Panini (Cinthia 5)","estado":"Completado","fecha":"2026-05-15","fechaTexto":"15 de mayo de 2026 → 17 de mayo de 2026","notas":"Pedido de caja Panini ROJA, NEGRA Y VERDE","precio":610.0,"prioridad":"Baja","tipo":"Main"},{"id":"o22","cliente":"Caja Panini (Cinthia 7)","estado":"Completado","fecha":"2026-05-20","fechaTexto":"20 de mayo de 2026 → 23 de mayo de 2026","notas":"Pedido de cajas 3 VERDES con nombre y 2 ROJAS con nombre","precio":1200.0,"prioridad":"Baja","tipo":"Main"},{"id":"o23","cliente":"Zarahy","estado":"Pendiente","fecha":"2026-05-16","fechaTexto":"16 de mayo de 2026 → 26 de mayo de 2026","notas":"Letrero para precios y nombres de productos","precio":null,"prioridad":"Media","tipo":"Main"},{"id":"o24","cliente":"Oscar 2","estado":"Completado","fecha":"2026-05-20","fechaTexto":"20 de mayo de 2026 → 24 de mayo de 2026","notas":"Recipiente de popotes","precio":270.0,"prioridad":"Baja","tipo":"Main"},{"id":"o25","cliente":"Oscar 1","estado":"Completado","fecha":"2026-05-20","fechaTexto":"20 de mayo de 2026 → 24 de mayo de 2026","notas":"Cajas tapa enchufes","precio":280.0,"prioridad":"Baja","tipo":"Main"},{"id":"o26","cliente":"Gibe","estado":"Pendiente","fecha":null,"fechaTexto":"","notas":"Porta latas de tiro","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o27","cliente":"SANILAB","estado":"Completado","fecha":"2026-05-20","fechaTexto":"20 de mayo de 2026 → 27 de mayo de 2026","notas":"Cajas de accesorios","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o28","cliente":"Caja Panini (Cinthia 6)","estado":"Completado","fecha":"2026-05-15","fechaTexto":"15 de mayo de 2026 → 17 de mayo de 2026","notas":"Pedido de caja VERDE con nombre - Santi Outsset","precio":240.0,"prioridad":"Baja","tipo":"Main"},{"id":"o29","cliente":"Oscar Quezada","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Cajas del mundial (3 cajas)\n-Verde (Majito)\n-Blanco (Keny)\n-Rojo (Quezada)","precio":610.0,"prioridad":"Baja","tipo":"Main"},{"id":"o30","cliente":"Bryan","estado":"Completado","fecha":"2026-05-22","fechaTexto":"22 de mayo de 2026 → 27 de mayo de 2026","notas":"Cajas panini\n-Negra (Bryan)\n-Roja","precio":410.0,"prioridad":"Baja","tipo":"Main"},{"id":"o31","cliente":"Caja Panini (Cinthia 8)","estado":"Completado","fecha":"2026-05-22","fechaTexto":"22 de mayo de 2026 → 26 de mayo de 2026","notas":"Pedido de caja Panini 2 \n  • Roja (Mirindita)\n  • Verde (Nathan)","precio":480.0,"prioridad":"Baja","tipo":"Main"},{"id":"o32","cliente":"Cesar","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Posavasos para la Nissan T21 1990","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o33","cliente":"Mariana 2","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Caja panini \n-Roja (Daniel)","precio":210.0,"prioridad":"Baja","tipo":"Main"},{"id":"o34","cliente":"Monica","estado":"Completado","fecha":"2026-05-25","fechaTexto":"25 de mayo de 2026","notas":"Manos articuladas","precio":165.0,"prioridad":"Baja","tipo":"Main"},{"id":"o35","cliente":"Oscar Neveria","estado":"Completado","fecha":null,"fechaTexto":"","notas":"4 popoteras\n1 igual a la ya impresa\n3 diferentes","precio":1080.0,"prioridad":"Baja","tipo":"Main"},{"id":"o36","cliente":"Caja Panini (Cinthia 9)","estado":"Completado","fecha":"2026-05-25","fechaTexto":"25 de mayo de 2026 → 26 de mayo de 2026","notas":"Cajita Negra (Iker)","precio":240.0,"prioridad":"Baja","tipo":"Main"},{"id":"o37","cliente":"Zarahy (2)","estado":"Completado","fecha":"2026-05-22","fechaTexto":"22 de mayo de 2026 → 25 de mayo de 2026","notas":"Caja Panini\n - Negra","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o38","cliente":"Marisol","estado":"Pendiente","fecha":null,"fechaTexto":"","notas":"bases de exhibicion","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o39","cliente":"Enrique","estado":"Pendiente","fecha":null,"fechaTexto":"","notas":"Adaptadores para mangas de aire","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o40","cliente":"Zarahy (3)","estado":"Completado","fecha":"2026-05-22","fechaTexto":"22 de mayo de 2026 → 25 de mayo de 2026","notas":"Caja Panini\n - Roja","precio":210.0,"prioridad":"Baja","tipo":"Main"},{"id":"o41","cliente":"Ctitlali","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Porta control de dragon ball","precio":290.0,"prioridad":"Baja","tipo":"Main"},{"id":"o42","cliente":"Cinthia","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Pokedex Isabella","precio":350.0,"prioridad":"Baja","tipo":"Main"},{"id":"o43","cliente":"Cinthia Panini","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Caja de santiago verde","precio":240.0,"prioridad":"Baja","tipo":"Main"},{"id":"o44","cliente":"de Ulises","estado":"Entregado sin pago","fecha":"2026-06-12","fechaTexto":"12 de junio de 2026","notas":"Base echibidor de las monedas del mundial","precio":240.0,"prioridad":"Alta","tipo":"Main"},{"id":"o45","cliente":"de Felipe","estado":"Completado","fecha":"2026-06-10","fechaTexto":"10 de junio de 2026","notas":"4 llaveros del mundial de GDL","precio":80.0,"prioridad":"Baja","tipo":"Main"},{"id":"o46","cliente":"de Bryan","estado":"Pendiente de entrega","fecha":"2026-06-10","fechaTexto":"10 de junio de 2026","notas":"43 llaveros del mundial sin nombre\n7 llaveros del mundial con nombre","precio":1000.0,"prioridad":"Alta","tipo":"Main"},{"id":"o47","cliente":"PAU","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Stand para celular de spiderman","precio":95.0,"prioridad":"Baja","tipo":"Main"},{"id":"o48","cliente":"JURASIC PETS","estado":"Pendiente","fecha":null,"fechaTexto":"","notas":"LOGO CON LED EN EL RESPALDO","precio":1750.0,"prioridad":"Baja","tipo":"Main"},{"id":"o49","cliente":"Oscar Neveria","estado":"Completado","fecha":"2026-06-11","fechaTexto":"11 de junio de 2026 → 20 de junio de 2026","notas":"Base con caja y popoteras para bolsas","precio":820.0,"prioridad":"Baja","tipo":"Main"},{"id":"o50","cliente":"Cinthia Panini","estado":"Completado","fecha":null,"fechaTexto":"","notas":"2 cajas verdes con nombre","precio":480.0,"prioridad":"Baja","tipo":"Main"},{"id":"o51","cliente":"Tia Gloria","estado":"Pendiente","fecha":null,"fechaTexto":"","notas":"Macetero de dragon","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o52","cliente":"Pau","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Lapicero de charizard","precio":290.0,"prioridad":"Baja","tipo":"Main"},{"id":"o53","cliente":"SaniLab","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Alajero para vane","precio":190.0,"prioridad":"Baja","tipo":"Main"},{"id":"o54","cliente":"Citla","estado":"Pendiente","fecha":null,"fechaTexto":"","notas":"Torre de discos","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o55","cliente":"Oliver","estado":"Pendiente","fecha":null,"fechaTexto":"","notas":"Funko Pop de el","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o56","cliente":"Oscar Neveria","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Bases para camara x2","precio":120.0,"prioridad":"Baja","tipo":"Main"},{"id":"o57","cliente":"Andrea","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Fresa flex","precio":110.0,"prioridad":"Baja","tipo":"Main"},{"id":"o58","cliente":"Juan Pablo","estado":"Pendiente","fecha":null,"fechaTexto":"","notas":"Moneda de anime","precio":null,"prioridad":"Baja","tipo":"Main"},{"id":"o59","cliente":"Llaveros para Aldo de Valan","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Llaveros de aniversario, 20 piezas","precio":300.0,"prioridad":"Baja","tipo":"Main"},{"id":"o60","cliente":"chilango","estado":"Pendiente de entrega","fecha":null,"fechaTexto":"","notas":"Base para monedas del mundial","precio":240.0,"prioridad":"Baja","tipo":"Main"},{"id":"o61","cliente":"Jorge","estado":"Completado","fecha":null,"fechaTexto":"","notas":"Base para esponja scrub","precio":75.0,"prioridad":"Baja","tipo":"Main"},{"id":"o62","cliente":"Melba","estado":"Imprimiendo","fecha":null,"fechaTexto":"","notas":"Recipiente de balon","precio":855.0,"prioridad":"Baja","tipo":"Main"},{"id":"o63","cliente":"Jorge","estado":"Completado","fecha":null,"fechaTexto":"","notas":"2 bases de medallas\nBase varde con linea negro\nBase negra con linea verde","precio":150.0,"prioridad":"Baja","tipo":"Main"},{"id":"o64","cliente":"Felipe","estado":"Imprimiendo","fecha":null,"fechaTexto":"","notas":"Base de monedas calendario","precio":240.0,"prioridad":"Baja","tipo":"Main"},{"id":"o65","cliente":"Oscar Quezada","estado":"Imprimiendo","fecha":null,"fechaTexto":"","notas":"Base de monedas, calendario personalizada","precio":240.0,"prioridad":"Baja","tipo":"Main"},{"id":"o66","cliente":"Juanacatlan","estado":"Entregado sin pago","fecha":null,"fechaTexto":"","notas":"Pedido de llaveros de juanacatlan, 100 piezas","precio":1800.0,"prioridad":"Alta","tipo":"Main"},{"id":"o67","cliente":"Tia amelia","estado":"Imprimiendo","fecha":null,"fechaTexto":"","notas":"Fresas flex","precio":110.0,"prioridad":"Baja","tipo":"Main"},{"id":"o68","cliente":"Amigo de toñote","estado":"Imprimiendo","fecha":null,"fechaTexto":"","notas":"2 modelos de base para monedas","precio":390.0,"prioridad":"Baja","tipo":"Main"},{"id":"o69","cliente":"Alberto","estado":"Imprimiendo","fecha":null,"fechaTexto":"","notas":"Base de monedas del mundial y caja panini","precio":360.0,"prioridad":"Baja","tipo":"Main"},{"id":"o70","cliente":"Andrea","estado":"Pendiente","fecha":null,"fechaTexto":"","notas":"Otra fresa","precio":110.0,"prioridad":"Baja","tipo":"Main"}];
const ESTADOS = ["Por definir", "Por cotizar", "Imprimiendo", "Por entregar", "Completado"];
const PRIORIDADES = ["Baja", "Media", "Alta"];

const ESTADO_META = {
  "Por definir":  { icon: HelpCircle,   cls: "st-undef", corto: "Por definir" },
  "Por cotizar":  { icon: Clock,        cls: "st-pend",  corto: "Por cotizar" },
  "Imprimiendo":  { icon: Printer,      cls: "st-print", corto: "Imprimiendo" },
  "Por entregar": { icon: Truck,        cls: "st-deliv", corto: "Por entregar" },
  "Completado":   { icon: CheckCircle2, cls: "st-done",  corto: "Completado" },
};

const PAGOS = ["Sin pagar", "Anticipo", "Pagado por adelantado", "Pagado"];
const PAGO_META = {
  "Sin pagar":             { icon: CircleSlash2,     cls: "pg-unpaid",  corto: "Sin pagar" },
  "Anticipo":              { icon: CircleDollarSign, cls: "pg-partial", corto: "Anticipo" },
  "Pagado por adelantado": { icon: Banknote,         cls: "pg-advance", corto: "Adelantado" },
  "Pagado":                { icon: BadgeCheck,       cls: "pg-paid",    corto: "Pagado" },
};

const MESES_ABR = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

const mxn = (n) =>
  n === null || n === undefined
    ? "—"
    : new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

const uid = () => "o" + Math.random().toString(36).slice(2, 10);
const PRIORIDAD_RANK = { "Alta": 0, "Media": 1, "Baja": 2 };
const ACTIVOS = ["Por definir", "Por cotizar", "Imprimiendo", "Por entregar"];

/* Migra pedidos guardados con el esquema anterior (estados/pago/fechas viejos) al nuevo esquema. Es seguro correrla varias veces. */
const ESTADO_MIGRATE = { "Pendiente": "Por cotizar", "Pendiente de entrega": "Por entregar", "Entregado sin pago": "Completado" };
const migrateOrder = (o) => {
  const estado = ESTADO_MIGRATE[o.estado] || o.estado;
  let pago = o.pago;
  if (pago === undefined || pago === null) {
    pago = o.estado === "Entregado sin pago" ? "Sin pagar" : (estado === "Completado" ? "Pagado" : "Sin pagar");
  }
  const fechaPedido = o.fechaPedido !== undefined ? o.fechaPedido : (o.fecha ?? null);
  const fechaPedidoTexto = o.fechaPedidoTexto !== undefined ? o.fechaPedidoTexto : (o.fechaTexto || "");
  const fechaEntrega = o.fechaEntrega !== undefined ? o.fechaEntrega : null;
  const fechaEntregaTexto = o.fechaEntregaTexto !== undefined ? o.fechaEntregaTexto : "";
  return { ...o, estado, pago, anticipo: o.anticipo ?? null, fechaPedido, fechaPedidoTexto, fechaEntrega, fechaEntregaTexto };
};

const cobradoDe = (o) => {
  if (o.pago === "Pagado" || o.pago === "Pagado por adelantado") return o.precio || 0;
  if (o.pago === "Anticipo") return o.anticipo || 0;
  return 0;
};
const porCobrarDe = (o) => {
  if (o.precio == null) return 0;
  if (o.pago === "Pagado" || o.pago === "Pagado por adelantado") return 0;
  if (o.pago === "Anticipo") return Math.max(o.precio - (o.anticipo || 0), 0);
  return o.precio;
};
/* Fecha a la que se le atribuye el ingreso: la de entrega si ya existe, si no la del pedido. */
const fechaIngresoDe = (o) => o.fechaEntrega || o.fechaPedido || null;
/* Un pedido activo (no completado) cuya fecha de entrega ya pasó se considera atrasado. */
const isAtrasado = (o) => ACTIVOS.includes(o.estado) && !!o.fechaEntrega && o.fechaEntrega < new Date().toISOString().slice(0, 10);
/* Ya te dieron dinero (anticipo o pago total por adelantado) pero el pedido sigue sin terminarse: no se puede quedar olvidado. */
const isPagoParcialActivo = (o) => ACTIVOS.includes(o.estado) && (o.pago === "Pagado por adelantado" || o.pago === "Anticipo");
/* Peso de urgencia para ordenar el kanban: atrasado > ya te dieron dinero > normal. */
const urgenciaDe = (o) => (isAtrasado(o) ? 2 : isPagoParcialActivo(o) ? 1 : 0);

const formatFechaLarga = (iso) => iso ? new Date(iso + "T00:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }) : "";
const formatFechaCorta = (iso) => iso ? new Date(iso + "T00:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "short" }) : "";

const emptyDraft = () => ({
  id: null, cliente: "", estado: "Por cotizar", notas: "", fechaPedido: "", fechaEntrega: "",
  precio: "", prioridad: "Baja", tipo: "Main", pago: "Sin pagar", anticipo: "",
});

const MATERIALES = ["PLA", "PETG", "ABS", "TPU", "Resina", "Nylon", "Otro / no es filamento"];

const emptyConsumible = () => ({
  id: null, nombre: "", costo: "", cantidad: "", fecha: new Date().toISOString().slice(0, 10), notas: "",
  material: "", color: "",
});

const isoOf = (d) => d.toISOString().slice(0, 10);
const getPeriodRange = (periodo, desde, hasta) => {
  const now = new Date();
  if (periodo === "este_mes") {
    return [isoOf(new Date(now.getFullYear(), now.getMonth(), 1)), isoOf(new Date(now.getFullYear(), now.getMonth() + 1, 0))];
  }
  if (periodo === "mes_pasado") {
    return [isoOf(new Date(now.getFullYear(), now.getMonth() - 1, 1)), isoOf(new Date(now.getFullYear(), now.getMonth(), 0))];
  }
  if (periodo === "este_anio") {
    return [`${now.getFullYear()}-01-01`, `${now.getFullYear()}-12-31`];
  }
  if (periodo === "personalizado") {
    return [desde || null, hasta || null];
  }
  return [null, null];
};

const emptyFinanceFilters = () => ({ periodo: "todo", desde: "", hasta: "", pagos: [], cliente: "" });

const TABS = [
  { id: "pedidos", label: "Pedidos", icon: ListChecks },
  { id: "consumibles", label: "Consumibles", icon: Package },
  { id: "finanzas", label: "Finanzas", icon: TrendingUp },
  { id: "metricas", label: "Métricas", icon: Trophy },
];

export default function App() {
  const [orders, setOrders] = useState(null);
  const [consumibles, setConsumibles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pedidos");
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft());
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [quickText, setQuickText] = useState("");
  const [justAdded, setJustAdded] = useState(false);
  const [consumibleModalOpen, setConsumibleModalOpen] = useState(false);
  const [consumibleDraft, setConsumibleDraft] = useState(emptyConsumible());
  const [confirmDeleteConsumibleId, setConfirmDeleteConsumibleId] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState(null);
  const [financeFilters, setFinanceFilters] = useState(emptyFinanceFilters());

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("patotechlab-orders", false);
        if (res && res.value) {
          const migrated = JSON.parse(res.value).map(migrateOrder);
          setOrders(migrated);
          await window.storage.set("patotechlab-orders", JSON.stringify(migrated), false);
        } else {
          const migrated = SEED_ORDERS.map(migrateOrder);
          setOrders(migrated);
          await window.storage.set("patotechlab-orders", JSON.stringify(migrated), false);
        }
      } catch (e) {
        setOrders(SEED_ORDERS.map(migrateOrder));
      }
      try {
        const res2 = await window.storage.get("patotechlab-consumibles", false);
        setConsumibles(res2 && res2.value ? JSON.parse(res2.value) : []);
      } catch (e) {
        setConsumibles([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persistConsumibles = useCallback(async (next) => {
    setConsumibles(next);
    try {
      const res = await window.storage.set("patotechlab-consumibles", JSON.stringify(next), false);
      if (!res) setSaveError(true);
    } catch (e) {
      setSaveError(true);
    }
  }, []);

  const persist = useCallback(async (next) => {
    setOrders(next);
    try {
      const res = await window.storage.set("patotechlab-orders", JSON.stringify(next), false);
      setSaveError(!res);
    } catch (e) {
      setSaveError(true);
    }
  }, []);

  const openNew = () => { setDraft(emptyDraft()); setModalOpen(true); };
  const openEdit = (o) => {
    setDraft({
      ...o,
      precio: o.precio === null ? "" : String(o.precio),
      anticipo: o.anticipo == null ? "" : String(o.anticipo),
      fechaPedido: o.fechaPedido || "",
      fechaEntrega: o.fechaEntrega || "",
    });
    setModalOpen(true);
  };

  const openNewConsumible = () => { setConsumibleDraft(emptyConsumible()); setConsumibleModalOpen(true); };
  const openEditConsumible = (c) => {
    setConsumibleDraft({ ...c, costo: c.costo === null ? "" : String(c.costo), material: c.material || "", color: c.color || "" });
    setConsumibleModalOpen(true);
  };
  const saveConsumibleDraft = () => {
    if (!consumibleDraft.nombre.trim() || consumibleDraft.costo === "") return;
    const cleaned = {
      ...consumibleDraft,
      id: consumibleDraft.id || uid(),
      nombre: consumibleDraft.nombre.trim(),
      cantidad: consumibleDraft.cantidad.trim(),
      notas: consumibleDraft.notas.trim(),
      costo: Number(consumibleDraft.costo),
      color: consumibleDraft.color.trim(),
    };
    const exists = consumibles.some((c) => c.id === cleaned.id);
    const next = exists ? consumibles.map((c) => (c.id === cleaned.id ? cleaned : c)) : [cleaned, ...consumibles];
    persistConsumibles(next);
    setConsumibleModalOpen(false);
  };
  const removeConsumible = (id) => {
    persistConsumibles(consumibles.filter((c) => c.id !== id));
    setConfirmDeleteConsumibleId(null);
  };

  const saveDraft = () => {
    if (!draft.cliente.trim()) return;
    const cleaned = {
      ...draft,
      id: draft.id || uid(),
      cliente: draft.cliente.trim(),
      notas: draft.notas.trim(),
      precio: draft.precio === "" ? null : Number(draft.precio),
      anticipo: draft.pago === "Anticipo" && draft.anticipo !== "" ? Number(draft.anticipo) : null,
      fechaPedido: draft.fechaPedido || null,
      fechaPedidoTexto: formatFechaLarga(draft.fechaPedido),
      fechaEntrega: draft.fechaEntrega || null,
      fechaEntregaTexto: formatFechaLarga(draft.fechaEntrega),
      quick: false,
    };
    const exists = orders.some((o) => o.id === cleaned.id);
    const next = exists ? orders.map((o) => (o.id === cleaned.id ? cleaned : o)) : [cleaned, ...orders];
    persist(next);
    setModalOpen(false);
  };

  const removeOrder = (id) => {
    persist(orders.filter((o) => o.id !== id));
    setConfirmDeleteId(null);
  };

  const duplicateOrder = (o) => {
    const today = new Date().toISOString().slice(0, 10);
    const copia = {
      ...o,
      id: uid(),
      estado: "Por cotizar",
      fechaPedido: today,
      fechaPedidoTexto: formatFechaLarga(today),
      fechaEntrega: null,
      fechaEntregaTexto: "",
      pago: "Sin pagar",
      anticipo: null,
      quick: false,
    };
    persist([copia, ...orders]);
  };

  const moveOrderToStatus = (id, estado) => {
    const target = orders.find((o) => o.id === id);
    if (!target || target.estado === estado) return;
    const autoEntrega = estado === "Completado" && !target.fechaEntrega
      ? { fechaEntrega: new Date().toISOString().slice(0, 10), fechaEntregaTexto: formatFechaLarga(new Date().toISOString().slice(0, 10)) }
      : {};
    persist(orders.map((o) => (o.id === id ? { ...o, estado, ...autoEntrega } : o)));
  };

  const downloadBlob = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportBackup = () => {
    const payload = { orders, consumibles, exportedAt: new Date().toISOString() };
    const stamp = new Date().toISOString().slice(0, 10);
    downloadBlob(JSON.stringify(payload, null, 2), `patotechlab-respaldo-${stamp}.json`, "application/json");
  };

  const csvEscape = (v) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const exportOrdersCSV = () => {
    const headers = ["Cliente", "Estado", "Fecha pedido", "Fecha entrega", "Notas", "Precio", "Prioridad", "Pago", "Anticipo"];
    const rows = orders.map((o) => [
      o.cliente, o.estado,
      o.fechaPedidoTexto || o.fechaPedido || "",
      o.fechaEntregaTexto || o.fechaEntrega || "",
      o.notas, o.precio ?? "", o.prioridad, o.pago, o.anticipo ?? "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map(csvEscape).join(",")).join("\n");
    const stamp = new Date().toISOString().slice(0, 10);
    downloadBlob("\uFEFF" + csv, `patotechlab-pedidos-${stamp}.csv`, "text/csv;charset=utf-8");
  };

  const importInputRef = React.useRef(null);
  const triggerImport = () => importInputRef.current && importInputRef.current.click();
  const handleImportFile = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data.orders) || !Array.isArray(data.consumibles)) throw new Error("Formato inválido");
        if (!window.confirm(`Esto reemplazará tus datos actuales con el respaldo (${data.orders.length} pedidos, ${data.consumibles.length} consumibles). ¿Continuar?`)) return;
        persist(data.orders.map(migrateOrder));
        persistConsumibles(data.consumibles);
      } catch (err) {
        window.alert("No se pudo leer este archivo como respaldo válido de PatoTechLab.");
      }
    };
    reader.readAsText(file);
  };

  const quickAdd = () => {
    const text = quickText.trim();
    if (!text) return;
    const sep = text.match(/^(.{1,40}?)\s*[-–:]\s+(.+)$/s);
    const cliente = sep ? sep[1].trim() : "Sin nombre";
    const notas = sep ? sep[2].trim() : text;
    const today = new Date();
    const iso = today.toISOString().slice(0, 10);
    const nuevo = {
      id: uid(),
      cliente,
      estado: "Por definir",
      fechaPedido: iso,
      fechaPedidoTexto: today.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }),
      fechaEntrega: null,
      fechaEntregaTexto: "",
      notas,
      precio: null,
      prioridad: "Baja",
      tipo: "Main",
      pago: "Sin pagar",
      anticipo: null,
      quick: true,
    };
    persist([nuevo, ...orders]);
    setQuickText("");
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const filtered = useMemo(() => {
    if (!orders) return [];
    const q = query.trim().toLowerCase();
    return orders.filter((o) => !q || o.cliente.toLowerCase().includes(q) || o.notas.toLowerCase().includes(q));
  }, [orders, query]);

  const ordersByStatus = useMemo(() => {
    const map = {};
    ESTADOS.forEach((e) => { map[e] = []; });
    filtered.forEach((o) => {
      if (!map[o.estado]) map[o.estado] = [];
      map[o.estado].push(o);
    });
    ESTADOS.forEach((e) => {
      if (ACTIVOS.includes(e)) {
        map[e].sort((a, b) =>
          urgenciaDe(b) - urgenciaDe(a) ||
          (PRIORIDAD_RANK[a.prioridad] ?? 2) - (PRIORIDAD_RANK[b.prioridad] ?? 2) ||
          (a.fechaPedido || "9999").localeCompare(b.fechaPedido || "9999")
        );
      } else {
        map[e].sort((a, b) => (fechaIngresoDe(b) || "0000").localeCompare(fechaIngresoDe(a) || "0000"));
      }
    });
    return map;
  }, [filtered]);

  const togglePagoFilter = (p) => {
    setFinanceFilters((f) => ({
      ...f,
      pagos: f.pagos.includes(p) ? f.pagos.filter((x) => x !== p) : [...f.pagos, p],
    }));
  };

  const financeOrders = useMemo(() => {
    if (!orders) return [];
    const [start, end] = getPeriodRange(financeFilters.periodo, financeFilters.desde, financeFilters.hasta);
    const cli = financeFilters.cliente.trim().toLowerCase();
    return orders.filter((o) => {
      const f = fechaIngresoDe(o);
      if (start && (!f || f < start)) return false;
      if (end && (!f || f > end)) return false;
      if (financeFilters.pagos.length > 0 && !financeFilters.pagos.includes(o.pago)) return false;
      if (cli && !o.cliente.toLowerCase().includes(cli)) return false;
      return true;
    });
  }, [orders, financeFilters]);

  const financeConsumibles = useMemo(() => {
    if (!consumibles) return [];
    const [start, end] = getPeriodRange(financeFilters.periodo, financeFilters.desde, financeFilters.hasta);
    return consumibles.filter((c) => {
      if (start && (!c.fecha || c.fecha < start)) return false;
      if (end && (!c.fecha || c.fecha > end)) return false;
      return true;
    });
  }, [consumibles, financeFilters]);

  const stats = useMemo(() => {
    if (!orders || !consumibles) return null;
    const activos = orders.filter((o) => ACTIVOS.includes(o.estado)).length;
    const cobrado = financeOrders.reduce((s, o) => s + cobradoDe(o), 0);
    const porCobrar = financeOrders.reduce((s, o) => s + porCobrarDe(o), 0);
    const gastoConsumibles = financeConsumibles.reduce((s, c) => s + (c.costo || 0), 0);
    const gananciaNeta = cobrado - gastoConsumibles;
    return { cobrado, porCobrar, activos, gastoConsumibles, gananciaNeta };
  }, [orders, consumibles, financeOrders, financeConsumibles]);

  const monthly = useMemo(() => {
    if (!orders || !consumibles) return [];
    const map = {};
    financeOrders.forEach((o) => {
      const f = fechaIngresoDe(o);
      if (!f) return;
      const key = f.slice(0, 7);
      if (!map[key]) map[key] = { ingresos: 0, gasto: 0 };
      map[key].ingresos += cobradoDe(o);
    });
    financeConsumibles.filter((c) => c.fecha).forEach((c) => {
      const key = c.fecha.slice(0, 7);
      if (!map[key]) map[key] = { ingresos: 0, gasto: 0 };
      map[key].gasto += (c.costo || 0);
    });
    return Object.keys(map).sort().map((k) => {
      const [y, m] = k.split("-");
      return { mes: `${MESES_ABR[Number(m) - 1]} '${y.slice(2)}`, ingresos: Math.round(map[k].ingresos), gasto: Math.round(map[k].gasto) };
    });
  }, [financeOrders, financeConsumibles]);

  const STOPWORDS = new Set(["para","con","de","del","las","los","una","uno","unos","unas","por","que","este","esta","estos","estas","como","sin","son","muy","tiene","tengo","hacer","hecho","piezas","pieza","pedido","cliente","otra","otro","the","and","for"]);

  const metricas = useMemo(() => {
    if (!orders || !consumibles) return null;

    // ---- Clientes ----
    const porCliente = {};
    orders.forEach((o) => {
      if (!o.cliente || o.cliente.trim().toLowerCase() === "sin nombre") return;
      const key = o.cliente.trim();
      if (!porCliente[key]) porCliente[key] = { cliente: key, cobrado: 0, pedidos: 0, ultimaFecha: null };
      porCliente[key].cobrado += cobradoDe(o);
      porCliente[key].pedidos += 1;
      if (o.fechaPedido && (!porCliente[key].ultimaFecha || o.fechaPedido > porCliente[key].ultimaFecha)) porCliente[key].ultimaFecha = o.fechaPedido;
    });
    const listaClientes = Object.values(porCliente);
    const topRevenue = [...listaClientes].sort((a, b) => b.cobrado - a.cobrado).slice(0, 5);
    const topFrecuencia = [...listaClientes].sort((a, b) => b.pedidos - a.pedidos || b.cobrado - a.cobrado).slice(0, 5);
    const clientesUnicos = listaClientes.length;
    const clientesRecurrentes = listaClientes.filter((c) => c.pedidos > 1).length;
    const tasaRecurrencia = clientesUnicos > 0 ? (clientesRecurrentes / clientesUnicos) * 100 : 0;

    // ---- Ticket promedio ----
    const conPrecio = orders.filter((o) => o.precio != null);
    const ticketPromedio = conPrecio.length > 0 ? conPrecio.reduce((s, o) => s + o.precio, 0) / conPrecio.length : 0;

    // ---- Mejor mes (histórico, sin filtros; usa fecha de entrega si existe) ----
    const mesesMap = {};
    orders.forEach((o) => {
      const f = fechaIngresoDe(o);
      if (!f) return;
      const key = f.slice(0, 7);
      mesesMap[key] = (mesesMap[key] || 0) + cobradoDe(o);
    });
    let mejorMes = null;
    Object.entries(mesesMap).forEach(([k, v]) => {
      if (!mejorMes || v > mejorMes.valor) {
        const [y, m] = k.split("-");
        mejorMes = { label: `${MESES_ABR[Number(m) - 1]} ${y}`, valor: v };
      }
    });

    // ---- Consumibles: material y color ----
    const porMaterial = {};
    const porColor = {};
    consumibles.forEach((c) => {
      const matKey = c.material && c.material.trim() ? c.material.trim() : "Sin especificar";
      if (!porMaterial[matKey]) porMaterial[matKey] = { material: matKey, costo: 0, count: 0 };
      porMaterial[matKey].costo += (c.costo || 0);
      porMaterial[matKey].count += 1;

      if (c.color && c.color.trim()) {
        const colKey = c.color.trim().charAt(0).toUpperCase() + c.color.trim().slice(1).toLowerCase();
        if (!porColor[colKey]) porColor[colKey] = { color: colKey, costo: 0, count: 0 };
        porColor[colKey].costo += (c.costo || 0);
        porColor[colKey].count += 1;
      }
    });
    const materialStats = Object.values(porMaterial).sort((a, b) => b.costo - a.costo);
    const colorStats = Object.values(porColor).sort((a, b) => b.costo - a.costo).slice(0, 8);

    // ---- Lo que más piden (palabras clave en notas) ----
    const freq = {};
    orders.forEach((o) => {
      if (!o.notas) return;
      const palabras = o.notas.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/[a-záéíóúñ]{4,}/gi) || [];
      palabras.forEach((w) => {
        if (STOPWORDS.has(w)) return;
        freq[w] = (freq[w] || 0) + 1;
      });
    });
    const topPalabras = Object.entries(freq).filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w, n]) => ({ palabra: w, n }));

    return {
      topRevenue, topFrecuencia, clientesUnicos, clientesRecurrentes, tasaRecurrencia,
      ticketPromedio, mejorMes, materialStats, colorStats, topPalabras,
    };
  }, [orders, consumibles]);

  if (loading) {
    return (
      <div className="pt-shell pt-loading">
        <FontsAndStyles />
        <Feather className="pt-spin" size={28} />
        <span>Cargando la bitácora…</span>
      </div>
    );
  }

  return (
    <div className="pt-shell">
      <FontsAndStyles />

      <header className="pt-header">
        <div className="pt-brand">
          <DuckMark size={40} />
          <div>
            <h1>PatoTechLab</h1>
            <p className="pt-tagline">Make it Real · Bitácora de encargos</p>
          </div>
        </div>
        <div className="pt-header-actions">
          <input type="file" accept="application/json" ref={importInputRef} onChange={handleImportFile} style={{ display: "none" }} />
          <button className="pt-btn-ghost pt-btn-small" onClick={triggerImport} title="Restaurar desde un respaldo .json">
            <Upload size={14} /> Restaurar
          </button>
          <button className="pt-btn-ghost pt-btn-small" onClick={exportBackup} title="Descargar todos tus datos como respaldo">
            <Download size={14} /> Respaldo
          </button>
        </div>
      </header>

      <nav className="pt-tabs">
        {TABS.map((t) => {
          const TIcon = t.icon;
          return (
            <button
              key={t.id}
              className={`pt-tab ${activeTab === t.id ? "pt-tab-active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <TIcon size={15} /> {t.label}
              {t.id === "consumibles" && consumibles.length > 0 && <span className="pt-tab-count">{consumibles.length}</span>}
              {t.id === "pedidos" && stats.activos > 0 && <span className="pt-tab-count">{stats.activos}</span>}
            </button>
          );
        })}
      </nav>

      {saveError && <p className="pt-save-error">No se pudo guardar el último cambio. Vuelve a intentarlo.</p>}

      {activeTab === "pedidos" && (
        <>
          <section className={`pt-quickbar ${justAdded ? "pt-quickbar-flash" : ""}`}>
            <Zap size={18} className="pt-quick-icon" />
            <input
              className="pt-quick-input"
              value={quickText}
              onChange={(e) => setQuickText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") quickAdd(); }}
              placeholder="Anota rápido: &quot;Ana - 2 llaveros del mundial&quot; y presiona Enter"
            />
            <button className="pt-quick-btn" onClick={quickAdd} disabled={!quickText.trim()}>
              {justAdded ? <Check size={16} /> : <Plus size={16} />}
            </button>
          </section>
          <p className="pt-quick-hint">Se guarda en <strong>Por definir</strong> con hoy como fecha. Complétalo y muévelo cuando tengas tiempo.</p>

          <div className="pt-pedidos-toolbar">
            <div className="pt-search">
              <Search size={16} />
              <input placeholder="Buscar cliente o encargo…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <button className="pt-btn-primary" onClick={openNew}>
              <Plus size={16} /> Nuevo encargo
            </button>
            <button className="pt-btn-ghost" onClick={exportOrdersCSV} title="Descargar pedidos como CSV">
              <Download size={16} />
            </button>
          </div>
          <p className="pt-kanban-hint">Arrastra una tarjeta a otra columna para cambiar su estado, o haz clic para editarla.</p>

          <div className="pt-kanban">
            {ESTADOS.map((estado) => {
              const meta = ESTADO_META[estado];
              const Icon = meta.icon;
              const list = ordersByStatus[estado] || [];
              return (
                <div
                  key={estado}
                  className={`pt-kanban-col ${meta.cls} ${dragOverStatus === estado ? "pt-kanban-col-over" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setDragOverStatus(estado); }}
                  onDragLeave={() => setDragOverStatus((s) => (s === estado ? null : s))}
                  onDrop={(e) => {
                    e.preventDefault();
                    const id = e.dataTransfer.getData("text/plain");
                    if (id) moveOrderToStatus(id, estado);
                    setDragOverStatus(null);
                  }}
                >
                  <div className={`pt-kanban-col-head ${meta.cls}`}>
                    <Icon size={14} />
                    <span>{meta.corto}</span>
                    {list.some(isAtrasado) && (
                      <span className="pt-kanban-late-badge"><AlertTriangle size={9} /> {list.filter(isAtrasado).length}</span>
                    )}
                    {list.some(isPagoParcialActivo) && (
                      <span className="pt-kanban-advance-badge"><Banknote size={9} /> {list.filter(isPagoParcialActivo).length}</span>
                    )}
                    <span className="pt-kanban-count">{list.length}</span>
                  </div>
                  <div className="pt-kanban-cards">
                    {list.length === 0 && <p className="pt-kanban-empty">Sin pedidos</p>}
                    {list.map((o) => {
                      const atrasado = isAtrasado(o);
                      const adelantado = !atrasado && isPagoParcialActivo(o);
                      return (
                      <div
                        key={o.id}
                        className={`pt-order-card ${atrasado ? "pt-order-card-late" : ""} ${adelantado ? "pt-order-card-advance" : ""}`}
                        draggable
                        onDragStart={(e) => { e.dataTransfer.setData("text/plain", o.id); e.dataTransfer.effectAllowed = "move"; }}
                        onClick={() => openEdit(o)}
                      >
                        <div className="pt-order-card-top">
                          <span className="pt-order-card-cliente">{o.cliente}</span>
                          {o.prioridad === "Alta" && <span className="pt-priority-dot" title="Alta prioridad" />}
                        </div>
                        {atrasado && <span className="pt-tag pt-tag-late"><AlertTriangle size={9} /> Atrasado</span>}
                        {adelantado && (
                          <span className="pt-tag pt-tag-advance">
                            <Banknote size={9} />
                            {o.pago === "Anticipo" ? " Tiene anticipo — no lo olvides" : " Ya te pagaron — no lo olvides"}
                          </span>
                        )}
                        {o.notas && <p className="pt-order-card-notas">{o.notas}</p>}
                        <div className="pt-order-card-bottom">
                          <span className="pt-order-card-fecha">
                            {formatFechaCorta(o.fechaPedido) || "Sin fecha"}
                            {o.fechaEntrega && <> <Truck size={10} className="pt-order-card-truck" /> {formatFechaCorta(o.fechaEntrega)}</>}
                          </span>
                          <span className="pt-order-card-precio">{mxn(o.precio)}</span>
                        </div>
                        <div className="pt-order-card-tags">
                          {o.quick && <span className="pt-tag pt-tag-quick"><Zap size={9} /> Por completar</span>}
                          {o.precio != null && (() => {
                            const pm = PAGO_META[o.pago] || PAGO_META["Sin pagar"];
                            const PIcon = pm.icon;
                            const label = o.pago === "Anticipo" ? `Anticipo ${mxn(o.anticipo)}` : pm.corto;
                            return <span className={`pt-tag pt-pago-tag ${pm.cls}`}><PIcon size={9} /> {label}</span>;
                          })()}
                        </div>
                        <div className="pt-order-card-actions" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => duplicateOrder(o)} aria-label="Duplicar"><Copy size={13} /></button>
                          <button onClick={() => openEdit(o)} aria-label="Editar"><Pencil size={13} /></button>
                          <button onClick={() => setConfirmDeleteId(o.id)} aria-label="Eliminar"><Trash2 size={13} /></button>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === "consumibles" && (
        <section className="pt-panel">
          <div className="pt-consumibles-head">
            <h2 className="pt-section-head" style={{ margin: 0 }}>🧴 Consumibles <span>filamento y demás insumos que compras</span></h2>
            <button className="pt-btn-primary pt-btn-small" onClick={openNewConsumible}>
              <Plus size={14} /> Agregar
            </button>
          </div>

          {consumibles.length === 0 && (
            <p className="pt-empty">Aún no anotas compras. Agrega tu último rollo de filamento para empezar.</p>
          )}

          {consumibles.length > 0 && (
            <div className="pt-list">
              {[...consumibles].sort((a, b) => (b.fecha || "").localeCompare(a.fecha || "")).map((c) => (
                <div className="pt-consumible-row" key={c.id}>
                  <div className="pt-row-main">
                    <div className="pt-row-top">
                      <span className="pt-cliente">{c.nombre}</span>
                      {c.fecha && <span className="pt-fecha">{new Date(c.fecha + "T00:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}</span>}
                    </div>
                    {(c.cantidad || c.notas) && <p className="pt-notas">{[c.cantidad, c.notas].filter(Boolean).join(" · ")}</p>}
                    {(c.material || c.color) && (
                      <div className="pt-row-tags-inline">
                        {c.material && <span className="pt-tag pt-tag-material">{c.material}</span>}
                        {c.color && <span className="pt-tag pt-tag-color"><Palette size={9} /> {c.color}</span>}
                      </div>
                    )}
                  </div>
                  <div className="pt-row-right">
                    <span className="pt-precio">{mxn(c.costo)}</span>
                    <div className="pt-row-actions">
                      <button onClick={() => openEditConsumible(c)} aria-label="Editar"><Pencil size={15} /></button>
                      <button onClick={() => setConfirmDeleteConsumibleId(c.id)} aria-label="Eliminar"><Trash2 size={15} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === "finanzas" && (
        <>
          <section className="pt-panel pt-finance-filters">
            <div className="pt-finance-filters-row">
              <div className="pt-select pt-select-period">
                <select value={financeFilters.periodo} onChange={(e) => setFinanceFilters({ ...financeFilters, periodo: e.target.value })}>
                  <option value="todo">Todo el tiempo</option>
                  <option value="este_mes">Este mes</option>
                  <option value="mes_pasado">Mes pasado</option>
                  <option value="este_anio">Este año</option>
                  <option value="personalizado">Rango personalizado…</option>
                </select>
                <ChevronDown size={14} />
              </div>

              {financeFilters.periodo === "personalizado" && (
                <>
                  <input type="date" className="pt-finance-date" value={financeFilters.desde}
                    onChange={(e) => setFinanceFilters({ ...financeFilters, desde: e.target.value })} />
                  <span className="pt-finance-date-sep">–</span>
                  <input type="date" className="pt-finance-date" value={financeFilters.hasta}
                    onChange={(e) => setFinanceFilters({ ...financeFilters, hasta: e.target.value })} />
                </>
              )}

              <div className="pt-search pt-finance-search">
                <Search size={15} />
                <input placeholder="Filtrar por cliente…" value={financeFilters.cliente}
                  onChange={(e) => setFinanceFilters({ ...financeFilters, cliente: e.target.value })} />
              </div>

              {(financeFilters.periodo !== "todo" || financeFilters.pagos.length > 0 || financeFilters.cliente) && (
                <button className="pt-history-hide-standalone pt-finance-clear" onClick={() => setFinanceFilters(emptyFinanceFilters())}>
                  Quitar filtros
                </button>
              )}
            </div>

            <div className="pt-finance-filters-row">
              <span className="pt-finance-filters-label">Estado de pago:</span>
              <FilterChip label="Todos" active={financeFilters.pagos.length === 0} onClick={() => setFinanceFilters({ ...financeFilters, pagos: [] })} />
              {PAGOS.map((p) => (
                <FilterChip key={p} label={p} active={financeFilters.pagos.includes(p)} onClick={() => togglePagoFilter(p)} />
              ))}
            </div>

            <p className="pt-finance-summary">
              Mostrando <strong>{financeOrders.length}</strong> pedido{financeOrders.length === 1 ? "" : "s"} y <strong>{financeConsumibles.length}</strong> consumible{financeConsumibles.length === 1 ? "" : "s"} con estos filtros.
            </p>
          </section>

          <section className="pt-cards">
            <StatCard icon={PiggyBank} label="Cobrado" value={mxn(stats.cobrado)} tone="done" />
            <StatCard icon={Wallet} label="Por cobrar" value={mxn(stats.porCobrar)} tone="unpaid" />
            <StatCard icon={ListChecks} label="Encargos activos" value={stats.activos} tone="pend" />
            <StatCard icon={TrendingUp} label="Gasto en consumibles" value={mxn(stats.gastoConsumibles)} tone="material" />
            <StatCard icon={PiggyBank} label="Ganancia neta" value={mxn(stats.gananciaNeta)} tone="brand" />
          </section>

          {monthly.length > 1 ? (
            <section className="pt-panel pt-chart">
              <h2>Ingresos vs. gasto en consumibles <span>por mes, según filtros</span></h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthly} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E3DF" vertical={false} />
                  <XAxis dataKey="mes" tick={{ fontFamily: "Inter", fontSize: 12, fill: "#626D6F" }} axisLine={{ stroke: "#E0E3DF" }} tickLine={false} />
                  <YAxis tick={{ fontFamily: "Inter", fontSize: 11, fill: "#8A9698" }} axisLine={false} tickLine={false} width={54}
                    tickFormatter={(v) => `$${v >= 1000 ? (v / 1000).toFixed(1) + "k" : v}`} />
                  <Tooltip
                    formatter={(v, name) => [mxn(v), name === "ingresos" ? "Cobrado" : "Gasto en consumibles"]}
                    contentStyle={{ fontFamily: "Inter", borderRadius: 10, border: "1px solid #E0E3DF" }}
                  />
                  <Bar dataKey="ingresos" radius={[6, 6, 0, 0]} fill="#76D360" />
                  <Bar dataKey="gasto" radius={[6, 6, 0, 0]} fill="#FCB83B" />
                </BarChart>
              </ResponsiveContainer>
            </section>
          ) : (
            <p className="pt-empty">Aún no hay suficientes meses con datos para graficar con estos filtros.</p>
          )}
        </>
      )}

      {activeTab === "metricas" && (
        <>
          <section className="pt-cards">
            <StatCard icon={Users} label="Clientes únicos" value={metricas.clientesUnicos} tone="brand" />
            <StatCard icon={Repeat} label="Clientes recurrentes" value={`${metricas.clientesRecurrentes} (${metricas.tasaRecurrencia.toFixed(0)}%)`} tone="done" />
            <StatCard icon={Hash} label="Ticket promedio" value={mxn(metricas.ticketPromedio)} tone="pend" />
            <StatCard icon={Sparkles} label="Mejor mes" value={metricas.mejorMes ? `${metricas.mejorMes.label}` : "—"} tone="material" />
          </section>

          <div className="pt-metrics-grid">
            <section className="pt-panel">
              <h2 className="pt-section-head"><Trophy size={16} /> Top clientes <span>por dinero generado</span></h2>
              {metricas.topRevenue.length === 0 && <p className="pt-empty">Aún no hay suficientes pedidos con cliente y cobro para mostrar un ranking.</p>}
              {metricas.topRevenue.length > 0 && (
                <div className="pt-rank-list">
                  {metricas.topRevenue.map((c, i) => (
                    <div className="pt-rank-row" key={c.cliente}>
                      <span className={`pt-rank-medal ${i === 0 ? "pt-rank-gold" : i === 1 ? "pt-rank-silver" : i === 2 ? "pt-rank-bronze" : ""}`}>{i + 1}</span>
                      <div className="pt-rank-main">
                        <span className="pt-rank-name">{c.cliente}</span>
                        <span className="pt-rank-sub">{c.pedidos} pedido{c.pedidos === 1 ? "" : "s"}</span>
                      </div>
                      <span className="pt-rank-value">{mxn(c.cobrado)}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="pt-panel">
              <h2 className="pt-section-head"><Medal size={16} /> Top clientes <span>por frecuencia de pedidos</span></h2>
              {metricas.topFrecuencia.length === 0 && <p className="pt-empty">Aún no hay suficientes pedidos con cliente para mostrar un ranking.</p>}
              {metricas.topFrecuencia.length > 0 && (
                <div className="pt-rank-list">
                  {metricas.topFrecuencia.map((c, i) => (
                    <div className="pt-rank-row" key={c.cliente}>
                      <span className={`pt-rank-medal ${i === 0 ? "pt-rank-gold" : i === 1 ? "pt-rank-silver" : i === 2 ? "pt-rank-bronze" : ""}`}>{i + 1}</span>
                      <div className="pt-rank-main">
                        <span className="pt-rank-name">{c.cliente}</span>
                        <span className="pt-rank-sub">{mxn(c.cobrado)} generados</span>
                      </div>
                      <span className="pt-rank-value">{c.pedidos}×</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="pt-panel">
              <h2 className="pt-section-head"><Boxes size={16} /> Consumibles <span>por tipo de material</span></h2>
              {metricas.materialStats.length === 0 && <p className="pt-empty">Aún no tienes consumibles registrados.</p>}
              {metricas.materialStats.length > 0 && (
                <div className="pt-bar-list">
                  {metricas.materialStats.map((m) => {
                    const max = metricas.materialStats[0].costo || 1;
                    return (
                      <div className="pt-bar-row" key={m.material}>
                        <div className="pt-bar-row-top">
                          <span>{m.material} <span className="pt-bar-count">({m.count})</span></span>
                          <span>{mxn(m.costo)}</span>
                        </div>
                        <div className="pt-bar-track"><div className="pt-bar-fill pt-bar-fill-material" style={{ width: `${(m.costo / max) * 100}%` }} /></div>
                      </div>
                    );
                  })}
                </div>
              )}
              <p className="pt-metrics-hint">Anota el material al registrar cada consumible para que este análisis sea más preciso.</p>
            </section>

            <section className="pt-panel">
              <h2 className="pt-section-head"><Palette size={16} /> Consumibles <span>por color</span></h2>
              {metricas.colorStats.length === 0 && <p className="pt-empty">Aún no has anotado colores en tus consumibles.</p>}
              {metricas.colorStats.length > 0 && (
                <div className="pt-bar-list">
                  {metricas.colorStats.map((c) => {
                    const max = metricas.colorStats[0].costo || 1;
                    return (
                      <div className="pt-bar-row" key={c.color}>
                        <div className="pt-bar-row-top">
                          <span>{c.color} <span className="pt-bar-count">({c.count})</span></span>
                          <span>{mxn(c.costo)}</span>
                        </div>
                        <div className="pt-bar-track"><div className="pt-bar-fill pt-bar-fill-color" style={{ width: `${(c.costo / max) * 100}%` }} /></div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="pt-panel pt-metrics-full">
              <h2 className="pt-section-head"><Sparkles size={16} /> Lo que más piden <span>palabras frecuentes en tus encargos</span></h2>
              {metricas.topPalabras.length === 0 && <p className="pt-empty">Aún no hay suficientes pedidos repetidos para detectar un patrón.</p>}
              {metricas.topPalabras.length > 0 && (
                <div className="pt-keyword-cloud">
                  {metricas.topPalabras.map((p) => (
                    <span key={p.palabra} className="pt-keyword-chip" style={{ fontSize: `${11 + Math.min(p.n, 8)}px` }}>
                      {p.palabra} <span className="pt-keyword-n">{p.n}</span>
                    </span>
                  ))}
                </div>
              )}
            </section>
          </div>
        </>
      )}

      {modalOpen && (
        <div className="pt-overlay" onClick={() => setModalOpen(false)}>
          <div className="pt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pt-modal-head">
              <h3>{draft.id ? "Editar encargo" : "Nuevo encargo"}</h3>
              <button onClick={() => setModalOpen(false)}><X size={18} /></button>
            </div>

            <label className="pt-field">
              <span>Cliente</span>
              <input value={draft.cliente} onChange={(e) => setDraft({ ...draft, cliente: e.target.value })} placeholder="Ej. Vane" autoFocus />
            </label>

            <label className="pt-field">
              <span>Descripción del encargo</span>
              <textarea rows={3} value={draft.notas} onChange={(e) => setDraft({ ...draft, notas: e.target.value })} placeholder="Ej. 2 Pokedex porta cartas con pokebola" />
            </label>

            <div className="pt-field-row">
              <label className="pt-field">
                <span>Estado</span>
                <div className="pt-select">
                  <select value={draft.estado} onChange={(e) => setDraft({ ...draft, estado: e.target.value })}>
                    {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                  <ChevronDown size={14} />
                </div>
              </label>
              <label className="pt-field">
                <span>Prioridad</span>
                <div className="pt-select">
                  <select value={draft.prioridad} onChange={(e) => setDraft({ ...draft, prioridad: e.target.value })}>
                    {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <ChevronDown size={14} />
                </div>
              </label>
            </div>

            <div className="pt-field-row">
              <label className="pt-field">
                <span>Fecha que lo pidieron</span>
                <input type="date" value={draft.fechaPedido || ""} onChange={(e) => setDraft({ ...draft, fechaPedido: e.target.value })} />
              </label>
              <label className="pt-field">
                <span>Fecha de entrega</span>
                <input type="date" value={draft.fechaEntrega || ""} onChange={(e) => setDraft({ ...draft, fechaEntrega: e.target.value })} />
              </label>
            </div>
            <p className="pt-field-hint" style={{ marginTop: "-6px", marginBottom: "12px" }}>
              El ingreso se ubica en el mes de entrega si ya la anotaste; si no, en el mes del pedido.
            </p>

            <label className="pt-field">
              <span>Precio (MXN)</span>
              <input type="number" min="0" value={draft.precio} onChange={(e) => setDraft({ ...draft, precio: e.target.value })} placeholder="Sin definir" />
            </label>

            <label className="pt-field">
              <span>Estado de pago</span>
              <div className="pt-select">
                <select value={draft.pago} onChange={(e) => setDraft({ ...draft, pago: e.target.value })}>
                  {PAGOS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown size={14} />
              </div>
            </label>

            {draft.pago === "Anticipo" && (
              <label className="pt-field">
                <span>Monto del anticipo (MXN)</span>
                <input type="number" min="0" value={draft.anticipo} onChange={(e) => setDraft({ ...draft, anticipo: e.target.value })} placeholder="Ej. 100" />
                {draft.precio !== "" && draft.anticipo !== "" && (
                  <p className="pt-field-hint">Quedaría pendiente: {mxn(Math.max(Number(draft.precio) - Number(draft.anticipo), 0))}</p>
                )}
              </label>
            )}

            <div className="pt-modal-actions">
              {draft.id && (
                <button
                  className="pt-btn-ghost pt-btn-duplicate"
                  onClick={() => { duplicateOrder(draft); setModalOpen(false); }}
                  title="Crear una copia de este pedido"
                >
                  <Copy size={15} /> Duplicar
                </button>
              )}
              <button className="pt-btn-ghost" onClick={() => setModalOpen(false)}>Cancelar</button>
              <button className="pt-btn-primary" onClick={saveDraft} disabled={!draft.cliente.trim()}>
                <Check size={16} /> Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="pt-overlay" onClick={() => setConfirmDeleteId(null)}>
          <div className="pt-modal pt-modal-sm" onClick={(e) => e.stopPropagation()}>
            <h3>¿Eliminar este encargo?</h3>
            <p className="pt-confirm-text">Esta acción no se puede deshacer.</p>
            <div className="pt-modal-actions">
              <button className="pt-btn-ghost" onClick={() => setConfirmDeleteId(null)}>Cancelar</button>
              <button className="pt-btn-danger" onClick={() => removeOrder(confirmDeleteId)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {consumibleModalOpen && (
        <div className="pt-overlay" onClick={() => setConsumibleModalOpen(false)}>
          <div className="pt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pt-modal-head">
              <h3>{consumibleDraft.id ? "Editar consumible" : "Nuevo consumible"}</h3>
              <button onClick={() => setConsumibleModalOpen(false)}><X size={18} /></button>
            </div>

            <label className="pt-field">
              <span>¿Qué compraste?</span>
              <input
                value={consumibleDraft.nombre}
                onChange={(e) => setConsumibleDraft({ ...consumibleDraft, nombre: e.target.value })}
                placeholder="Ej. Filamento PLA negro 1kg"
                autoFocus
              />
            </label>

            <div className="pt-field-row">
              <label className="pt-field">
                <span>Costo (MXN)</span>
                <input
                  type="number" min="0" value={consumibleDraft.costo}
                  onChange={(e) => setConsumibleDraft({ ...consumibleDraft, costo: e.target.value })}
                  placeholder="Ej. 350"
                />
              </label>
              <label className="pt-field">
                <span>Fecha</span>
                <input
                  type="date" value={consumibleDraft.fecha || ""}
                  onChange={(e) => setConsumibleDraft({ ...consumibleDraft, fecha: e.target.value })}
                />
              </label>
            </div>

            <div className="pt-field-row">
              <label className="pt-field">
                <span>Material (opcional)</span>
                <div className="pt-select">
                  <select value={consumibleDraft.material} onChange={(e) => setConsumibleDraft({ ...consumibleDraft, material: e.target.value })}>
                    <option value="">Sin especificar</option>
                    {MATERIALES.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <ChevronDown size={14} />
                </div>
              </label>
              <label className="pt-field">
                <span>Color (opcional)</span>
                <input
                  value={consumibleDraft.color}
                  onChange={(e) => setConsumibleDraft({ ...consumibleDraft, color: e.target.value })}
                  placeholder="Ej. Negro"
                />
              </label>
            </div>

            <label className="pt-field">
              <span>Cantidad / presentación (opcional)</span>
              <input
                value={consumibleDraft.cantidad}
                onChange={(e) => setConsumibleDraft({ ...consumibleDraft, cantidad: e.target.value })}
                placeholder="Ej. 1kg, en oferta"
              />
            </label>

            <label className="pt-field">
              <span>Notas (opcional)</span>
              <input
                value={consumibleDraft.notas}
                onChange={(e) => setConsumibleDraft({ ...consumibleDraft, notas: e.target.value })}
                placeholder="Ej. Proveedor, color, promoción"
              />
            </label>

            <div className="pt-modal-actions">
              <button className="pt-btn-ghost" onClick={() => setConsumibleModalOpen(false)}>Cancelar</button>
              <button
                className="pt-btn-primary"
                onClick={saveConsumibleDraft}
                disabled={!consumibleDraft.nombre.trim() || consumibleDraft.costo === ""}
              >
                <Check size={16} /> Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteConsumibleId && (
        <div className="pt-overlay" onClick={() => setConfirmDeleteConsumibleId(null)}>
          <div className="pt-modal pt-modal-sm" onClick={(e) => e.stopPropagation()}>
            <h3>¿Eliminar este consumible?</h3>
            <p className="pt-confirm-text">Esta acción no se puede deshacer.</p>
            <div className="pt-modal-actions">
              <button className="pt-btn-ghost" onClick={() => setConfirmDeleteConsumibleId(null)}>Cancelar</button>
              <button className="pt-btn-danger" onClick={() => removeConsumible(confirmDeleteConsumibleId)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      <footer className="pt-footer">Tus datos se guardan automáticamente en este dispositivo/cuenta.</footer>
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button className={`pt-chip ${active ? "pt-chip-active" : ""}`} onClick={onClick}>
      {label}
    </button>
  );
}

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className={`pt-stat pt-stat-${tone}`}>
      <Icon size={18} />
      <div>
        <p className="pt-stat-value">{value}</p>
        <p className="pt-stat-label">{label}</p>
      </div>
    </div>
  );
}

const DUCK_LOGO_B64 = "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";

function DuckMark({ size = 40 }) {
  return (
    <img
      src={`data:image/png;base64,${DUCK_LOGO_B64}`}
      alt="Logo PatoTechLab"
      width={size}
      height={size}
      style={{ borderRadius: "10px", objectFit: "contain", display: "block" }}
    />
  );
}

function FontsAndStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

      .pt-shell{
        --moss:#76D360; --moss-deep:#2D741C; --ink:#626D6F; --ink-soft:#8A9698;
        --egg:#FDDD3A; --marigold:#FCB83B; --coral:#E2665B;
        --pond:#F6F7F6; --paper:#FFFFFF; --line:#E0E3DF;
        font-family:'Inter',sans-serif; color:var(--ink);
        background-color:var(--pond);
        background-image:
          url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22640%22%20height%3D%22640%22%20viewBox%3D%220%200%20640%20640%22%3E%3Cg%20fill%3D%22%232D741C%22%20fill-opacity%3D%220.06%22%3E%3Cg%20transform%3D%22translate%28200.2%2C82.6%29%20rotate%28-38.5%29%20scale%280.74%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28344.4%2C228.7%29%20rotate%280.7%29%20scale%280.38%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%285.5%2C274.9%29%20rotate%28-36.8%29%20scale%280.39%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28268.7%2C542.3%29%20rotate%28-24.9%29%20scale%280.42%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28406.7%2C624.4%29%20rotate%28-9.3%29%20scale%280.70%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28643.9%2C11.7%29%20rotate%28-18.9%29%20scale%280.87%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%2878.1%2C60.1%29%20rotate%2828.5%29%20scale%280.54%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28102.9%2C375.5%29%20rotate%28-11.5%29%20scale%280.73%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28352.5%2C22.7%29%20rotate%28-26.5%29%20scale%280.39%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28442.7%2C270.8%29%20rotate%287.7%29%20scale%280.54%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28288.2%2C183.8%29%20rotate%2817.9%29%20scale%280.83%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28146.0%2C370.6%29%20rotate%2833.8%29%20scale%280.67%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28476.0%2C175.8%29%20rotate%28-34.4%29%20scale%280.94%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28264.3%2C494.9%29%20rotate%28-1.0%29%20scale%280.44%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%286.7%2C434.4%29%20rotate%286.6%29%20scale%280.81%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28575.3%2C193.3%29%20rotate%288.5%29%20scale%280.77%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28374.3%2C290.2%29%20rotate%2840.0%29%20scale%280.85%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28302.4%2C431.6%29%20rotate%2818.1%29%20scale%280.39%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28420.0%2C655.3%29%20rotate%28-19.4%29%20scale%280.84%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%28242.3%2C434.7%29%20rotate%28-3.4%29%20scale%280.36%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%2894.3%2C59.6%29%20rotate%2824.1%29%20scale%280.39%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3Cg%20transform%3D%22translate%2868.0%2C148.4%29%20rotate%2833.4%29%20scale%280.58%29%22%3E%3Cpath%20d%3D%22M32%2C24%20C36%2C28%2039%2C32%2041%2C36%20C43%2C31%2047%2C21%2050%2C17%20C53%2C21%2057%2C31%2059%2C36%20C61%2C32%2064%2C28%2068%2C24%20C80%2C30%2091%2C44%2089%2C55%20C87%2C68%2076%2C83%2068%2C91%20C60%2C97%2054%2C101%2050%2C102%20C46%2C101%2040%2C97%2032%2C91%20C24%2C83%2013%2C68%2011%2C55%20C9%2C44%2020%2C30%2032%2C24%20Z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
          radial-gradient(circle at 6% 4%, rgba(253,221,58,0.20), transparent 30%),
          radial-gradient(circle at 96% 8%, rgba(252,184,59,0.16), transparent 28%),
          radial-gradient(circle at 8% 96%, rgba(118,211,96,0.22), transparent 34%),
          radial-gradient(circle at 94% 92%, rgba(92,143,224,0.12), transparent 30%),
          linear-gradient(165deg, #F9FBF7 0%, #EEF6E9 45%, #F6F7F6 100%);
        background-repeat: repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
        background-size: 640px 640px, auto, auto, auto, auto, auto;
        background-position: 0 0, 0 0, 0 0, 0 0, 0 0, 0 0;
        background-attachment: fixed, fixed, fixed, fixed, fixed, fixed;
        min-height:100%; padding:20px 16px 40px; max-width:1180px; margin:0 auto;
        box-sizing:border-box;
      }
      .pt-shell *{ box-sizing:border-box; }

      .pt-loading{ display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; min-height:60vh; color:var(--moss-deep); font-family:'Baloo 2'; }
      .pt-spin{ animation:pt-spin 1.4s linear infinite; }
      @keyframes pt-spin{ to{ transform:rotate(360deg); } }

      .pt-header{ display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:14px; }
      .pt-brand{ display:flex; align-items:center; gap:12px; }
      .pt-brand h1{ font-family:'Baloo 2',sans-serif; font-weight:800; font-size:24px; margin:0; color:var(--moss-deep); letter-spacing:.2px; }
      .pt-tagline{ margin:0; font-size:12px; color:var(--ink-soft); font-weight:600; }
      .pt-header-actions{ display:flex; gap:8px; }

      .pt-tabs{ display:flex; gap:6px; background:var(--paper); border:1px solid var(--line); border-radius:14px; padding:5px; margin-bottom:16px; width:fit-content; max-width:100%; overflow-x:auto; }
      .pt-tab{ display:flex; align-items:center; gap:6px; background:transparent; border:none; color:var(--ink-soft); font-family:'Baloo 2'; font-weight:600; font-size:13.5px; padding:9px 16px; border-radius:10px; cursor:pointer; white-space:nowrap; }
      .pt-tab:hover{ background:var(--pond); color:var(--ink); }
      .pt-tab-active{ background:var(--moss); color:#fff; }
      .pt-tab-active:hover{ background:var(--moss); color:#fff; }
      .pt-tab-count{ font-family:'IBM Plex Mono'; font-size:10.5px; background:rgba(255,255,255,.3); padding:1px 6px; border-radius:8px; }
      .pt-tab:not(.pt-tab-active) .pt-tab-count{ background:var(--pond); color:var(--ink-soft); }

      .pt-quickbar{ display:flex; align-items:center; gap:8px; background:#FEF6CD; border:1.5px solid var(--egg); border-radius:14px; padding:9px 12px; margin-bottom:6px; transition:background .3s; }
      .pt-quickbar-flash{ background:#E0F5DB; border-color:var(--moss); }
      .pt-quick-icon{ color:#998000; flex-shrink:0; }
      .pt-quickbar-flash .pt-quick-icon{ color:var(--moss-deep); }
      .pt-quick-input{ flex:1; border:none; background:transparent; outline:none; font-family:'Inter'; font-size:14px; color:var(--ink); min-width:0; }
      .pt-quick-input::placeholder{ color:#B3941F; }
      .pt-quick-btn{ background:var(--egg); border:none; color:#665500; width:32px; height:32px; border-radius:9px; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; }
      .pt-quick-btn:disabled{ opacity:.45; cursor:not-allowed; }
      .pt-quickbar-flash .pt-quick-btn{ background:var(--moss); color:#fff; }
      .pt-quick-hint{ font-size:11.5px; color:var(--ink-soft); margin:0 0 16px 4px; }

      .pt-pedidos-toolbar{ display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-bottom:6px; }
      .pt-search{ display:flex; align-items:center; gap:6px; background:var(--paper); border:1px solid var(--line); border-radius:10px; padding:8px 10px; flex:1 1 220px; color:var(--ink-soft); }
      .pt-search input{ border:none; background:transparent; outline:none; font-family:'Inter'; font-size:13.5px; color:var(--ink); width:100%; }
      .pt-kanban-hint{ font-size:11.5px; color:var(--ink-soft); margin:0 0 12px 2px; }

      .pt-btn-primary{ display:inline-flex; align-items:center; gap:6px; background:var(--moss); color:#fff; border:none; font-family:'Baloo 2'; font-weight:600; font-size:13.5px; padding:9px 15px; border-radius:11px; cursor:pointer; }
      .pt-btn-primary:hover{ background:var(--moss-deep); }
      .pt-btn-primary:disabled{ opacity:.5; cursor:not-allowed; }
      .pt-btn-ghost{ background:transparent; border:1px solid var(--line); color:var(--ink); font-weight:600; font-size:13.5px; padding:9px 15px; border-radius:11px; cursor:pointer; }
      .pt-btn-danger{ background:var(--coral); color:#fff; border:none; font-weight:600; font-size:13.5px; padding:9px 15px; border-radius:11px; cursor:pointer; }
      .pt-btn-small{ padding:6px 12px; font-size:12.5px; display:inline-flex; align-items:center; gap:5px; }

      .pt-save-error{ color:var(--coral); font-size:12.5px; margin:0 0 10px; }
      .pt-empty{ color:var(--ink-soft); font-size:13.5px; text-align:center; padding:24px 0; }

      /* ---------- Kanban ---------- */
      .pt-kanban{ display:grid; grid-auto-flow:column; grid-auto-columns:250px; gap:12px; overflow-x:auto; padding-bottom:10px; margin-bottom:8px; }
      .pt-kanban-col{ background:var(--paper); border:1px solid var(--line); border-radius:14px; display:flex; flex-direction:column; min-height:120px; max-height:70vh; transition:box-shadow .15s, border-color .15s; }
      .pt-kanban-col-over{ border-color:var(--moss); box-shadow:0 0 0 3px rgba(87,178,74,.15); }
      .pt-kanban-col-head{ display:flex; align-items:center; gap:6px; font-family:'Baloo 2'; font-weight:700; font-size:12.5px; padding:11px 12px; border-bottom:1px solid var(--line); border-radius:14px 14px 0 0; }
      .pt-kanban-col-head.st-undef{ background:#EDEDE6; color:#7A7A6E; }
      .pt-kanban-col-head.st-pend{ background:#FEF6CD; color:#998000; }
      .pt-kanban-col-head.st-print{ background:#FEEDCD; color:var(--marigold); }
      .pt-kanban-col-head.st-deliv{ background:#E3ECFB; color:#5C8FE0; }
      .pt-kanban-col-head.st-done{ background:#E0F5DB; color:var(--moss-deep); }
      .pt-kanban-count{ margin-left:auto; font-family:'IBM Plex Mono'; font-size:10.5px; background:rgba(255,255,255,.6); padding:1px 6px; border-radius:8px; }
      .pt-kanban-late-badge{ display:inline-flex; align-items:center; gap:3px; font-family:'IBM Plex Mono'; font-size:10px; background:var(--coral); color:#fff; padding:1px 6px; border-radius:8px; }
      .pt-kanban-advance-badge{ display:inline-flex; align-items:center; gap:3px; font-family:'IBM Plex Mono'; font-size:10px; background:#5C8FE0; color:#fff; padding:1px 6px; border-radius:8px; }
      .pt-kanban-cards{ flex:1; overflow-y:auto; padding:10px; display:flex; flex-direction:column; gap:8px; }
      .pt-kanban-empty{ text-align:center; color:var(--ink-soft); font-size:11.5px; padding:14px 0; margin:0; }

      .pt-order-card{ position:relative; background:var(--pond); border:1px solid var(--line); border-radius:11px; padding:10px 10px 8px; cursor:grab; }
      .pt-order-card:active{ cursor:grabbing; }
      .pt-order-card:hover{ border-color:var(--moss); }
      .pt-order-card-late{ background:#FBE4E2; border-color:var(--coral); }
      .pt-order-card-late:hover{ border-color:var(--coral); }
      .pt-tag-late{ background:var(--coral); color:#fff; margin-bottom:5px; }
      .pt-order-card-advance{ background:#E3ECFB; border-color:#5C8FE0; }
      .pt-order-card-advance:hover{ border-color:#5C8FE0; }
      .pt-tag-advance{ background:#5C8FE0; color:#fff; margin-bottom:5px; }
      .pt-order-card-top{ display:flex; align-items:center; justify-content:space-between; gap:6px; }
      .pt-order-card-cliente{ font-weight:700; font-size:12.5px; line-height:1.25; }
      .pt-priority-dot{ width:8px; height:8px; border-radius:50%; background:var(--coral); flex-shrink:0; }
      .pt-order-card-notas{ font-size:11.5px; color:var(--ink); margin:4px 0; line-height:1.35; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; white-space:pre-wrap; }
      .pt-order-card-bottom{ display:flex; align-items:center; justify-content:space-between; gap:6px; margin-top:4px; }
      .pt-order-card-fecha{ font-size:10px; color:var(--ink-soft); display:inline-flex; align-items:center; gap:2px; }
      .pt-order-card-truck{ color:#5C8FE0; vertical-align:middle; }
      .pt-order-card-precio{ font-family:'IBM Plex Mono'; font-weight:600; font-size:11.5px; }
      .pt-order-card-tags{ display:flex; flex-wrap:wrap; gap:4px; margin-top:6px; }
      .pt-pago-tag.pg-unpaid{ background:#FBE4E2; color:var(--coral); }
      .pt-pago-tag.pg-partial{ background:#FEEDCD; color:var(--marigold); }
      .pt-pago-tag.pg-advance{ background:#E3ECFB; color:#5C8FE0; }
      .pt-pago-tag.pg-paid{ background:#E0F5DB; color:var(--moss-deep); }
      .pt-order-card-actions{ position:absolute; top:6px; right:6px; display:none; gap:2px; background:var(--paper); border-radius:7px; padding:2px; box-shadow:0 1px 4px rgba(0,0,0,.1); }
      .pt-order-card:hover .pt-order-card-actions{ display:flex; }
      .pt-order-card-actions button{ background:none; border:none; color:var(--ink-soft); width:22px; height:22px; border-radius:5px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
      .pt-order-card-actions button:hover{ background:var(--pond); color:var(--ink); }

      .pt-tag{ font-size:10.5px; font-weight:700; padding:2px 8px; border-radius:20px; background:var(--pond); color:var(--ink-soft); display:inline-flex; align-items:center; gap:3px; }
      .pt-tag-quick{ background:#FEF6CD; color:#998000; }

      /* ---------- Tarjetas de estadísticas (Finanzas) ---------- */
      .pt-cards{ display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:10px; margin-bottom:16px; }
      .pt-stat{ background:var(--paper); border:1px solid var(--line); border-radius:14px; padding:14px; display:flex; gap:10px; align-items:flex-start; }
      .pt-stat svg{ margin-top:2px; flex-shrink:0; }
      .pt-stat-value{ font-family:'Baloo 2'; font-weight:700; font-size:19px; margin:0; line-height:1.1; }
      .pt-stat-label{ margin:2px 0 0; font-size:11.5px; color:var(--ink-soft); font-weight:600; }
      .pt-stat-done svg{ color:var(--moss); } .pt-stat-done .pt-stat-value{ color:var(--moss-deep); }
      .pt-stat-unpaid svg{ color:var(--coral); } .pt-stat-unpaid .pt-stat-value{ color:var(--coral); }
      .pt-stat-pend svg{ color:var(--marigold); } .pt-stat-pend .pt-stat-value{ color:var(--marigold); }
      .pt-stat-brand svg{ color:var(--ink); } .pt-stat-brand .pt-stat-value{ color:var(--ink); }
      .pt-stat-material svg{ color:#996300; } .pt-stat-material .pt-stat-value{ color:#996300; }

      .pt-panel{ background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:16px; margin-bottom:14px; }
      .pt-chart h2{ font-family:'Baloo 2'; font-size:15px; margin:0 0 6px; color:var(--moss-deep); }
      .pt-chart h2 span{ font-family:'Inter'; font-weight:500; font-size:12px; color:var(--ink-soft); }

      .pt-chip{ border:1px solid var(--line); background:var(--paper); color:var(--ink-soft); font-size:12px; font-weight:600; padding:6px 11px; border-radius:20px; cursor:pointer; white-space:nowrap; }
      .pt-chip-active{ background:var(--moss); border-color:var(--moss); color:#fff; }

      .pt-finance-filters{ display:flex; flex-direction:column; gap:10px; }
      .pt-finance-filters-row{ display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
      .pt-finance-filters-label{ font-size:12px; font-weight:600; color:var(--ink-soft); margin-right:2px; }
      .pt-select-period select{ min-width:170px; }
      .pt-finance-date{ border:1px solid var(--line); border-radius:9px; padding:8px 10px; font-family:'Inter'; font-size:13px; background:var(--pond); color:var(--ink); }
      .pt-finance-date-sep{ color:var(--ink-soft); }
      .pt-finance-search{ flex:1 1 180px; }
      .pt-finance-clear{ margin:0; }
      .pt-finance-summary{ font-size:11.5px; color:var(--ink-soft); margin:0; }

      .pt-field-hint{ font-size:11.5px; color:var(--ink-soft); margin:4px 0 0; }

      .pt-consumibles-head{ display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:10px; flex-wrap:wrap; }
      .pt-section-head{ font-family:'Baloo 2'; font-size:14.5px; color:var(--moss-deep); margin:0; display:flex; align-items:center; gap:8px; }
      .pt-section-head span{ font-family:'Inter'; font-weight:500; font-size:11.5px; color:var(--ink-soft); }

      .pt-list{ display:flex; flex-direction:column; gap:8px; }
      .pt-consumible-row{ display:flex; gap:10px; align-items:center; justify-content:space-between; border:1px solid var(--line); border-radius:12px; padding:10px 12px; background:var(--paper); }
      .pt-row-main{ flex:1; min-width:0; }
      .pt-row-top{ display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; }
      .pt-cliente{ font-weight:700; font-size:14.5px; }
      .pt-fecha{ font-size:11.5px; color:var(--ink-soft); }
      .pt-notas{ font-size:13px; color:var(--ink); margin:3px 0 0; white-space:pre-wrap; }
      .pt-row-right{ display:flex; flex-direction:column; align-items:flex-end; gap:6px; flex-shrink:0; }
      .pt-precio{ font-family:'IBM Plex Mono'; font-weight:600; font-size:13.5px; }
      .pt-row-actions{ display:flex; gap:4px; }
      .pt-row-actions button{ background:var(--pond); border:none; color:var(--ink-soft); width:26px; height:26px; border-radius:7px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
      .pt-row-actions button:hover{ background:var(--line); color:var(--ink); }

      .pt-overlay{ position:fixed; inset:0; background:rgba(47,60,45,.4); display:flex; align-items:center; justify-content:center; padding:16px; z-index:50; }
      .pt-modal{ background:var(--paper); border-radius:18px; padding:20px; width:100%; max-width:420px; max-height:88vh; overflow-y:auto; }
      .pt-modal-sm{ max-width:320px; }
      .pt-modal-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
      .pt-modal-head h3, .pt-modal h3{ font-family:'Baloo 2'; color:var(--moss-deep); margin:0; font-size:18px; }
      .pt-modal-head button{ background:none; border:none; color:var(--ink-soft); cursor:pointer; }
      .pt-confirm-text{ color:var(--ink-soft); font-size:13px; margin:0 0 16px; }

      .pt-field{ display:block; margin-bottom:12px; }
      .pt-field span{ display:block; font-size:12px; font-weight:600; color:var(--ink-soft); margin-bottom:4px; }
      .pt-field input, .pt-field textarea, .pt-field select{ width:100%; border:1px solid var(--line); border-radius:9px; padding:8px 10px; font-family:'Inter'; font-size:13.5px; color:var(--ink); background:var(--pond); outline:none; }
      .pt-field textarea{ resize:vertical; font-family:'Inter'; }
      .pt-field input:focus, .pt-field textarea:focus, .pt-field select:focus{ border-color:var(--moss); }
      .pt-field-row{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      .pt-select{ position:relative; }
      .pt-select select{ appearance:none; padding-right:28px; border:1px solid var(--line); border-radius:9px; padding-top:8px; padding-bottom:8px; padding-left:10px; font-family:'Inter'; font-size:13px; color:var(--ink); background:var(--pond); outline:none; }
      .pt-select svg{ position:absolute; right:10px; top:50%; transform:translateY(-50%); color:var(--ink-soft); pointer-events:none; }

      .pt-modal-actions{ display:flex; justify-content:flex-end; gap:8px; margin-top:6px; }
      .pt-btn-duplicate{ margin-right:auto; }

      /* ---------- Métricas ---------- */
      .pt-metrics-grid{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
      .pt-metrics-full{ grid-column:1 / -1; }

      .pt-rank-list{ display:flex; flex-direction:column; gap:8px; }
      .pt-rank-row{ display:flex; align-items:center; gap:10px; }
      .pt-rank-medal{ width:24px; height:24px; border-radius:50%; background:var(--pond); color:var(--ink-soft); font-family:'Baloo 2'; font-weight:700; font-size:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
      .pt-rank-gold{ background:#FFE08A; color:#8A6100; }
      .pt-rank-silver{ background:#E3E7EA; color:#5B6670; }
      .pt-rank-bronze{ background:#F3D2AE; color:#8A5A24; }
      .pt-rank-main{ flex:1; min-width:0; display:flex; flex-direction:column; }
      .pt-rank-name{ font-weight:700; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .pt-rank-sub{ font-size:11px; color:var(--ink-soft); }
      .pt-rank-value{ font-family:'IBM Plex Mono'; font-weight:600; font-size:13px; flex-shrink:0; }

      .pt-bar-list{ display:flex; flex-direction:column; gap:10px; }
      .pt-bar-row-top{ display:flex; justify-content:space-between; font-size:12.5px; font-weight:600; margin-bottom:4px; }
      .pt-bar-count{ font-weight:500; color:var(--ink-soft); }
      .pt-bar-track{ height:8px; background:var(--pond); border-radius:6px; overflow:hidden; }
      .pt-bar-fill{ height:100%; border-radius:6px; }
      .pt-bar-fill-material{ background:var(--moss); }
      .pt-bar-fill-color{ background:var(--marigold); }
      .pt-metrics-hint{ font-size:11px; color:var(--ink-soft); margin:10px 0 0; }

      .pt-keyword-cloud{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
      .pt-keyword-chip{ background:var(--pond); border:1px solid var(--line); border-radius:20px; padding:5px 12px; font-weight:700; color:var(--moss-deep); display:inline-flex; align-items:center; gap:5px; }
      .pt-keyword-n{ font-family:'IBM Plex Mono'; font-size:10px; font-weight:600; background:var(--paper); color:var(--ink-soft); padding:1px 6px; border-radius:8px; }

      .pt-row-tags-inline{ display:flex; gap:6px; margin-top:5px; }
      .pt-tag-material{ background:#E0F5DB; color:var(--moss-deep); }
      .pt-tag-color{ background:#FEEDCD; color:var(--marigold); }

      @media (max-width:760px){
        .pt-metrics-grid{ grid-template-columns:1fr; }
      }

      .pt-footer{ text-align:center; font-size:11px; color:var(--ink-soft); margin-top:8px; }

      @media (max-width:520px){
        .pt-field-row{ grid-template-columns:1fr; }
        .pt-kanban-col{ grid-auto-columns:220px; }
      }
    `}</style>
  );
}
