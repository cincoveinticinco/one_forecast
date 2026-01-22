class Api::V1::FormSubmissionsController < ApplicationController
  before_action :set_tenant, only: [ :index, :show, :create, :update, :destroy, :submit ]
  before_action :set_form_template, only: [ :index, :show, :create, :update, :destroy, :submit ]
  before_action :set_form_submission, only: [ :reopen, :tree, :autosave, :submit  ]

  def initialize
    @submission_service = FormSubmissions::FormSubmissionService.new
  end

  def index
    form_submissions = @form_template.form_submissions.where(deleted_at: nil)

    render json: form_submissions.map { |fs|
      FormSubmissionSerializer.new(fs, view: :detailed).as_json
    }
  end

  def show
    render json: FormSubmissionSerializer.new(@form_submission, view: :detailed).as_json
  end

  def create
    form_submission = @form_template.form_submissions.create(
      form_submission_params
    )

    if form_submission.save
      render json: FormSubmissionSerializer.new(form_submission, view: :detailed).as_json
    else
      render json: { errors: form_submission.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @submission_service.update_submission(@form_submission, form_submission_params)
      render json: FormSubmissionSerializer.new(@form_submission, view: :detailed).as_json
    else
      render json: { errors: @form_submission.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @form_submission.update(deleted_at: Time.current)
    render json: { message: "Form submission deleted successfully" }
  end

  def submit
    submission = FormSubmissions::Submit.new(@form_submission).call
    render json: FormSubmissionSerializer.new(submission).as_json
  end

  def reopen
    submission = FormSubmissions::Reopen.new(@form_submission).call
    render json: FormSubmissionSerializer.new(submission).as_json
  end

  def tree
    fields_service = FormFields::FormFieldService.new
    parents = fields_service.get_tree(
      @form_template,
      @form_submission
    )

    render json: parents, status: :ok
  end

  def autosave
    value = FormSubmissionValues::Autosave.new(
      form_submission: @form_submission,
      field_key: autosave_params[:field_key],
      value: autosave_params[:value]
    ).call

    render json: {
      id: value.id,
      field_key: value.form_field.key,
      value: value.value
    }, status: :ok
  end

  private

  def set_tenant
    @tenant = Tenant.friendly.find(params[:tenant_id])
  end

  def set_form_template
    @form_template = @tenant.form_templates.friendly.find(params[:form_template_id])
  end

  def set_form_template_no_slug
    @form_template = FormTemplate.find(params[:form_template_id])
  end

  def set_form_submission
    @form_submission = FormSubmission.find(params[:id])
  end

  def form_submission_params
    params.require(:form_submission).permit(
      :status,
      :submitted_at,
      form_submission_values_attributes: [
        :id,
        :form_field_id,
        :value
      ]
    )
  end

  def autosave_params
    params.permit(:field_key, :value, :id, form_submission: {})
  end
end
