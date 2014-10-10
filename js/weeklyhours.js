    $(document).ready(function(){
        var showHours = function(json){
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            // SpringShare assigned library IDs
            // 297 O'Neill
            // 519 Babst
            // 298 Burns
            // 520 ERC
            // 523 TML
            // 522 Social Work
            // 521 Law
            var libIDsArray = [297,298,519,520,521,522,523];
            
            // search for all instances of <div class="libhours">
            $(".libhours").each(function(){
                // get the ID attribute value from this div
                var thisID = $(this).attr('id');
                var thisLib = this;
                // make sure the ID attribute value matches the list above
                if ($.inArray(thisID, libIDsArray)) {
                    // search through LibCal API and pull out the JSON element that matches the ID
                    for (var i=0; i < json['locations'].length;i++){
                        if (json['locations'][i].lid == thisID){
                            // create and append the hours to the DOM
                            $(thisLib).html("<span class='libraryname'>" + json['locations'][i].name + " hours</span>");
                            $.each(days, function(index,day){
                                $(thisLib).append("<ul class='" + day + "'>" + 
                                    "<span class='day'>" + day + "</span>" + 
                                    "<li class='date'>" + json['locations'][i].weeks[0][day].date + "</li>" + 
                                    "<li class='from'>" + json['locations'][i].weeks[0][day]['times'].hours[0]['from'] + "</li>" +
                                    "<li class='to'>"   + json['locations'][i].weeks[0][day]['times'].hours[0]['to'] + "</li></ul>");
                            });
                        }
                    }
                }
            });
        }

        // get the LibCal hours for all libraries from the service API
        if ($(".libhours") && $(".libhours").length > 0){
            $.getJSON("http://api.libcal.com/api_hours_grid.php?iid=609&format=json&weeks=1&callback=?", showHours);
        }
    });

