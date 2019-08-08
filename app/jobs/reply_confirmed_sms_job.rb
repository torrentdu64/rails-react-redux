class ReplyConfirmedSmsJob < ApplicationJob
  queue_as :default

  def perform(booking_id, user_id,  profile_id)
    @booking = Booking.find(booking_id)
    @user = User.find(user_id)
    @profile = Profile.find(profile_id)
   @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
    message = "Your Booking is confirm at #{@booking.start_time} with #{@profile.name}"  #is your verification code.
    response = @sms.send(message, "+642041845759" )
  end
end
