# Seeds para Legal Entity Types
puts "Creating Legal Entity Types..."

if Tenant.any?
  Tenant.all.each do |tenant|
    # Persona Natural
    tenant.legal_entity_types.find_or_create_by!(key: "persona_natural") do |type|
      type.name = "Persona Natural"
      type.status = "active"
    end

    # Persona Jurídica
    tenant.legal_entity_types.find_or_create_by!(key: "persona_juridica") do |type|
      type.name = "Persona Jurídica"
      type.status = "active"
    end

  end
else
end

