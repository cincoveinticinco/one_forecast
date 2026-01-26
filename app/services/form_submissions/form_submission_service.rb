module FormSubmissions
  class FormSubmissionService
    def initialize
    end

    def update_submission(form_submission, params)
      submissions = params[:form_submission_values_attributes]
      submissions.each { |submission| submission[:_destroy] = true if submission[:value].blank? }
      form_submission.update(params)
    end
  end
end
