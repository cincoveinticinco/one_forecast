class CreateFormTemplates < ActiveRecord::Migration[8.0]
  def change
    create_table :form_templates do |t|
      t.references :tenant, null: false, foreign_key: true
      t.string :name, null: false
      t.string :slug, null: false
      t.string :template_type, null: false
      t.string :status, null: false
      t.string :access_type, null: false
      t.datetime :published_at
      t.datetime :archived_at

      t.timestamps
    end
    add_index :form_templates, [ :tenant_id, :slug ], unique: true
    add_index :form_templates, [ :tenant_id, :template_type ]
    add_index :form_templates, [ :tenant_id, :status ]
  end
end
