class SessionsController < Devise::SessionsController
  before_action :destroy_booking_no_payment, only: [:destroy]


  def destroy
    super
  end



  def create
    #self.resource = resource_class.new(sign_in_params)
    # self.resource = warden.authenticate!(auth_options)
    # clean_up_passwords(resource)
    # yield resource if block_given?
    user = User.find_by_email(sign_in_params[:email])
    resource = User.new(sign_in_params)
    if user.nil?
      resource.errors[:email] << "email or password incorrect"
    end
    if user.valid_password?(sign_in_params[:password])
      super
    else
      resource.errors[:password] << "email or password incorrect"
    end
    binding.pry
    if resource.save
      respond_to do |format|
        format.js { render 'profiles/show'}
        format.html { redirect_to profile_path() }
      end
    else
      respond_to do |format|
        format.js { render 'profiles/show', resource: resourse }
        format.html { redirect_to profile_path() }
      end
    end
  end





  private

  def destroy_booking_no_payment
    @booking = Booking.where(payment: 'create', user_id: current_user.id )
    @booking.destroy_all
  end



  def sign_in_params
    params.require(:user).permit(:email, :password, :remenber_me)
  end

end
