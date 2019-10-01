class SessionsController < Devise::SessionsController
  before_action :destroy_booking_no_payment, only: [:destroy]


  def destroy
    super
  end

  def create
    self.resource = resource_class.new(sign_in_params)
    clean_up_passwords(resource)
    yield resource if block_given?
    binding.pry
    respond_to do |format|

      format.js { render 'profiles/show'}
      format.html { redirect_to profile_path() }
    end
  end


  def new
    super
  end



  private

  def destroy_booking_no_payment
    @booking = Booking.where(payment: nil, user_id: current_user.id )
    @booking.destroy_all
  end

end
