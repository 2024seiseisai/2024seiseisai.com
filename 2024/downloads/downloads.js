$(document).ready(function() {
    // 初期状態ではすべての詳細部分を非表示
    $(".club_start_a + .club_detail_list").hide();

    // アコーディオンのクリックイベント
    $(".club_start_a").click(function() {
        // クリックされたメニューの詳細部分を取得
        var $currentDetail = $(this).next(".club_detail_list");

        // 他のメニューが開いている場合、それを閉じる
        $(".club_detail_list").not($currentDetail).slideUp();

        // クリックされたメニューの詳細部分をトグル
        $currentDetail.slideToggle();

        // 他のプラスマークを元の状態に戻す
        $(".club_start_a .club_detail").not($(this).find(".club_detail")).text("+");

        // クリックされたメニューのプラスマークをトグル
        var currentText = $(this).find(".club_detail").text();
        $(this).find(".club_detail").text(currentText == "+" ? "−" : "+");
    });
});
