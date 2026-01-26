class AddSlugToTenant < ActiveRecord::Migration[8.0]
  def change
    add_column :tenants, :slug, :string, null: true

    add_index :tenants, :slug, unique: true
    add_index :form_templates, [ :tenant_id, :slug ], unique: true
  end
end
