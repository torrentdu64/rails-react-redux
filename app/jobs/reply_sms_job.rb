class ReplySmsJob < ApplicationJob
  queue_as :default

  def perform(message_id, response)
    # in-put => message_id

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
        charge = Stripe::Charge.create(
          customer:     @booking.customer_stripe_id,   # You should store this customer id and re-use it.
          amount:       1000,
          description:  "Payment for booking #{@profile.name} for order #{@booking.id}",
          currency:     "nzd"
        )

        @booking.payment = charge.to_json
        @booking.state = 'paid'
        @booking.save(validate: false)

          # rescue Stripe::CardError => e
          #   p e
          # end

        @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
        message = "Your Booking is confirm at #{@booking.start_time} with #{@profile.name}"  #is your verification code.
        response = @sms.send(message, @user.phone )

      elsif declined

        ## declined so destroy the booking
        @booking.destroy
      #   send info no charge
       @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
       message = "Your Booking is declined with #{@profile.name}"  #is your verification code.
       response = @sms.send(message,  @user.phone )
      end
  end
end


