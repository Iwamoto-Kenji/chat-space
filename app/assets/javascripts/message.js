$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    var addImage = message.image? `<img src="${message.image}" class="input-box__image" />` :  " " ;

    var html = `<div class="messagelist" data-id="${message.id}">
                  <div class="messagelist__create">
                    <div class="messagelist__name">
                    ${message.user_name}
                    </div>
                    <div class="messagelist__post_date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="messagelist__comment">
                  <p>${message.content}</p>
                  ${addImage}
                  </div>
                </div>`
                
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messageslists').append(html);
      $('.messageslists').animate({scrollTop: $('.messageslists')[0].scrollHeight}, 'fasts');
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信失敗');
    })
    .always(function(){
      $('.submit-btn').attr('disabled', false);
    })

    
  })
  var reloadMessages = function() {
    last_message_id = $('.messagelist').last().data("id");
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildHTML(message);
      });

      $('.messageslists').append(insertHTML);
      if (messages != ''){
        $('.messageslists').animate({scrollTop: $('.messageslists')[0].scrollHeight}, 'fasts');
      }
    })
    .fail(function() {
      alert('error');
    });

  };
  if(document.URL.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 5000);
  }
})