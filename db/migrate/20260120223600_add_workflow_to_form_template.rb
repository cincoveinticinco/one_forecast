class AddWorkflowToFormTemplate < ActiveRecord::Migration[8.0]
  def change
    add_reference :form_templates, :workflow, null: true, foreign_key: true
  end
end
