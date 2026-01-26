class FormSubmissionValue < ApplicationRecord
  belongs_to :form_submission
  belongs_to :form_field

  validates :value, presence: true
  validates :form_field_id,
            uniqueness: { scope: :form_submission_id }
end
