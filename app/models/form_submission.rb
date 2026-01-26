class FormSubmission < ApplicationRecord
  include FormSubmission::StatusEnum

  belongs_to :form_template
  has_many :form_submission_values, dependent: :destroy
  accepts_nested_attributes_for :form_submission_values,
                                  allow_destroy: true

  after_initialize :set_default_status, if: :new_record?

  scope :search_by_submission, ->(search_terms) {
    return all if search_terms.blank?

    terms = normalize_search_terms(search_terms)
    return all if terms.empty?

    joins(:form_submission_values)
      .where(
        terms.map { "form_submission_values.value LIKE ?" }.join(" OR "),
        *terms.map { |term| "%#{sanitize_sql_like(term)}%" }
      )
      .distinct
  }

  def self.normalize_search_terms(search_terms)
    Array(search_terms)
      .flat_map { |term| term.to_s.split(/\s+/) }
      .map(&:strip)
      .reject(&:blank?)
  end

  private

  def set_default_status
    self.status ||= "draft"
  end
end
