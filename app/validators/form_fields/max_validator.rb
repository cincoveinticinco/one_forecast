module FormFields
  class MaxValidator < BaseValidator
    def initialize(max, field = nil)
      super(nil, field)
      @max = cast_number(max)
    end

    def message
      "Maximum value is #{@max}"
    end

    protected

    def applicable_field_types
      [ FormField.field_types[:number] ]
    end

    def validate_value(value)
      return true if value.blank? || @max.nil?
      number = cast_number(value)
      return false if number.nil?

      number <= @max
    end

    private

    def cast_number(value)
      Float(value)
    rescue ArgumentError, TypeError
      nil
    end
  end
end
