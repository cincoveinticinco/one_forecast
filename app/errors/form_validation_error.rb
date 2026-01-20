class FormValidationError < StandardError
  attr_reader :errors

  def initialize(errors)
    @errors = errors
    super("Form validation failed")
  end
end
