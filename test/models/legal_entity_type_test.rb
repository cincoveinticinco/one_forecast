require "test_helper"

class LegalEntityTypeTest < ActiveSupport::TestCase
  setup do
    @tenant = tenants(:default)
  end

  test "should create legal entity type with valid attributes" do
    type = @tenant.legal_entity_types.build(
      key: "persona_natural",
      name: "Persona Natural",
      status: "active"
    )

    assert type.valid?
    assert type.save
  end

  test "should validate key presence" do
    type = @tenant.legal_entity_types.build(name: "Test", status: "active")

    assert_not type.valid?
    assert_includes type.errors[:key], "can't be blank"
  end

  test "should validate name presence" do
    type = @tenant.legal_entity_types.build(key: "test", status: "active")

    assert_not type.valid?
    assert_includes type.errors[:name], "can't be blank"
  end

  test "should validate key uniqueness within tenant" do
    existing = @tenant.legal_entity_types.create!(
      key: "persona_natural",
      name: "Persona Natural",
      status: "active"
    )

    type = @tenant.legal_entity_types.build(
      key: "persona_natural",
      name: "Different Name",
      status: "active"
    )

    assert_not type.valid?
    assert_includes type.errors[:key], "has already been taken"
  end

  test "should allow same key in different tenants" do
    tenant2 = Tenant.create!(name: "Tenant 2")
    
    @tenant.legal_entity_types.create!(
      key: "persona_natural",
      name: "Persona Natural",
      status: "active"
    )

    type2 = tenant2.legal_entity_types.build(
      key: "persona_natural",
      name: "Persona Natural",
      status: "active"
    )

    assert type2.valid?
    assert type2.save
  end

  test "should normalize country codes" do
    type = @tenant.legal_entity_types.create!(
      key: "test",
      name: "Test",
      status: "active",
      allowed_country_codes: ["co", "us", "mx"]
    )

    assert_equal ["CO", "US", "MX"], type.allowed_country_codes
  end

  test "should validate country codes coherence" do
    type = @tenant.legal_entity_types.build(
      key: "test",
      name: "Test",
      status: "active",
      allowed_country_codes: ["CO", "US"],
      not_allowed_country_codes: ["CO", "MX"]
    )

    assert_not type.valid?
    assert_includes type.errors[:base], "A country cannot be in both allowed and not_allowed lists: CO"
  end

  test "country_allowed? should return false if in not_allowed list" do
    type = @tenant.legal_entity_types.create!(
      key: "test",
      name: "Test",
      status: "active",
      not_allowed_country_codes: ["US", "MX"]
    )

    assert_not type.country_allowed?("US")
    assert type.country_allowed?("CO")
  end

  test "country_allowed? should check allowed list if present" do
    type = @tenant.legal_entity_types.create!(
      key: "test",
      name: "Test",
      status: "active",
      allowed_country_codes: ["CO", "US"]
    )

    assert type.country_allowed?("CO")
    assert type.country_allowed?("US")
    assert_not type.country_allowed?("MX")
  end

  test "country_allowed? should allow all if no restrictions" do
    type = @tenant.legal_entity_types.create!(
      key: "test",
      name: "Test",
      status: "active"
    )

    assert type.country_allowed?("CO")
    assert type.country_allowed?("US")
    assert type.country_allowed?("MX")
  end

  test "should restrict deletion if has legal entities" do
    type = @tenant.legal_entity_types.create!(
      key: "test",
      name: "Test",
      status: "active"
    )

    @tenant.legal_entities.create!(
      legal_entity_type: type,
      country_code: "CO",
      legal_name: "Test Entity",
      status: "active"
    )

    assert_raises(ActiveRecord::DeleteRestrictionError) do
      type.destroy
    end
  end
end
