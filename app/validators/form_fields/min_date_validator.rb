# app/validators/form_fields/min_date_validator.rb
module FormFields
  class MinDateValidator < BaseValidator
    def initialize(min_date, field = nil)
      super(nil, field)
      @min_date = parse_date(min_date)
    end

    def message
      "Date must be on or after #{@min_date}"
    end
    protected

    def applicable_field_types
      [ FormField.field_types[:date] ]
    end

    def validate_value(value)
      return true if value.blank? || @min_date.nil?
      date = parse_date(value)
      return false if date.nil?

      date >= @min_date
    end

    private

    def parse_date(value)
      Date.parse(value.to_s)
    rescue ArgumentError, TypeError
      nil
    end
  end
end
