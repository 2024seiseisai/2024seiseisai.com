$(document).ready(function() {
    // 記事データの配列
    var articles = [
        { href: '../15/15.html', img: '../catch_img/15.webp', date: '2023.10.08', title: '菁々祭パンフレット編集後記', author: '文化祭実行委員長' },
        { href: '../11/11.html', img: '../catch_img/11.webp', date: '2023.08.25', title: '新聞部とコラボ！パート長インタビュー！', author: '新聞部' },
        { href: '../12/12.html', img: '../catch_img/12.webp', date: '2023.08.25', title: 'グッズが出来るまで【体験談】', author: 'PRパート員 H.K.' },
        { href: '../13/13.html', img: '../catch_img/13.webp', date: '2023.08.25', title: '菁々祭を彩る門はどのように作られるのか？', author: 'PRパート員 J.N.' },
        { href: '../14/14.html', img: '../catch_img/14.webp', date: '2023.08.25', title: '音楽部と室内楽部のコラボ?!合同バンドのメンバーに聞く', author: 'PRパート員 K.N.' },
        { href: '../06/06.html', img: '../catch_img/06.webp', date: '2023.06.26', title: '折り紙研究部の巨大作品に迫る', author: 'PRパート員K.K.' },
        { href: '../07/07.html', img: '../catch_img/07.webp', date: '2023.06.26', title: '菁々祭との出会い', author: 'PRパート副パート長' },
        { href: '../08/08.html', img: '../catch_img/08.webp', date: '2023.06.26', title: '菁々祭を支える者達～パート・セクション紹介～', author: 'PRパート員I.R.' },
        { href: '../09/09.html', img: '../catch_img/09.webp', date: '2023.06.26', title: '【ギャラリー】ロゴモニュメント「四季彩」の記録', author: 'PRパート副パート長' },
        { href: '../10/10.html', img: '../catch_img/10.webp', date: '2023.06.15', title: '必見！菁々祭の整理券攻略＆射的の1等獲得の秘訣を大公開！', author: 'PRパート員F.T.' },
        { href: '../05/05.html', img: '../catch_img/05.webp', date: '2023.06.05', title: 'Webサイトができるまで...【技術＆製作セクション長インタビュー】', author: 'PRパート長' },
        { href: '../01/01.html', img: '../catch_img/01.webp', date: '2023.06.05', title: 'ロゴデザインの裏側に密着？！', author: 'PRパート員 S.Y.' },
        { href: '../02/02.html', img: '../catch_img/02.webp', date: '2023.06.05', title: '【迷ってる人必見】菁々祭どこ巡る？体験型展示のすゝめ', author: 'PRパート員 S.K. & H.K.' },
        { href: '../03/03.html', img: '../catch_img/03.webp', date: '2023.06.05', title: '部誌編集者に聞く！「番茶党」のウラ苦労【新聞部】', author: 'PRパート副パート長' },
        { href: '../04/04.html', img: '../catch_img/04.webp', date: '2023.06.05', title: 'お化け屋敷の正体を直撃インタビュー！', author: 'PRパート員 M.K.' }
    ];

    // ランダムに2つの記事を選ぶ
    function getRandomArticles() {
        var indices = [];
        while (indices.length < 2) {
            var randomIndex = Math.floor(Math.random() * articles.length);
            if (indices.indexOf(randomIndex) === -1) indices.push(randomIndex);
        }
        return indices.map(index => articles[index]);
    }
    function equalizewidth() {
        var Width1 = $('#recommend_1').outerWidth();
        var Width2 = $('#recommend_2').outerWidth();
        var averageWidth = Math.min(Width1, Width2);

        $('#recommend_1').Width(minWidth);
        $('#recommend_2').Width(minWidth);
    }

    // 選ばれた記事でHTMLを更新
    function updateRecommendedArticles() {
        var selectedArticles = getRandomArticles();
        selectedArticles.forEach((article, i) => {
            $(`#recommend_${i + 1} a`).attr('href', article.href);
            $(`#recommend_${i + 1} .blog_preview_img`).attr('src', article.img);
            $(`#recommend_${i + 1} .blog_preview_date`).text(article.date);
            $(`#recommend_${i + 1} .blog_preview_title p`).text(article.title);
            $(`#recommend_${i + 1} .blog_preview_author`).text(article.author);
        });
    }

    // ページが読み込まれたときに記事を更新
    updateRecommendedArticles();
});
