class Profile < ApplicationRecord
  has_many :bookings

  belongs_to :user

  mount_uploader :photo, PhotoUploader

  after_create :broadcast_message

   def as_json(options = {})
    {
      id: id,
      name: name,
      description: description,
      created_at: created_at
    }
  end

   private

   def broadcast_message
    ActionCable.server.broadcast("channel_index", self)
  end
end
