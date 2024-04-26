//カウントダウン
const seiseisai_date = dateFns.parse('2024-09-07 09:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()); //一日目開始
const seiseisai_1day_end = dateFns.parse('2024-09-07 17:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()); //一日目終了
const seiseisai_2day_start = dateFns.parse('2024-09-08 09:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()); //二日目開始
const seiseisai_2day_end = dateFns.parse('2024-09-08 17:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()); //二日目終了

const to_1day_end = dateFns.differenceInSeconds(seiseisai_date, seiseisai_1day_end);
const to_2day_start = dateFns.differenceInSeconds(seiseisai_date, seiseisai_2day_start);
const to_2day_end = dateFns.differenceInSeconds(seiseisai_date, seiseisai_2day_end);

const format_word = ['<span class="countdown_jp">','</span> ']


function spanWithFormat(span_sec) {
    if( !Number.isInteger(span_sec) || span_sec === 0 ){
        console.error;
        return '<p class="TOP_jp"><b>時刻取得エラー</b></P>';
    }

    let sec = span_sec % 60;
    let min = Math.floor(span_sec / 60) % 60;
    let hour = Math.floor(span_sec / 3600) % 24;
    let day = Math.floor(span_sec / 86400);

    let sec_w0 = String(sec).padStart(2, "0");
    let min_w0 = String(min).padStart(2, "0");
    let hour_w0 = String(hour).padStart(2, "0");
    let day_w0 = String(day).padStart(2, "0");

    $("#day").text(day_w0)
    $("#hour").text(hour_w0)
    $("#minute").text(min_w0)
    $("#second").text(sec_w0)
}


$(window).on('load',function() {
    countDown();
    
});

//1秒間に1度処理
let countdown = setInterval(countDown, 1000);

//現在の時刻を取得
const now_date = new Date();

//時刻エラー処理
if( !dateFns.isValid(now_date) ){
    clearInterval(countdown)

    $('#countdown').html('<p class="countdown_error">時刻取得エラー<span class="countdown_jp">ER01</span></p>');

    $('#countdown_message').text('');
}

//秒を取得
let span = dateFns.differenceInSeconds(seiseisai_date, now_date);
let span_2day = dateFns.differenceInSeconds(seiseisai_2day_start, now_date);

function countDown(){
    if(span > 0){
        //菁々祭開始まで
        $("#countdown_holding").text("");

        $('#countdown_message').text('第60回菁々祭まで...');

        $('#countdown').html( spanWithFormat(span) );

    }else if(span > to_1day_end){
        //1日目の9時から17時(一日目開催中)
        $("#countdown").hide();
        
        $("#countdown_holding").text("現在 菁々祭1日目開催中！");
        $('#countdown_message').text('');

    }else if(span > to_2day_start){
        $('#countdown').html( spanWithFormat( span_2day ));
        
        $("#countdown_holding").text("");
        $('#countdown_message').text('菁々祭 2日目開始まで...');

    }else if(span > to_2day_end){
        //2日目の9時から17時(二日目開催中)
        $("#countdown").hide();
        
        $("#countdown_holding").text("現在 菁々祭2日目開催中！");
        $('#countdown_message').text('');

    }else if(span <= to_2day_end){
        //終了後
        $("#countdown_holding").text("");
        $('#countdown').html('<p class="countdown_end">終了しました。<br>ご来場ありがとうございました。</p>');

        $('#countdown_message').text('第60回菁々祭は');

        //指定の日時になればカウントを止める
        clearInterval(countdown)

    }else{
        $('#countdown').html('<p class="countdown_error">時刻取得エラー<span class="countdown_jp">ER02</span></p>');

        $('#countdown_message').html('');

        clearInterval(countdown)
    }

    span--;
    span_2day--;
}
