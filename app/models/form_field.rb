class FormField < ApplicationRecord
  # Concerns
  include FieldTypeEnum

  # Associations
  belongs_to :form_template
  belongs_to :parent_field, class_name: "FormField", optional: true
  has_many :form_submission_values

  has_many :child_fields,
           class_name: "FormField",
           foreign_key: :parent_field_id,
           dependent: :destroy,
           inverse_of: :parent_field

  # Validations
  validates :key, presence: true, uniqueness: { scope: :form_template_id }
  validates :label, presence: true
  validates :order_index, presence: true
end
