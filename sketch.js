let sports = [ // 建立六個球類運動資料。
  { name: "籃球", clue: "把球投入籃框得分。", color: "#f97316" }, // 建立籃球資料。
  { name: "足球", clue: "用腳踢球並射入球門。", color: "#22c55e" }, // 建立足球資料。
  { name: "排球", clue: "隔著球網用手擊球。", color: "#38bdf8" }, // 建立排球資料。
  { name: "網球", clue: "使用球拍將球打過球網。", color: "#eab308" }, // 建立網球資料。
  { name: "棒球", clue: "使用球棒擊球並跑壘。", color: "#ef4444" }, // 建立棒球資料。
  { name: "乒乓球", clue: "在球桌兩側使用球拍擊球。", color: "#a855f7" } // 建立乒乓球資料。
]; // 結束球類運動資料。

let choices = []; // 儲存尚未放入題目卡的選項。
let answers = []; // 儲存六張題目卡的答案。
let cards = []; // 儲存六張題目卡的位置。
let choiceButtons = []; // 儲存下方選項按鈕的位置。
let dragging = null; // 儲存目前正在拖曳的選項。
let draggingSource = -1; // 儲存拖曳選項原本的位置。
let submitted = false; // 記錄是否已經交卷。
let score = 0; // 儲存目前測驗分數。
let confetti = []; // 儲存彩帶資料。
let showConfetti = false; // 記錄是否顯示彩帶。
let submitButton; // 儲存交卷按鈕。
let restartButton; // 儲存重新測驗按鈕。
let animationOffset = 0; // 儲存球類動畫位移值。
let sceneHeight = 185; // 設定上方動畫場景高度。
let contentTop = 235; // 設定題目卡開始位置。

function setup() { // 建立畫布與初始化測驗。
  createCanvas(windowWidth, windowHeight); // 建立全螢幕畫布。
  textFont("Arial, Microsoft JhengHei, sans-serif"); // 設定中文與英文字型。
  textAlign(CENTER, CENTER); // 設定文字預設置中。
  initializeQuiz(); // 初始化測驗資料。
  createButtons(); // 建立操作按鈕。
  createConfetti(); // 建立彩帶資料。
} // 結束 setup 函式。

function draw() { // 每一幀重新繪製畫面。
  background("#eef2ff"); // 設定畫布背景顏色。
  animationOffset += 0.035; // 持續增加動畫位移。
  drawHeader(); // 繪製標題與說明。
  drawSportsScene(); // 繪製球類動畫場景。
  drawQuestionCards(); // 繪製六張題目卡。
  drawChoices(); // 繪製下方拖曳選項。
  drawResult(); // 繪製交卷後的成績。
  drawConfetti(); // 繪製及格彩帶。
} // 結束 draw 函式。

function initializeQuiz() { // 初始化或重新開始測驗。
  choices = []; // 清空選項陣列。
  answers = []; // 清空答案陣列。
  for (let i = 0; i < sports.length; i++) { // 逐一處理六個運動。
    choices.push({ name: sports[i].name, index: i }); // 建立可拖曳選項。
    answers.push(null); // 建立空白答案位置。
  } // 結束資料初始化。
  shuffle(choices, true); // 將選項順序隨機排列。
  submitted = false; // 設定為尚未交卷。
  score = 0; // 將分數歸零。
  showConfetti = false; // 關閉彩帶效果。
  dragging = null; // 清除正在拖曳的選項。
  draggingSource = -1; // 清除拖曳來源。
  if (submitButton) { // 判斷交卷按鈕是否已建立。
    submitButton.show(); // 顯示交卷按鈕。
  } // 結束交卷按鈕判斷。
  if (restartButton) { // 判斷重新測驗按鈕是否已建立。
    restartButton.hide(); // 隱藏重新測驗按鈕。
  } // 結束重新測驗按鈕判斷。
} // 結束 initializeQuiz 函式。

function createButtons() { // 建立交卷與重新測驗按鈕。
  submitButton = createButton("交卷看成績"); // 建立交卷按鈕。
  submitButton.style("font-size", "18px"); // 設定交卷文字大小。
  submitButton.style("font-weight", "bold"); // 設定交卷文字粗細。
  submitButton.style("color", "#ffffff"); // 設定交卷文字顏色。
  submitButton.style("background", "#2563eb"); // 設定交卷背景顏色。
  submitButton.style("border", "none"); // 移除交卷按鈕邊框。
  submitButton.style("border-radius", "10px"); // 設定交卷按鈕圓角。
  submitButton.style("padding", "12px 24px"); // 設定交卷按鈕內距。
  submitButton.style("cursor", "pointer"); // 設定滑鼠游標樣式。
  submitButton.mousePressed(submitQuiz); // 設定交卷按鈕事件。
  restartButton = createButton("重新測驗"); // 建立重新測驗按鈕。
  restartButton.style("font-size", "18px"); // 設定重新測驗文字大小。
  restartButton.style("font-weight", "bold"); // 設定重新測驗文字粗細。
  restartButton.style("color", "#ffffff"); // 設定重新測驗文字顏色。
  restartButton.style("background", "#16a34a"); // 設定重新測驗背景顏色。
  restartButton.style("border", "none"); // 移除重新測驗按鈕邊框。
  restartButton.style("border-radius", "10px"); // 設定重新測驗按鈕圓角。
  restartButton.style("padding", "12px 24px"); // 設定重新測驗按鈕內距。
  restartButton.style("cursor", "pointer"); // 設定滑鼠游標樣式。
  restartButton.mousePressed(initializeQuiz); // 設定重新測驗按鈕事件。
  restartButton.hide(); // 初始隱藏重新測驗按鈕。
} // 結束 createButtons 函式。

function drawHeader() { // 繪製標題與說明。
  fill("#0f172a"); // 設定標題顏色。
  noStroke(); // 移除文字邊框。
  textSize(30); // 設定標題文字大小。
  textStyle(BOLD); // 設定標題為粗體。
  text("球類運動配對測驗", width / 2, 30); // 繪製主標題。
  textStyle(NORMAL); // 恢復一般字體。
  fill("#475569"); // 設定說明文字顏色。
  textSize(16); // 設定說明文字大小。
  text("請將下方球類名稱拖曳到正確的題目卡中，再按下交卷。", width / 2, 65); // 繪製操作說明。
} // 結束 drawHeader 函式。

function drawSportsScene() { // 繪製球類運動動畫場景。
  let x = 20; // 設定動畫區左側位置。
  let y = 90; // 設定動畫區上方位置。
  let w = width - 40; // 設定動畫區寬度。
  let h = sceneHeight; // 設定動畫區高度。
  fill("#0f172a"); // 設定動畫區背景顏色。
  noStroke(); // 移除動畫區邊框。
  rect(x, y, w, h, 18); // 繪製動畫區背景。
  drawCourtLines(x, y, w, h); // 繪製運動場線條。
  let spacing = w / 7; // 計算六顆球的水平間距。
  for (let i = 0; i < sports.length; i++) { // 逐一繪製六種球。
    let bx = spacing * (i + 1); // 計算球的水平位置。
    let by = y + 88 + sin(animationOffset * 2 + i) * 28; // 計算球的上下彈跳位置。
    drawAnimatedBall(i, bx, by); // 繪製對應球類。
  } // 結束球類繪製。
  fill("#e2e8f0"); // 設定動畫標籤文字顏色。
  textSize(14); // 設定動畫標籤文字大小。
  text("球類運動動畫教學區", width / 2, y + h - 18); // 顯示動畫區標籤。
} // 結束 drawSportsScene 函式。

function drawCourtLines(x, y, w, h) { // 繪製運動場裝飾線。
  stroke("#475569"); // 設定運動場線條顏色。
  strokeWeight(2); // 設定運動場線條粗細。
  noFill(); // 設定不填滿。
  line(x + 20, y + h - 45, x + w - 20, y + h - 45); // 繪製底部場地線。
  line(x + w / 2, y + 15, x + w / 2, y + h - 45); // 繪製中央場地線。
  ellipse(x + w / 2, y + h / 2 - 10, 70, 70); // 繪製中央圓圈。
  noStroke(); // 移除裝飾線邊框。
} // 結束 drawCourtLines 函式。

function drawAnimatedBall(index, x, y) { // 根據索引繪製動畫球類。
  let rotation = animationOffset * (index % 2 === 0 ? 1 : -1); // 計算球體旋轉角度。
  push(); // 儲存目前繪圖狀態。
  translate(x, y); // 移動到球體位置。
  rotate(rotation); // 旋轉球體。
  if (index === 0) { // 判斷是否為籃球。
    drawBasketball(); // 繪製籃球。
  } else if (index === 1) { // 判斷是否為足球。
    drawFootball(); // 繪製足球。
  } else if (index === 2) { // 判斷是否為排球。
    drawVolleyball(); // 繪製排球。
  } else if (index === 3) { // 判斷是否為網球。
    drawTennisBall(); // 繪製網球。
  } else if (index === 4) { // 判斷是否為棒球。
    drawBaseball(); // 繪製棒球。
  } else { // 否則繪製乒乓球。
    drawTableTennis(); // 繪製乒乓球。
  } // 結束球類判斷。
  pop(); // 還原繪圖狀態。
} // 結束 drawAnimatedBall 函式。

function drawBasketball() { // 繪製籃球。
  fill("#f97316"); // 設定籃球橘色。
  stroke("#431407"); // 設定籃球線條顏色。
  strokeWeight(2); // 設定籃球線條粗細。
  ellipse(0, 0, 48, 48); // 繪製籃球圓形。
  noFill(); // 設定籃球線條不填滿。
  arc(0, 0, 48, 48, -HALF_PI, HALF_PI); // 繪製籃球弧線。
  arc(0, 0, 48, 48, HALF_PI, PI + HALF_PI); // 繪製籃球另一側弧線。
  line(-24, 0, 24, 0); // 繪製籃球中央線。
} // 結束 drawBasketball 函式。

function drawFootball() { // 繪製足球。
  fill("#f8fafc"); // 設定足球背景顏色。
  stroke("#111827"); // 設定足球邊框顏色。
  strokeWeight(2); // 設定足球邊框粗細。
  ellipse(0, 0, 48, 48); // 繪製足球圓形。
  fill("#111827"); // 設定足球圖案顏色。
  beginShape(); // 開始繪製足球圖案。
  vertex(0, -12); // 設定足球圖案頂點一。
  vertex(11, -4); // 設定足球圖案頂點二。
  vertex(7, 10); // 設定足球圖案頂點三。
  vertex(-7, 10); // 設定足球圖案頂點四。
  vertex(-11, -4); // 設定足球圖案頂點五。
  endShape(CLOSE); // 結束足球圖案。
} // 結束 drawFootball 函式。

function drawVolleyball() { // 繪製排球。
  fill("#f8fafc"); // 設定排球背景顏色。
  stroke("#cbd5e1"); // 設定排球邊框顏色。
  strokeWeight(2); // 設定排球邊框粗細。
  ellipse(0, 0, 48, 48); // 繪製排球圓形。
  noFill(); // 設定排球圖案不填滿。
  stroke("#38bdf8"); // 設定排球圖案顏色。
  strokeWeight(3); // 設定排球圖案粗細。
  arc(-5, 0, 38, 40, -1.2, 1.2); // 繪製排球弧線一。
  arc(8, 0, 38, 40, 1.8, 4.3); // 繪製排球弧線二。
} // 結束 drawVolleyball 函式。

function drawTennisBall() { // 繪製網球。
  fill("#d9f99d"); // 設定網球黃綠色。
  stroke("#365314"); // 設定網球邊框顏色。
  strokeWeight(2); // 設定網球邊框粗細。
  ellipse(0, 0, 44, 44); // 繪製網球圓形。
  noFill(); // 設定網球圖案不填滿。
  stroke("#f8fafc"); // 設定網球圖案顏色。
  strokeWeight(3); // 設定網球圖案粗細。
  arc(-5, 0, 30, 40, -1.2, 1.2); // 繪製網球弧線一。
  arc(5, 0, 30, 40, 1.9, 4.3); // 繪製網球弧線二。
} // 結束 drawTennisBall 函式。

function drawBaseball() { // 繪製棒球。
  fill("#f8fafc"); // 設定棒球背景顏色。
  stroke("#cbd5e1"); // 設定棒球邊框顏色。
  strokeWeight(2); // 設定棒球邊框粗細。
  ellipse(0, 0, 46, 46); // 繪製棒球圓形。
  stroke("#dc2626"); // 設定棒球縫線顏色。
  strokeWeight(2); // 設定棒球縫線粗細。
  noFill(); // 設定縫線不填滿。
  arc(-7, 0, 22, 35, -HALF_PI, HALF_PI); // 繪製棒球左側縫線。
  arc(7, 0, 22, 35, HALF_PI, PI + HALF_PI); // 繪製棒球右側縫線。
} // 結束 drawBaseball 函式。

function drawTableTennis() { // 繪製乒乓球。
  fill("#f8fafc"); // 設定乒乓球顏色。
  stroke("#cbd5e1"); // 設定乒乓球邊框顏色。
  strokeWeight(2); // 設定乒乓球邊框粗細。
  ellipse(0, 0, 35, 35); // 繪製乒乓球。
  fill("#ef4444"); // 設定乒乓球裝飾線顏色。
  noStroke(); // 移除裝飾線邊框。
  ellipse(6, -6, 4, 4); // 繪製乒乓球小裝飾。
} // 結束 drawTableTennis 函式。

function drawQuestionCards() { // 繪製六張題目卡。
  let columns = width < 700 ? 1 : 2; // 根據畫布寬度決定欄數。
  let gap = 12; // 設定題目卡間距。
  let cardWidth = (width - 40 - gap * (columns - 1)) / columns; // 計算題目卡寬度。
  let cardHeight = width < 700 ? 108 : 105; // 計算題目卡高度。
  let rows = ceil(sports.length / columns); // 計算題目卡列數。
  let startY = contentTop; // 設定題目卡開始位置。
  cards = []; // 清空題目卡位置。
  for (let i = 0; i < sports.length; i++) { // 逐一繪製題目卡。
    let column = i % columns; // 計算目前欄位。
    let row = floor(i / columns); // 計算目前列數。
    let x = 20 + column * (cardWidth + gap); // 計算題目卡水平位置。
    let y = startY + row * (cardHeight + gap); // 計算題目卡垂直位置。
    cards.push({ x: x, y: y, w: cardWidth, h: cardHeight }); // 儲存題目卡位置。
    fill("#ffffff"); // 設定題目卡背景。
    stroke(sports[i].color); // 設定題目卡邊框顏色。
    strokeWeight(3); // 設定題目卡邊框粗細。
    rect(x, y, cardWidth, cardHeight, 14); // 繪製題目卡。
    noStroke(); // 移除文字邊框。
    fill(sports[i].color); // 設定題號顏色。
    textSize(16); // 設定題號大小。
    textStyle(BOLD); // 設定題號粗體。
    text("第 " + (i + 1) + " 題", x + 45, y + 20); // 繪製題號。
    textStyle(NORMAL); // 恢復一般文字。
    fill("#334155"); // 設定題目文字顏色。
    textSize(14); // 設定題目文字大小。
    text(sports[i].clue, x + cardWidth / 2, y + 48); // 繪製題目提示。
    drawAnswerSlot(i, x + 12, y + 68, cardWidth - 24, 28); // 繪製答案區。
  } // 結束題目卡繪製。
} // 結束 drawQuestionCards 函式。

function drawAnswerSlot(index, x, y, w, h) { // 繪製答案拖放區。
  if (answers[index] === null) { // 判斷答案區是否為空白。
    fill("#f8fafc"); // 設定空白答案區背景。
    stroke("#94a3b8"); // 設定空白答案區邊框。
    drawingContext.setLineDash([5, 5]); // 設定虛線邊框。
    rect(x, y, w, h, 8); // 繪製空白答案區。
    drawingContext.setLineDash([]); // 恢復實線邊框。
    noStroke(); // 移除提示文字邊框。
    fill("#64748b"); // 設定提示文字顏色。
    textSize(12); // 設定提示文字大小。
    text("拖曳答案到這裡", x + w / 2, y + h / 2); // 顯示拖曳提示。
  } else { // 如果答案區已有答案。
    fill("#e0f2fe"); // 設定已填答案背景。
    stroke("#0284c7"); // 設定已填答案邊框。
    strokeWeight(2); // 設定已填答案邊框粗細。
    rect(x, y, w, h, 8); // 繪製已填答案區。
    noStroke(); // 移除答案文字邊框。
    fill("#075985"); // 設定答案文字顏色。
    textSize(14); // 設定答案文字大小。
    text(answers[index].name, x + w / 2, y + h / 2); // 顯示答案文字。
    if (submitted) { // 判斷是否已經交卷。
      fill(answers[index].index === index ? "#16a34a" : "#dc2626"); // 根據答案正誤設定顏色。
      textSize(16); // 設定正誤符號大小。
      text(answers[index].index === index ? "✓" : "✗", x + w - 14, y + h / 2); // 顯示正誤符號。
    } // 結束交卷判斷。
  } // 結束答案區判斷。
} // 結束 drawAnswerSlot 函式。

function drawChoices() { // 繪製下方的拖曳選項。
  let y = getChoicesY(); // 計算選項區位置。
  fill("#0f172a"); // 設定選項標題顏色。
  noStroke(); // 移除標題邊框。
  textSize(18); // 設定標題大小。
  textStyle(BOLD); // 設定標題粗體。
  text("拖曳選項", width / 2, y); // 繪製選項標題。
  textStyle(NORMAL); // 恢復一般字體。
  let columns = width < 700 ? 2 : 3; // 計算選項欄數。
  let gap = 10; // 設定選項間距。
  let buttonWidth = (width - 40 - gap * (columns - 1)) / columns; // 計算選項寬度。
  let buttonHeight = 42; // 設定選項高度。
  choiceButtons = []; // 清空選項位置。
  for (let i = 0; i < choices.length; i++) { // 逐一繪製選項。
    let column = i % columns; // 計算選項欄位。
    let row = floor(i / columns); // 計算選項列數。
    let x = 20 + column * (buttonWidth + gap); // 計算選項水平位置。
    let top = y + 30 + row * (buttonHeight + gap); // 計算選項垂直位置。
    choiceButtons.push({ x: x, y: top, w: buttonWidth, h: buttonHeight, choice: choices[i] }); // 儲存選項位置。
    fill("#ffffff"); // 設定選項背景。
    stroke("#64748b"); // 設定選項邊框。
    strokeWeight(2); // 設定選項邊框粗細。
    rect(x, top, buttonWidth, buttonHeight, 10); // 繪製選項按鈕。
    noStroke(); // 移除文字邊框。
    fill("#1e293b"); // 設定選項文字顏色。
    textSize(16); // 設定選項文字大小。
    text(choices[i].name, x + buttonWidth / 2, top + buttonHeight / 2); // 繪製選項名稱。
  } // 結束選項繪製。
} // 結束 drawChoices 函式。

function getChoicesY() { // 計算拖曳選項區位置。
  let columns = width < 700 ? 1 : 2; // 計算題目卡欄數。
  let rows = ceil(sports.length / columns); // 計算題目卡列數。
  let cardHeight = width < 700 ? 108 : 105; // 計算題目卡高度。
  return contentTop + rows * (cardHeight + 12) + 8; // 回傳選項標題位置。
} // 結束 getChoicesY 函式。

function drawResult() { // 繪製交卷結果。
  if (!submitted) { // 判斷是否尚未交卷。
    return; // 尚未交卷時不顯示成績。
  } // 結束尚未交卷判斷。
  fill(score > 60 ? "#166534" : "#991b1b"); // 根據成績設定顏色。
  noStroke(); // 移除文字邊框。
  textSize(22); // 設定成績文字大小。
  textStyle(BOLD); // 設定成績文字粗體。
  text("總成績：" + score + "%　" + (score > 60 ? "恭喜通過測驗！" : "請再接再厲！"), width / 2, height - 32); // 顯示總成績。
  textStyle(NORMAL); // 恢復一般文字。
} // 結束 drawResult 函式。

function submitQuiz() { // 執行交卷與計分。
  let correct = 0; // 建立答對題數。
  for (let i = 0; i < sports.length; i++) { // 檢查六題答案。
    if (answers[i] !== null && answers[i].index === i) { // 判斷答案是否正確。
      correct++; // 增加答對題數。
    } // 結束正確答案判斷。
  } // 結束六題檢查。
  score = round(correct / sports.length * 100); // 計算百分比成績。
  submitted = true; // 設定為已交卷。
  showConfetti = score > 60; // 成績高於六十才顯示彩帶。
  submitButton.hide(); // 隱藏交卷按鈕。
  restartButton.show(); // 顯示重新測驗按鈕。
} // 結束 submitQuiz 函式。

function mousePressed() { // 處理滑鼠按下事件。
  startDrag(mouseX, mouseY); // 開始拖曳。
  return false; // 阻止瀏覽器預設行為。
} // 結束 mousePressed 函式。

function mouseReleased() { // 處理滑鼠放開事件。
  finishDrag(mouseX, mouseY); // 結束拖曳。
  return false; // 阻止瀏覽器預設行為。
} // 結束 mouseReleased 函式。

function touchStarted() { // 處理觸控開始事件。
  startDrag(mouseX, mouseY); // 開始觸控拖曳。
  return false; // 阻止頁面滾動。
} // 結束 touchStarted 函式。

function touchEnded() { // 處理觸控結束事件。
  finishDrag(mouseX, mouseY); // 結束觸控拖曳。
  return false; // 阻止頁面滾動。
} // 結束 touchEnded 函式。

function startDrag(x, y) { // 開始拖曳選項。
  if (submitted) { // 判斷是否已交卷。
    return; // 交卷後禁止拖曳。
  } // 結束交卷判斷。
  for (let i = 0; i < choiceButtons.length; i++) { // 檢查下方選項。
    let item = choiceButtons[i]; // 取得目前選項。
    if (inside(x, y, item.x, item.y, item.w, item.h)) { // 判斷是否點擊選項。
      dragging = item.choice; // 設定拖曳選項。
      draggingSource = -1; // 設定來源為下方選項。
      return; // 結束開始拖曳。
    } // 結束選項判斷。
  } // 結束選項檢查。
  for (let i = 0; i < cards.length; i++) { // 檢查題目卡答案區。
    let card = cards[i]; // 取得目前題目卡。
    if (inside(x, y, card.x, card.y + 65, card.w, 38) && answers[i] !== null) { // 判斷是否點擊已有答案。
      dragging = answers[i]; // 將原答案設為拖曳中。
      draggingSource = i; // 記錄原本所在題目卡。
      answers[i] = null; // 暫時移除答案。
      rebuildChoices(); // 更新下方選項。
      return; // 結束開始拖曳。
    } // 結束答案區判斷。
  } // 結束題目卡檢查。
} // 結束 startDrag 函式。

function finishDrag(x, y) { // 結束拖曳並放置答案。
  if (dragging === null) { // 判斷是否有拖曳中的答案。
    return; // 沒有答案時結束。
  } // 結束拖曳判斷。
  let target = -1; // 建立目標題目卡索引。
  for (let i = 0; i < cards.length; i++) { // 檢查所有題目卡。
    if (inside(x, y, cards[i].x, cards[i].y, cards[i].w, cards[i].h)) { // 判斷是否放在題目卡內。
      target = i; // 設定目標題目卡。
      break; // 結束搜尋。
    } // 結束範圍判斷。
  } // 結束題目卡搜尋。
  if (target !== -1) { // 判斷是否有有效目標。
    let oldAnswer = answers[target]; // 暫存目標原本答案。
    answers[target] = dragging; // 將答案放入目標。
    if (draggingSource !== -1 && oldAnswer !== null) { // 判斷是否需要交換答案。
      answers[draggingSource] = oldAnswer; // 將舊答案放回來源位置。
    } else if (draggingSource !== -1 && draggingSource !== target) { // 判斷是否需要清除來源。
      answers[draggingSource] = null; // 清除來源答案。
    } // 結束答案交換處理。
  } else if (draggingSource !== -1) { // 判斷是否未放入有效位置。
    answers[draggingSource] = dragging; // 將答案放回原本位置。
  } // 結束答案放置處理。
  rebuildChoices(); // 重新建立下方選項。
  dragging = null; // 清除拖曳中的答案。
  draggingSource = -1; // 清除拖曳來源。
} // 結束 finishDrag 函式。

function rebuildChoices() { // 重新建立尚未使用的選項。
  choices = []; // 清空選項。
  for (let i = 0; i < sports.length; i++) { // 檢查六個運動。
    let used = answers.some(function(answer) { // 判斷運動是否已被使用。
      return answer !== null && answer.index === i; // 回傳使用狀態。
    }); // 結束使用狀態判斷。
    if (!used) { // 判斷運動是否尚未使用。
      choices.push({ name: sports[i].name, index: i }); // 加入下方選項。
    } // 結束尚未使用判斷。
  } // 結束運動檢查。
} // 結束 rebuildChoices 函式。

function inside(x, y, rx, ry, rw, rh) { // 判斷座標是否在矩形內。
  return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh; // 回傳判斷結果。
} // 結束 inside 函式。

function createConfetti() { // 建立彩帶資料。
  confetti = []; // 清空彩帶陣列。
  for (let i = 0; i < 110; i++) { // 建立一百一十個彩帶。
    confetti.push({ // 新增彩帶物件。
      x: random(width), // 設定彩帶水平位置。
      y: random(-height, 0), // 設定彩帶垂直位置。
      w: random(5, 11), // 設定彩帶寬度。
      h: random(8, 18), // 設定彩帶高度。
      speed: random(1, 3), // 設定彩帶下降速度。
      angle: random(TWO_PI), // 設定彩帶旋轉角度。
      color: random(["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"]) // 設定彩帶顏色。
    }); // 結束彩帶物件。
  } // 結束彩帶建立。
} // 結束 createConfetti 函式。

function drawConfetti() { // 繪製彩帶動畫。
  if (!showConfetti) { // 判斷是否需要顯示彩帶。
    return; // 不需要時結束函式。
  } // 結束彩帶判斷。
  for (let piece of confetti) { // 逐一處理彩帶。
    piece.y += piece.speed; // 更新彩帶垂直位置。
    piece.angle += 0.05; // 更新彩帶旋轉角度。
    if (piece.y > height + 20) { // 判斷彩帶是否落出畫布。
      piece.y = random(-100, -20); // 將彩帶移回畫布上方。
      piece.x = random(width); // 重新設定水平位置。
    } // 結束彩帶重置。
    push(); // 儲存目前繪圖狀態。
    translate(piece.x, piece.y); // 移動畫布座標。
    rotate(piece.angle); // 旋轉彩帶。
    rectMode(CENTER); // 設定矩形中心繪製。
    noStroke(); // 移除彩帶邊框。
    fill(piece.color); // 設定彩帶顏色。
    rect(0, 0, piece.w, piece.h, 2); // 繪製彩帶。
    rectMode(CORNER); // 恢復矩形預設模式。
    pop(); // 還原繪圖狀態。
  } // 結束彩帶繪製。
} // 結束 drawConfetti 函式。

function windowResized() { // 處理瀏覽器視窗尺寸改變。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為全螢幕大小。
  createConfetti(); // 重新建立彩帶位置。
} // 結束 windowResized 函式。