$(document).ready(async () => {
    let json = await fetch("./info/events.json");
    events = JSON.parse(await json.text());
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
    <p style="margin: 0">あああああ<br>いいいいい<br>ううううう<br>えええええ</p>
    </div>
</div>
`
        );
    });
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
});
function PushLeftArrow() {}
function PushRightArrow() {
    document.querySelector("#main_container").style.transform = "translateX(-50%)";
}
function PushReturnButton() {
    document.querySelector("#main_container").style.transform = "translateX(0%)";
}
