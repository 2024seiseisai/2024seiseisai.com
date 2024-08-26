//import Splide from "@splidejs/splide";

function GetLocationInfo(arr, day) {
    if (arr.length == 0) return "";
    let res = `<div class="location"><img src="/2024/event/img/map_pin.svg"><p>【${day}日目】</p>`;
    arr.forEach((val) => {
        res += `<p>　${val.location}　${("00" + val.start_h).slice(-2)}:${("00" + val.start_m).slice(-2)}-${("00" + val.end_h).slice(-2)}:${("00" + val.end_m).slice(-2)}　${val.summary === undefined ? "" : val.summary}</p>`;
    });
    res += "</div>";
    return res;
}
$(document).ready(async () => {
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
    <p id="announce2">雨天スケジュールに変更されたため、このページに記載の時間は正しくないことがあります。詳しくは雨天スケジュールをご確認ください。</p>
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
<div class="events_acc">
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
        let elements = [document.getElementById("day1_button"), document.getElementById("day2_button")];
        elements.forEach((element, index) => {
            element.addEventListener("click", () => {
                if (element.classList.contains("day_selected")) return;
                element.firstElementChild.style.opacity = "100%";
                elements[1 - index].firstElementChild.style.opacity = "0%";
                element.classList.toggle("day_selected");
                elements[1 - index].classList.toggle("day_selected");
            });
        });
    }

    let splide = new Splide(".splide", {
        type: "loop",
        speed: 400,
        arrows: false,
        fixedHeight: "1047px",
        gap: "16px",
        pagination: false,
        easing: "ease-in-out",
        noDrag: "",
        dragMinThreshold: 20,
        keyboard: true,
    }).mount();
    document.getElementById("left_arrow").addEventListener("click", () => {
        splide.go("-1");
    });
    document.getElementById("right_arrow").addEventListener("click", () => {
        splide.go("+1");
    });
});
function PushReturnButton() {
    document.querySelector("#main_container").style.transform = "translateX(0%)";
    //document.querySelector("#main_container").style.transform = "translateX(-50%)";
}
