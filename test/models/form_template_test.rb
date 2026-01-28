require "test_helper"

class FormTemplateTest < ActiveSupport::TestCase
  setup do
    @tenant = Tenant.create!(name: "TestTenant")
  end

  test "allows null target_entity" do
    template = FormTemplate.new(name: "T1", tenant: @tenant, target_entity: nil)
    assert template.valid?
  end

  test "allows Vendor as target_entity" do
    template = FormTemplate.new(name: "T2", tenant: @tenant, target_entity: "Vendor")
    assert template.valid?
  end

  test "allows LegalEntity as target_entity" do
    template = FormTemplate.new(name: "T3", tenant: @tenant, target_entity: "LegalEntity")
    assert template.valid?
  end

  test "rejects invalid target_entity" do
    template = FormTemplate.new(name: "T4", tenant: @tenant, target_entity: "Invalid")
    assert_not template.valid?
    assert_includes template.errors[:target_entity], "is not included in the list"
  end
end
