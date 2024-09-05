document.addEventListener("DOMContentLoaded", async () => {
    let json = await fetch("./info/events.json");
    events = JSON.parse(await json.text());
    const width_query = window.matchMedia("(min-width: 1024px)");

    /*
    let isMobile = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches;
    
    // メディアクエリの変更を監視するリスナーを設定
    const mediaQueryList = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
    
    mediaQueryList.addEventListener('change', (event) => {
        // スマホ版とPC版の切り替えを検出
        if (isMobile !== event.matches) {
            isMobile = event.matches;
            location.reload(); // 切り替えを検出した場合にリロード
        }
    });
    */

    const current_type = width_query.matches;
    width_query.addEventListener("change", () => {
        if (width_query.matches !== current_type) {
            window.location.href = "./event.html";
        }
    });

    {
        let elements = [document.getElementById(width_query.matches ? "day1_button_pc" : "day1_button"), document.getElementById(width_query.matches ? "day2_button_pc" : "day2_button")];
        elements.forEach((element, index) => {
            element.addEventListener("click", () => {
                if (element.classList.contains("day_selected")) return;
                element.firstElementChild.style.opacity = "100%";
                elements[1 - index].firstElementChild.style.opacity = "0%";
                element.classList.toggle("day_selected");
                elements[1 - index].classList.toggle("day_selected");
                document.querySelectorAll(index == 0 ? ".day1" : ".day2").forEach((content) => (content.style.opacity = 1));
                document.querySelectorAll(index == 0 ? ".day2" : ".day1").forEach((content) => (content.style.opacity = 0));
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
                val.event_name = event.name;
                val.ticket = event.ticket === true;
                const ticketHtml = false ? '<img class = "event-ticket-back" src="/2024/event/img/ticket_box.svg"><p class = "event-ticket">要整理券</p>' : "";
                ev_lists[val.location].day1.push({ ...val, ticketHtml });
            });
            event.day2.forEach((val) => {
                if (!(val.location in ev_lists)) return;
                val.event_name = event.name;
                val.ticket = event.ticket === true;
                const ticketHtml = false ? '<img class = "event-ticket-back" src="/2024/event/img/ticket_box.svg"><p class = "event-ticket>要整理券</p>' : "";
                ev_lists[val.location].day2.push({ ...val, ticketHtml });
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
        const pad = width_query.matches ? "0.34vw" : "2px";
        let res = "";
        events.locations.forEach((val, idx) => {
            document.querySelector("#time_table_title .splide__list").insertAdjacentHTML(
                "beforeend",
                `
<li class="splide__slide">
    <div class="slide_title_ph">
        <p class="slide_title_ph_txt">${val.name.replace("[晴天時]", '</p><p class="slide_title_ph_wth">晴天時').replace("[雨天時]", '</p><p class="slide_title_ph_wth">雨天時')}</p>
    </div>
</li>
`
            );
            res += `
${!width_query.matches || idx % 2 == 0 ? `<li class="splide__slide slide_element">` : ""}
${
    !width_query.matches
        ? ""
        : `
<div class="slide_title_pc ${idx % 2 == 1 ? "table_element_right" : "table_element_left"}">
    <p class="slide_title_pc_txt">${val.name.replace("[晴天時]", '</p><p class="slide_title_pc_wth">晴天時').replace("[雨天時]", '</p><p class="slide_title_pc_wth">雨天時')}</p>
</div>
`
}
${width_query.matches && idx % 2 == 1 ? "" : [...Array(9)].map((_, i) => `<p class="table_scale" style="--time_index: ${i};">${9 + i}:00</p>`).reduce((sum, el) => sum + el, "")}
${width_query.matches && idx % 2 == 1 ? "" : [...Array(17)].map((_, i) => `<div class="table_border" style="--border_index: ${i};"></div>`).reduce((sum, el) => sum + el, "")}
${ev_lists[val.name].day1
    .map(
        (ev) => `
<div class="table_element day1 ${idx % 2 == 1 ? "table_element_right" : "table_element_left"}" style="--start_h: ${ev.start_h}; --start_m: ${ev.start_m}; --end_h: ${ev.end_h}; --end_m: ${ev.end_m}; --color: ${ev_lists[val.name].color}">
    <div class="table_element_content">
        <div class="table_element_content_box">
            <p>${width_query.matches ? ev.name.replace("<br>", "") : ev.name}</p>
            ${
                !ev.ticket
                    ? ""
                    : `
<div class="table_ticket_box">
    <p>要整理券</p>
    <img src="/2024/event/img/ticket_box.svg">
</div>`
            }
        </div>
        <img src="/2024/event/img/arrow_circle.svg" class="${ev.event_name}">
    </div>
    ${ev.ticketHtml}
    <div class="table_element_bar"></div>
    <div class="table_element_back" style="--padding_top: ${ev_lists[val.name].day1_bound2.includes(ev.start_h * 60 + ev.start_m) ? pad : "0"}; --padding_bottom: ${ev_lists[val.name].day1_bound2.includes(ev.end_h * 60 + ev.end_m) ? pad : "0"}"></div>
</div>`
    )
    .reduce((sum, el) => sum + el, "")}
${ev_lists[val.name].day2
    .map(
        (ev) => `
<div class="table_element day2 ${idx % 2 == 1 ? "table_element_right" : "table_element_left"}" style="--start_h: ${ev.start_h}; --start_m: ${ev.start_m}; --end_h: ${ev.end_h}; --end_m: ${ev.end_m}; --color: ${ev_lists[val.name].color}">
    <div class="table_element_content">
        <div class="table_element_content_box">
            <p>${width_query.matches ? ev.name.replace("<br>", "") : ev.name}</p>
            ${
                !ev.ticket
                    ? ""
                    : `
<div class="table_ticket_box">
    <p>要整理券</p>
    <img src="/2024/event/img/ticket_box.svg">
</div>`
            }
        </div>
        <img src="/2024/event/img/arrow_circle.svg" class="${ev.event_name}">
        ${ev.ticketHtml}
    </div>
    <div class="table_element_bar"></div>
    <div class="table_element_back" style="--padding_top: ${ev_lists[val.name].day2_bound2.includes(ev.start_h * 60 + ev.start_m) ? pad : "0"}; --padding_bottom: ${ev_lists[val.name].day2_bound2.includes(ev.end_h * 60 + ev.end_m) ? pad : "0"}"></div>
</div>`
    )
    .reduce((sum, el) => sum + el, "")}
${ev_lists[val.name].day1_bound1.map((time) => `<p class="table_scale2 day1 ${idx % 2 == 1 ? "table_element_right" : "table_element_left"}" style="--offset_val: ${time}">${Math.floor(time / 60)}:${("00" + (time % 60)).slice(-2)}</p>`).reduce((sum, el) => sum + el, "")}
${ev_lists[val.name].day2_bound1.map((time) => `<p class="table_scale2 day2 ${idx % 2 == 1 ? "table_element_right" : "table_element_left"}" style="--offset_val: ${time}">${Math.floor(time / 60)}:${("00" + (time % 60)).slice(-2)}</p>`).reduce((sum, el) => sum + el, "")}    
${!width_query.matches || idx % 2 == 1 ? "</li>" : ""}
`;
        });
        document.querySelector("#time_table .splide__list").insertAdjacentHTML("beforeend", res);
    }

    {
        // 画面サイズに応じて条件分岐
        if (!width_query.matches) {
            // スマートフォンやタブレットなどの小さな画面向け
            document.querySelectorAll(".table_element_content").forEach((el) => {
                el.addEventListener("click", () => {
                    if (!document.getElementById(el.parentElement.classList.contains("day1") ? "day1_button" : "day2_button").classList.contains("day_selected")) return;
                    window.location.href = "./event-list.html#" + el.lastElementChild.classList[0];
                });
                el.addEventListener("mouseover", () => {
                    if (!document.getElementById(el.parentElement.classList.contains("day1") ? "day1_button" : "day2_button").classList.contains("day_selected")) return;
                    el.classList.add("mouse_over");
                });
                el.addEventListener("mouseout", () => {
                    el.classList.remove("mouse_over");
                });
            });
        } else {
            // PC向け
            document.querySelectorAll(".table_element_content").forEach((el) => {
                el.addEventListener("click", () => {
                    if (!document.getElementById(el.parentElement.classList.contains("day1") ? "day1_button_pc" : "day2_button_pc").classList.contains("day_selected")) return;
                    window.location.href = "./event-list.html#" + el.lastElementChild.classList[0];
                });
                el.addEventListener("mouseover", () => {
                    if (!document.getElementById(el.parentElement.classList.contains("day1") ? "day1_button_pc" : "day2_button_pc").classList.contains("day_selected")) return;
                    el.classList.add("mouse_over");
                    el.nextElementSibling.nextElementSibling.style.opacity = 0.4;
                });
                el.addEventListener("mouseout", () => {
                    el.classList.remove("mouse_over");
                    el.nextElementSibling.nextElementSibling.style.opacity = 0.25;
                });
            });
        }
    }

    {
        let slide = new Splide("#main_slide", {
            type: "loop",
            speed: 0,
            arrows: false,
            gap: "128px",
            pagination: false,
            mediaQuery: "min",
            perPage: 1,
            easing: "ease-in-out",
            noDrag: "",
            dragMinThreshold: 20,
        });
        if (!width_query.matches) {
            var slide_title = new Splide("#sub_slide", {
                type: "loop",
                speed: 0,
                arrows: false,
                pagination: false,
                easing: "ease-in-out",
                perPage: 1,
                drag: false,
            });
            slide.sync(slide_title);
            slide_title.mount();
        }
        slide.mount();
        document.getElementById("left_arrow").addEventListener("click", () => {
            slide.go("<");
        });
        document.getElementById("right_arrow").addEventListener("click", () => {
            slide.go(">");
        });
        if (window.location.hash == "#rain") {
            slide.go(width_query.matches ? 1 : 2);
        } else {
            let init_page = sessionStorage.getItem("slide_page");
            if (init_page !== null) slide.go(Math.floor(Number(init_page) / (width_query.matches ? 2 : 1)));
        }
        slide.options = {
            speed: 400,
        };
        if (!width_query.matches) {
            slide_title.options = {
                speed: 400,
            };
        }
        setInterval(() => {
            sessionStorage.setItem("slide_page", slide.index * (width_query.matches ? 2 : 1));
        }, 500);

        if (width_query.matches) {
            let pressflag = false;
            window.addEventListener("keydown", (keyevent) => {
                if (pressflag) return;
                if (keyevent.key === "ArrowLeft") {
                    slide.go("<");
                    pressflag = true;
                }
                if (keyevent.key === "ArrowRight") {
                    slide.go(">");
                    pressflag = true;
                }
            });
            window.addEventListener("keyup", (keyevent) => {
                if (keyevent.key === "ArrowLeft" || keyevent.key === "ArrowRight") {
                    pressflag = false;
                }
            });
        }
    }
});
