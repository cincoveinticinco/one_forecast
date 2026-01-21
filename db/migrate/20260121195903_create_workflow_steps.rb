class CreateWorkflowSteps < ActiveRecord::Migration[8.0]
  def change
    create_table :workflow_steps do |t|
      t.references :workflow, null: false, foreign_key: true
      t.string :name
      t.string :step_type
      t.string :color
      t.integer :order_index
      t.json :assignees
      t.json :actions_enabled
      t.json :actions
      t.references :form_template, null: true, foreign_key: true
      t.json :file_upload_settings

      t.timestamps
    end
    add_index :workflow_steps, [:workflow_id, :order_index]

  end
end
