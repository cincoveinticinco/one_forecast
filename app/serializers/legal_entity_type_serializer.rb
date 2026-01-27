class LegalEntityTypeSerializer
  def initialize(legal_entity_types)
    @legal_entity_types = legal_entity_types
  end

  def as_json(*)
    if legal_entity_types.respond_to?(:each)
      legal_entity_types.map { |type| serialize_type(type) }
    else
      serialize_type(legal_entity_types)
    end
  end

  private

  attr_reader :legal_entity_types

  def serialize_type(type)
    {
      id: type.id,
      tenant_id: type.tenant_id,
      key: type.key,
      name: type.name,
      status: type.status,
      allowed_country_codes: type.allowed_country_codes,
      not_allowed_country_codes: type.not_allowed_country_codes,
      legal_entities_count: type.legal_entities.count,
      created_at: type.created_at,
      updated_at: type.updated_at
    }
  end
end
