class AddPriceToProfiles < ActiveRecord::Migration[5.2]
  def change
    add_monetize :profiles, :price, currency: { present: false }
  end
end
