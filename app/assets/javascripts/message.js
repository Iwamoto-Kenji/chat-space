$(function(){
  function buildHTML(message){
    var addImage = message.image? `<img src ="${message.image}" class="input-box__image"></img>` :  " " ;

    var html = `<div class="messagelist">
                  <div class="messagelist__create">
                    <div class="messagelist__name">
                    ${message.user_name}
                    </div>
                    <div class="messagelist__post_date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="messagelist__comment">
                  ${message.content}</p>
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
      $('.messageslists').append(html)
      $('.input-box').val('')
      $('.messageslists').animate({scrollTop: $('.messageslists')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信失敗');
    })
    .always(function(){
      $('.submit-btn').attr('disabled', false);
    })
  })
})