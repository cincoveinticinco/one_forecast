module FormSubmissionValues
  class Autosave
    class InvalidField < StandardError; end

    def initialize(form_submission:, field_key:, value:)
      @form_submission = form_submission
      @field_key = field_key
      @value = value
    end

    def call
      field = find_field!

      submission_value = @form_submission
        .form_submission_values
        .find_or_initialize_by(form_field: field)

      submission_value.value = @value
      submission_value.save!

      submission_value
    end

    private

    def find_field!
      FormField.find_by(key: @field_key) ||
        raise(InvalidField, "Invalid field_key: #{@field_key}")
    end
  end
end
