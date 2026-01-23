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
    when :response_view
      responses_view
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
          form_field_id: value.form_field_id,
          value: value.value
        }
      end
    }
  end

  def responses_view
    return serialize_empty_submission if @form_submission.empty?
    form_template = @form_submission.first.form_template
    serialize_submissions_data(form_template, @form_submission)
  end

  def serialize_submissions_data(form_template, submissions)
    form_fields = form_template.input_fields
    submissions.map do |submission|
      values_by_field_id = submission.form_submission_values.index_by(&:form_field_id)

      values = {}
      form_fields.each do |field|
        value_record = values_by_field_id[field.id]
        values[field.key] = value_record&.value
      end

      {
        id: submission.id,
        status: submission.status,
        submitted_at: submission.submitted_at,
        updated_at: submission.updated_at,
        created_at: submission.created_at,
        values: values
      }
    end
  end

  def serialize_empty_submission
    {
      form_template: nil,
      columns: [],
      data: []
    }
  end
end
