class ReplyDeclinedSmsJob < ApplicationJob
  queue_as :default

  def perform(profile_id, user_id)
   @profile = Profile.find(profile_id)
   @user = User.find(user_id)
   @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
    message = "Your Booking is declined with #{@profile.name}"  #is your verification code.
    response = @sms.send(message, "+642041845759" )
  end
end
