class InvalidEnumFilter < ArgumentError
  attr_reader :field, :invalid_values, :allowed_values

  def initialize(field:, invalid_values:, allowed_values:)
    @field = field
    @invalid_values = invalid_values
    @allowed_values = allowed_values

    super("#{invalid_values.join(', ')} is not a valid #{field}")
  end
end
