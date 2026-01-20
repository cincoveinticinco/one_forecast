module FormFields
  class MinItemsValidator < BaseValidator
    include ArrayHelper
    def initialize(min, field = nil)
      super(nil, field)
      @min = cast_number(min)
    end

    def message
      "Minimum size Array is #{@min}"
    end

    protected

    def applicable_field_types
      [ FormField.field_types[:multiselect] ]
    end

    def validate_value(value)
      return true if value.blank? || @min.nil?

      values = normalize_array(value)
      size = values.size
      return false if size.nil?

      size >= @min
    end

    private

    def cast_number(value)
      Float(value)
    rescue ArgumentError, TypeError
      nil
    end
  end
end
