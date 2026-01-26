class FormSubmission < ApplicationRecord
  include FormSubmission::StatusEnum

  belongs_to :form_template
  has_many :form_submission_values, dependent: :destroy
  accepts_nested_attributes_for :form_submission_values,
                                  allow_destroy: true

  after_initialize :set_default_status, if: :new_record?

  scope :search_by_submission, ->(search_terms) {
    return all if search_terms.blank?

    terms = search_terms.is_a?(String) ? search_terms.split(/\s+/) : Array(search_terms)
    terms = terms.map(&:strip).reject(&:blank?)

    return all if terms.empty?

    conditions = terms.map { "form_submission_values.value LIKE ?" }
    values = terms.map { |term| "%#{sanitize_sql_like(term)}%" }

    joins(:form_submission_values)
      .where(conditions.join(" OR "), *values)
      .distinct
  }

  private

  def set_default_status
    self.status ||= "draft"
  end
end
