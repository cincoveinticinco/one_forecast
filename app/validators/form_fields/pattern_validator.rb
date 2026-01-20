class FormFields::PatternValidator < FormFields::BaseValidator
  def initialize(pattern, field = nil)
    super(nil, field)
    @regex = Regexp.new(pattern)
  rescue RegexpError
    @regex = nil
  end

  def message
    "Invalid format"
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
    return true if value.blank? || @regex.nil?
    value.to_s.match?(@regex)
  end
end
