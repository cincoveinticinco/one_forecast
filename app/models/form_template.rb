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
  validate :only_draft_can_be_updated, on: :update

  TEMPLATE_TYPES = template_types.keys
  STATUSES       = statuses.keys
  ACCESS_TYPES   = access_types.keys

  private

  def only_draft_can_be_updated
    return if draft?

    errors.add(:base, "Only draft templates can be updated")
  end
end
