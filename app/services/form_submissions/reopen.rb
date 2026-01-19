module FormSubmissions
  class Reopen
    def call
      validate!

      update!(
        status: "reopened",
        submitted_at: nil
      )

      form_submission
    end

    private
    attr_reader :form_submission
    
    def validate!
      return if form_submission.reopened? || form_submission.submitted?

      raise InvalidTransitionError,
        "FormSubmission cannot be reopened from #{form_submission.status}"
    end
  end
end
