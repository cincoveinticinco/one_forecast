class MissingRequiredFields < StandardError
  attr_reader :missing_fields

  def initialize(missing_fields)
    @missing_fields = missing_fields
    super("Missing required fields")
  end
end