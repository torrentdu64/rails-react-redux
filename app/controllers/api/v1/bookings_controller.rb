class Api::V1::BookingsController < Api::V1::BaseController
  before_action :set_profile

  before_action :set_booking, only: [:stripe_customer]
  skip_before_action :authenticate_user!, only: [:reply]

  def stripe_customer

    customer = Stripe::Customer.create(
      source: params[:token][:id],
      email:  current_user.email
    )
    # binding.pry
    @booking.customer_stripe_id = customer.id
    # binding.pry
    @booking.state = 'pending'
    @booking.amount_cents =  @profile.price_cents
    authorize @booking
    if @booking.save(validate: false)
    # binding.pry
      RequestProfileSmsJob.perform_later(@booking.id)
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
    @booking.user = current_user
    authorize @booking
    start_time = @booking.start_time
    end_time =   @booking.start_time
    @booking.end_time = @booking.start_time.to_datetime + Time.parse("#{@booking.duration}").seconds_since_midnight.seconds
    @booking.state = 'create'
    # binding.pry
    if @booking.save # see Message.as_json method
      render :create, status: :created
    else
     render_error
   end
  end

  ## reply and charge

  def reply
      p "======================================"
      p response = ReplySmsJob.perform_later(params["message_id"], params["response"])
      p "======================================"
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
    now = DateTime.parse(selected_date).in_time_zone("Pacific/Auckland") + 12*60*60  #.strftime("%H:%M")
    from = DateTime.parse(res).in_time_zone("Pacific/Auckland")  + 12*60*60 #.strftime("%H:%M")
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


