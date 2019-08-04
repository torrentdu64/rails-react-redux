class AddMessageIdToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :message_id, :string
  end
end
