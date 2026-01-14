class CreateFormFields < ActiveRecord::Migration[8.0]
  def change
    create_table :form_fields do |t|
      # Relationship with the template
      t.references :form_template, null: false, foreign_key: true

      # Hierarchy (blocks / groups)
      t.references :parent_field, foreign_key: { to_table: :form_fields }

      # Field identity
      t.string :key, null: false
      t.text :label, null: false

      # Type and behavior
      t.string :field_type, null: false
      t.string :block_type

      # UI / UX
      t.boolean :required, null: false, default: false
      t.integer :order_index, null: false, default: 0
      t.string :placeholder
      t.text :help_text

      # Dynamic configuration
      t.json :options
      t.json :validations
      t.json :visibility_rules
      t.json :settings

      # Mapping to core / additionals
      t.json :mapping

      # System control
      t.boolean :is_system, null: false, default: false
      t.boolean :is_active, null: false, default: true

      t.timestamps
    end

    # Important indexes
    add_index :form_fields, [ :form_template_id, :key ], unique: true
    add_index :form_fields, [ :form_template_id, :parent_field_id, :order_index ]
    add_index :form_fields, :field_type
  end
end
