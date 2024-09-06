$(document).ready(function() {
    // 記事データの配列
    var articles = [
        //{ href: '/2024/blog/article/60/01/01.html', img: '../catch_img/01.webp', date: '2023.06.05', title: 'ロゴデザインの裏側に密着？！', author: 'PRパート員 S.Y.' },
        //{ href: '/2024/blog/article/60/02/02.html', img: '../catch_img/02.webp', date: '2023.06.05', title: '【迷ってる人必見】菁々祭どこ巡る？体験型展示のすゝめ', author: 'PRパート員 S.K. & H.K.' },
        { href: '/2024/blog/article/60/03/03.html', img: '../catch_img/03.webp', date: '2023.09.05', title: '作者的文化祭のあるきかた', author: 'PRパート員 S.K.' },
        { href: '/2024/blog/article/60/04/04.html', img: '../catch_img/04.webp', date: '2023.09.05', title: 'テーマ・ロゴ発表映像のあれこれ', author: 'PRパート員 S.Y.' },
        { href: '/2024/blog/article/60/05/05.html', img: '../catch_img/05.webp', date: '2024.08.22', title: '復活した書道パフォーマンス‼︎', author: 'PRパート員 Y.T. & H.A.' },
        //{ href: '/2024/blog/article/60/06/06.html', img: '../catch_img/06.webp', date: '2023.06.26', title: '折り紙研究部の巨大作品に迫る', author: 'PRパート員K.K.' },
        //{ href: '/2024/blog/article/60/07/07.html', img: '../catch_img/07.webp', date: '2023.06.26', title: '菁々祭との出会い', author: 'PRパート副パート長' },
        //{ href: '/2024/blog/article/60/08/08.html', img: '../catch_img/08.webp', date: '2023.06.26', title: '菁々祭を支える者達～パート・セクション紹介～', author: 'PRパート員I.R.' },
        { href: '/2024/blog/article/60/09/09.html', img: '../catch_img/09.webp', date: '2024.08.22', title: '全国強豪のクイズ研究部、文化祭での見どころ！', author: 'PRパート員 M.K.' },
        { href: '/2024/blog/article/60/10/10.html', img: '../catch_img/10.webp', date: '2024.08.22', title: '文化祭の裏側、会計パートの仕事に迫る', author: 'PRパート員U.Y. & N.R. & Y.A.' },
        { href: '/2024/blog/article/60/11/11.html', img: '../catch_img/11.webp', date: '2024.08.22', title: 'お化け屋敷の裏側を暴く', author: 'PRパート員 K.K. & Y.U.' },
        //{ href: '/2024/blog/article/60/12/12.html', img: '../catch_img/12.webp', date: '2023.08.25', title: 'グッズが出来るまで【体験談】', author: 'PRパート員 H.K.' },
    ];

    // 現在のページのURLを取得
    var currentPage = window.location.pathname;

    // 現在の記事を除外した配列を作成
    var filteredArticles = articles.filter(function(article) {
        return article.href !== currentPage;
    });
    
    // ランダムに2つの記事を選ぶ
    function getRandomArticles() {
        var indices = [];
        while (indices.length < 2) {
            var randomIndex = Math.floor(Math.random() * filteredArticles.length);
            if (indices.indexOf(randomIndex) === -1) indices.push(randomIndex);
        }
        return indices.map(index => filteredArticles[index]);
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