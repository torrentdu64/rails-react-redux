class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.time :duration
      t.references :user, foreign_key: true
      t.references :profile, foreign_key: true

      t.timestamps
    end
  end
end
