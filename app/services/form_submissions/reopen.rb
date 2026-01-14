module FormSubmissions
  class Reopen < BaseTransition
    def call
      validate!

      update!(
        status: "reopened",
        submitted_at: nil
      )

      form_submission
    end

    private

    def validate!
      return if form_submission.reopened? || form_submission.submitted?

      raise InvalidTransition,
        "FormSubmission cannot be reopened from #{form_submission.status}"
    end
  end
end
