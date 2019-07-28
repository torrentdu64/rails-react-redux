class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :profile

  def as_json(options = {})


    {
      id: id,
      start_time: start_time,
      end_time: end_time,
      duration: duration,
      user_id: user_id,
      profile_id: profile_id
    }
  end

end

