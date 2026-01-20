class FormFields::MinlengthValidator < FormFields::BaseValidator
  def initialize(min, field = nil)
    super(nil, field)
    @min = min.to_i
  end

  def message
    "Minimum length is #{@min}"
  end

  protected

  def applicable_field_types
    [
      FormField.field_types[:text],
      FormField.field_types[:email],
      FormField.field_types[:phone]
    ]
  end

  def validate_value(value)
    return true if value.blank?
    value.to_s.length >= @min
  end
end
