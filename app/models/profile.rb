class Profile < ApplicationRecord
  has_many :bookings, dependent: :delete_all

  belongs_to :user

  mount_uploader :photo, PhotoUploader
  # validates_format_of :photo,:allow_blank => true, :with => %r{\.(png|jpg|jpeg)\z}i, :message => "wrong format"
  validates_format_of :photo, presence: true , :with => %r{\.(png|jpg|jpeg)\z}i, :message => "wrong format"

  after_create :broadcast_message

  validates :phone, presence: true, format: { with: PHONE_REGEX }
  monetize :price_cents

   def as_json(options = {})
    {
      id: id,
      name: name,
      description: description,
      phone: phone,
      photo: photo
    }
  end

   private

   def broadcast_message
    ActionCable.server.broadcast("channel_index", self)
  end
end
