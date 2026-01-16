module FormSubmissions
  
  class Submit < BaseTransition
    def call
      validate!
      validate_required_fields!

      update!(
        status: "submitted",
        submitted_at: Time.current
      )

      form_submission
    end

    private

    def validate!
      return if form_submission.draft? || form_submission.reopened?

      raise InvalidTransition,
        "FormSubmission cannot be submitted from #{form_submission.status}"
    end

    def validate_required_fields!
      missing_fields = []

      form_submission.form_template.form_fields.each do |field|
        next unless field.required?

        value = form_submission.form_submission_values.find_by(form_field: field)

        if value.nil? || value.value.blank?
          missing_fields << field.label
        end
      end
      raise MissingRequiredFields.new(missing_fields) unless missing_fields.empty?
    end
  end
end
