function createIconItems(sectionId, className) {
  const grid = document.getElementById(sectionId);
  icons.forEach((icon) => {
    const item = document.createElement("div");
    item.className = "icon-item";
    item.onclick = () => copyCode(icon.name, className);
    item.innerHTML = `
			<span class="${className}">${icon.name}</span>
			<div class="icon-name">${icon.name}</div>
			<div class="icon-keywords">${icon.keywords}</div>
		`;
    grid.appendChild(item);
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
async function copyCode(iconName, className) {
  const code = `<span class="${className}">${iconName}</span>`;
  try {
    await copyToClipboard(code);
    showToast("已成功复制标签，请直接粘贴！");
  } catch (e) {
    showToast("复制失败！");
    console.log("复制失败", e);
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function filterIcons() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll(".icon-item").forEach((icon) => {
    const name = icon.querySelector(".icon-name").textContent.toLowerCase();
    const keywords = icon
      .querySelector(".icon-keywords")
      .textContent.toLowerCase();
    icon.style.display =
      name.includes(searchValue) || keywords.includes(searchValue)
        ? "block"
        : "none";
  });
}

createIconItems("icon-grid-filled", "material-icons");
createIconItems("icon-grid-outlined", "material-icons-outlined");
createIconItems("icon-grid-round", "material-icons-round");
createIconItems("icon-grid-sharp", "material-icons-sharp");
createIconItems("icon-grid-two-tone", "material-icons-two-tone");

// https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scroll_event
// 当网页向下滑动 35px 出现"返回顶部" 按钮
let ticking = false;

document.addEventListener("scroll", (event) => { 

  if (!ticking) {
    window.requestAnimationFrame(() => {
        if (document.body.scrollTop > 35 || document.documentElement.scrollTop > 35) {
    document.querySelector(".backtop").style.visibility = "visible";
  } else {
    document.querySelector(".backtop").style.visibility = "hidden";
  }
      ticking = false;
    });

    ticking = true;
  }
});
// 点击按钮，返回顶部
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
