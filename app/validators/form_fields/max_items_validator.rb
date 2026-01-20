module FormFields
  class MaxItemsValidator < BaseValidator
    include ArrayHelper
    def initialize(max, field = nil)
      super(nil, field)
      @max = cast_number(max)
    end

    def message
      "Maximum size Array is #{@max}"
    end

    protected

    def applicable_field_types
      [ FormField.field_types[:multiselect] ]
    end

    def validate_value(value)
      return true if value.blank? || @max.nil?

      values = normalize_array(value)
      size = values.size
      return false if size.nil?

      size <= @max
    end

    private

    def cast_number(value)
      Float(value)
    rescue ArgumentError, TypeError
      nil
    end
  end
end
