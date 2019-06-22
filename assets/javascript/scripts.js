var domain = 'http://localhost:8080'
// var domain = 'https://walis-scheduler.herokuapp.com'
var month_names =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var timeHours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','01','02','03','04','05','06','07','08','09','10','11'];
$(document).ready(function() {
  $("#newAppForm").hide();
  $("#addButton").hide();
  $("#cancelButton").hide();
  $("#appointmentTable").hide();
  $("#tableResultInfo").hide();
  $("#successMessage").hide();
  $("#newButton").click(function() {
    $("#newButton").hide();
    $("#newAppForm").show('slow');
    $("#addButton").show();
    $("#cancelButton").show('slow');
  });
  $("#cancelButton").click(function() {
    $("#addButton").hide();
    $("#cancelButton").hide();
    $("#newAppForm").hide('slow');
    $("#newButton").show();
    $("#dateText").val('');
    $("#timeText").val('');
    $("#descriptionInput").val('');
  });
  $("input").keypress(function(e) {
    if(e.keyCode==13){
      $('#viewButton').trigger('click');
    }
  });
  $("#viewButton").click(function(){
    $("#appointmentTable").hide('fast');
    $.ajax({
     type: "GET",
     dataType: "json",
     url: domain+"/search?description="+$('#searchBoxText').val(),
     success: function(data){
          $("#appointmentTable").find("tr:gt(0)").remove();
          if (data.length==0){
            $("#appointmentTable").hide();
            $("#tableResultInfo").show('fast');
          }else{
            $("#tableResultInfo").hide();
            $("#appointmentTable").show('fast');
            for (var i = 0;i < data.length;i++){
              var timeArray = data[i].time.split("T")[1].split(':');
              var ampm = 'AM';
              if (parseInt(timeArray[0])>=12){
                ampm = 'PM';
              }
              timeArray[0] =  timeHours[parseInt(timeArray[0])%12];
              var time = timeArray[0] +':'+ timeArray[1]
              var date = data[i].time.split("T")[0].split('-');
              var c;
              c=date[0], date[0]=date[1], date[1]=c;
              c=date[1], date[1]=date[2], date[2]=c;
              date[0] = month_names[parseInt(date[0])-1];
              $('#appointmentTable tr:last').after('<tr><td>'+date.join('-')+'</td><td>'+time+' '+ ampm+'</td><td>'+data[i].description+'</td><td><button id="'+data[i]._id+'" name="delete" class="trashButton" type="button"/></button></td></tr>');
            }
          }
     }
    });
  });
  $("#newAppForm").submit(function(event){
    event.preventDefault();
    var values = {"date":$("#dateText").val(),"time":$("#timeText").val(),"description":$("#descriptionInput").val()};
    // $("#td_id").attr('class', 'newClass');
    $.ajax({
        url : domain+"/add",
        type: "POST",
        data: values,
        success    : function(res){
            if (res.success==true){
              $("#successMessage").removeClass("text-danger");
              $("#successMessage").addClass("text-success");
              $("#successMessage").text("Successly Added!");
              $("#successMessage").show();
              $("#successMessage").delay(1500).fadeOut('slow');

              $("#addButton").hide();
              $("#cancelButton").hide();
              $("#newAppForm").hide('slow');
              $("#newButton").show();
              $("#dateText").val('');
              $("#timeText").val('');
              $("#descriptionInput").val('');
              $('#viewButton').trigger('click');
            }else{
              $("#successMessage").removeClass("text-success");
              $("#successMessage").addClass("text-danger");
              $("#successMessage").text("Failed to Add!");
              $("#successMessage").show();
              $("#successMessage").delay(1000).fadeOut('slow');
            }
        }
    }).fail(function (jqXHR, textStatus, error) {
          $("#successMessage").removeClass("text-success");
          $("#successMessage").addClass("text-danger");
          $("#successMessage").text("Failed to Add!");
          $("#successMessage").show();
          $("#successMessage").delay(1000).fadeOut('slow');
      });
  });

});
$(document).on('click', ".trashButton", function() {
   var values = {_id:this.id};
   $.ajax({
       url : domain+"/remove",
       type: "DELETE",
       data: values,
       success : function(res){
           if (res.success==true){
             $("#successMessage").removeClass("text-danger");
             $("#successMessage").addClass("text-success");
             $("#successMessage").text("Removed Successfully!");
             $("#successMessage").show();
             $("#successMessage").delay(1500).fadeOut('slow');
             $("#viewButton").click();
           }else{
             $("#successMessage").removeClass("text-success");
             $("#successMessage").addClass("text-danger");
             $("#successMessage").text("Failed to Delete Entry!");
             $("#successMessage").show();
             $("#successMessage").delay(1000).fadeOut('slow');
           }
       }
   }).fail(function (jqXHR, textStatus, error) {
         $("#successMessage").removeClass("text-success");
         $("#successMessage").addClass("text-danger");
         $("#successMessage").text("Failed to Remove Entry!");
         $("#successMessage").show();
         $("#successMessage").delay(1000).fadeOut('slow');
     });
});


var today = new Date();

dateText.min = today.toISOString().split("T")[0];
timeText.min = today.toISOString().split("T")[1]
