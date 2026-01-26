module FormSubmissions
  class BaseTransition
    def initialize(form_submission)
      @form_submission = form_submission
    end

    def call
      raise NotImplementedError
    end

    private

    attr_reader :form_submission

    def update!(attrs)
      form_submission.update!(attrs)
    end
  end
end
