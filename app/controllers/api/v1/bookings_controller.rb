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
    # receive the selected date

     selected_date = params[:q]
      #binding.pry
      #selected_date.to_date.to_formatted_s(:rfc822) #=> "14 Aug 2019"
     # selected_date.to_datetime.to_formatted_s(:rfc822) => "Wed, 14 Aug 2019 12:24:35 +0000"
      res =  selected_date.to_date.to_formatted_s(:rfc822)

      end_point = res.to_date + 1.day
     # binding.pry
    @booking = Booking.where(profile_id: params[:profile_id]).where("start_time >= ?  AND end_time <= ?", res, end_point )
      #binding.pry
    # time_start_array = []
    # time_duration_array = []
    # time_end_array = []
    #binding.pry
    # @booking.each do |time|
    #   time_start_array << time.start_time
    #   time_duration_array << time.duration
    #   time_end_array << time.end_time
    # end

    # time_start_array.each_with_index do |time, i|
    #    p time_duration_array[i]

    # end

    # binding.pry
    #binding.pry
    #create a array with each 30 min between start and end booking
    #and all from 00:00 to current time if current date
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


