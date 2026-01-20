module FormFields
  class SelectValidator < BaseValidator
    def initialize(field)
      super(nil, field)
      @allowed_values = extract_values(field.options)
    end
    def message
      "Selected value is not valid"
    end
    protected

    def applicable_field_types
      [ FormField.field_types[:select] ]
    end

    def validate_value(value)
      return true if value.blank?
      @allowed_values.include?(value)
    end

    private

    def extract_values(options)
      return [] if options.blank?

      options
        .fetch("items", [])
        .map { |item| item["value"] }
        .compact
    end
  end
end
