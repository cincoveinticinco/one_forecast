class LegalEntitySerializer
  def initialize(legal_entities)
    @legal_entities = legal_entities
  end

  def as_json(*)
    if legal_entities.respond_to?(:each)
      legal_entities.map { |entity| serialize_entity(entity) }
    else
      serialize_entity(legal_entities)
    end
  end

  private

  attr_reader :legal_entities

  def serialize_entity(entity)
    {
      id: entity.id,
      tenant_id: entity.tenant_id,
      country_code: entity.country_code,
      legal_entity_type_id: entity.legal_entity_type_id,
      legal_entity_type: entity.legal_entity_type&.name,
      tax_id_raw: entity.tax_id_raw,
      tax_id_normalized: entity.tax_id_normalized,
      legal_name: entity.legal_name,
      status: entity.status,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    }
  end
end
