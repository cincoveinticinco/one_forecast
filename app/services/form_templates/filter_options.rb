module FormTemplates
  class FilterOptions
    def self.call
      {
        status: FormTemplate.distinct.pluck(:status),
        template_type: FormTemplate.distinct.pluck(:template_type),
        access_type: FormTemplate.distinct.pluck(:access_type),
        order: order_options
      }
    end

    private

    def self.order_options
      FilterQuery::ALLOWED_ORDER_COLUMNS.flat_map do |column|
        [
          "#{column}"
        ]
      end
    end
  end
end
