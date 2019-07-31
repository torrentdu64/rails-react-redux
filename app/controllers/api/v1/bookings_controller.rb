class Api::V1::BookingsController < Api::V1::BaseController
  before_action :set_profile
  # before_action :check_profile_false


  def create
    @booking = Booking.new(booking_params)
    @booking.user = current_user
    authorize @booking
    @booking.end_time = @booking.start_time
    @booking.end_time = @booking.end_time.to_datetime + Time.parse("#{@booking.duration}").seconds_since_midnight.seconds
    if @booking.save # see Message.as_json method
      # phone from Profile
      # set phone number for profile and user
      # match through the route the response
      # compute response
      #
      # if yes
      #   send info profile to user
      # else no
      #   send info statement
      #
      #
      render :create, status: :created
    else
     render_error
   end
  end

  private

  # def check_profile_false
  #   if current_user.profile == true
  #     redirect_to root_path()
  #   end
  # end

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


