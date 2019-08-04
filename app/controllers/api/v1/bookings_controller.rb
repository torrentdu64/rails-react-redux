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

      @booking = @booking.update_columns(message_id: @message_id)

      p "====================================="

      render :create, status: :created
    else
     render_error
   end
  end

  def reply

      # in-put => message_id
      p message_id = params["message_id"]
      p response = params["response"]
      # make one request to db refacto
      @booking = Booking.find_by(message_id: message_id)
      @user = User.find_by(id: @booking.user_id )
      @profile = Profile.find_by(id: @booking.profile_id )

      affirmation = ["yes" , "Yes", "ok", "Ok", "y", "Y", "YES", "接收", "接 收", "接受" , "接 受"]
      negation = ["no" , "No", "N", "NO", "n", "na", "Na", "NA", "不接收", "不接受" ]

      confirmed = affirmation.select{|x| x.match(response) }.length > 0
      declined = negation.select{|x| x.match(response) }.length > 0

       if confirmed
      #   payment.charge
      #   send sms info and charge
        @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
        message = "Your Booking is confirm at #{@booking.start_time} with #{@profile.name}"  #is your verification code.
        response = @sms.send(message, "+642041845759" )

       elsif negation
      #   send info no charge
        @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
        message = "Your Booking is declined with #{@profile.name}"  #is your verification code.
        response = @sms.send(message, "+642041845759" )

       end

      render :reply, status: :created
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


