class RegistrationsController < Devise::RegistrationsController

  def create_code

    @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
    response = @sms.send("Hello from my app baby", params[:user][:phone] )

  end

  def sign_up_params
    devise_parameter_sanitizer.sanitize(:sign_up)
  end

  def account_update_params
    devise_parameter_sanitizer.sanitize(:account_update)
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :phone, :password, :password_confirmation, :profile)
  end

  def account_update_params
    params.require(:user).permit(:email, :phone, :password, :password_confirmation)
  end

end
