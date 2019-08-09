$(document).on('turbolinks:load', function() {
  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
    search_list.append(html);
   }

   function appendErrMsgToHTML(msg) {
    var html = `<div class='chat-group-user'><p>${ msg }</p></div>`
    search_list.append(html);
  }
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーがありません");
        }
      })
      .fail(function() {
        alert('検索に失敗しました');
      })
    });

    $(document).on("click", ".chat-group-user__btn--add", function () {
      var add_list = $("#chat-group-users");
      var name = $(this).attr('data-user-name');
      var id = $(this).attr('data-user-id');
      var html = `<div class='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value=${id}>
                    <p class='chat-group-user__name'>${name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
      add_list.append(html);
      $(this).parent().remove();
    });

    $(document).on("click", ".js-remove-btn", function () {
      $(this).parent().remove();
    });

});