$('document').ready(function () {
    $.getJSON("//libdev.bc.edu/db/resources?callback=?", function (msg) {
        var options = '';
        jQuery.each(msg, function (index, value) {
            var url = 'http://databases.bc.edu/V?func=native-link&resource=' + value.number;
            options = options + '<option value="' + url + '">' + value.short_name + '</option>'
        });
        $('#dbs-by-title').append(options);

        $('#dbs-by-title').chosen({
            width: "100%"
        }).change(function (event, params) {
            window.location = params.selected;
        });

        $('#dbs-by-subject').chosen({
            width: "100%"
        }).change(function (event, params) {
            var urlPath = jQuery(this).val();
            window.location.href = "http://libguides.bc.edu/subjects/" + urlPath + "?t=db";
        });
    });
});