class Profile < ApplicationRecord
  has_many :bookings

  belongs_to :user

  mount_uploader :photo, PhotoUploader

  after_create :broadcast_message

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
