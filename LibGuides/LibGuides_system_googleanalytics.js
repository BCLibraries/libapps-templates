<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXXXX-XX', 'auto');
ga('require', 'linkid');
ga('send', 'pageview');

$(function () {
    $('#megamenu ul.nav li.dropdown').mouseenter(function() {
        var myText = $(this).find("a.menu-option").text();
        ga('send', 'event', 'megamenu', 'hover', myText.trim());
    });
   $("ul.item-desktop li a").mouseenter(function(){
        var myPane = $(this).html();
        ga('send', 'event', 'librarypanes', 'hover', myPane);
    });
    $(".sb-icon-search").click(function(){
        ga('send', 'event', 'lib-searchbutton', 'click');
    });
    $("input#searchsubmit").click(function(){
        ga('send', 'event', 'bc-searchbutton', 'click');
    });
    $(".breadcrumb #s-lib-bc-customer").click(function(){
        var page_title = $("#guidetitle h1").text();
        ga('send', 'event', 'breadcrumb-home', 'click', page_title);
    });
    $(".breadcrumb #s-lib-bc-site").click(function(){
        var page_title = $("#guidetitle h1").text();
        ga('send', 'event', 'breadcrumb-site', 'click', page_title);
    });
    $(".breadcrumb #s-lib-bc-guide").click(function(){
        var page_title = $("#guidetitle h1").text();
        ga('send', 'event', 'breadcrumb-guide', 'click', page_title);
    });
    $("a").not('.search-link').click(function(e) {
        if (!ga.q) {
            var url = $(this).attr("href");

            /* Bug fix to stop screen jump when clicking carousel controls */
            if (url.indexOf('#') !== 0) {
                ga("send", "event", "outbound-lg", "click", url, {
                    "hitCallback":
                    function () {
                        document.location = url;
                    }
                });
            }
            e.preventDefault();
        }
    });
    /* get page views originating from Canvas */
    if ((window.location.pathname).indexOf('widget_')>-1){
        var current_title = $(document).attr('title');
        ga('send', 'event', 'canvas', 'view', current_title);
    }
});
</script>