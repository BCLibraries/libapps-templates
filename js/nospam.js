function bcBlockSpam() {
    var the_forms = document.querySelectorAll('.remail-form');
    for (i = 0; i < the_forms.length; i++) {
        var form = the_forms[i].action.split("/").pop();
        the_forms[i].action = "http://libstaff.bc.edu/remail/" + form;
    }
    document.getElementsByName('page_url')[0].value = document.URL;
}

if (window.attachEvent) {
    window.attachEvent('onload', bcBlockSpam);
} else {
    if (window.onload) {
        var curronload = window.onload;
        var newonload = function () {
            curronload();
            bcBlockSpam();
        };
        window.onload = newonload;
    } else {
        window.onload = bcBlockSpam;
    }
}