var $freePlay = 0;

function openPage() {
    var arrayUrl = location.pathname.split('/'),
        arrayUrl_1 = arrayUrl[arrayUrl.length - 1],
        arrayUrl_2 = arrayUrl[arrayUrl.length - 2],
        curDivPath = $(".division[data-path='" + arrayUrl_1 + "']"),
        newDivPath = $(".division[data-path='" + arrayUrl_2 + "']");

    if (curDivPath.length > 0)
        $("html, body").animate({scrollTop: curDivPath.offset().top - $freePlay}, 200);

    else if (newDivPath.length > 0)
        $("html, body").animate({scrollTop: newDivPath.offset().top - $freePlay}, 200);

    var initialPath = location.pathname;

    $(window).bind('popstate', function (e) {
        if (location.pathname === initialPath) {
            initialPath = null;
            return;
        }

        var pagePosition = 0;

        var arrayUrl = location.pathname.split('/');
        var arrayUrl_1 = arrayUrl[arrayUrl.length - 1];
        var arrayUrl_2 = arrayUrl[arrayUrl.length - 2];

        if (curDivPath.length > 0)
            pagePosition = curDivPath.offset().top - $freePlay;

        else if (newDivPath.length > 0)
            pagePosition = newDivPath.offset().top - $freePlay;

        $.get(location.pathname, {format: 'html'}, $("html, body").animate({scrollTop: pagePosition}, 200), 'html');

        if (arrayUrl_1 === "hakkimizda" || arrayUrl_2 === "hakkimizda")
            $("title").html("İHT - Hakkımızda");
        else if (arrayUrl_1 === "iletisim" || arrayUrl_2 === "iletisim")
            $("title").html("İHT - İletişim");
    });
}

function iht_Notice_repost() {
    var noticeEl = $('.iht_notice'),
        $thisHeight = noticeEl.height();
    noticeEl.css('top', ($(window).height() - $thisHeight) / 2);
}

function iht_Notice() {
    $('.iht_notice').delay(1000).animate({'left': -15}, 500).delay(10000).animate({'left': -1000}, 500);
}

function changeBanner() {
    var visibleBannerEl = $('.iht_advert_banner:visible');
    visibleBannerEl.fadeOut(500).next('.iht_advert_banner').fadeIn(500);

    if (visibleBannerEl.next('.iht_advert_banner').length === 0) {
        $('.iht_advert_banner:first').fadeIn(900);
        $('.iht_advert_banner:last').fadeOut(1100);
    }
}

$('.iht_advert_banner:gt(0)').hide();

var noticeInt = null;

$(".iht_notice").click(function () {
    clearInterval(noticeInt);
    $(this).stop(true, true).animate({'left': -1000}, 500);
    noticeInt = setInterval(iht_Notice, 30000);
});

$(function () {
    $(window).load(function () {
        openPage();
        iht_Notice();
        noticeInt = setInterval(iht_Notice, 30000);
        setInterval(changeBanner, 3000);
        iht_Notice_repost();
    });
});

$(window).bind("resize", iht_Notice_repost);

$(".contactForm input").bind('keypress keydown', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        return false;
    }
});

$('.contactForm textarea').on('keydown keyup', function () {
    $(this).height(1);
    $(this).height(10 + $(this)[0].scrollHeight);
});

$("input[type=tel]").onlynum();

$(".contactForm form").submit(function (e) {
    e.preventDefault();
    return false;
});

$('.contactForm button').click(function () {
    $(".contactErrorResult").hide();

    $.ajax({
        type: "post",
        url: "//formspree.io/mgenokqb",
        data: $(".contactForm form").serialize(),
        beforeSend: function () {
            $('.contactForm button').slideUp(200);
            $("body").addClass("loading");
        },
        complete: function () {
            $('.contactForm button').delay(700).slideDown(200);
            $("body").removeClass("loading");
        },
        success: function () {
            $(".contactFormResult").html('Teşekkürler! Mesajınız tarafımıza ulaştı.');
        },
        error: function () {
            $(".contactErrorResult").show();
            $(".contactErrorResult span").html('Eksik veya hatalı doldurdunuz!');
        },
    });
});

$(function () {
    $('.navigation a').click(function (e) {
        e.preventDefault();

        var href = this.href,
            anchor = $(".division[data-path='" + $(this).attr("href") + "']"),
            scrollTop = anchor && anchor.offset() ? anchor.offset().top - $freePlay : 0;

        $("html, body").animate({scrollTop: scrollTop}, 200);

        if ($(this).attr("href") === "hakkimizda")
            $("title").html("İHT - Hakkımızda");
        else if ($(this).attr("href") === "iletisim")
            $("title").html("İHT - İletişim");

        return false;
    });

    $(".iht_field_contents").animate({"opacity": 1}, 500);
    $(".iht_field").animate({"paddingTop": 30}, 500);

    $(".contactErrorResult").click(function () {
        $(this).hide();
    });
});

$(".iht_advert_banner").randomize();

/*
* Zopim
*/
window.$zopim || (function (d, s) {
    var z = $zopim = function (c) {
        z._.push(c)
    }, $ = z.s =
        d.createElement(s), e = d.getElementsByTagName(s)[0];
    z.set = function (o) {
        z.set._.push(o)
    };
    z._ = [];
    z.set._ = [];
    $.async = !0;
    $.setAttribute('charset', 'utf-8');
    $.src = '//v2.zopim.com/?1Q2gX7xazNVSfxit5XZ5F6JSKzTxpzgx';
    z.t = +new Date;
    $.type = 'text/javascript';
    e.parentNode.insertBefore($, e)
})(document, 'script');
