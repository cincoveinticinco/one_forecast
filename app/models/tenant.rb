class Tenant < ApplicationRecord
  extend FriendlyId

  validates :name, presence: true
  has_many :form_templates, dependent: :destroy, inverse_of: :tenant
  has_many :workflows, dependent: :destroy, inverse_of: :tenant

  validates :slug, uniqueness: true
  validates :slug,
          format: {
            with: /\A[a-zA-Z0-9_-]+\z/,
            message: :invalid_slug_format
          }

  friendly_id :slug, use: :slugged
end
