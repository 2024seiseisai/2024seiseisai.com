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
});
function PushLeftArrow() {}
function PushRightArrow() {
    document.querySelector("#main_container").style.transform = "translateX(-50%)";
}
function PushReturnButton() {
    document.querySelector("#main_container").style.transform = "translateX(0%)";
}
