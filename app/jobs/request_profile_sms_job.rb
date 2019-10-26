class RequestProfileSmsJob < ApplicationJob
  queue_as :default

  def perform(booking_id)
      @booking = Booking.find(booking_id)
      @profile = Profile.find_by(id: @booking.profile_id )
      @sms = SmsApi.new(ENV['BURST_API_KEY'], ENV['BURST_API_SECRET'])
      message = " make reservation reply Yes or No  "  #is your verification code.
      response = @sms.send(message, "+642041845759" )
      res = JSON.parse response.raw.options[:response_body]
      @message_id = res["message_id"]
      @booking = @booking.update_columns(message_id: @message_id)
  end
end
