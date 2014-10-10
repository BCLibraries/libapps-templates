/* SCRIPT TO CHANGE THE LIBRARY DROPDOWN PANE */

      $(document).ready(function(){
        /* takes in a single class/id name
         note, the parameter should be stripped of . or # chars  */
        var updateMenu = function(className){
          /* toggle the "selected" class value for the li
          // element that was selected */
          $("ul.library-list li").not($("." + className).addClass("selected")).removeClass("selected")
          /* toggle the display of the library_pane element
          // to be shown */
          $(".library_pane").not($("#" + className).show()).hide();
        };

        /* set up which menu to show as default */
        updateMenu('oneill_pane');

        /* when menu li element gets clicked */
        $("ul.library-list li").click(function(){
          /* get list of class values and split them into an array */
          var myClasses = $(this).attr("class").split(/\s+/);
          var myClassPane;

          /* in the case there are multiple class values for each li element */
          if (myClasses && myClasses.length > 1) {
            /* go through each and get the one class name that
            // matches "_pane", which is what we know to look for */
            $.each(myClasses, function(i,e){
              if (e.indexOf("_pane") != -1) {
                myClassPane = myClasses[i];
                return false;
              }
            });
          } else {
            myClassPane = myClasses[0];
          }
          /* add selected class and toggle menu contents div */
          updateMenu(myClassPane);
        });
      });