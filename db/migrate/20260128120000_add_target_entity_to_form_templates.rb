class AddTargetEntityToFormTemplates < ActiveRecord::Migration[6.1]
  def change
    # Best effort: add_column with :after if supported (MySQL), else normal add_column
    if ActiveRecord::Base.connection.adapter_name.downcase.include?("mysql")
      execute "ALTER TABLE form_templates ADD COLUMN target_entity VARCHAR(255) NULL AFTER slug;"
    else
      add_column :form_templates, :target_entity, :string, null: true
    end
    add_index :form_templates, [:tenant_id, :target_entity], name: "index_form_templates_on_tenant_id_and_target_entity"
  end
end
