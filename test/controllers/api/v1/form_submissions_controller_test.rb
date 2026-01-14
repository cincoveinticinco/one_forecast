require "test_helper"

class Api::V1::FormSubmissionsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
end

    assert_includes response.parsed_body["errors"], "Status is not included in the list"
  end

  test "should update form submission with nested form submission values" do
    form_field = form_fields(:one)
    patch api_v1_form_template_form_submission_url(@form_template, @form_submission),
          params: {
            form_submission: {
              form_submission_values_attributes: [
                { form_field_id: form_field.id, value: "updated value" }
              ]
            }
          },
          as: :json

    assert_response :success
  end
end