class Tenant < ApplicationRecord
  validates :name, presence: true
  has_many :form_templates, dependent: :destroy, inverse_of: :tenant
  has_many :workflows, dependent: :destroy, inverse_of: :tenant
end
