function GetLocationInfo(arr, day) {
    if (arr.length == 0) return "";
    let res = `<div class="location location_${day == 1 ? "day1" : "day2"}"><img src="/2024/event/img/map_pin.svg"><p>【${day}日目】`;
    let tmp = arr.map((val) => {
        return `<br> ${val.location.replace("[晴天時]", "").replace("[雨天時]", "(雨天)")}　${val.start_h}:${("00" + val.start_m).slice(-2)}-${val.end_h}:${("00" + val.end_m).slice(-2)}　${val.summary === undefined ? "" : val.summary}`;
    });
    tmp.filter((val) => {
        if (!val.includes("(雨天)")) return true;
        else return !tmp.includes(val.replace("(雨天)", ""));
    }).forEach((val) => (res += val));
    res += "</p></div>";
    return res;
}
document.addEventListener("DOMContentLoaded", async () => {
    let json = await fetch("./info/events.json");
    events = JSON.parse(await json.text());
    const width_query = window.matchMedia("(min-width: 1024px)");
    const mobileBreakpoint = 1023; // 例: 768px以下をスマホとする

    let isMobile = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches;
    
    // メディアクエリの変更を監視するリスナーを設定
    const mediaQueryList = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
    
    mediaQueryList.addEventListener('change', (event) => {
        // スマホ版とPC版の切り替えを検出
        if (isMobile !== event.matches) {
            isMobile = event.matches;
            window.location.href = "./event-list.html";// 切り替えを検出した場合にリロード
        }
    });

    if (events.is_rainy.day1 != "none" || events.is_rainy.day2 != "none") {
        let events_list = document.getElementById("events_list");
        events_list.insertAdjacentHTML(
            "beforebegin",
            `
<div id="announce_rain">
    <p id="announce1">
        ${events.is_rainy.day1 == "all" && events.is_rainy.day2 == "none" ? "1日目(9/7)はすべて雨天スケジュールでの開催となりました。" : ""}
        ${events.is_rainy.day1 == "partial" && events.is_rainy.day2 == "none" ? "1日目(9/7)は一部雨天スケジュールでの開催となりました。" : ""}
        ${events.is_rainy.day1 == "none" && events.is_rainy.day2 == "all" ? "2日目(9/8)はすべて雨天スケジュールでの開催となりました。" : ""}
        ${events.is_rainy.day1 == "none" && events.is_rainy.day2 == "partial" ? "2日目(9/8)は一部雨天スケジュールでの開催となりました。" : ""}
        ${events.is_rainy.day1 == "all" && events.is_rainy.day2 == "all" ? "今年は両日ともにすべて雨天スケジュールでの開催となりました。" : ""}
        ${events.is_rainy.day1 == "all" && events.is_rainy.day2 == "partial" ? "今年は一部雨天スケジュールでの開催となりました。" : ""}
        ${events.is_rainy.day1 == "partial" && events.is_rainy.day2 == "all" ? "今年は一部雨天スケジュールでの開催となりました。" : ""}
        ${events.is_rainy.day1 == "partial" && events.is_rainy.day2 == "partical" ? "今年は両日ともに一部雨天スケジュールでの開催となりました。" : ""}</p>
    <p id="announce2">雨天スケジュールに変更されたため、このページに記載の時間は正しくないことがあります。詳しくは<a href="./event.html#rain">雨天スケジュール</a>をご確認ください。</p>
</div>
`
        );
    }

    {
        let events_list = document.getElementById("events_list");
        let cnt = 0;
        events.events.forEach((event) => {
            cnt += 1;
            events_list.insertAdjacentHTML(
                "beforeend",
                `
<div class="events_acc" id="${event.name}">
    <div class="acc_button">
        <img src="/2024/event/img/acc_play.svg" class="acc_button_img">
        <img src="/2024/event/img/acc_play_pc.svg" class="acc_button_img_pc">
        <p class="acc_title">${width_query.matches ? event.name.replace("<br>", "") : event.name}</p>
        <div class="ticket_space">
            <div class="ticket_box">
                ${event.ticket === true ? '<img src="/2024/event/img/ticket_box.svg"><p>要整理券</p>' : ""}
            </div>
        </div>
    </div>
    <div class="acc_box">
        <div class="box_space"></div>
        <div class="locations">
            ${GetLocationInfo(event.day1, 1)}
            ${GetLocationInfo(event.day2, 2)}
        </div>
        ${event.summary != "" ? `<p class="event_summary">${event.summary}</p>` : ""}
    </div>
</div>
`
            );
        });
    }

    {
        let acc = document.querySelectorAll(".acc_button");
        acc.forEach((element) => {
            element.addEventListener("click", () => {
                acc.forEach((element2) => {
                    if (element === element2) return;
                    let accbox = element2.nextElementSibling;
                    if (element2.classList.contains("acc_open")) {
                        accbox.style.height = "0";
                        element2.classList.remove("acc_open");
                    }
                });
                let accbox = element.nextElementSibling;
                if (element.classList.contains("acc_open")) {
                    accbox.style.height = "0";
                } else {
                    accbox.style.height = accbox.scrollHeight + "px";
                }
                element.classList.toggle("acc_open");
            });
        });
    }

    {
        document.getElementById("return_button").addEventListener("click", () => {
            window.location.href = "./event.html";
        });
    }

    {
        let hash = window.location.hash;
        if (hash.includes("#")) {
            let headerheight = document.querySelector("header").offsetHeight;
            let target = document.getElementById(decodeURIComponent(hash).replace("#", ""));
            let element = target.firstElementChild;
            let accbox = element.nextElementSibling;
            const offset = target.getBoundingClientRect().top + window.scrollY - Math.max(0, (window.innerHeight - headerheight - accbox.scrollHeight) / 2) - 30;
            window.scrollTo({
                top: offset,
                behavior: "smooth",
            });
            const interval = setInterval(() => {
                if (Math.min(offset, document.documentElement.scrollHeight - window.innerHeight) - 150 < window.scrollY) {
                    accbox.style.height = accbox.scrollHeight + "px";
                    element.classList.toggle("acc_open");
                    clearInterval(interval);
                }
            }, 10);
        }
    }
});
