class LegalEntityType < ApplicationRecord
  # Associations
  belongs_to :tenant
  has_many :legal_entities, dependent: :restrict_with_error, inverse_of: :legal_entity_type

  # Validations
  validates :key, presence: true, uniqueness: { scope: :tenant_id }
  validates :name, presence: true
  validates :status, presence: true
  validate :validate_country_codes_coherence

  # Enums
  enum :status, { active: "active", inactive: "inactive" }

  # Constants
  STATUSES = statuses.keys

  # Callbacks
  before_validation :normalize_country_codes

  private

  def normalize_country_codes
    self.allowed_country_codes = normalize_country_array(allowed_country_codes) if allowed_country_codes.present?
    self.not_allowed_country_codes = normalize_country_array(not_allowed_country_codes) if not_allowed_country_codes.present?
  end

  def normalize_country_array(codes)
    return [] if codes.blank?

    codes_array = codes.is_a?(String) ? JSON.parse(codes) : codes
    codes_array.map(&:to_s).map(&:upcase).uniq
  rescue JSON::ParserError
    []
  end

  def validate_country_codes_coherence
    return if allowed_country_codes.blank? && not_allowed_country_codes.blank?

    allowed = Array(allowed_country_codes)
    not_allowed = Array(not_allowed_country_codes)

    intersection = allowed & not_allowed
    if intersection.any?
      errors.add(:base, "A country cannot be in both allowed and not_allowed lists: #{intersection.join(', ')}")
    end
  end

  def country_allowed?(country_code)
    return false if country_code.blank?

    normalized_code = country_code.to_s.upcase
    not_allowed = Array(not_allowed_country_codes)
    allowed = Array(allowed_country_codes)

    # Si está en la lista de no permitidos, se bloquea
    return false if not_allowed.include?(normalized_code)

    # Si hay lista de permitidos, debe estar incluido
    return allowed.include?(normalized_code) if allowed.any?

    # Si no hay restricciones, se permite
    true
  end
end
