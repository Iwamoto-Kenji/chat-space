class Api::MessagesController < ApplicationController
  def index
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_message_id = params[:id].to_i
    # 取得したグループでのメッセージ達から、idがlast_messge_idよりも新しい(大きい)メッセージ達のみを取得
    @messages = Message.includes(:user).where("id > #{last_message_id}").where(group_id: params[:group_id])
  end
end