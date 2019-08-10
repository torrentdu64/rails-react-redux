class Api::V1::BookingsController < Api::V1::BaseController
  before_action :set_profile
  skip_before_action :authenticate_user!, only: [:reply]



  def create

    @booking = Booking.new(booking_params)
    @booking.user = current_user
    authorize @booking
    @booking.end_time = @booking.start_time
    @booking.end_time = @booking.end_time.to_datetime + Time.parse("#{@booking.duration}").seconds_since_midnight.seconds
    if @booking.save # see Message.as_json method
    #binding.pry
       #RequestProfileSmsJob.perform_later(@booking.id)


      render :create, status: :created
    else

     render_error
   end
  end

  def reply
      ReplySmsJob.perform_later(params["message_id"], params["response"])
      render :reply, status: :created
  end

  def booking_time
    @booking = Booking.where(profile_id: params[:profile_id]).where("start_time >= ?", Time.now)

     authorize @booking
    render :booking_time, status: 200
  end

  private


  def set_profile
    @profile = Profile.find_by(id: params[:profile_id])
  end


  def render_error
    render json: { errors: @booking.errors.full_messages },
      status: :unprocessable_entity
  end

  def booking_params
    params.require(:booking).permit(:start_time, :end_time, :duration, :user_id, :profile_id)
  end

end


