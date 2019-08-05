class AddVerifToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :phone_verif, :boolean, default: false
  end
end
