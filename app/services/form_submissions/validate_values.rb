module FormSubmissions
  class ValidateValues
    def initialize(form_submission)
      @form_submission = form_submission
      @errors = []
    end

    def call
      validate_required_fields_presence
      validate_values_content

      errors
    end

    private
    attr_reader :errors

    def validate_required_fields_presence
      required_fields = @form_submission
        .form_template
        .form_fields
        .where(required: true)

      submitted_field_ids = @form_submission
        .form_submission_values
        .pluck(:form_field_id)

      required_fields.each do |field|
        next if submitted_field_ids.include?(field.id)
        errors << missing_required_error(field)
      end
    end

    def validate_values_content
      submitted_values = @form_submission
        .form_submission_values
        .includes(:form_field)
        .index_by(&:form_field_id)

      @form_submission.form_template.form_fields.each do |field|
        value_record = submitted_values[field.id]
        next if value_record.nil?
        validate_field_value(field, value_record)
      end
    end

    def validate_field_value(field, value_record)
      validate_by_field_type(field, value_record)
      validate_by_rules(field, value_record)
    end

    ## Validate field types like select, multiselect, etc.
    def validate_by_field_type(field, value_record)
      validator =
        case field.field_type
        when "select"
          FormFields::SelectValidator.new(field)
        when "multiselect"
          FormFields::MultiselectValidator.new(field)
        when "checkbox"
          FormFields::CheckboxValidator.new(field)
        end

      return if validator.nil?
      return if validator.valid?(value_record.value)

      errors << {
        field_id: field.id,
        field_key: field.key,
        rule: "options",
        message: validator.message
      }
    end

    ## Validate by specific rules like minlength, pattern, etc.
    def validate_by_rules(field, value_record)
      return if field.validations.blank?
      field.validations.each do |rule, config|
        validator = FormFields::ValidatorFactory.build(rule, config, field)

        next if validator.valid?(value_record.value)

        errors << {
          field_id: field.id,
          field_key: field.key,
          rule: rule,
          message: validator.message
        }
      end
    end

    def missing_required_error(field)
      {
        field_id: field.id,
        field_key: field.key,
        rule: "required",
        message: "This field is required"
      }
    end
  end
end
