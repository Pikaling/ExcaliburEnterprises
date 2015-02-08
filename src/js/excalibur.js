var resizeIframes = function(viewportWidth) {
    var carousel = $("#ee-highlights"),
        twitterFeed = $("#twitter-widget-0"),
        carouselContentWidth = 720,
        twitterFeedWidth = 520;
    var resizeCarouselContent = function(newIframeWidth) {
        var maxHeight = 0;
        var items = carousel.find(".item");
        $.each(items, function(index, value) {
            var $value = $(value);
            $value.height("auto");
            if (index === 0) {
                maxHeight = $value.height();
            }
            maxHeight = $value.height() > maxHeight ? $value.height() : maxHeight;
        });
        $.each(items, function(index, value) {
            var $value = $(value);
            $value.height(maxHeight);
        });
        $.each(carousel.find("iframe"), function(index, value) {
            var $value = $(value),
                carouselContentRatio = $value.width() / $value.height();
            $value.attr('width', newIframeWidth + 'px');
            $value.attr('height', newIframeWidth / carouselContentRatio + 'px');
        });
    };
    var resizeTwitterFeed = function(newIframeWidth) {
        twitterFeed.width(newIframeWidth);
    };
    if (viewportWidth < 992) {
        carouselContentWidth = $('.carousel-inner').width();
        twitterFeedWidth = carousel.outerWidth();
    }
    resizeCarouselContent(carouselContentWidth);
    resizeTwitterFeed(twitterFeedWidth);
};

$(window).load(function() {
    resizeIframes($(window).width());
});

$(window).resize(function() {
    resizeIframes($(window).width());
});