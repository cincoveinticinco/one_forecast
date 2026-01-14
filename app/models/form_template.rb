class FormTemplate < ApplicationRecord
  belongs_to :tenant
  has_many :form_fields, dependent: :destroy, inverse_of: :form_template
  has_many :form_submissions, dependent: :destroy, inverse_of: :form_template

  ORDERABLE_COLUMNS = %w[created_at updated_at name slug status template_type published_at archived_at].freeze

  # Enums could be added here for template_type, status, access_type
  enum :template_type, {
    vendor_creation: "vendor creation",
    vendor_update: "vendor update",
    vendor_onboarding: "vendor onboarding"
  }, suffix: true

  enum :access_type, {
    internal: "internal",
    public_token: "public with token"
  }, suffix: true

  enum :status, {
    draft: "draft",
    published: "published",
    archived: "archived"
  }, suffix: true

  validates :name, :slug, :template_type, :status, :access_type, presence: true
  validates :slug, uniqueness: { scope: :tenant_id }
end
