$(document).ready(async () => {
    let json = await fetch("./info/events.json")
    events = JSON.parse(await json.text());
    let events_list = document.getElementById("events_list");
    events.events.forEach((event) => {
        events_list.insertAdjacentHTML("beforeend", `<p>${event.name}</p>`);
    });
});
function PushLeftArrow() {
}
function PushRightArrow() {
    document.querySelector('#main_container').style.transform = 'translateX(-50%)';
}
function PushReturnButton() {
    document.querySelector('#main_container').style.transform = 'translateX(0%)';
}