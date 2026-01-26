class AddUniquessSubmissionsValues < ActiveRecord::Migration[8.0]
  def change
    add_index :form_submission_values,
          [ :form_submission_id, :form_field_id ],
          unique: true
  end
end
