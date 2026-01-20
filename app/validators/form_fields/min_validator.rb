module FormFields
  class MinValidator < BaseValidator
    def initialize(min, field = nil)
      super(nil, field)
      @min = cast_number(min)
    end

    def message
      "Minimum value is #{@min}"
    end

    protected

    def applicable_field_types
      [ FormField.field_types[:number] ]
    end

    def validate_value(value)
      return true if value.blank? || @min.nil?

      number = cast_number(value)
      return false if number.nil?

      number >= @min
    end

    private

    def cast_number(value)
      Float(value)
    rescue ArgumentError, TypeError
      nil
    end
  end
end
