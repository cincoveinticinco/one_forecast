require "test_helper"

class LegalEntityTest < ActiveSupport::TestCase
  setup do
    @tenant = tenants(:default)
    @legal_entity_type = @tenant.legal_entity_types.create!(
      key: "persona_natural",
      name: "Persona Natural",
      status: "active"
    )
  end

  test "should create legal entity with valid attributes" do
    entity = @tenant.legal_entities.build(
      legal_entity_type: @legal_entity_type,
      country_code: "CO",
      legal_name: "John Doe",
      tax_id_raw: "123456789",
      status: "active"
    )

    assert entity.valid?
    assert entity.save
  end

  test "should validate country_code presence" do
    entity = @tenant.legal_entities.build(
      legal_entity_type: @legal_entity_type,
      legal_name: "Test",
      status: "active"
    )

    assert_not entity.valid?
    assert_includes entity.errors[:country_code], "can't be blank"
  end

  test "should validate legal_name presence" do
    entity = @tenant.legal_entities.build(
      legal_entity_type: @legal_entity_type,
      country_code: "CO",
      status: "active"
    )

    assert_not entity.valid?
    assert_includes entity.errors[:legal_name], "can't be blank"
  end

  test "should normalize country_code to uppercase" do
    entity = @tenant.legal_entities.create!(
      legal_entity_type: @legal_entity_type,
      country_code: "co",
      legal_name: "Test",
      status: "active"
    )

    assert_equal "CO", entity.country_code
  end

  test "should normalize tax_id" do
    entity = @tenant.legal_entities.create!(
      legal_entity_type: @legal_entity_type,
      country_code: "CO",
      legal_name: "Test",
      tax_id_raw: "123-456.789",
      status: "active"
    )

    assert_equal "123456789", entity.tax_id_normalized
  end

  test "should validate tax_id uniqueness per tenant and country" do
    @tenant.legal_entities.create!(
      legal_entity_type: @legal_entity_type,
      country_code: "CO",
      legal_name: "First",
      tax_id_raw: "123456789",
      status: "active"
    )

    entity2 = @tenant.legal_entities.build(
      legal_entity_type: @legal_entity_type,
      country_code: "CO",
      legal_name: "Second",
      tax_id_raw: "123456789",
      status: "active"
    )

    assert_not entity2.valid?
    assert_includes entity2.errors[:tax_id_normalized], "already exists for this tenant and country"
  end

  test "should allow same tax_id in different countries" do
    @tenant.legal_entities.create!(
      legal_entity_type: @legal_entity_type,
      country_code: "CO",
      legal_name: "First",
      tax_id_raw: "123456789",
      status: "active"
    )

    entity2 = @tenant.legal_entities.build(
      legal_entity_type: @legal_entity_type,
      country_code: "US",
      legal_name: "Second",
      tax_id_raw: "123456789",
      status: "active"
    )

    assert entity2.valid?
    assert entity2.save
  end

  test "should validate country allowed by type" do
    type_with_restrictions = @tenant.legal_entity_types.create!(
      key: "restricted",
      name: "Restricted Type",
      status: "active",
      allowed_country_codes: ["CO", "US"]
    )

    entity = @tenant.legal_entities.build(
      legal_entity_type: type_with_restrictions,
      country_code: "MX",
      legal_name: "Test",
      status: "active"
    )

    assert_not entity.valid?
    assert_includes entity.errors[:country_code], "is not allowed for this legal entity type"
  end

  test "should validate tenant consistency with type" do
    tenant2 = Tenant.create!(name: "Other Tenant")
    type_from_other_tenant = tenant2.legal_entity_types.create!(
      key: "test",
      name: "Test",
      status: "active"
    )

    entity = @tenant.legal_entities.build(
      legal_entity_type: type_from_other_tenant,
      country_code: "CO",
      legal_name: "Test",
      status: "active"
    )

    assert_not entity.valid?
    assert_includes entity.errors[:legal_entity_type], "must belong to the same tenant"
  end

  test "should allow legal_entity_type to be nil" do
    entity = @tenant.legal_entities.build(
      country_code: "CO",
      legal_name: "Test",
      status: "active"
    )

    assert entity.valid?
    assert entity.save
  end
end
