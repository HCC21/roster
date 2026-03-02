/* ============================
   語言資料庫
============================ */
let currentLang = "en";

const LANG = {
  en: {
    rosterTitle: "ROSTER",
    shiftPanelTitle: "Shift Codes (editable)",
    shiftHelp: `
      <strong>How to use:</strong><br>
      1) Type a shift code (A/B/C…) in the shift cell.<br>
      2) System auto-fills the time.<br>
      3) Edit the list above to change shift times.<br>
      4) All staff will follow the updated settings instantly.
    `,
    coffee: "COFFEE HOUSE：",
    month: "MONTH：",
    thName: "Name",
    thStaff: "Staff No.",
    addStaff: "＋ Add Staff",
    exportExcel: "⬇ Export Excel",
    printPDF: "🖨 Print / PDF",
    dailyTotal: "CH Daily Working Hour",
    holidays: `
      <strong>Hong Kong Statutory Holidays Reference (2026, 15 days)</strong><br>
      SH1) 1 Jan — New Year’s Day<br>
      SH2) 17 Feb — Lunar New Year’s Day<br>
      SH3) 18 Feb — 2nd day of Lunar New Year<br>
      SH4) 19 Feb — 3rd day of Lunar New Year<br>
      SH5) 5 Apr — Ching Ming Festival<br>
      SH6) 6 Apr — Easter Monday<br>
      SH7) 1 May — Labour Day<br>
      SH8) 24 May — The Birthday of the Buddha<br>
      SH9) 19 Jun — Tuen Ng Festival<br>
      SH10) 1 Jul — HKSAR Establishment Day<br>
      SH11) 26 Sep — Day after Mid-Autumn Festival<br>
      SH12) 1 Oct — National Day<br>
      SH13) 18 Oct — Chung Yeung Festival<br>
      SH14) Winter Solstice or Christmas Day — 22 Dec or 25 Dec<br>
      SH15) First weekday after Christmas Day — 26 Dec<br>
    `,
    weekdays: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    months: [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ],
    total: "Total",
    signature: "Signature",
    clear: "Clear",
    labourTarget: "Labour Target"
  },

  zh: {
    rosterTitle: "更表",
    shiftPanelTitle: "更期代號（可即時修改）",
    shiftHelp: `
      <strong>使用方法：</strong><br>
      1）在每日「更期」位置輸入代號（例如：A / B / C）<br>
      2）系統會自動填入對應時間（例如：A → 08:30-18:30）<br>
      3）如需更改更期時間，只需修改上方代號列表即可<br>
      4）所有員工、所有日子會即時使用最新設定
    `,
    coffee: "咖啡室：",
    month: "月份：",
    thName: "姓名",
    thStaff: "員工編號",
    addStaff: "＋ 新增員工",
    exportExcel: "⬇ 匯出 Excel",
    printPDF: "🖨 列印 / PDF",
    dailyTotal: "每日總工時",
    holidays: `
      <strong>香港僱員假期（2026，共 15 日）</strong><br>
      SH1) 1月1日　元旦<br>
      SH2) 2月17日　農曆年初一<br>
      SH3) 2月18日　農曆年初二<br>
      SH4) 2月19日　農曆年初三<br>
      SH5) 4月5日　清明節<br>
      SH6) 4月6日　復活節星期一<br>
      SH7) 5月1日　勞動節<br>
      SH8) 5月24日　佛誕<br>
      SH9) 6月19日　端午節<br>
      SH10) 7月1日　香港特別行政區成立紀念日<br>
      SH11) 9月26日　中秋節翌日<br>
      SH12) 10月1日　國慶日<br>
      SH13) 10月18日　重陽節<br>
      SH14) 12月22日 或 12月25日　冬節 或 聖誕節<br>
      SH15) 12月26日　聖誕節後首個周日以外工作日<br>
    `,
    weekdays: ["日","一","二","三","四","五","六"],
    months: [
      "一月","二月","三月","四月","五月","六月",
      "七月","八月","九月","十月","十一月","十二月"
    ],
    total: "總工時",
    signature: "簽名",
    clear: "清除",
    labourTarget: "勞工目標"
  }
};

/* ============================
   語言切換
============================ */
function applyLanguage() {
  const L = LANG[currentLang];

  document.getElementById("titleRoster").innerHTML = L.rosterTitle;
  document.getElementById("shiftPanelTitle").innerHTML = L.shiftPanelTitle;
  document.getElementById("shiftHelp").innerHTML = L.shiftHelp;

  document.getElementById("labelCoffee").innerHTML = L.coffee;
  document.getElementById("labelMonth").innerHTML = L.month;

  document.getElementById("thName") && (document.getElementById("thName").innerHTML = L.thName);
  document.getElementById("thStaff") && (document.getElementById("thStaff").innerHTML = L.thStaff);
  document.getElementById("dailyTotalLabel") && (document.getElementById("dailyTotalLabel").innerHTML = L.dailyTotal);

  document.getElementById("addRowBtn").innerHTML = L.addStaff;
  document.getElementById("exportExcelBtn").innerHTML = L.exportExcel;
  document.getElementById("printBtn").innerHTML = L.printPDF;

  const labourTitle = document.querySelector(".labour-target-panel strong");
  if (labourTitle) labourTitle.innerHTML = L.labourTarget;

  document.getElementById("holidayBlock").innerHTML = L.holidays;

  document.querySelectorAll(".signature-col").forEach(el => {
    el.innerHTML = L.signature;
  });

  document.querySelectorAll(".clear-signature").forEach(btn => {
    btn.innerHTML = L.clear;
  });

  const monthSelect = document.getElementById("monthSelect");
  let monthIndex = LANG.en.months.indexOf(monthSelect.value);
  if (monthIndex === -1) monthIndex = LANG.zh.months.indexOf(monthSelect.value);

  monthSelect.innerHTML = "";
  LANG[currentLang].months.forEach((m, i) => {
    const opt = document.createElement("option");
    opt.textContent = m;
    if (i === monthIndex) opt.selected = true;
    monthSelect.appendChild(opt);
  });

  buildCalendar();
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "zh" : "en";
  applyLanguage();
});

function getStorageKey() {
  const user = localStorage.getItem("currentUser") || "guest";

  const monthSelect = document.getElementById("monthSelect");
  let idx = LANG.en.months.indexOf(monthSelect.value);
  if (idx === -1) idx = LANG.zh.months.indexOf(monthSelect.value);

  return `rosterData_${user}_2026_${String(idx + 1).padStart(2, "0")}`;
}

/* ============================
   假期代號
============================ */
const HOLIDAY_CODES = new Set([
  ...Array.from({length:15}, (_,i)=>`SH${i+1}`),
  ...Array.from({length:15}, (_,i)=>`AL${i+1}`),
  "SL","NPL","ML","PL","MAR","COM","EC","OFF","TY","RC"
]);

/* ============================
   更期代號（修正版）
============================ */

let SHIFT_MAP = {};

function loadShiftCodes() {
  const editor = document.getElementById("shiftCodeEditor");
  if (!editor) return;

  // 使用 textContent + 正規化換行
  const raw = editor.textContent
    .replace(/\u00A0/g, " ")   // 移除 &nbsp;
    .replace(/\r/g, "")        // 移除 CR
    .trim();

  const lines = raw
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.includes("=")); // 過濾無效行

  SHIFT_MAP = {};

  lines.forEach(line => {
    const [code, time] = line.split("=").map(s => s.trim());
    if (code && time) {
      SHIFT_MAP[code.toUpperCase()] = time;
    }
  });

  console.log("SHIFT_MAP updated:", SHIFT_MAP);
}

document.getElementById("shiftCodeEditor").addEventListener("input", () => {
  loadShiftCodes();
  saveRoster(); // 你原本的儲存函式
});
/* ============================
   自動代號 → 時間 / 假期
============================ */
function autoFillShift(cell) {
  const code = cell.textContent.trim().toUpperCase();

  // 假期代號：顯示代號，但工時 = 0
  if (HOLIDAY_CODES.has(code)) {
    cell.textContent = code;
    const hoursCell = cell.parentElement.querySelector(".hours");
    hoursCell.textContent = "0";
    return;
  }

  // 更期代號：唔再自動填時間，只保留代號
  // 例如 A / B / C，畫面只見 A / B / C
}

/* ============================
   生成月份 + 星期
============================ */
function buildCalendar() {
  const L = LANG[currentLang];
  const monthSelect = document.getElementById("monthSelect");

  let monthIndex = LANG.en.months.indexOf(monthSelect.value);
  if (monthIndex === -1) monthIndex = LANG.zh.months.indexOf(monthSelect.value);

  const year = 2026;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const weekdayRow = document.getElementById("weekdayRow");
  const dateRow = document.getElementById("dateRow");
  const dailyTotalRow = document.getElementById("dailyTotalRow");

  // 只重建表頭，不動 rosterBody
  weekdayRow.innerHTML = `<th class="name">${L.thName}</th><th class="staff">${L.thStaff}</th>`;
  dateRow.innerHTML = `<th></th><th></th>`;
  dailyTotalRow.innerHTML = `<td colspan="2" class="daily-total-label">${L.dailyTotal}</td>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, monthIndex, d);
    const weekday = L.weekdays[date.getDay()];

    weekdayRow.innerHTML += `<th>${weekday}</th>`;
    dateRow.innerHTML += `<th>${d}</th>`;
    dailyTotalRow.innerHTML += `<td class="dayTotal">0</td>`;
  }

  weekdayRow.innerHTML += `<th>${L.total}</th><th class="signature-col">${L.signature}</th>`;
  dateRow.innerHTML += `<th></th><th></th>`;
  dailyTotalRow.innerHTML += `<td></td><td></td>`;
}

/* ============================
   更新員工行
============================ */
function updateAllRows(days) {
  const body = document.getElementById("rosterBody");
  [...body.rows].forEach(row => rebuildRow(row, days));
}

function rebuildRow(row, days) {
  while (row.cells.length > 2) row.deleteCell(2);

  for (let i = 0; i < days; i++) {
    const td = document.createElement("td");
    td.className = "day";
    td.innerHTML = `
      <div class="cell-wrap">
        <div class="shift" contenteditable="true"></div>
        <div class="hours" contenteditable="true">0</div>
        <div class="remark" contenteditable="true"></div>
      </div>`;
    row.appendChild(td);
  }

  const total = document.createElement("td");
  total.className = "total";
  total.textContent = "0";
  row.appendChild(total);

  const sigTd = document.createElement("td");
  sigTd.className = "signature-cell";
  sigTd.innerHTML = `
    <canvas class="signature-pad" width="180" height="60"></canvas>
    <button class="clear-signature"></button>
  `;
  row.appendChild(sigTd);
}

/* ============================
   計算時數
============================ */
function parseHours(str) {
  if (!str) return 0;
  const upper = str.toUpperCase();

  // 假期代號：0 小時
  if (HOLIDAY_CODES.has(upper)) return 0;

  // 如果係更期代號（A / B / C…），用 SHIFT_MAP 搵時間
  if (SHIFT_MAP[upper]) {
    str = SHIFT_MAP[upper];   // 例如 A → "08:30-18:30"
  }

  const m = str.match(/(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/);
  if (!m) return 0;

  const s = parseInt(m[1]) * 60 + parseInt(m[2]);
  const e = parseInt(m[3]) * 60 + parseInt(m[4]);
  return e > s ? (e - s) / 60 : 0;
}

function calcRow(row) {
  let total = 0;
  const days = row.querySelectorAll(".day");

  days.forEach(day => {
    const shift = day.querySelector(".shift").textContent.trim();
    const hoursCell = day.querySelector(".hours");

    let h = parseHours(shift);
    if (document.activeElement !== hoursCell) {
      hoursCell.textContent = h.toFixed(1);
    } else {
      h = parseFloat(hoursCell.textContent) || 0;
    }

    total += h;
  });

  const totalCell = row.querySelector(".total");
  if (totalCell) totalCell.textContent = total.toFixed(1);

  calcDailyTotals();
}

/* ============================
   每日總工時
============================ */
function calcDailyTotals() {
  const body = document.getElementById("rosterBody");
  const rows = [...body.rows];
  if (rows.length === 0) return;

  const firstRowDays = rows[0].querySelectorAll(".day");
  const dayTotals = Array(firstRowDays.length).fill(0);

  rows.forEach(row => {
    const dayCells = row.querySelectorAll(".day");
    dayCells.forEach((cell, idx) => {
      const h = parseFloat(cell.querySelector(".hours").textContent) || 0;
      dayTotals[idx] += h;
    });
  });

  const footerCells = document.querySelectorAll("#dailyTotalRow .dayTotal");
  dayTotals.forEach((val, idx) => {
    if (footerCells[idx]) footerCells[idx].textContent = val.toFixed(1);
  });
}
/* ============================
   手寫簽名功能（Canvas）
============================ */
function initSignaturePad(canvas) {
  const ctx = canvas.getContext("2d");
  let drawing = false;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return { x: e.offsetX, y: e.offsetY };
    }
  }

  function start(e) {
    e.preventDefault();
    drawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function move(e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function end(e) {
    e && e.preventDefault();
    drawing = false;
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  canvas.addEventListener("mouseup", end);
  canvas.addEventListener("mouseleave", end);

  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  canvas.addEventListener("touchend", end, { passive: false });
}

/* ============================
   初始化所有簽名欄位
============================ */
function initAllSignatures() {
  document.querySelectorAll(".signature-pad").forEach(canvas => {
    if (!canvas._inited) {
      initSignaturePad(canvas);
      canvas._inited = true;
    }
  });

  document.querySelectorAll(".clear-signature").forEach(btn => {
    if (!btn._inited) {
      btn.addEventListener("click", e => {
        const canvas = e.target.previousElementSibling;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        saveRoster();
      });
      btn._inited = true;
    }
  });
}

/* ============================
   localStorage：保存
============================ */
async function saveRoster() {
  const userid = localStorage.getItem("currentUser");
  if (!userid) return;

  const month = document.getElementById("monthSelect").value;

  const data = {};

  data.shiftCodes = document.getElementById("shiftCodeEditor").innerHTML;
  data.labourTarget = document.querySelector(".labour-target-editor").innerHTML;
  data.coffee = document.querySelector(".coffee-name").textContent;

  data.rows = [];
  document.querySelectorAll("#rosterBody tr").forEach(row => {
    const rowData = {
      name: row.querySelector(".name").textContent,
      staff: row.querySelector(".staff").textContent,
      days: []
    };

    row.querySelectorAll(".day").forEach(day => {
      rowData.days.push({
        shift: day.querySelector(".shift").textContent,
        hours: day.querySelector(".hours").textContent,
        remark: day.querySelector(".remark").textContent
      });
    });

    const canvas = row.querySelector(".signature-pad");
    rowData.signature = canvas ? canvas.toDataURL() : null;

    data.rows.push(rowData);
  });

  // 檢查是否已有該月份資料
  const { data: existing } = await supabase
    .from("roster_records")
    .select("id")
    .eq("userid", userid)
    .eq("month", month)
    .maybeSingle();

  if (existing && existing.id) {
    await supabase
      .from("roster_records")
      .update({ data })
      .eq("id", existing.id);
  } else {
    await supabase
      .from("roster_records")
      .insert({ userid, month, data });
  }
}
/* ============================
   localStorage：載入
============================ */
async function loadRoster() {
  const userid = localStorage.getItem("currentUser");
  if (!userid) return;

  const month = document.getElementById("monthSelect").value;

  const body = document.getElementById("rosterBody");
  body.innerHTML = "";

  const { data: record } = await supabase
    .from("roster_records")
    .select("*")
    .eq("userid", userid)
    .eq("month", month)
    .maybeSingle();

  if (!record) {
    calcDailyTotals();
    initAllSignatures();
    return;
  }

  const data = record.data;

  document.getElementById("shiftCodeEditor").innerHTML = data.shiftCodes;
  loadShiftCodes();
  document.querySelector(".labour-target-editor").innerHTML = data.labourTarget;
  document.querySelector(".coffee-name").textContent = data.coffee;

  const monthSelect = document.getElementById("monthSelect");
  let monthIndex = LANG.en.months.indexOf(monthSelect.value);
  if (monthIndex === -1) monthIndex = LANG.zh.months.indexOf(monthSelect.value);
  const year = 2026;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  buildCalendar();

  data.rows.forEach(rowData => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="name" contenteditable="true">${rowData.name}</td>
      <td class="staff" contenteditable="true">${rowData.staff}</td>
    `;
    body.appendChild(row);

    rebuildRow(row, daysInMonth);

    rowData.days.forEach((d, i) => {
      if (i >= daysInMonth) return;
      const day = row.querySelectorAll(".day")[i];
      day.querySelector(".shift").textContent = d.shift;
      day.querySelector(".hours").textContent = d.hours;
      day.querySelector(".remark").textContent = d.remark;
    });

    if (rowData.signature) {
      const canvas = row.querySelector(".signature-pad");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = rowData.signature;
    }
  });

  calcDailyTotals();
  initAllSignatures();
}
/* ============================
   自動保存（所有輸入變動）
============================ */
document.addEventListener("input", e => {
  const shiftCell = e.target.closest(".shift");
  if (shiftCell) autoFillShift(shiftCell);

  const row = e.target.closest("tr");
  if (row && row.parentElement.id === "rosterBody") calcRow(row);

  saveRoster();
});

document.addEventListener("change", saveRoster);


/* ============================
   新增員工
============================ */
document.getElementById("addRowBtn").addEventListener("click", () => {
  const body = document.getElementById("rosterBody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td class="name" contenteditable="true">New Staff</td>
    <td class="staff" contenteditable="true">ID</td>
  `;

  body.appendChild(row);

  const monthSelect = document.getElementById("monthSelect");
  let monthIndex = LANG.en.months.indexOf(monthSelect.value);
  if (monthIndex === -1) monthIndex = LANG.zh.months.indexOf(monthSelect.value);
  const year = 2026;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  rebuildRow(row, daysInMonth);
  initAllSignatures();
  saveRoster();
});

/* ============================
   匯出 Excel
============================ */
document.getElementById("exportExcelBtn").addEventListener("click", () => {
  const table = document.getElementById("rosterTable").outerHTML;
  const blob = new Blob(['\ufeff', table], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'roster.xls';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

/* ============================
   列印
============================ */
document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});

/* ============================
   月份切換
============================ */
document.getElementById("monthSelect").addEventListener("change", () => {
  buildCalendar();   // 重建表頭 + 行結構
  loadRoster();      // 讀返該月份資料（如果有）
});

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("currentUser");
  location.href = "login.html";
};

/* ============================
   初始化
============================ */
document.addEventListener("DOMContentLoaded", () => {
  loadShiftCodes();

  const monthSelect = document.getElementById("monthSelect");
  LANG.en.months.forEach(m => {
    const opt = document.createElement("option");
    opt.textContent = m;
    monthSelect.appendChild(opt);
  });
  monthSelect.value = LANG.en.months[new Date().getMonth()];

  applyLanguage();   // 內部會 call buildCalendar()
  loadRoster();      // 讀返當月資料（如果有）
});
