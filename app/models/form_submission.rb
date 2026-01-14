class FormSubmission < ApplicationRecord
  include FormSubmission::StatusEnum

  belongs_to :form_template
  has_many :form_submission_values, dependent: :destroy
  accepts_nested_attributes_for :form_submission_values,
                                  allow_destroy: true

  after_initialize :set_default_status, if: :new_record?

  private

  def set_default_status
    self.status ||= "draft"
  end
end
