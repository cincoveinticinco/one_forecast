class FormFields::MaxlengthValidator < FormFields::BaseValidator
  def initialize(max, field = nil)
    super(nil, field)
    @max = max.to_i
  end

  def valid?(value)
    return true if value.blank?
    value.to_s.length <= @max
  end

  def message
    "Maximum length is #{@max}"
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
    value.to_s.length <= @max
  end
end
