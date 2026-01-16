class FormSubmissionValuesSerializer
  def initialize(form_submission, view: :default)
    @form_values = form_submission.form_submission_values
    @view = view
  end
  
  def as_json(*)
    return @form_values.map do |value|
      {
        id: value.id,
        response: value.value,
        form_field_id: value.form_field_id,
        key: value.form_field.key,
        label: value.form_field.label,
        created_at: value.created_at,
      }
    end
  end
end
