class FormSubmissionSerializer
  def initialize(form_submission, view: :default)
    @form_submission = form_submission
    @view = view
  end

  def as_json(*)
    case @view
    when :compact
      compact_view
    when :detailed
      detailed_view
    else
      default_view
    end
  end

  private

  def default_view
    {
      id: @form_submission.id,
      status: @form_submission.status
    }
  end

  def compact_view
    {
      id: @form_submission.id,
      status: @form_submission.status
    }
  end

  def detailed_view
    {
      id: @form_submission.id,
      status: @form_submission.status,
      submitted_at: @form_submission.submitted_at,
      values: @form_submission.form_submission_values.map do |value|
        {
          id: value.id,
          field_id: value.form_field_id,
          value: value.value
        }
      end
    }
  end
end
