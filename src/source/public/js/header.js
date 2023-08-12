const searchInput = document.querySelector(".header .search-input");
const btnLogin = document.querySelector(".header .btn-log-in");
const btnSignup = document.querySelector(".header .btn-sign-up");
const announceBtn = document.querySelector(".header .announce-icon");
const announceList = document.querySelector(".header .announce-list");
let annouceItems;

searchInput.addEventListener("focus", function () {
  searchInput.placeholder = "";
});

searchInput.addEventListener("blur", function () {
  searchInput.placeholder = "Search...";
});

convertDate = (str) => {
  dateField = new Date(str);
  // Lấy ngày tháng năm từ đối tượng Date
  const originalDate = dateField;
  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1; // Tháng bắt đầu từ 0 nên cộng thêm 1
  const year = originalDate.getFullYear();
  const hours = originalDate.getHours();
  const minutes = originalDate.getMinutes();
  return `${hours}:${
    minutes == 0 ? "0" + String(minutes) : minutes
  } ${day}/${month}/${year}`;
};

// API
async function checkHasAnnounce() {
  console.log("check has");
  const res = await fetch("/announcement/list", {
    method: "GET",
  });
  let { announcements, readArr } = await res.json();
  if (readArr.reduce((partialSum, a) => partialSum + a, 0) > 0) {
    // User has some new notifications
    announceBtn.classList.add("has-noti");
  }
}

async function getListAnnouncement() {
  if (!announceBtn.classList.contains("noti-open")) {
    const res = await fetch("/announcement/list", {
      method: "GET",
    });
    let { announcements, readArr } = await res.json();
    console.log(announcements, readArr);
    const announceList = document.querySelector(".announce-list");
    if (announceList.hasChildNodes()) announceList.innerHTML = "";
    announcements.forEach((annouce, idx) => {
      announceList.insertAdjacentHTML(
        "beforeend",
        `
      <li class="announce-item">
        <a href="#" class="announce-link ${
          readArr[idx] ? "unread" : ""
        }" onclick="updateListAnnouncement(event, ${idx})">
          <p class="announce-title text-capitalize">${annouce.title}</p>
          <p class="announce-description">${annouce.content}</p>
          <p class="announce-date">${convertDate(annouce.time)}</p>
        </a>
      </li>
      `
      );
    });
    announceBtn.classList.add("noti-open");
  } else {
    announceBtn.classList.remove("noti-open");
  }
}

async function updateListAnnouncement(event, idx) {
  event.preventDefault();
  const res = await fetch(`/announcement/list/${idx}`, {
    method: "POST",
  });
  annouceItems = document.querySelectorAll(".announce-link");
  annouceItems[idx].classList.remove("unread");
  const readArr = await res.json();
  if (readArr.reduce((partialSum, a) => partialSum + a, 0) > 0) {
    // User has some new notifications
    announceBtn.classList.add("has-noti");
  } else {
    announceBtn.classList.remove("has-noti");
  }
}

// Check coi admin có đăng thông báo mới không
window.load = checkHasAnnounce();
