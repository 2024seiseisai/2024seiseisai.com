function GetLocationInfo(arr, day) {
    if (arr.length == 0) return "";
    let res = `<div class="location"><img src="/2024/event/img/map_pin.svg"><p>【${day}日目】</p>`;
    arr.forEach((val) => {
        res += `<p>　${val.location}　${val.start_h}:${("00" + val.start_m).slice(-2)}-${val.end_h}:${("00" + val.end_m).slice(-2)}　${val.summary === undefined ? "" : val.summary}</p>`;
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
                if (index == 0) {
                    document.querySelectorAll(".day1").forEach((content) => (content.style.opacity = 1));
                    document.querySelectorAll(".day2").forEach((content) => (content.style.opacity = 0));
                } else {
                    document.querySelectorAll(".day1").forEach((content) => (content.style.opacity = 0));
                    document.querySelectorAll(".day2").forEach((content) => (content.style.opacity = 1));
                }
            });
        });
    }

    {
        let ev_lists = {};
        events.locations.forEach((loc) => {
            ev_lists[loc.name] = { color: loc.color, day1: [], day2: [], day1_bound1: [], day1_bound2: [], day2_bound1: [], day2_bound2: [] };
        });
        events.events.forEach((event) => {
            event.day1.forEach((val) => {
                if (!(val.location in ev_lists)) return;
                ev_lists[val.location].day1.push(val);
            });
            event.day2.forEach((val) => {
                if (!(val.location in ev_lists)) return;
                ev_lists[val.location].day2.push(val);
            });
        });
        for (let val of Object.values(ev_lists)) {
            val.day1.forEach((ev) => {
                val.day1_bound1.push(ev.start_h * 60 + ev.start_m);
                val.day1_bound1.push(ev.end_h * 60 + ev.end_m);
            });
            val.day1_bound2 = val.day1_bound1.filter((x, i, self) => {
                return self.indexOf(x) === i && i !== self.lastIndexOf(x);
            });
            val.day1_bound1 = Array.from(new Set(val.day1_bound1));

            val.day2.forEach((ev) => {
                val.day2_bound1.push(ev.start_h * 60 + ev.start_m);
                val.day2_bound1.push(ev.end_h * 60 + ev.end_m);
            });
            val.day2_bound2 = val.day2_bound1.filter((x, i, self) => {
                return self.indexOf(x) === i && i !== self.lastIndexOf(x);
            });
            val.day2_bound1 = Array.from(new Set(val.day2_bound1));
        }
        events.locations.forEach((val) => {
            document.querySelector("#time_table_title .splide__list").insertAdjacentHTML("beforeend", `<li class="splide__slide slide_title">${val.name}</li>`);
            document.querySelector("#time_table .splide__list").insertAdjacentHTML(
                "beforeend",
                `
<li class="splide__slide slide_element">
${ev_lists[val.name].day1_bound1.map((time) => `<p class="table_scale2 day1" style="--offset_val: ${time}">${Math.floor(time / 60)}:${("00" + (time % 60)).slice(-2)}</p>`).reduce((sum, el) => sum + el, "")}
${ev_lists[val.name].day2_bound1.map((time) => `<p class="table_scale2 day2" style="--offset_val: ${time}">${Math.floor(time / 60)}:${("00" + (time % 60)).slice(-2)}</p>`).reduce((sum, el) => sum + el, "")}
${[...Array(9)].map((_, i) => `<p class="table_scale" style="--time_index: ${i};">${9 + i}:00</p>`).reduce((sum, el) => sum + el, "")}
${[...Array(17)].map((_, i) => `<div class="table_border" style="--border_index: ${i};"></div>`).reduce((sum, el) => sum + el, "")}
${ev_lists[val.name].day1
    .map(
        (ev) => `
<div class="table_element day1" style="--start_h: ${ev.start_h}; --start_m: ${ev.start_m}; --end_h: ${ev.end_h}; --end_m: ${ev.end_m}; --color: ${ev_lists[val.name].color}">
    <div class="table_element_content">
        <p>${ev.name}</p>
        <img src="/2024/event/img/arrow_circle.svg">
    </div>
    <div class="table_element_bar"></div>
    <div class="table_element_back" style="--padding_top: ${ev_lists[val.name].day1_bound2.includes(ev.start_h * 60 + ev.start_m) ? "2px" : "0"}; --padding_bottom: ${ev_lists[val.name].day1_bound2.includes(ev.end_h * 60 + ev.end_m) ? "2px" : "0"}"></div>
</div>`
    )
    .reduce((sum, el) => sum + el, "")}
${ev_lists[val.name].day2
    .map(
        (ev) => `
<div class="table_element day2" style="--start_h: ${ev.start_h}; --start_m: ${ev.start_m}; --end_h: ${ev.end_h}; --end_m: ${ev.end_m}; --color: ${ev_lists[val.name].color}">
    <div class="table_element_content">
        <p>${ev.name}</p>
        <img src="/2024/event/img/arrow_circle.svg">
    </div>
    <div class="table_element_bar"></div>
    <div class="table_element_back" style="--padding_top: ${ev_lists[val.name].day2_bound2.includes(ev.start_h * 60 + ev.start_m) ? "2px" : "0"}; --padding_bottom: ${ev_lists[val.name].day2_bound2.includes(ev.end_h * 60 + ev.end_m) ? "2px" : "0"}"></div>
</div>`
    )
    .reduce((sum, el) => sum + el, "")}
</li>
`
            );
        });
    }

    {
        document.querySelectorAll(".table_element_content img").forEach((el) =>
            el.addEventListener("click", () => {
                if (!document.getElementById(el.parentElement.parentElement.classList.contains("day1") ? "day1_button" : "day2_button").classList.contains("day_selected")) return;
                document.querySelector("#main_container").style.transform = "translateX(-50%)";
            })
        );
    }

    {
        let slide = new Splide("#main_slide", {
            type: "loop",
            speed: 400,
            arrows: false,
            gap: "128px",
            pagination: false,
            easing: "ease-in-out",
            noDrag: "",
            dragMinThreshold: 20,
            keyboard: true,
        });
        let slide_title = new Splide("#sub_slide", {
            speed: 400,
            arrows: false,
            pagination: false,
            easing: "ease-in-out",
            drag: false,
        });
        slide.sync(slide_title);
        slide.mount();
        slide_title.mount();
        document.getElementById("left_arrow").addEventListener("click", () => {
            slide.go("<");
        });
        document.getElementById("right_arrow").addEventListener("click", () => {
            slide.go(">");
        });
    }
});
function PushReturnButton() {
    document.querySelector("#main_container").style.transform = "translateX(0%)";
}
