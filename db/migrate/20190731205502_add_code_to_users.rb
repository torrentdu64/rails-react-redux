class AddCodeToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :code_conf, :string
  end
end
