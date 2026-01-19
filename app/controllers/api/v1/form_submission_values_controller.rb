class Api::V1::FormSubmissionValuesController < ApplicationController
  before_action :set_form_template
  before_action :set_form_submission, only: :index
  before_action :set_form_submission_value, only: :show

  def index
    return render json: { error: 'Form submission not found' }, status: :not_found unless @form_submission

    render json: FormSubmissionValuesSerializer.new(@form_submission).as_json
  end

  def show
    
  end

  def create
    value = @form_submission.form_submission_values.new(value_params)

    if value.save
      render json: value, status: :created
    else
      render json: { errors: value.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_form_template
    @form_template = FormTemplate.find(params[:form_template_id])
  end

  def set_form_submission
    @form_submission = @form_template.form_submissions.find(
      params[:form_submission_id]
    )
  end

  def set_form_submission_value
    @value = FormSubmissionValue
      .includes(:form_submission)
      .find(params[:id])
  end

  def value_params
    params.require(:form_submission_value).permit(
      :form_field_id,
      value: {}
    )
  end
end
