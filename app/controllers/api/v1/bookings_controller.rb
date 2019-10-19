class Api::V1::BookingsController < Api::V1::BaseController
  before_action :set_profile

  before_action :set_booking, only: [:stripe_customer]
  skip_before_action :authenticate_user!, only: [:reply]

  def stripe_customer
    binding.pry

    begin
      # Use Stripe's library to make requests...
      customer = Stripe::Customer.create(
          source: params[:token][:id],
          email:  current_user.email
      )
    rescue Stripe::CardError => e
      puts "Status is: #{e.http_status}"
      puts "Type is: #{e.error.type}"
      puts "Charge ID is: #{e.error.charge}"
      # The following fields are optional
      puts "Code is: #{e.error.code}" if e.error.code
      puts "Decline code is: #{e.error.decline_code}" if e.error.decline_code
      puts "Param is: #{e.error.param}" if e.error.param
      puts "Message is: #{e e.error.message}" if e.error.message
    rescue Stripe::RateLimitError => e
      # Too many requests made to the API too quickly
      p e
    rescue Stripe::InvalidRequestError => e
      # Invalid parameters were supplied to Stripe's API
      #
      p e
    rescue Stripe::AuthenticationError => e
      # Authentication with Stripe's API failed
      # (maybe you changed API keys recently)
      #
      p e
    rescue Stripe::APIConnectionError => e
      # Network communication with Stripe failed
      #
      p e
    rescue Stripe::StripeError => e
      # Display a very generic error to the user, and maybe send
      # yourself an email
      #
      p e
    rescue => e
      # Something else happened, completely unrelated to Stripe
      p e
    end
    binding.pry
    # binding.pry
    @booking.customer_stripe_id = customer.id
    # binding.pry
    @booking.state = 'pending'
    @booking.amount_cents =  @profile.price_cents
    authorize @booking
    binding.pry

    if @booking.save(validate: false)
    # binding.pry
            #RequestProfileSmsJob.perform_later(@booking.id) uncomment here !!!!!!
    # ==================================
      # @booking = Booking.find(@booking.id)
      # @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
      # message = " make reservation reply Yes or No  "  #is your verification code.
      # response = @sms.send(message, "+642041845759" )
      # res = JSON.parse response.raw.options[:response_body]
      # @message_id = res["message_id"]
      # @booking = @booking.update_columns(message_id: @message_id)
    # ==================================
    render :stripe_customer, status: :created
    else
      render_error
    end

  end


  def show_api
    skip_authorization
  end







  def create


    @booking = Booking.new(booking_params)
    @booking.user_id = current_user.id
    authorize @booking
    start_time = @booking.start_time
    end_time =   @booking.start_time
    @booking.end_time = @booking.start_time.to_datetime + Time.parse("#{@booking.duration}").seconds_since_midnight.seconds
    @booking.state = 'create'
     #binding.pry
    if @booking.save # see Message.as_json method
      render :create, status: :created
    else
     render_error
   end
  end

  ## reply and charge

  def reply
       response = ReplySmsJob.perform_later(params["message_id"], params["response"])
      # ============================================================
      # @booking = Booking.find_by(message_id: params["message_id"])
      # @user = User.find_by(id: @booking.user_id )
      # @profile = Profile.find_by(id: @booking.profile_id )

      # affirmation = ["yes" , "Yes", "ok", "Ok", "y", "Y", "YES", "接收", "接 收", "接受" , "接 受"]
      # negation = ["no" , "No", "N", "NO", "n", "na", "Na", "NA", "不接收", "不接受" ]

      # confirmed = affirmation.select{|x| x.match(params["response"]) }.length > 0
      # declined = negation.select{|x| x.match(params["response"]) }.length > 0

      # if confirmed
      # #   payment.charge
      # #   send sms info and charge
      #   charge = Stripe::Charge.create(
      #     customer:     @booking.customer_stripe_id,   # You should store this customer id and re-use it.
      #     amount:       1000,
      #     description:  "Payment for booking #{@profile.name} for order #{@booking.id}",
      #     currency:     "nzd"
      #   )

      #   @booking.payment = charge.to_json
      #   @booking.state = 'paid'
      #   @booking.save(validate: false)

      #     # rescue Stripe::CardError => e
      #     #   p e
      #     # end

      #   @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
      #   message = "Your Booking is confirm at #{@booking.start_time} with #{@profile.name}"  #is your verification code.
      #   response = @sms.send(message, "+642041845759" )

      # elsif declined

      #   ## declined so destroy the booking
      #   @booking.destroy
      # #   send info no charge
      #  @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
      #  message = "Your Booking is declined with #{@profile.name}"  #is your verification code.
      #  response = @sms.send(message, "+642041845759" )
      # end
      # ============================================================
      @booking = Booking.find_by(message_id: params["message_id"])
      authorize @booking
      #binding.pry
      render :reply, status: :created
  end



  def time_iterate(start_time, end_time, step, &block)
      begin
        yield(start_time)
      end while (start_time += step) <= end_time
  end

  def busy_till_now
    selected_date = params[:q]
    res =  selected_date.to_date.strftime("%Y-%m-%d 00:00:00 tt")
    now = DateTime.parse(selected_date).in_time_zone("Pacific/Auckland") + 11*60*60  # here handle timezone 12*60*60
    from = DateTime.parse(res).in_time_zone("Pacific/Auckland")  + 11*60*60 # here handle timezone 12*60*60
    busy_now = []
    time_iterate(from, now, 30.minutes) do |t|
       busy_now << t
    end
    @busy_now = busy_now
    # binding.pry
    skip_authorization

    render :busy_till_now, status: 200
  end

  def booking_time
    selected_date = params[:q]

    selected_date = selected_date.to_date - 1.day

    res =  selected_date.to_date.strftime("%Y-%m-%d 00:00:00")

    end_point = res.to_date + 2.day

    format_end_point = end_point.strftime("%Y-%m-%d 00:00:00")

    @booking = Booking.where(profile_id: params[:profile_id]).where("start_time  BETWEEN ? AND ?", res, format_end_point )
     # binding.pry
    authorize @booking
    #binding.pry
    # binding.pry
    render :booking_time, status: 200
  end

  def destroy
    @booking = Booking.find_by(id: params[:id])
    authorize @booking
    @booking.destroy
    head :no_content
  end

  private

  def set_booking
    @booking = Booking.find_by(id: params[:booking_id])
  end


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


