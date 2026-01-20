module FormFields
  class MultiselectValidator < BaseValidator
    include ArrayHelper
    def initialize(field)
      super(nil, field)
      @allowed_values = extract_values(field.options)
    end

    def message
      "One or more selected values are not valid"
    end
    protected

    def applicable_field_types
      [ FormField.field_types[:multiselect] ]
    end
    def validate_value(value)
      return true if value.blank?
      values = normalize_array(value)
      return false if values.empty?

      values.all? { |v| @allowed_values.include?(v) }
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
