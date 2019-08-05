class RegistrationsController < Devise::RegistrationsController

  def create_code

     num = params[:user][:phone]

     if num[0..2] == "+64"
          num[0..2] = "0"
     end

     val = num.scan(/\+/) ? false : true
     num = num.gsub(/\s+/, "")
     session[:v] = 0

    if num.length <= 11 && num.length >= 8  || num[0] == 0 || val

      dialing  = params
      format_phone = dialing[:user][:phone]
      format_phone[0] = '+64'
      format_phone = format_phone.gsub(/\s+/, "")
      @short = rand.to_s[2..7]
      current_user.update_attributes(phone: format_phone , code_conf: @short)
      @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
      message = "#{@short} is your verification code. "  #is your verification code.
      response = @sms.send(message, current_user.phone )

      redirect_to  edit_user_registration_path

    else

      flash[:alert] = "Miss spelling phone number"
      redirect_to  edit_user_registration_path

    end

  end


  def verif_code
    # compare to input and db record


    if current_user.code_conf == params[:user][:code]
        current_user.update(phone_verif: true)
        flash[:alert] = "success verif"
        redirect_to  "#{session[:verif_phone]}"
    elsif current_user.code_conf != params[:user][:code] && session[:v] <= 3
      flash[:alert] = "Code wrong just #{ 3 - session[:v] } attempt possible"
      session[:v] = session[:v] + 1
      redirect_to  edit_user_registration_path
    elsif session[:v] >= 4
      flash[:alert] = "this number is ban"
      redirect_to root_path
    end

  end

  def sign_up_params
    devise_parameter_sanitizer.sanitize(:sign_up)
  end

  def account_update_params
    # count attempt for confirm phone number
    devise_parameter_sanitizer.sanitize(:account_update)

  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :phone, :password, :password_confirmation, :profile)
  end

  def account_update_params
    params.require(:user).permit(:email, :phone, :password, :password_confirmation, :code_conf, :phone_verif)
  end

end
