class FormSubmission < ApplicationRecord
  include FormSubmission::StatusEnum

  belongs_to :form_template
  has_many :form_submission_values, dependent: :destroy
  accepts_nested_attributes_for :form_submission_values,
                                  allow_destroy: true

  after_initialize :set_default_status, if: :new_record?

  scope :search_by_submission, ->(search_term) {
    return all if search_term.blank?

    sanitized_term = search_term.to_s.strip
    return all if sanitized_term.empty?

    joins(:form_submission_values)
      .where("form_submission_values.value LIKE ?", "%#{sanitize_sql_like(sanitized_term)}%")
      .distinct
  }

  private

  def set_default_status
    self.status ||= "draft"
  end
end
