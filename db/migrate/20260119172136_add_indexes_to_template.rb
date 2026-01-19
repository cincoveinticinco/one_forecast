class AddIndexesToTemplate < ActiveRecord::Migration[8.0]
  def change
    add_index :form_templates, :status
    add_index :form_templates, :template_type
    add_index :form_templates, :access_type
    add_index :form_templates, :slug
    add_index :form_templates, :name
  end
end
