class Api::V1::FormSubmissionsController < ApplicationController
  include Pagy::Backend
  before_action :set_tenant, :set_form_template, only: [ :tenant_index, :show, :create, :update, :destroy, :submit ]
  before_action :set_form_template_no_slug, only: [ :tree, :index, :filter_options  ]
  before_action :set_form_submission, only: [ :show, :reopen, :tree, :autosave, :submit ]

  def initialize
    @submission_service = FormSubmissions::FormSubmissionService.new
  end

  def tenant_index
    render json: serialize_submissions(@form_template.form_submissions)
  end

  def index
    query = FormSubmissions::FilterSubmissionsQuery.new(scope: @form_template.form_submissions, params: params)
    pagy, form_submissions = pagy(query.call, page: params[:page], limit: params[:limit])
    submission_data = serialize_submission(form_submissions, :response_view)

    render json: { data: submission_data, pagination: pagination_data(pagy) }
  end

  def show
    render_submission_response(@form_submission, :detailed)
  end

  def create
    form_submission = @form_template.form_submissions.create(form_submission_params)
    form_submission.save ? render_submission_response(form_submission, :detailed) : render_error_response(form_submission.errors.full_messages)
  end

  def update
    @submission_service.update_submission(@form_submission, form_submission_params) ? render_submission_response(@form_submission, :detailed) : render_error_response(@form_submission.errors.full_messages)
  end

  def destroy
    @form_submission.update(deleted_at: Time.current)
    render json: { message: "Form submission deleted successfully" }
  end

  def submit
    render_submission_response(FormSubmissions::Submit.new(@form_submission).call)
  end

  def reopen
    render_submission_response(FormSubmissions::Reopen.new(@form_submission).call)
  end

  def tree
    parents = FormFields::FormFieldService.new.get_tree(@form_template, @form_submission)
    render json: parents
  end

  def autosave
    value = FormSubmissionValues::Autosave.new(form_submission: @form_submission, field_key: autosave_params[:field_key], value: autosave_params[:value]).call
    render json: { id: value.id, field_key: value.form_field.key, value: value.value }
  end

  def filter_options
    render json: FormSubmissions::FilterOptions.new(@form_template).call
  end

  private

  def serialize_submission(submission, view = :default)
    FormSubmissionSerializer.new(submission, view: view).as_json
  end

  def serialize_submissions(submissions, view = :detailed)
    submissions.map { |fs| serialize_submission(fs, view) }
  end

  def render_submission_response(submission, view = :detailed, status = :ok)
    render json: serialize_submission(submission, view), status: status
  end

  def render_error_response(errors, status = :unprocessable_entity)
    render json: { errors: errors }, status: status
  end

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
