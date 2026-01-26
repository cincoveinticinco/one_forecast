class FormTemplate < ApplicationRecord
  extend FriendlyId
  # Concerns
  include TemplateEnum
  # Associations
  belongs_to :tenant
  belongs_to :workflow, optional: true

  has_many :form_fields, dependent: :restrict_with_error, inverse_of: :form_template
  has_many :input_fields, -> {
    where.not(field_type: [ "heading", "subheading", "paragraph", "section", "block" ])
      .order(:order_index)
  }, class_name: "FormField"
  has_many :selectable_fields, -> {
    where(field_type: [ "select", "multiselect" ]).order(:order_index)
  }, class_name: "FormField"
  has_many :form_submissions, dependent: :restrict_with_error, inverse_of: :form_template

  friendly_id :slug, use: :slugged

  # Validations
  validates :name, :slug, presence: true
  validates :slug, uniqueness: { scope: :tenant_id }
  validates :slug,
          format: {
            with: /\A[a-zA-Z0-9_-]+\z/,
            message: :invalid_slug_format
          }

  TEMPLATE_TYPES = template_types.keys
  STATUSES       = statuses.keys
  ACCESS_TYPES   = access_types.keys

  ORDERABLE_COLUMNS = %w[created_at updated_at name slug status template_type published_at archived_at].freeze
end
