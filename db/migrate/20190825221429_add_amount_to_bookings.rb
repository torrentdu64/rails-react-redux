class AddAmountToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :state, :string
    add_column :bookings, :booking_sku, :string
    add_monetize :bookings, :amount, currency: { present: false }
    add_column :bookings, :payment, :jsonb
  end
end
