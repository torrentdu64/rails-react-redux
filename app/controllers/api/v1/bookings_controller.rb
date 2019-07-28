class Api::V1::BookingsController < Api::V1::BaseController
  before_action :set_profile


  def create

    p booking = Booking.new(booking_params)

    booking.user = current_user

    booking.save

    authorize booking # see Message.as_json method
  end

  private

  def set_profile
   p @profile = Profile.find_by(id: params[:profile_id])
   p "set profile"
  end


  def render_error
    render json: { errors: @booking.errors.full_messages },
      status: :unprocessable_entity
  end

  def booking_params
    params.require(:booking).permit(:start_time, :end_time, :duration, :user_id, :profile_id)
  end

end


