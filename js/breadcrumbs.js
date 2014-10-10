/* MAKES SUBNAV MENU ITEM ACTIVE */

    $(document).ready(function(){
        var activeLI = $("#s-lg-guide-tabs ul.nav-tabs li.active > a");
        if (activeLI && activeLI.length > 0) {
            var parentHREF = $(activeLI).attr("href");
            var parentText = $(activeLI).text().trim();
            var loc = $(location).attr('pathname') + $(location).attr('search');
            loc = loc.replace(/\/libguides\//,"");

            if (parentHREF != loc) {
                var subpageDOM = $(activeLI).siblings("ul.s-lg-subtab-ul");
                var subpageATag = subpageDOM.find("li a");

                subpageATag.each(function(index,element){
                    var subpageHREF = $(element).attr("href");
                    var subpageText = $(element).text().trim();

                    if (loc == subpageHREF) {
                        $(element).addClass("active");
                        subpageDOM.show();
                        activeLI.parent("li").removeClass("active");
                        //$("#s-lib-bc-list").append('<li><a title="'+parentText+'" href="'+parentHREF+'">'+parentText+'</a></li>');
                        //$("#s-lib-bc-list").append('<li>'+subpageText+'</li>');
                        return;
                    }
                });
            }
        }
    });