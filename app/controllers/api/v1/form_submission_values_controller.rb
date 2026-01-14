class Api::V1::FormSubmissionValuesController < ApplicationController
  before_action :set_form_submission

  def create
    value = @form_submission.form_submission_values.new(value_params)

    if value.save
      render json: value, status: :created
    else
      render json: { errors: value.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_form_submission
    @form_submission = FormSubmission.find(params[:form_submission_id])
  end

  def value_params
    params.require(:form_submission_value).permit(
      :form_field_id,
      value: {}
    )
  end
end
