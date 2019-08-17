class Api::V1::BookingsController < Api::V1::BaseController
  before_action :set_profile
  skip_before_action :authenticate_user!, only: [:reply]



  def create

    p @booking = Booking.new(booking_params)
     p @booking.user = current_user
    p authorize @booking
    p "===================================================================="

    p "===================================================================="
    p @booking.end_time =  Time.strptime( @booking.start_time, '%m/%d/%Y %H:%M')
    p "===================================================================="
    p  set_date_end = @booking.end_time.to_datetime + Time.parse("#{@booking.duration}").seconds_since_midnight.seconds
    p @booking.end_time = Time.strptime(set_date_end, '%m/%d/%Y %H:%M')
    p "===================================================================="
    p @booking
    p "===================================================================="
    p "===================================================================="
    if @booking.save # see Message.as_json method
    #binding.pry
       #RequestProfileSmsJob.perform_later(@booking.id)
    p "===================================================================="
    p @booking
    p "===================================================================="

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

    selected_date = params[:q]
      #binding.pry
      #selected_date.to_date.to_formatted_s(:rfc822) #=> "14 Aug 2019"
     # selected_date.to_datetime.to_formatted_s(:rfc822) => "Wed, 14 Aug 2019 12:24:35 +0000"
    p res =  selected_date.to_date.strftime("%Y-%m-%d 00:00:00")

    p end_point = res.to_date + 1.day

    p format_end_point = end_point.strftime("%Y-%m-%d 00:00:00")



    p @booking = Booking.where(profile_id: params[:profile_id]).where("start_time  BETWEEN ? AND ?", res, format_end_point )

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
    params.require(:booking).permit(:start_time, :duration, :user_id, :profile_id)
  end

end


