class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.string :name
      t.text :description
      t.string :phone

      t.timestamps
    end
  end
end
