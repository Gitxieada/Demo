document.addEventListener("DOMContentLoaded", function () {
  // 获取DOM元素
  const text1 = document.getElementById("text1");
  const text2 = document.getElementById("text2");
  const text1Inline = document.getElementById("text1-inline");
  const text2Inline = document.getElementById("text2-inline");
  const diffContainer = document.getElementById("diff-container");
  const diffResult = document.getElementById("diff-result");
  const swapBtn = document.getElementById("swap-btn");
  const clearBtn = document.getElementById("clear-btn");
  const copyBtns = document.querySelectorAll(".copy-btn");
  const tabTriggers = document.querySelectorAll(".tab-trigger");
  const tabContents = document.querySelectorAll(".tab-content");

  // 当前视图模式
  let currentView = "side-by-side";

  // 同步文本框内容
  function syncTextareas(source, target) {
    target.value = source.value;
  }

  // 切换标签页
  function switchTab(tabId) {
    tabTriggers.forEach((trigger) => {
      trigger.classList.remove("active");
      if (trigger.getAttribute("data-tab") === tabId) {
        trigger.classList.add("active");
      }
    });

    tabContents.forEach((content) => {
      content.classList.remove("active");
      if (content.id === tabId) {
        content.classList.add("active");
      }
    });

    currentView = tabId;
  }

  // 计算差异
  function computeDiff(oldText, newText) {
    // 简单的差异算法
    const oldLines = oldText.split("\n");
    const newLines = newText.split("\n");
    const result = [];

    // 查找共同前缀
    let commonPrefixLength = 0;
    const minLength = Math.min(oldLines.length, newLines.length);

    while (
      commonPrefixLength < minLength &&
      oldLines[commonPrefixLength] === newLines[commonPrefixLength]
    ) {
      result.push({ value: oldLines[commonPrefixLength] });
      commonPrefixLength++;
    }

    // 添加删除的行
    for (let i = commonPrefixLength; i < oldLines.length; i++) {
      result.push({ value: oldLines[i], removed: true });
    }

    // 添加新增的行
    for (let i = commonPrefixLength; i < newLines.length; i++) {
      result.push({ value: newLines[i], added: true });
    }
    return result;
  }

  // 更新差异显示
  function updateDiff() {
    const text1Value = text1.value || text1Inline.value;
    const text2Value = text2.value || text2Inline.value;

    if (text1Value || text2Value) {
      const diff = computeDiff(text1Value, text2Value);

      // 清空之前的结果
      diffResult.innerHTML = "";

      // 添加差异结果
      diff.forEach((line) => {
        const div = document.createElement("div");
        div.className = "diff-line";

        if (line.added) {
          div.classList.add("diff-added");
          div.textContent = "+ " + line.value;
        } else if (line.removed) {
          div.classList.add("diff-removed");
          div.textContent = "- " + line.value;
        } else {
          div.textContent = "  " + line.value;
        }

        diffResult.appendChild(div);
      });

      // 显示差异结果容器
      diffContainer.style.display = "block";
    } else {
      // 如果没有文本，隐藏差异结果
      diffContainer.style.display = "none";
    }

    // 更新复制按钮状态
    updateCopyButtonState();
  }

  // 更新复制按钮状态
  function updateCopyButtonState() {
    copyBtns.forEach((btn) => {
      const targetId = btn.getAttribute("data-target");
      const targetElem = document.getElementById(targetId);
      btn.disabled = !targetElem.value;
    });
  }
  function copyToClipboard(text) {
    // navigator.clipboard 只能在 localhost 和 安全的域(https)下使用
    console.log(
      "navigator.clipboard",
      navigator.clipboard,
      "window.isSecureContext",
      window.isSecureContext
    );
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log("clipboard.writeText success");
          return Promise.resolve();
        })
        .catch((err) => {
          console.log("clipboard.writeText err", err);
          return Promise.reject("clipboard.writeText err");
        });
    } else {
      let textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      textarea.setAttribute("readonly", "readonly");
      textarea.style.position = "fixed";
      textarea.style.clip = "rect(0 0 0 0)";
      textarea.style.top = "10px";
      textarea.value = text;
      textarea.select();
      const isSuccess = document.execCommand("copy");
      document.body.removeChild(textarea);
      console.log("copy by execCommand", isSuccess);
      if (isSuccess) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    }
  }

  // 复制到剪贴板
  async function copyText(text) {
    try {
      await copyToClipboard(text);
      alert("复制成功");
    } catch (e) {
      console.log("复制失败：" + e);
      alert("复制文本失败");
    }
  }

  // 交换文本
  function swapTexts() {
    const temp = text1.value;
    text1.value = text2.value;
    text2.value = temp;

    const tempInline = text1Inline.value;
    text1Inline.value = text2Inline.value;
    text2Inline.value = tempInline;

    updateDiff();
  }

  // 清除所有文本
  function clearTexts() {
    text1.value = "";
    text2.value = "";
    text1Inline.value = "";
    text2Inline.value = "";
    diffResult.innerHTML = "";
    diffContainer.style.display = "none";
    updateCopyButtonState();
  }

  // 事件监听器
  text1.addEventListener("input", function () {
    syncTextareas(text1, text1Inline);
    updateDiff();
  });

  text2.addEventListener("input", function () {
    syncTextareas(text2, text2Inline);
    updateDiff();
  });

  text1Inline.addEventListener("input", function () {
    syncTextareas(text1Inline, text1);
    updateDiff();
  });

  text2Inline.addEventListener("input", function () {
    syncTextareas(text2Inline, text2);
    updateDiff();
  });

  swapBtn.addEventListener("click", swapTexts);
  clearBtn.addEventListener("click", clearTexts);

  // 复制按钮事件
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElem = document.getElementById(targetId);
      copyText(targetElem.value);
    });
  });

  // 标签切换事件
  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // 初始化
  updateCopyButtonState();
});
