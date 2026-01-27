class LegalEntity < ApplicationRecord
  # Associations
  belongs_to :tenant
  belongs_to :legal_entity_type, optional: true

  # Validations
  validates :country_code, presence: true, length: { is: 2 }
  validates :legal_name, presence: true
  validates :status, presence: true
  validate :validate_country_allowed_by_type
  validate :validate_tenant_consistency
  validate :validate_tax_id_uniqueness

  # Enums
  enum :status, { active: "active", inactive: "inactive" }

  # Constants
  STATUSES = statuses.keys

  # Callbacks
  before_validation :normalize_country_code
  before_validation :normalize_tax_id

  private

  def normalize_country_code
    self.country_code = country_code.to_s.upcase if country_code.present?
  end

  def normalize_tax_id
    return if tax_id_raw.blank?

    # Normalización básica: remover espacios, guiones y caracteres especiales
    self.tax_id_normalized = tax_id_raw.to_s.gsub(/[\s\-\.]/, "").upcase
  end

  def validate_country_allowed_by_type
    return if legal_entity_type.blank?
    return if country_code.blank?

    unless legal_entity_type.country_allowed?(country_code)
      errors.add(:country_code, "is not allowed for this legal entity type")
    end
  end

  def validate_tenant_consistency
    return if legal_entity_type.blank?

    if legal_entity_type.tenant_id != tenant_id
      errors.add(:legal_entity_type, "must belong to the same tenant")
    end
  end

  def validate_tax_id_uniqueness
    return if tax_id_normalized.blank?

    existing = LegalEntity
      .where(tenant_id: tenant_id, country_code: country_code, tax_id_normalized: tax_id_normalized)
      .where.not(id: id)
      .exists?

    if existing
      errors.add(:tax_id_normalized, "already exists for this tenant and country")
    end
  end
end
