class Api::V1::FormSubmissionsController < ApplicationController
  before_action :set_form_template
  before_action :set_form_submission, only: [ :show, :update, :destroy, :reopen, :submit ]

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
    if @form_submission.update(form_submission_params)
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
  rescue FormSubmissions::BaseTransition::InvalidTransition => e
    render json: { error: e.message }, status: :unprocessable_entity
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def reopen
    submission = FormSubmissions::Reopen.new(@form_submission).call
    render json: FormSubmissionSerializer.new(submission).as_json
  rescue FormSubmissions::BaseTransition::InvalidTransition => e
    render json: { error: e.message }, status: :unprocessable_entity
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages },
          status: :unprocessable_entity
  end
  private

  def set_form_template
    @form_template = FormTemplate.find(params[:form_template_id] || params[:id])
  end

  def set_form_submission
    @form_submission = @form_template.form_submissions.find(params[:id])
  end
  def form_submission_params
    params.require(:form_submission).permit(
      :status,
      :submitted_at,
      form_submission_values_attributes: [
        :id,
        :form_field_id,
        :value,
        :_destroy
      ]
    )
  end
end
