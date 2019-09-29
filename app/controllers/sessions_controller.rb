class SessionsController < Devise::SessionsController
  before_action :destroy_booking_no_payment, only: [:destroy]

  def destroy
    super
  end

  def create
    super
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
