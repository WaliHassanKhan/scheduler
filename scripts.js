var domain = 'http://localhost:8080'
// var domain = 'https://walis-scheduler.herokuapp.com'
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
            $("#tableResultInfo").hide('slow');
            $("#appointmentTable").show('fast');
            for (var i = 0;i < data.length;i++){
              $('#appointmentTable tr:last').after('<tr><td>'+data[i].time.split("T")[0]+'</td><td>'+data[i].time.split("T")[1].split('.')[0]+'</td><td>'+data[i].description+'</td></tr>');
            }
          }
     }
    });
  });
  $("#newAppForm").submit(function(event){
    event.preventDefault();
    var values = {"date":$("#dateText").val(),"time":$("#timeText").val(),"description":$("#descriptionInput").val()};
    $("#td_id").attr('class', 'newClass');
    $.ajax({
        url : domain+"/add",
        type: "POST",
        data: values,
        success    : function(){
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
var today = new Date();

dateText.min = today.toISOString().split("T")[0];
timeText.min = today.toISOString().split("T")[1]
