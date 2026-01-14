module FormSubmissions
  class Submit < BaseTransition
    def call
      validate!

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
  end
end
