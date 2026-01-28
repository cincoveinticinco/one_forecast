class CreateLegalEntities < ActiveRecord::Migration[8.0]
  def change
    create_table :legal_entities do |t|
      t.references :tenant, null: false, foreign_key: true, index: true
      t.string :country_code, limit: 2, null: false
      t.references :legal_entity_type, null: true, foreign_key: true
      t.string :tax_id_raw
      t.string :tax_id_normalized
      t.string :legal_name, null: false
      t.string :status, null: false, default: "active"

      t.timestamps
    end

    add_index :legal_entities, [:tenant_id, :country_code, :tax_id_normalized], name: "index_legal_entities_on_tenant_country_tax"
  end
end
