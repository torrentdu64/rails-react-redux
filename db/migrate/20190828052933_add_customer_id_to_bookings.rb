class AddCustomerIdToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :customer_stripe_id, :string
  end
end
