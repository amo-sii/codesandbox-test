import "./styles.css";

// ============================================================
// Life Optimizer - Schedule Optimization App
// ============================================================

// ===== Schedule Data =====
const SCHEDULE = [
  {
    id: "wake",
    time: "6:00",
    start: 360,
    end: 365,
    title: "起床",
    desc: "レモン水 / 太陽光 / スマホ禁止",
    tip: "朝イチのスマホ禁止は一生守る",
    category: "morning",
    tags: ["Dopamine", "Wake-up"],
  },
  {
    id: "exercise-am",
    time: "6:05",
    start: 365,
    end: 385,
    title: "身体起動",
    desc: "ストレッチ / スクワット / コールドシャワー",
    tip: "ノルアドレナリン↑ 自己効力感↑",
    category: "exercise",
    tags: ["Noradrenaline", "20min"],
  },
  {
    id: "meditation-am",
    time: "6:25",
    start: 385,
    end: 395,
    title: "瞑想 (集中型)",
    desc: "呼吸のみ10分 / 「今日は何を一つ進めるか」",
    tip: "悟らない・感じない。方向づけが目的",
    category: "rest",
    tags: ["Focus", "10min"],
  },
  {
    id: "breakfast",
    time: "6:35",
    start: 395,
    end: 415,
    title: "朝食 + サプリ (覚醒系)",
    desc: "ゆで卵2 / ヨーグルト / 納豆 / バナナ / 野菜ジュース / コーヒー",
    tip: "覚醒系サプリは朝で完結",
    category: "meal",
    tags: ["Protein", "Caffeine"],
  },
  {
    id: "study-1",
    time: "7:00",
    start: 420,
    end: 480,
    title: "資格勉強 I (人生の差がつく1時間)",
    desc: "新規インプット / 理解・設計・理論 / 問題演習（重め）",
    tip: "SNS・メール完全遮断。調べすぎない",
    category: "study",
    tags: ["Deep Work", "60min"],
  },
  {
    id: "commute-am",
    time: "8:00",
    start: 480,
    end: 540,
    title: "通勤",
    desc: "暗記音声 or 何もしない（脳の回復日）",
    tip: "何もしない日は脳の回復日",
    category: "rest",
    tags: ["Transit", "60min"],
  },
  {
    id: "work-am",
    time: "9:00",
    start: 540,
    end: 720,
    title: "仕事 (午前)",
    desc: "90分集中 + 5分休憩 / SNS遮断",
    tip: "成果を出す時間帯",
    category: "work",
    tags: ["Focus Blocks", "3h"],
  },
  {
    id: "lunch",
    time: "12:00",
    start: 720,
    end: 750,
    title: "昼食",
    desc: "完全メシ / ナッツ",
    tip: "",
    category: "meal",
    tags: ["Nutrition", "30min"],
  },
  {
    id: "review-light",
    time: "12:30",
    start: 750,
    end: 765,
    title: "超軽復習",
    desc: "朝やった内容を「思い出すだけ」",
    tip: "記憶定着の最重要工程",
    category: "study",
    tags: ["Recall", "15min"],
  },
  {
    id: "work-pm",
    time: "13:00",
    start: 780,
    end: 1080,
    title: "仕事 (午後)",
    desc: "会議・処理・アウトプット中心 / カフェインなし",
    tip: "",
    category: "work",
    tags: ["Output", "5h"],
  },
  {
    id: "workout",
    time: "18:30",
    start: 1110,
    end: 1155,
    title: "筋トレ",
    desc: "ベンチ / 背中 or 腹 / 30〜45分",
    tip: "テストステロン維持 / メンタル安定",
    category: "exercise",
    tags: ["Testosterone", "45min"],
  },
  {
    id: "dinner",
    time: "19:15",
    start: 1155,
    end: 1185,
    title: "夕食 + サプリ (鎮静系)",
    desc: "鶏肉 / ブロッコリー / オートミール / みそ汁 / プロテイン",
    tip: "夜は「沈める」ことだけ考える",
    category: "meal",
    tags: ["Recovery", "30min"],
  },
  {
    id: "study-2",
    time: "20:00",
    start: 1200,
    end: 1240,
    title: "資格勉強 II (軽め)",
    desc: "既習問題 / 暗記カード / ノート眺めるだけ",
    tip: "慣れだけ。新しいことはやらない",
    category: "study",
    tags: ["Review", "40min"],
  },
  {
    id: "meditation-pm",
    time: "20:40",
    start: 1240,
    end: 1260,
    title: "瞑想 (回復型)",
    desc: "呼吸 or ボディスキャン / ストレッチ / チルアウト",
    tip: "",
    category: "rest",
    tags: ["Recovery", "20min"],
  },
  {
    id: "wind-down",
    time: "21:30",
    start: 1290,
    end: 1320,
    title: "入眠準備",
    desc: "デジタルデトックス / リラックス",
    tip: "",
    category: "rest",
    tags: ["Wind Down", "30min"],
  },
  {
    id: "sleep",
    time: "22:00",
    start: 1320,
    end: 1440,
    title: "就寝",
    desc: "7〜8時間の質の高い睡眠",
    tip: "",
    category: "rest",
    tags: ["Sleep", "8h"],
  },
];

// ===== Supplements Data =====
const SUPPLEMENTS = {
  morning: [
    { id: "tyrosine", name: "チロシン", purpose: "集中・ドーパミン前駆体" },
    { id: "vitb", name: "ビタミンB群", purpose: "エネルギー代謝" },
    { id: "vitd", name: "ビタミンD", purpose: "免疫・骨・メンタル" },
    { id: "probiotics", name: "プロバイオティクス", purpose: "腸内環境" },
    { id: "creatine", name: "クレアチン", purpose: "筋力・脳機能" },
    { id: "omega3", name: "オメガ3", purpose: "脳・抗炎症" },
  ],
  evening: [
    { id: "magnesium", name: "マグネシウム", purpose: "睡眠・筋弛緩" },
    { id: "theanine", name: "テアニン", purpose: "リラックス・睡眠" },
    { id: "ashwagandha", name: "アシュワガンダ", purpose: "ストレス耐性" },
    { id: "zinc", name: "亜鉛", purpose: "免疫・ホルモン" },
  ],
};

// ===== Career Roadmap Data =====
const ROADMAP = [
  {
    year: 2022,
    age: 29,
    salary: "360万",
    theme: "基礎力磨く - 汎用的知識の証明",
    status: "done",
    items: [
      "Oracle Java Silver", "Pythonエンジニア認定", "Oracle SQL Silver",
      "Oracle DBA Silver", "LPIC1", "AWS SAA + HTML5 Level1",
      "JSTQB + Excel VBA + 簿記3級",
    ],
  },
  {
    year: 2023,
    age: 30,
    salary: "480万",
    theme: "応用力を磨く - 専門的知識の獲得",
    status: "done",
    items: [
      "基本情報", "DVA", "SOA + データ分析 + FP3",
      "IT基礎実践 + リファクタリング + テスト",
      "ポートフォリオ + AWS演習 + 応用情報",
      "SAP + cloudtech + G検定 + ビジネス会計3級",
      "ITストラテジスト学習開始",
    ],
  },
  {
    year: 2024,
    age: 31,
    salary: "670万",
    theme: "専門性を磨く - 富士通入社",
    status: "done",
    items: [
      "転職活動 (1-4月)", "富士通入社 (6月 / 600万)",
      "E検定学習 (4単元)", "新プロジェクト適応",
    ],
  },
  {
    year: 2025,
    age: 32,
    salary: "800万",
    theme: "AWS上流 + AI + ServiceNow",
    status: "done",
    items: [
      "仕事慣れる (1-7月)", "CSA (8-9月)",
      "Discovery (10月)", "PMP + なぜコンピュータ (11-12月)",
    ],
  },
  {
    year: 2026,
    age: 33,
    salary: "900万",
    theme: "GAFA・外資コンサル級スキル獲得",
    status: "current",
    items: [
      "PMP + E検定", "CMDB + Delta更新", "Azure 900",
      "SAM + VR", "AWS Professional", "AWS DevOps",
      "E資格", "AWS ML + cloudtech",
      "セキスペ", "ITストラテジスト + TOEIC",
    ],
  },
  {
    year: 2027,
    age: 34,
    salary: "900万",
    theme: "転職準備 - コンサルタントへ",
    status: "future",
    items: [
      "要件定義 + TOEIC500 (1月)", "なぜネットワーク + TOEIC600 (2月)",
      "なぜデータベース + TOEIC700 (3月)", "なぜプログラム + TOEIC800 (4月)",
      "なぜシステムはダウンするのか (5月)", "コンサルタント転職 (6月)",
    ],
  },
  {
    year: 2030,
    age: 37,
    salary: "1000万",
    theme: "NTT転職 + シーシャ屋準備",
    status: "future",
    items: ["NTT転職", "シーシャ屋準備"],
  },
  {
    year: 2033,
    age: 40,
    salary: "2000万",
    theme: "フリーランス + シーシャ屋開業",
    status: "future",
    items: ["フリーランス独立", "シーシャ屋開業"],
  },
  {
    year: 2043,
    age: 50,
    salary: "3000万",
    theme: "関東関西30店舗 + 東南アジア",
    status: "future",
    items: ["関東関西30店舗展開", "東南アジアで余生を過ごす"],
  },
];

const MONTHLY_PLAN_2026 = [
  { month: 1, tasks: "PMP + E検定", status: "done" },
  { month: 2, tasks: "CMDB + E検定 + Delta更新", status: "done" },
  { month: 3, tasks: "CMDB + PMP + Azure 900", status: "current" },
  { month: 4, tasks: "SAM + VR", status: "future" },
  { month: 5, tasks: "AWS Professional", status: "future" },
  { month: 6, tasks: "AWS Professional", status: "future" },
  { month: 7, tasks: "AWS DevOps", status: "future" },
  { month: 8, tasks: "E資格", status: "future" },
  { month: 9, tasks: "AWS ML + cloudtech", status: "future" },
  { month: 10, tasks: "セキスペ + cloudtech", status: "future" },
  { month: 11, tasks: "ITストラテジスト + ビジネス書 + TOEIC400", status: "future" },
  { month: 12, tasks: "ITストラテジスト + TOEIC400", status: "future" },
];

const CERTIFICATIONS = [
  // Completed (2022-2025)
  { id: "c-java-silver", name: "Java Silver", cat: "Development", done: true },
  { id: "c-python-basic", name: "Python基礎エンジニア", cat: "Development", done: true },
  { id: "c-python-data", name: "Pythonデータ分析", cat: "Development", done: true },
  { id: "c-sql-silver", name: "SQL Silver", cat: "Database", done: true },
  { id: "c-dba-silver", name: "DBA Silver", cat: "Database", done: true },
  { id: "c-lpic1", name: "LPIC1", cat: "Infrastructure", done: true },
  { id: "c-html1", name: "HTML5 Level1", cat: "Development", done: true },
  { id: "c-excel-sp", name: "Excel Specialist", cat: "Business", done: true },
  { id: "c-excel-vba", name: "Excel VBA", cat: "Business", done: true },
  { id: "c-fe", name: "基本情報", cat: "National", done: true },
  { id: "c-ap", name: "応用情報", cat: "National", done: true },
  { id: "c-jstqb", name: "JSTQB FL", cat: "Testing", done: true },
  { id: "c-bk3", name: "簿記3級", cat: "Business", done: true },
  { id: "c-fp3", name: "FP3級", cat: "Business", done: true },
  { id: "c-ba3", name: "ビジネス会計3級", cat: "Business", done: true },
  { id: "c-aws-saa", name: "AWS SAA", cat: "AWS", done: true },
  { id: "c-aws-dva", name: "AWS DVA", cat: "AWS", done: true },
  { id: "c-aws-soa", name: "AWS SOA", cat: "AWS", done: true },
  { id: "c-g-kentei", name: "G検定", cat: "AI", done: true },
  { id: "c-sn-csa", name: "SN CSA", cat: "ServiceNow", done: true },
  { id: "c-sn-disc", name: "SN Discovery", cat: "ServiceNow", done: true },
  // 2026 Targets
  { id: "c-pmp", name: "PMP", cat: "Management", done: false },
  { id: "c-it-strat", name: "ITストラテジスト", cat: "National", done: false },
  { id: "c-sc", name: "セキュリティスペシャリスト", cat: "National", done: false },
  { id: "c-e-kentei", name: "E検定", cat: "AI", done: false },
  { id: "c-az900", name: "Azure AI 900", cat: "Azure", done: false },
  { id: "c-az104", name: "Azure AZ-104", cat: "Azure", done: false },
  { id: "c-aws-sap", name: "AWS SAP", cat: "AWS", done: false },
  { id: "c-aws-devops", name: "AWS DevOps", cat: "AWS", done: false },
  { id: "c-sn-df", name: "SN DF", cat: "ServiceNow", done: false },
  { id: "c-sn-vr", name: "SN VR", cat: "ServiceNow", done: false },
  { id: "c-toeic", name: "TOEIC 800点", cat: "Language", done: false },
];

const SKILL_CATEGORIES = [
  {
    name: "IT基礎 - 歴史",
    items: [
      { name: "コンピュータの歴史", done: true },
      { name: "WEBの歴史", done: true },
      { name: "アルゴリズムとデータ構造の歴史", done: true },
    ],
  },
  {
    name: "上流特化",
    items: [
      { name: "DX", done: true },
      { name: "要件定義〜基本設計", done: true },
    ],
  },
  {
    name: "下流特化",
    items: [
      { name: "オブジェクト指向", done: true },
      { name: "デザインパターン", done: true },
      { name: "アルゴリズムとデータ構造", done: true },
      { name: "リファクタリング", done: true },
      { name: "API", done: true },
      { name: "WEBアプリ", done: true },
      { name: "テスト", done: true },
      { name: "HTML+CSS+JavaScript", done: true },
      { name: "Linux", done: true },
      { name: "SQL", done: true },
      { name: "GIT", done: true },
      { name: "Docker", done: true },
    ],
  },
  {
    name: "AWS",
    items: [
      { name: "AWS 概論", done: true },
      { name: "AWSコンテナCI/CD", done: true },
      { name: "AWS CLI", done: true },
      { name: "AWS cloudtech", done: false },
      { name: "AWS AI", done: false },
      { name: "AWSモダン", done: false },
      { name: "AWSエヴァンジェリスト", done: false },
      { name: "AWSスキルセット", done: false },
      { name: "AWS運用入門", done: false },
      { name: "AWSコスト最適", done: false },
    ],
  },
  {
    name: "ポートフォリオ",
    items: [
      { name: "Django", done: true },
      { name: "React", done: true },
      { name: "Django+React演習", done: false },
      { name: "TypeScript", done: false },
      { name: "Redux Toolkit", done: false },
      { name: "Django+Reactアプリ", done: false },
      { name: "Django+Reactテスト", done: false },
      { name: "ChatGPT連携", done: false },
    ],
  },
  {
    name: "Azure",
    items: [
      { name: "Azure Administrator (AZ-104)", done: false },
      { name: "Azure AI Engineer (AI-102)", done: false },
      { name: "Azure Developer (AZ-204)", done: false },
      { name: "Azure Security Engineer (AZ-500)", done: false },
      { name: "Azure Data Scientist (DP-100)", done: false },
    ],
  },
  {
    name: "ビジネス基礎",
    items: [
      { name: "起業", done: false },
      { name: "会社法", done: false },
      { name: "会計学", done: false },
      { name: "行動経済学", done: false },
      { name: "マーケティング", done: false },
      { name: "思考法", done: false },
      { name: "デザイン", done: false },
      { name: "コミュニケーション", done: false },
      { name: "プレゼン", done: false },
      { name: "リーダー", done: false },
      { name: "マネジメント", done: false },
      { name: "マナー", done: false },
    ],
  },
  {
    name: "その他",
    items: [
      { name: "瞑想", done: false },
      { name: "筋トレ", done: false },
      { name: "時事問題", done: false },
      { name: "英会話", done: false },
      { name: "正規表現", done: false },
      { name: "ラズベリーパイ", done: false },
    ],
  },
];

// ===== Health Check Items =====
const HEALTH_ITEMS = [
  {
    id: "wake-hard",
    label: "朝起きるのが辛い",
    sub: "目覚ましで起きられない、二度寝が増えた",
  },
  {
    id: "focus-drop",
    label: "集中が明らかに落ちた",
    sub: "勉強・仕事中にぼーっとする頻度が増えた",
  },
  {
    id: "irritable",
    label: "イライラが増えた",
    sub: "些細なことで怒りやすい、余裕がない",
  },
  {
    id: "fatigue",
    label: "寝ても疲れが抜けない",
    sub: "朝から身体が重い、回復している感覚がない",
  },
];

// ===== Storage Helpers =====
function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadData(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function saveData(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function getNowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function formatTime(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

// ===== State =====
const today = getToday();
let completedBlocks = loadData(`completed_${today}`, {});
let supplementsTaken = loadData(`supplements_${today}`, {});
let healthFlags = loadData(`health_${today}`, {});
let dailyLog = loadData("dailyLog", {});

// Ensure today is logged
if (!dailyLog[today]) {
  dailyLog[today] = { started: true, timestamp: Date.now() };
  saveData("dailyLog", dailyLog);
}

// ===== Tab Navigation =====
function initTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((tc) => tc.classList.remove("active"));
      tab.classList.add("active");
      const target = document.getElementById(`tab-${tab.dataset.tab}`);
      if (target) target.classList.add("active");
    });
  });
}

// ===== Current Activity =====
function updateCurrentActivity() {
  const now = getNowMinutes();
  const timeEl = document.getElementById("currentTime");
  const taskEl = document.getElementById("currentTask");
  const tipEl = document.getElementById("currentTip");
  const nextEl = document.getElementById("nextUp");
  const banner = document.getElementById("currentActivity");

  timeEl.textContent = formatTime(new Date());

  let current = null;
  let next = null;

  for (let i = 0; i < SCHEDULE.length; i++) {
    const block = SCHEDULE[i];
    if (now >= block.start && now < block.end) {
      current = block;
      next = SCHEDULE[i + 1] || null;
      break;
    }
  }

  if (!current) {
    // Before or after schedule
    if (now < SCHEDULE[0].start) {
      taskEl.textContent = "Sleep well...";
      tipEl.textContent = `Schedule starts at ${SCHEDULE[0].time}`;
      next = SCHEDULE[0];
    } else {
      taskEl.textContent = "Day complete!";
      tipEl.textContent = "おつかれさまでした。ゆっくり休んでください。";
    }
  } else {
    taskEl.textContent = current.title;
    tipEl.textContent = current.tip || current.desc;

    // Set category color on banner
    banner.className = `current-activity cat-${current.category}`;
  }

  if (next) {
    nextEl.innerHTML = `<strong>NEXT UP</strong>${next.time} ${next.title}`;
  } else {
    nextEl.innerHTML = "";
  }
}

// ===== Date Display =====
function updateDateDisplay() {
  const d = new Date();
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const dateStr = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} (${days[d.getDay()]})`;
  document.getElementById("dateDisplay").textContent = dateStr;
}

// ===== Timeline =====
function renderTimeline() {
  const container = document.getElementById("timeline");
  const now = getNowMinutes();

  container.innerHTML = SCHEDULE.map((block) => {
    const isCurrent = now >= block.start && now < block.end;
    const isPast = now >= block.end;
    const isCompleted = !!completedBlocks[block.id];

    let stateClass = "";
    if (isCompleted) stateClass = "is-completed";
    else if (isCurrent) stateClass = "is-current";
    else if (isPast) stateClass = "is-past";

    return `
      <div class="time-block cat-${block.category} ${stateClass}" data-id="${block.id}">
        <div class="block-time">${block.time}</div>
        <div class="block-indicator"></div>
        <div class="block-body">
          <div class="block-title">${block.title}</div>
          <div class="block-desc">${block.desc}</div>
          <div class="block-tags">
            ${block.tags.map((t) => `<span class="block-tag">${t}</span>`).join("")}
          </div>
        </div>
        <div class="block-check ${isCompleted ? "checked" : ""}" data-block="${block.id}">
          ${isCompleted ? "&#x2713;" : ""}
        </div>
      </div>
    `;
  }).join("");

  // Add click handlers
  container.querySelectorAll(".block-check").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const blockId = el.dataset.block;
      completedBlocks[blockId] = !completedBlocks[blockId];
      if (!completedBlocks[blockId]) delete completedBlocks[blockId];
      saveData(`completed_${today}`, completedBlocks);
      renderTimeline();
      updateStats();
    });
  });
}

// ===== Supplements =====
function renderSupplements() {
  const renderGroup = (items, containerId) => {
    const container = document.getElementById(containerId);
    container.innerHTML = items
      .map(
        (s) => `
      <div class="suppl-item ${supplementsTaken[s.id] ? "taken" : ""}" data-suppl="${s.id}">
        <div class="suppl-check">${supplementsTaken[s.id] ? "&#x2713;" : ""}</div>
        <div class="suppl-info">
          <div class="suppl-name">${s.name}</div>
          <div class="suppl-purpose">${s.purpose}</div>
        </div>
      </div>
    `
      )
      .join("");

    container.querySelectorAll(".suppl-item").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.suppl;
        supplementsTaken[id] = !supplementsTaken[id];
        if (!supplementsTaken[id]) delete supplementsTaken[id];
        saveData(`supplements_${today}`, supplementsTaken);
        renderSupplements();
      });
    });
  };

  renderGroup(SUPPLEMENTS.morning, "morningSupplements");
  renderGroup(SUPPLEMENTS.evening, "eveningSupplements");
}

// ===== SNS Control =====
function updateSNSStatus() {
  const now = getNowMinutes();
  const statusEl = document.getElementById("snsStatus");
  const iconEl = document.getElementById("snsIcon");
  const labelEl = document.getElementById("snsLabel");
  const timerEl = document.getElementById("snsTimer");

  // SNS allowed: 21:00 (1260) to 21:20 (1280)
  const snsStart = 1260;
  const snsEnd = 1280;
  const isAllowed = now >= snsStart && now < snsEnd;

  if (isAllowed) {
    statusEl.className = "sns-status allowed";
    iconEl.textContent = "\u{1F7E2}";
    labelEl.textContent = "SNS OK";
    const remaining = snsEnd - now;
    timerEl.textContent = `残り ${remaining} 分`;
  } else {
    statusEl.className = "sns-status blocked";
    iconEl.textContent = "\u{1F6D1}";
    labelEl.textContent = "SNS BLOCKED";

    if (now < snsStart) {
      const until = snsStart - now;
      const hours = Math.floor(until / 60);
      const mins = until % 60;
      timerEl.textContent =
        hours > 0
          ? `解禁まで ${hours}時間${mins}分`
          : `解禁まで ${mins}分`;
    } else {
      timerEl.textContent = "本日のSNS時間は終了しました";
    }
  }
}

// ===== Health Check =====
function renderHealthCheck() {
  const container = document.getElementById("healthChecklist");
  container.innerHTML = HEALTH_ITEMS.map(
    (item) => `
    <div class="health-item ${healthFlags[item.id] ? "flagged" : ""}" data-health="${item.id}">
      <div class="health-toggle"></div>
      <div class="health-text">
        <div class="health-label">${item.label}</div>
        <div class="health-sub">${item.sub}</div>
      </div>
    </div>
  `
  ).join("");

  container.querySelectorAll(".health-item").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.health;
      healthFlags[id] = !healthFlags[id];
      if (!healthFlags[id]) delete healthFlags[id];
      saveData(`health_${today}`, healthFlags);
      renderHealthCheck();
      renderHealthChart();
      updateHealthVerdict();
    });
  });

  renderHealthChart();
  updateHealthVerdict();
}

function renderHealthChart() {
  const chart = document.getElementById("healthChart");
  const dates = [];
  const d = new Date();

  for (let i = 13; i >= 0; i--) {
    const date = new Date(d);
    date.setDate(date.getDate() - i);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    dates.push(key);
  }

  chart.innerHTML = dates
    .map((dateKey) => {
      const flags = loadData(`health_${dateKey}`, {});
      const count = Object.values(flags).filter(Boolean).length;
      const dayNum = new Date(dateKey).getDate();
      return `
      <div class="health-bar level-${count}" title="${dateKey}: ${count} flags">
        <span class="health-bar-label">${dayNum}</span>
      </div>
    `;
    })
    .join("");
}

function updateHealthVerdict() {
  const verdictEl = document.getElementById("healthVerdict");
  const flagCount = Object.values(healthFlags).filter(Boolean).length;

  // Check past 14 days for sustained flags
  let daysWithFlags = 0;
  const d = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(d);
    date.setDate(date.getDate() - i);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const flags = loadData(`health_${key}`, {});
    if (Object.values(flags).filter(Boolean).length >= 2) {
      daysWithFlags++;
    }
  }

  if (daysWithFlags >= 10) {
    verdictEl.className = "health-verdict danger";
    verdictEl.textContent =
      "警告: 14日中10日以上で複数の症状あり。勉強IIを削ってください。壊れない＝勝ち。";
  } else if (flagCount >= 3) {
    verdictEl.className = "health-verdict warning";
    verdictEl.textContent =
      "注意: 今日は複数の症状があります。無理せず回復を優先してください。";
  } else if (flagCount >= 1) {
    verdictEl.className = "health-verdict warning";
    verdictEl.textContent =
      "軽度: 症状が1つあります。経過を観察してください。";
  } else {
    verdictEl.className = "health-verdict ok";
    verdictEl.textContent = "Good condition. 構造に従って淡々と積み上げましょう。";
  }
}

// ===== Stats =====
function updateStats() {
  const logs = loadData("dailyLog", {});
  const totalDays = Object.keys(logs).length;
  document.getElementById("totalDays").textContent = totalDays;

  // Current streak
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(d);
    date.setDate(date.getDate() - i);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    if (logs[key]) {
      streak++;
    } else {
      break;
    }
  }
  document.getElementById("currentStreak").textContent = streak;
  document.getElementById("streakCount").textContent = streak;

  // Completion rate
  const completed = Object.keys(completedBlocks).length;
  const total = SCHEDULE.length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
  document.getElementById("completionRate").textContent = `${rate}%`;

  // Study hours (study-1: 60min, review-light: 15min, study-2: 40min)
  let studyMin = 0;
  if (completedBlocks["study-1"]) studyMin += 60;
  if (completedBlocks["review-light"]) studyMin += 15;
  if (completedBlocks["study-2"]) studyMin += 40;

  // Show cumulative study hours from all logged days
  let totalStudy = 0;
  Object.keys(logs).forEach((dateKey) => {
    const dayCompleted = loadData(`completed_${dateKey}`, {});
    if (dayCompleted["study-1"]) totalStudy += 60;
    if (dayCompleted["review-light"]) totalStudy += 15;
    if (dayCompleted["study-2"]) totalStudy += 40;
  });

  const hours = Math.floor(totalStudy / 60);
  const mins = totalStudy % 60;
  document.getElementById("studyHours").textContent =
    mins > 0 ? `${hours}h${mins}m` : `${hours}h`;
}

// ===== Career =====
let certChecked = loadData("certChecked", {});

function renderCareerRoadmap() {
  const container = document.getElementById("careerRoadmap");
  const currentYear = new Date().getFullYear();

  container.innerHTML = ROADMAP.map((year) => {
    let statusClass = year.status;
    if (year.status === "current") statusClass = "current";
    else if (year.year < currentYear) statusClass = "done";
    else statusClass = "future";

    return `
      <div class="roadmap-year ${statusClass}">
        <div class="roadmap-marker">
          <div class="roadmap-dot"></div>
          <div class="roadmap-line"></div>
        </div>
        <div class="roadmap-content">
          <div class="roadmap-header">
            <span class="roadmap-year-label">${year.year}</span>
            <span class="roadmap-age">${year.age}歳</span>
            <span class="roadmap-salary">${year.salary}</span>
          </div>
          <div class="roadmap-theme">${year.theme}</div>
          <div class="roadmap-items">
            ${year.items.map((item) => `<span class="roadmap-item">${item}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderMonthlyPlan() {
  const container = document.getElementById("monthlyPlan");
  const currentMonth = new Date().getMonth() + 1;

  container.innerHTML = MONTHLY_PLAN_2026.map((m) => {
    let status = m.status;
    if (m.month < currentMonth && new Date().getFullYear() === 2026) status = "done";
    else if (m.month === currentMonth && new Date().getFullYear() === 2026) status = "current";

    return `
      <div class="month-card ${status}">
        <div class="month-num">${m.month}月</div>
        <div class="month-tasks">${m.tasks}</div>
        <div class="month-status">${status === "done" ? "\u2713" : status === "current" ? "NOW" : ""}</div>
      </div>
    `;
  }).join("");
}

function renderCertifications() {
  const container = document.getElementById("certGrid");
  const filterContainer = document.getElementById("certFilter");
  const statsContainer = document.getElementById("certStats");

  // Merge persisted state
  const certs = CERTIFICATIONS.map((c) => ({
    ...c,
    done: c.done || !!certChecked[c.id],
  }));

  // Stats
  const total = certs.length;
  const completed = certs.filter((c) => c.done).length;
  const pct = Math.round((completed / total) * 100);

  statsContainer.innerHTML = `
    <div class="cert-progress">
      <div class="cert-progress-bar" style="width: ${pct}%"></div>
    </div>
    <div class="cert-progress-text">${completed} / ${total} (${pct}%)</div>
  `;

  // Category filters
  const cats = [...new Set(certs.map((c) => c.cat))];
  filterContainer.innerHTML = `
    <button class="cert-filter-btn active" data-cat="all">All</button>
    ${cats.map((c) => `<button class="cert-filter-btn" data-cat="${c}">${c}</button>`).join("")}
  `;

  function renderGrid(filter) {
    const filtered = filter === "all" ? certs : certs.filter((c) => c.cat === filter);
    container.innerHTML = filtered
      .map(
        (c) => `
      <div class="cert-item ${c.done ? "cert-done" : "cert-pending"}" data-cert="${c.id}">
        <div class="cert-check">${c.done ? "\u2713" : ""}</div>
        <div class="cert-info">
          <div class="cert-name">${c.name}</div>
          <div class="cert-cat">${c.cat}</div>
        </div>
      </div>
    `
      )
      .join("");

    // Toggle certs that aren't originally done
    container.querySelectorAll(".cert-item").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.cert;
        const orig = CERTIFICATIONS.find((c) => c.id === id);
        if (orig && orig.done) return; // Cannot uncheck originally completed
        certChecked[id] = !certChecked[id];
        if (!certChecked[id]) delete certChecked[id];
        saveData("certChecked", certChecked);
        renderCertifications();
      });
    });
  }

  renderGrid("all");

  filterContainer.querySelectorAll(".cert-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterContainer
        .querySelectorAll(".cert-filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderGrid(btn.dataset.cat);
    });
  });
}

function renderSkillCategories() {
  const container = document.getElementById("skillCategories");

  container.innerHTML = SKILL_CATEGORIES.map((cat) => {
    const done = cat.items.filter((i) => i.done).length;
    const total = cat.items.length;
    const pct = Math.round((done / total) * 100);

    return `
      <div class="skill-cat">
        <div class="skill-cat-header" data-toggle="skill">
          <div class="skill-cat-name">${cat.name}</div>
          <div class="skill-cat-progress">
            <div class="skill-cat-bar" style="width: ${pct}%"></div>
          </div>
          <div class="skill-cat-count">${done}/${total}</div>
        </div>
        <div class="skill-cat-items">
          ${cat.items
            .map(
              (item) => `
            <div class="skill-item ${item.done ? "skill-done" : ""}">
              <span class="skill-dot"></span>
              ${item.name}
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }).join("");

  // Toggle expand
  container.querySelectorAll(".skill-cat-header").forEach((header) => {
    header.addEventListener("click", () => {
      const cat = header.parentElement;
      cat.classList.toggle("expanded");
    });
  });
}

function renderCareer() {
  renderCareerRoadmap();
  renderMonthlyPlan();
  renderCertifications();
  renderSkillCategories();
}

// ===== Initialize =====
function init() {
  updateDateDisplay();
  initTabs();
  updateCurrentActivity();
  renderTimeline();
  renderSupplements();
  updateSNSStatus();
  renderHealthCheck();
  updateStats();
  renderCareer();

  // Update every 30 seconds
  setInterval(() => {
    updateCurrentActivity();
    updateSNSStatus();
    renderTimeline();
  }, 30000);
}

// Start app
init();
