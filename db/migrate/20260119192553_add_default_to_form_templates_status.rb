class AddDefaultToFormTemplatesStatus < ActiveRecord::Migration[8.0]
  def change
    change_column_default :form_templates, :status, "draft"
    change_column_default :form_submissions, :status, "draft"
  end
end
