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
      # phone from Profile
      # set phone number for profile and user
      @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
      message = " make reservation reply Yes or No  "  #is your verification code.
      response = @sms.send(message, "+642041845759" )
      p "================================="
      p @sms
      p "====================================="
      p response
      res = JSON.parse response.raw.options[:response_body]
      #record message_id to booking
      @message_id = res["message_id"]

      @booking = @booking.update(message_id: @message_id)
      binding.pry
      p "====================================="

      render :create, status: :created
    else
     render_error
   end
  end

  def reply
      # in-put => message_id
      # @booking = booking.find_by(message_id: message_id)
      # @user = User.fin_by(id: @booking.user_id )
      # if yes
      #   payment.charge
      #   send sms info and charge
      # else no
      #   send info no charge
      # end
      #
      #
      # reply correct user
     @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
     message = " ping pong hot dog"  #is your verification code.
     response = @sms.send(message, "+642041845759" )

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


