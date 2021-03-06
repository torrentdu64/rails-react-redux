class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :profile
  # before_save :set_start_time
  #
  # attr_accessor :busy_now
  monetize :amount_cents



  validate :validate_no_overlap_books_profile

  validates :start_time, presence: true, uniqueness: { scope: [:end_time , :profile_id, :user_id],
    message: "Sorry it looks like this Girl is currently unavailable,
     please book girl or another time ..." }

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

  private

  # def set_start_time
  #   self.start_time = time.now.in_time_zone(self.user.time_zone).to_time
  # end




  def validate_no_overlap_books_profile

      return if Booking.where('profile_id = ? AND (end_time > ? AND start_time < ?)',
        profile_id, start_time, end_time).none?
      errors.add(:start_time, 'Times overlap another girl for this book')
    end

end

