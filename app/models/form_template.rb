class FormTemplate < ApplicationRecord
  # Concerns
  include TemplateEnum
  # Associations
  belongs_to :tenant
  has_many :form_fields, dependent: :destroy, inverse_of: :form_template
  has_many :form_submissions, dependent: :destroy, inverse_of: :form_template

  ORDERABLE_COLUMNS = %w[created_at updated_at name slug status template_type published_at archived_at].freeze

  # Validations
  validates :name, :slug, presence: true
  validates :slug, uniqueness: { scope: :tenant_id }
end
