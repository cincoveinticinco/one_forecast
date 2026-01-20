class FormFields::BaseValidator
  def initialize(config = nil, field = nil)
    @field = field
  end

  def valid?(value)
    return true unless applies_to_field?
    validate_value(value)
  end

  def message
    "Invalid value"
  end

  protected

  def applies_to_field?
    return true unless @field
    applicable_field_types.include?(@field.field_type)
  end

  def applicable_field_types
    []
  end

  def validate_value(value)
    true
  end
end
