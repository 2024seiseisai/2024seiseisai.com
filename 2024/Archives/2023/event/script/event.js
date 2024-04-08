// XMLHttpRequestを使ってjsonデータを読み込む
let requestURL = './script/events.json';//jsonへのパス
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

var displayedDate = 1;


const seiseisaiStartTime = dateFns.parse('2000-01-01T09:00', 'yyyy-MM-ddTHH:mm', new Date())
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;


const firstDay = dateFns.parse(`2023-09-09T09:00`, 'yyyy-MM-ddTH:mm', new Date()); //2023年9月9日
const secondDay = dateFns.parse(`2023-09-10T09:00`, 'yyyy-MM-ddTH:mm', new Date()); //2023年9月9日

//現在時刻を取得
var currentDate = new Date();
var differenceByStart;
var nowDay = 0;
if( dateFns.isSameDay(currentDate, firstDay) ){
    //1日目
    nowDay = 1;
}else if( dateFns.isSameDay(currentDate, secondDay) ){
    //2日目
    nowDay = 2;
}

function currentTimeHandPersent(){

    if(nowDay == 1){
        //1日目
        differenceByStart = dateFns.differenceInMinutes(currentDate, firstDay);

    }else if( nowDay == 2){
        //2日目
        differenceByStart = dateFns.differenceInMinutes(currentDate, secondDay);
    }

    var currentTimeHandPersent = 100 / (8 * 60) * differenceByStart;

    if(nowDay == 1 || nowDay == 2){
        if(currentTimeHandPersent >= 0 && currentTimeHandPersent <= 100){
            return currentTimeHandPersent;
        }else {
            return -1;
        }
    }else{
        return -1;
    }
}

 
// JSONデータをJavaScriptオブジェクトに変換
request.onload = function () {
    let eventsData = request.response;
    eventsData = JSON.parse(JSON.stringify(eventsData));

    Object.keys( eventsData ).forEach(key => {
        PlaceDataToHtml( eventsData[key], displayedDate)
        ButtonInit( eventsData[key] )
    });
    
    setInterval(timeHandRefresh, 60 * 1000);

    const moveButtonLeft = $("#move-button-left")
    const moveButtonRight = $("#move-button-right")
    const scrollBlock = $(".time-table__block")
    var scrollSize = $('.time-table__wrapper:first').width();
    var startPosition;
    var isAnimating = false; // Flag to track animation status

    if(!isTouchDevice){
        moveButtonLeft.addClass("time-table__move-button--not-touch-device")
        moveButtonRight.addClass("time-table__move-button--not-touch-device")
        scrollBlock.addClass("time-table__block--not-touch-device")
    }

    moveButtonLeft.on("click", () => {
        if (!isAnimating) {
            isAnimating = true;
            var startPosition = scrollBlock.scrollLeft();
            if(!isTouchDevice){
                scrollBlock.animate({ scrollLeft: startPosition - scrollSize + 26 }, 'swing', function() {
                    isAnimating = false;
                });
            } else {
                scrollBlock.scrollLeft(startPosition - scrollSize + 26)
                isAnimating = false;
            }
        }
    });
    
    moveButtonRight.on("click", () => {
        if (!isAnimating) {
            isAnimating = true;
            var startPosition = scrollBlock.scrollLeft();
            if(!isTouchDevice){
                scrollBlock.animate({ scrollLeft: startPosition + scrollSize + 26 }, 'swing', function() {
                    isAnimating = false;
                });
            } else {
                scrollBlock.scrollLeft(startPosition + scrollSize + 26)
                isAnimating = false;
            }
        }
    });
}



function ButtonInit( placeData ) {
    var buttonObjects = [
        $(`#js-day-button-1`),
        $(`#js-day-button-2`)
    ];

    /*2日目だけ初期設定で2日目が表示されるようにする*/
    const currentDate = new Date();
    const firstTargetDate = new Date(2023, 9-1, 9); //2023年9月9日
    const secondTargetDate = new Date(2023, 9-1, 10); //2023年9月10日
    $(".surround-box__current-time").addClass("surround-box__current-time--appear");

    if( dateFns.isSameDay(currentDate, secondTargetDate) ){
        buttonObjects[0].children().addClass("day-button__img--opacity0")
        buttonObjects[1].children().removeClass("day-button__img--opacity0")
        PlaceDataToHtml( placeData, 2);
        
        $(".surround-box__current-time").addClass("surround-box__current-time--appear");
    }

    buttonObjects.forEach((buttonElement, index) => {
        buttonElement.on('click', () => {
            var unactiveButton = buttonElement
            unactiveButton.children().removeClass("day-button__img--opacity0")
            
            var activeButton = buttonObjects[( index + 1 ) % 2]
            activeButton.children().addClass("day-button__img--opacity0")

            if(nowDay === index + 1){
                $(".surround-box__current-time").addClass("surround-box__current-time--appear");
            }

            displayedDate = index + 1;
            PlaceDataToHtml( placeData, displayedDate);
        })
    })
}

function PlaceDataToHtml( placeData, dateData ){
    
    //配列で扱うため
    dateData--;

    const thisEventPlaceParent = $(`${placeData.selecter} .time-table__contents-wrapper`);
    const thisSurroundPlaceParent = $(`${placeData.selecter} .time-table__surround-box`);

    const timeContentColor = placeData.color;


    thisEventPlaceParent.empty();
    thisSurroundPlaceParent.empty();

    var eventsData = placeData.date[dateData]

    eventsData.event.forEach((thisEventData, index, array) => {

        var shortenClass = ""

        if( index + 1 < array.length ){
            if( array[index].end == array[index + 1].start ){
                shortenClass = " time-table__contents-block--shorten"
            }
        }
        
        var ticketsClass = ""

        if(thisEventData.hasOwnProperty("tickets")){
            ticketsClass = "time-content__title--tickets"
        }

        const eventStartTime = dateFns.parse(`2000-01-01T${thisEventData.start}`, 'yyyy-MM-ddTH:mm', new Date())
        const eventEndTime = dateFns.parse(`2000-01-01T${thisEventData.end}`, 'yyyy-MM-ddTH:mm', new Date())

        const eventStartGrid = dateFns.differenceInMinutes(eventStartTime, seiseisaiStartTime) / 5 + 1;
        const eventEndGrid = dateFns.differenceInMinutes(eventEndTime, seiseisaiStartTime) / 5 + 1;

        var newEvent = $("<a>")
            .addClass(`time-table__contents-block time-content ${shortenClass} time-content--${timeContentColor}`)
            .attr("href", `event-list.html${thisEventData.url}`)
            .attr("style", `grid-area: ${ eventStartGrid }/auto/${ eventEndGrid }/auto;`);
        
            var newTimeDiv = $("<div>")
                .addClass("time-content__time");
            
                var newStimeP = $("<p>")
                    .addClass("time-content__stime")
                    .text(thisEventData.start);
                var newEtimeP = $("<p>")
                    .addClass("time-content__etime")
                    .text(thisEventData.end);
            
            newTimeDiv
                .append( newStimeP )
                .append( newEtimeP );
            
            var newTitleP = $("<p>")
                .addClass("time-content__title " + ticketsClass)
                .text(thisEventData.name);
            
            var newArrowImg = $("<img>")
                .attr("src", "img/time-table-arrow.svg")
                .addClass("time-content__arrow")
        
        newEvent
            .append(newTimeDiv)
            .append(newTitleP)
            .append(newArrowImg)
    
        thisEventPlaceParent.append(newEvent);
    });

    eventsData.surround.forEach(thisSurroundData => {
        const surroundStartTime = dateFns.parse(`2000-01-01T${thisSurroundData.start}`, 'yyyy-MM-ddTH:mm', new Date())
        const surroundEndTime = dateFns.parse(`2000-01-01T${thisSurroundData.end}`, 'yyyy-MM-ddTH:mm', new Date())

        const surroundStartGrid = dateFns.differenceInMinutes(surroundStartTime, seiseisaiStartTime) / 5 + 1;
        const surroundEndGrid = dateFns.differenceInMinutes(surroundEndTime, seiseisaiStartTime) / 5 + 1;

        var newSurround = $("<div>")
            .addClass(`surround-box__block surround-box__block--${thisSurroundData.color}`)
            .attr("style", `grid-area: ${ surroundStartGrid }/auto/${ surroundEndGrid }/auto;`);
        
        if( thisSurroundData.hasOwnProperty("name") ){
            var newLabelP = $("<p>")
                .addClass("surround-box__label")
                .text(thisSurroundData.name)
            
            newSurround.append(newLabelP);
        }

        thisSurroundPlaceParent.append(newSurround);
    });

    var currentTimePersent = currentTimeHandPersent();
    if(currentTimePersent != -1){

        var currentTimeHandParent = $("<div>")
            .addClass("surround-box__current-block");
        var currentTimeHand = $("<div>")
            .addClass("surround-box__current-time")
            .attr("style", `top: ${ currentTimePersent }%;`);
        
        currentTimeHandParent.append(currentTimeHand);
        thisSurroundPlaceParent.append(currentTimeHandParent);
    }

}



function timeHandRefresh(){
    var currentTimePersent = currentTimeHandPersent();
    if(currentTimePersent != -1 ){
        console.log(`${ currentTimePersent }%;`);
        $(".surround-box__current-time").css("top", `${ currentTimePersent }%`)
    }
}