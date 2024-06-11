const seiseisai_date = dateFns.parse('2023-09-09 09:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()); //一日目開始
const seiseisai_1day_end = dateFns.parse('2023-09-09 17:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()); //一日目終了
const seiseisai_2day_start = dateFns.parse('2023-09-10 09:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()); //二日目開始
const seiseisai_2day_end = dateFns.parse('2023-09-10 17:00:00', 'yyyy-MM-dd HH:mm:ss', new Date()); //二日目終了

const to_1day_end = dateFns.differenceInSeconds(seiseisai_date, seiseisai_1day_end);
const to_2day_start = dateFns.differenceInSeconds(seiseisai_date, seiseisai_2day_start);
const to_2day_end = dateFns.differenceInSeconds(seiseisai_date, seiseisai_2day_end);

const format_word = ['<span class="countdown_jp">','</span> ']


function spanWithFormat(span_sec, format) {
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

    return day_w0 + format_word[0] + "日" + format_word[1] + hour_w0 + format_word[0] + "時間" + format_word[1] + min_w0 + format_word[0] + "分" + format_word[1] + sec_w0 + format_word[0] + "秒" + format_word[1];
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

    $('#countdown').html('<p class="countdown_jp2">時刻取得エラー<span class="countdown_jp">ER01</span></p>');

    $('#countdown_massage').html('');
    $('.countdown_unit').hide();
}

//秒を取得
let span = dateFns.differenceInSeconds(seiseisai_date, now_date);
let span_2day = dateFns.differenceInSeconds(seiseisai_2day_start, now_date);

function countDown(){
    if(span > 0){
        //菁々祭開始まで
        $('.countdown_unit').show();
        $('#countdown_massage').html('第59回菁々祭まで');

        $('#countdown').html( spanWithFormat(span) );

    }else if(span > to_1day_end){
        //1日目の9時から17時(一日目開催中)
        $('#countdown').html('<p class="countdown_jp2">現在 菁々祭1日目開催中！</P>');

        $('#countdown_massage').html('');
        $('.countdown_unit').hide();

    }else if(span > to_2day_start){
        $('#countdown').html( spanWithFormat( span_2day ));
        
        $('.countdown_unit').show();
        $('#countdown_massage').html('菁々祭 2日目開始まで');

    }else if(span > to_2day_end){
        //2日目の9時から17時(二日目開催中)
        $('#countdown').html('<p class="countdown_jp2">現在 菁々祭2日目開催中！</P>');

        $('#countdown_massage').html('');
        $('.countdown_unit').hide();

    }else if(span <= to_2day_end){
        //終了後
        $('#countdown').html('<span class="countdown_end countdown_jp2">終了しました。<br>ご来場ありがとうございました。</span>');

        $('.countdown_unit').show();
        $('#countdown_massage').html('第59回菁々祭は');

        //指定の日時になればカウントを止める
        clearInterval(countdown)

    }else{
        $('#countdown').html('<p class="countdown_jp2">時刻取得エラー<span class="countdown_jp">ER02</span></p>');

        $('#countdown_massage').html('');
        $('.countdown_unit').hide();

        clearInterval(countdown)
    }

    span--;
    span_2day--;
}
