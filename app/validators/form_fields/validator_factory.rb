module FormFields
  class ValidatorFactory
    def self.build(rule, config, field = nil)
      case rule.to_s
      when "minlength"
        FormFields::MinlengthValidator.new(config, field)
      when "maxlength"
        FormFields::MaxlengthValidator.new(config, field)
      when "min"
        FormFields::MinValidator.new(config, field)
      when "max"
        FormFields::MaxValidator.new(config, field)
      when "min_date"
        FormFields::MinDateValidator.new(config, field)
      when "max_date"
        FormFields::MaxDateValidator.new(config, field)
      when "min_items"
        FormFields::MinItemsValidator.new(config, field)
      when "max_items"
        FormFields::MaxItemsValidator.new(config, field)
      when "pattern"
        FormFields::PatternValidator.new(config, field)
      else
        FormFields::BaseValidator.new
      end
    end
  end
end
