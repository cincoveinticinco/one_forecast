class CreateFormSubmissions < ActiveRecord::Migration[8.0]
  def change
    create_table :form_submissions do |t|
      t.references :form_template, null: false, foreign_key: true
      t.string :status, null: false

      t.datetime :submitted_at
      t.datetime :deleted_at

      t.timestamps
    end

    create_table :form_submission_values do |t|
      t.references :form_submission, null: false, foreign_key: true
      t.references :form_field, null: false, foreign_key: true
      t.json :value, null: false

      t.timestamps
    end
  end
end
