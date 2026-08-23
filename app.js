document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const themeButton = document.getElementById("themeButton");
  const themeModal = document.getElementById("themeModal");
  const manageModal = document.getElementById("manageModal");
 
  const favoritesButton = document.getElementById("favoritesButton");
const favoritesModal = document.getElementById("favoritesModal");
  const favoritesList = document.getElementById("favoritesList");
  const modalBackdrop = document.getElementById("modalBackdrop");

  const manageButton = document.getElementById("manageButton");
  const settingsButton = document.getElementById("settingsButton");
  const addAppButton = document.getElementById("addAppButton");
  const editFunctionsButton = document.getElementById("editFunctionsButton");

  const chooseBackgroundPhoto = document.getElementById("chooseBackgroundPhoto");
const removeBackgroundPhoto = document.getElementById("removeBackgroundPhoto");
const backgroundPhotoInput = document.getElementById("backgroundPhotoInput");
  const themePreviews = document.querySelectorAll(".theme-preview");
  const closeButtons = document.querySelectorAll("[data-close-modal]");
const digitalCardModal = document.getElementById("digitalCardModal");
const openDigitalCardButton = document.getElementById("openDigitalCardButton");
const showDigitalCardQrButton = document.getElementById("showDigitalCardQrButton");
const digitalCardQrArea = document.getElementById("digitalCardQrArea");
const digitalCardQrCode = document.getElementById("digitalCardQrCode");
  
  const shareDigitalCardButton = document.getElementById("shareDigitalCardButton");
const copyDigitalCardLinkButton = document.getElementById("copyDigitalCardLinkButton");
const shareVcardButton = document.getElementById("shareVcardButton");
  const todayDate = document.getElementById("todayDate");
  const todayDay = document.getElementById("todayDay");

  const dots = document.querySelectorAll(".dot");
  const pages = document.querySelectorAll(".app-page");

  /* =========================
     날짜 표시
  ========================= */

  const now = new Date();

  const month = now.getMonth() + 1;
  const date = now.getDate();

  const dayNames = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  ];

  if (todayDate) {
    todayDate.textContent = `${month}.${date}`;
  }

  if (todayDay) {
    todayDay.textContent = dayNames[now.getDay()];
  }

  /* =========================
     모달
  ========================= */

  function openModal(modal) {
    if (!modal) return;

    modal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
  }

  function closeModals() {
    themeModal?.classList.add("hidden");
    manageModal?.classList.add("hidden");
    digitalCardModal?.classList.add("hidden");
    favoritesModal?.classList.add("hidden");
    modalBackdrop?.classList.add("hidden");
  }

  themeButton?.addEventListener("click", () => {
    openModal(themeModal);
  });

  settingsButton?.addEventListener("click", () => {
    openModal(themeModal);
  });
  function renderFavorites() {
  if (!favoritesList) return;

  favoritesList.innerHTML = "";

  const favoriteCards = document.querySelectorAll(
    '.app-card[data-favorite="true"]'
  );

  if (favoriteCards.length === 0) {
    favoritesList.innerHTML = "<p>등록된 즐겨찾기가 없습니다.</p>";
    return;
  }

  favoriteCards.forEach((card) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "app-card";

    const icon = card.querySelector(".app-icon")?.cloneNode(true);
    const name = card.querySelector(".app-name")?.cloneNode(true);

    if (icon) item.appendChild(icon);
    if (name) item.appendChild(name);

    item.addEventListener("click", () => {
      closeModals();
      card.click();
    });

    favoritesList.appendChild(item);
  });
}
  function saveFavorites() {
  const favoriteIds = [...document.querySelectorAll('.app-card[data-favorite="true"]')]
    .map(card => card.dataset.id);

  localStorage.setItem("joonFavorites", JSON.stringify(favoriteIds));
}

function loadFavorites() {
  const favoriteIds = JSON.parse(localStorage.getItem("joonFavorites") || "[]");

  document.querySelectorAll(".app-card").forEach(card => {
    card.dataset.favorite = favoriteIds.includes(card.dataset.id) ? "true" : "false";
  });

  renderFavorites();
}

loadFavorites();
favoritesButton?.addEventListener("click", () => {
  openModal(favoritesModal);
});
  manageButton?.addEventListener("click", () => {
    openModal(manageModal);
  });

  addAppButton?.addEventListener("click", () => {
    openModal(manageModal);
    
  });
editFunctionsButton?.addEventListener("click", () => {
  isFunctionEditMode = true;
  document.body.classList.add("function-edit-mode");
  closeModals();
});
  modalBackdrop?.addEventListener("click", closeModals);

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModals);
  });

  /* =========================
     테마 변경
  ========================= */

  const savedTheme = localStorage.getItem("joonTheme");

  if (savedTheme) {
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    body.classList.remove(
      "theme-navy",
      "theme-gray",
      "theme-ivory"
    );

    if (theme === "navy") {
      body.classList.add("theme-navy");
    }

    if (theme === "gray") {
      body.classList.add("theme-gray");
    }

    if (theme === "ivory") {
      body.classList.add("theme-ivory");
    }

    localStorage.setItem("joonTheme", theme);
  }

  themePreviews.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme;

      if (!theme) return;

      applyTheme(theme);

      setTimeout(() => {
        closeModals();
      }, 120);
    });
  });
  /* =========================
     사진 배경
  ========================= */

  const savedPhoto = localStorage.getItem("joonBackgroundPhoto");

  if (savedPhoto) {
    applyPhotoBackground(savedPhoto);
  }

  function applyPhotoBackground(imageData) {
    body.classList.add("photo-background");
    body.style.backgroundImage = `url("${imageData}")`;
  }

  function removePhotoBackground() {
    body.classList.remove("photo-background");
    body.style.backgroundImage = "";
    localStorage.removeItem("joonBackgroundPhoto");
  }

  chooseBackgroundPhoto?.addEventListener("click", () => {
    backgroundPhotoInput?.click();
  });

  backgroundPhotoInput?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      if (typeof imageData !== "string") return;

      localStorage.setItem("joonBackgroundPhoto", imageData);
      applyPhotoBackground(imageData);
      closeModals();
    };

    reader.readAsDataURL(file);
  });

  removeBackgroundPhoto?.addEventListener("click", () => {
    removePhotoBackground();
    closeModals();
  });
  /* =========================
     페이지 점
  ========================= */

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const pageNumber = dot.dataset.page;

      pages.forEach((page) => {
        page.classList.toggle(
          "active",
          page.dataset.page === pageNumber
        );
      });

      dots.forEach((item) => {
        item.classList.toggle(
          "active",
          item.dataset.page === pageNumber
        );
      });
    });
  });

  /* =========================
     기능 카드
  ========================= */
let isFunctionEditMode = false;
  const appCards = document.querySelectorAll(".app-card");
appCards.forEach((card) => {
  const favoriteToggle = document.createElement("span");
favoriteToggle.className = "favorite-toggle";
favoriteToggle.textContent = "+";
card.appendChild(favoriteToggle);
  favoriteToggle.addEventListener("touchstart", (event) => {
  event.preventDefault();
  event.stopPropagation();

  const isFavorite = card.dataset.favorite === "true";

  card.dataset.favorite = isFavorite ? "false" : "true";
  favoriteToggle.textContent = isFavorite ? "+" : "−";
    saveFavorites();
});
  favoriteToggle.addEventListener("click", (event) => {
  event.stopPropagation();

  const isFavorite = card.dataset.favorite === "true";

  card.dataset.favorite = isFavorite ? "false" : "true";
  favoriteToggle.textContent = isFavorite ? "+" : "−";
    saveFavorites();
});
    card.addEventListener("click", () => {
      if (card.dataset.id === "digital-card") {
  digitalCardModal?.classList.remove("hidden");
modalBackdrop?.classList.remove("hidden");
  return;
}
      const url = card.dataset.url;

      if (url && url !== "#") {
        window.location.href = url;
      }
    });
  });
  openDigitalCardButton?.addEventListener("click", () => {
  window.location.href = "https://samuraiscene-alt.github.io/SHINeJOON-Digital-Card/";
});
showDigitalCardQrButton?.addEventListener("click", () => {
  const cardUrl = "https://samuraiscene-alt.github.io/SHINeJOON-Digital-Card/";

  if (!digitalCardQrArea || !digitalCardQrCode) return;

  if (!digitalCardQrArea.hidden) {
    digitalCardQrArea.hidden = true;
    return;
  }

  digitalCardQrCode.innerHTML = "";

  const qrImage = document.createElement("img");
  qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
    encodeURIComponent(cardUrl);

  qrImage.alt = "신이준 디지털 명함 QR 코드";

  digitalCardQrCode.appendChild(qrImage);
  digitalCardQrArea.hidden = false;
});
  const showContactQrButton = document.getElementById("showContactQrButton");
const contactQrArea = document.getElementById("contactQrArea");
const contactQrCode = document.getElementById("contactQrCode");

showContactQrButton?.addEventListener("click", () => {
  if (!contactQrArea || !contactQrCode) return;

  if (!contactQrArea.hidden) {
    contactQrArea.hidden = true;
    showContactQrButton.textContent = "연락처 QR";
    return;
  }

  const contactVcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:신;이준;;;",
    "FN:신이준",
    "TEL;TYPE=CELL:010-5222-7428",
    "EMAIL;TYPE=INTERNET:samuraiscene@gmail.com",
    "URL:https://samuraiscene-alt.github.io/SHINeJOON-Digital-Card/",
    "END:VCARD"
  ].join("\r\n");

  contactQrCode.innerHTML = "";

  const qrImage = document.createElement("img");
  qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
    encodeURIComponent(contactVcard);

  qrImage.alt = "신이준 연락처 QR 코드";

  contactQrCode.appendChild(qrImage);
  contactQrArea.hidden = false;
  showContactQrButton.textContent = "연락처 QR 닫기";
});
shareDigitalCardButton?.addEventListener("click", async () => {
  const cardUrl = "https://samuraiscene-alt.github.io/SHINeJOON-Digital-Card/";

  if (navigator.share) {
    try {
      await navigator.share({
        title: "신이준 디지털 명함",
        text: "신이준의 디지털 명함입니다.",
        url: cardUrl
      });
    } catch (error) {
      console.log("공유 취소:", error);
    }
  } else {
    await navigator.clipboard.writeText(cardUrl);
    alert("디지털 명함 링크가 복사되었습니다.");
  }
});
copyDigitalCardLinkButton?.addEventListener("click", async () => {
  const cardUrl = "https://samuraiscene-alt.github.io/SHINeJOON-Digital-Card/";

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(cardUrl);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = cardUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    alert("디지털 명함 링크가 복사되었습니다.");
  } catch (error) {
    alert("링크 복사에 실패했습니다.");
  }
});
shareVcardButton?.addEventListener("click", async () => {
  try {
    const response = await fetch("./shinjoon.vcf");
    const blob = await response.blob();

    const file = new File([blob], "신이준.vcf", {
      type: "text/vcard"
    });

    await navigator.share({
      files: [file]
    });

  } catch (error) {
    console.log("연락처 공유 취소:", error);
  }
});
});
