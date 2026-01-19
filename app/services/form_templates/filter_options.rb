module FormTemplates
  class FilterOptions
    def self.call
      {
        status: enum_options(FormTemplate.statuses),
        template_type: enum_options(FormTemplate.template_types),
        access_type: enum_options(FormTemplate.access_types),
        order: order_options
      }
    end

    private

    def self.enum_options(enum)
      enum.keys.map do |key|
        {
          value: key,
          label: key.humanize
        }
      end
    end

    def self.order_options
      FilterQuery::ALLOWED_ORDER_COLUMNS.flat_map do |column|
        [
          { 
            value: "#{column}", 
            label: "#{column.humanize}" 
          }
        ]
      end
    end
  end
end
