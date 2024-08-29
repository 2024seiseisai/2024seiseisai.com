function GetLocationInfo(arr, day) {
    if (arr.length == 0) return "";
    let res = `<div class="location"><img src="/2024/event/img/map_pin.svg"><p>【${day}日目】</p>`;
    arr.forEach((val) => {
        res += `<p>　${val.location}　${val.start_h}:${("00" + val.start_m).slice(-2)}-${val.end_h}:${("00" + val.end_m).slice(-2)}　${val.summary === undefined ? "" : val.summary}</p>`;
    });
    res += "</div>";
    return res;
}
document.addEventListener("DOMContentLoaded", async () => {
    let json = await fetch("./info/events.json");
    events = JSON.parse(await json.text());

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
        <p class="acc_title">${event.name}</p>
        <div class="ticket_space">
            <div class="ticket_box">
                ${event.ticket === true ? '<img src="/2024/event/img/ticket_box.svg"><p>要整理券</p>' : ""}
            </div>
        </div>
    </div>
    <div class="acc_box">
        <div class="box_space"></div>
        ${GetLocationInfo(event.day1, 1)}
        ${GetLocationInfo(event.day2, 2)}
        <p class="event_summary">${event.summary}</p>
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
            const offset = target.getBoundingClientRect().top + window.scrollY - Math.max(0, (window.innerHeight - headerheight - accbox.scrollHeight) / 2);
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
