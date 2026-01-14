class FormField < ApplicationRecord
  # Associations
  belongs_to :form_template
  belongs_to :parent_field, class_name: "FormField", optional: true

  has_many :child_fields,
           class_name: "FormField",
           foreign_key: :parent_field_id,
           dependent: :destroy,
           inverse_of: :parent_field

  # Enums (strings)
  enum :field_type, {
    # content (no input)
    heading: "heading",
    subheading: "subheading",
    paragraph: "paragraph",

    # structure
    section: "section",
    repeatable_group: "repeatable_group",
    block: "block",

    # inputs
    text: "text",
    textarea: "textarea",
    number: "number",
    date: "date",
    select: "select",
    multiselect: "multiselect",
    checkbox: "checkbox",
    email: "email",
    phone: "phone"
  }, suffix: true

  enum :block_type, {
    legal_entity_vendor: "legal_entity"
}

  # Validations
  validates :key, presence: true, uniqueness: { scope: :form_template_id }
  validates :label, presence: true
  validates :field_type, presence: true
  validates :order_index, presence: true

  # Block-specific
  validates :block_type, presence: true, if: :block_field_type?

  # Select/radio-like require options (mínimo)
  validate :options_required_for_option_fields

  # Content fields should not be required / mapped (opcional pero recomendado)
  validate :content_fields_cannot_be_required
  validate :content_fields_should_not_have_mapping

  private

  def options_required_for_option_fields
    return unless field_type.in?(%w[select multiselect])

    if options.blank? || options["items"].blank?
      errors.add(:options, "must include items for select/multiselect fields")
    end
  end

  def content_fields_cannot_be_required
    return unless field_type.in?(%w[heading subheading paragraph])

    errors.add(:required, "must be false for content fields") if required?
  end

  def content_fields_should_not_have_mapping
    return unless field_type.in?(%w[heading subheading paragraph section])

    errors.add(:mapping, "must be blank for non-input fields") if mapping.present?
  end
end
