module FormFields
  class MaxDateValidator < BaseValidator
    def initialize(max_date, field = nil)
      super(nil, field)
      @max_date = parse_date(max_date)
    end

    def message
      "Date must be on or before #{@max_date}"
    end

    protected

    def applicable_field_types
      [ FormField.field_types[:date] ]
    end

    def validate_value(value)
      return true if value.blank? || @max_date.nil?

      date = parse_date(value)
      return false if date.nil?

      date <= @max_date
    end
    private

    def parse_date(value)
      Date.parse(value.to_s)
    rescue ArgumentError, TypeError
      nil
    end
  end
end
