class Tenant < ApplicationRecord
  extend FriendlyId
  include Slugable

  validates :name, presence: true
  has_many :form_templates, dependent: :destroy, inverse_of: :tenant
  has_many :workflows, dependent: :destroy, inverse_of: :tenant

  configure_slug_uniqueness

  friendly_id :slug, use: :slugged
end
