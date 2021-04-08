$(document).ready(function (){

    var csrf = $("input[name=csrfmiddlewaretoken]").val();

    $('#createButton').click(function (){
        var serializedData = $('#createTaskForm').serialize();
        $.ajax({
            url: $('createTaskForm').data('url'),
            data:serializedData,
            type:'post',
            success:function(response){
                    $('#taskList').append('<div class="card mb-1" id="taskCard" data-id="'+ response.task.id +'"> <div class="card-body">'+ response.task.title +'<button type="button" class="close float-right">' +
                        '<span aria-hidden="true">&times;</span> </button> </div></div>')

            }

        })
        $("#createTaskForm")[0].reset();
    });
    $('#taskList').on('click','.card',function (){
       var data_id = $(this).data('id');
       $.ajax(
           {
               url: '/tasks'+ data_id +'/completed/',
               data:{
                   csrfmiddlewaretoken:csrf,
                   id:data_id
               },
               type: 'post',
               success:function (){
                   var cardItem=  $('#taskCard[data-id="' + data_id + '"]');
                   cardItem.css('text-decoration', 'line-trough').hide().slideDown();
                   $
               }
           }
       )
    });
});
