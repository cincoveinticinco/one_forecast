require "test_helper"

class Api::V1::FormTemplatesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tenant = Tenant.create!(name: "TestTenant")
    @template = FormTemplate.create!(name: "T1", tenant: @tenant)
  end

  test "should create form_template with target_entity" do
    post "/api/v1/form_templates", params: {
      form_template: {
        name: "T2",
        tenant_id: @tenant.id,
        target_entity: "Vendor"
      }
    }
    assert_response :success
    json = JSON.parse(@response.body)
    assert_equal "Vendor", json["data"]["target_entity"] || json["data"].first["target_entity"]
  end

  test "should not create with invalid target_entity" do
    post "/api/v1/form_templates", params: {
      form_template: {
        name: "T3",
        tenant_id: @tenant.id,
        target_entity: "Invalid"
      }
    }
    assert_response 422
    json = JSON.parse(@response.body)
    assert_includes json["errors"].join, "Target entity"
  end

  test "should update target_entity" do
    patch "/api/v1/form_templates/#{@template.id}", params: {
      form_template: { target_entity: "LegalEntity" }
    }
    assert_response :success
    json = JSON.parse(@response.body)
    assert_equal "LegalEntity", json["data"]["target_entity"]
  end

  test "should show target_entity in show" do
    @template.update!(target_entity: "Vendor")
    get "/api/v1/form_templates/#{@template.id}"
    assert_response :success
    json = JSON.parse(@response.body)
    assert_equal "Vendor", json["data"]["target_entity"]
  end

  test "should filter by target_entity in index" do
    FormTemplate.create!(name: "T4", tenant: @tenant, target_entity: "Vendor")
    get "/api/v1/form_templates", params: { target_entity: "Vendor", tenant_id: @tenant.id }
    assert_response :success
    json = JSON.parse(@response.body)
    assert json["data"].all? { |t| t["target_entity"] == "Vendor" }
  end
end
