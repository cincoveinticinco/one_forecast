module FormSubmissions
  class Submit
    def initialize(form_submission)
      @form_submission = form_submission
    end

    def call
      validate_transition!
      validations_inputs!

      form_submission.update!(
        status: "submitted",
        submitted_at: Time.current
      )

      form_submission
    end

    private
    attr_reader :form_submission

    def validate_transition!
      return if form_submission.draft? || form_submission.reopened?

      raise InvalidTransitionError,
        "FormSubmission cannot be submitted from #{form_submission.status}"
    end
    def validations_inputs!
      errors = FormSubmissions::ValidateValues.new(form_submission).call
      return if errors.empty?

      raise FormValidationError.new(errors)
    end
  end
end
