module FormFields
  class CheckboxValidator < BaseValidator
    def initialize(field)
      super(nil, field)
      @required = field.required
    end

    def message
      "This checkbox must be checked"
    end

    protected

    def applicable_field_types
      [ FormField.field_types[:checkbox] ]
    end

    def validate_value(value)
      return true if !@required

      value = parse_value(value)
      return false if value.nil?

      value
    end

    private

    def parse_value(value)
      case value
      when true, "true", "1", 1
        true
      when false, "false", "0", 0, nil, ""
        false
      else
        nil
      end
    end
  end
end
