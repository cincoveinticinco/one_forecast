class CreateLegalEntityTypes < ActiveRecord::Migration[8.0]
  def change
    create_table :legal_entity_types do |t|
      t.references :tenant, null: false, foreign_key: true, index: true
      t.string :key, null: false
      t.string :name, null: false
      t.string :status, null: false, default: "active"
      t.text :allowed_country_codes
      t.text :not_allowed_country_codes

      t.timestamps
    end

    add_index :legal_entity_types, [:tenant_id, :key], unique: true
  end
end
