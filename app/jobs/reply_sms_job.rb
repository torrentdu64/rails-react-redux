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
        @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
        message = "Your Booking is confirm at #{@booking.start_time} with #{@profile.name}"  #is your verification code.
        response = @sms.send(message, "+642041845759" )
       elsif declined
      #   send info no charge
       @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
       message = "Your Booking is declined with #{@profile.name}"  #is your verification code.
       response = @sms.send(message, "+642041845759" )
       end
  end
end
