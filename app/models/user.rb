class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :bookings
  has_many :profiles

  validates :phone, presence: true, format: { with: PHONE_REGEX }

  attr_accessor :code
  attr_accessor :profile_id
end
