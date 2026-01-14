class FormSubmissionValue < ApplicationRecord
  belongs_to :form_submission
  belongs_to :form_field

  validates :value, presence: true
end
