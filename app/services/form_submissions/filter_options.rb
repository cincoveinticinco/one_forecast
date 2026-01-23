module FormSubmissions
  class FilterOptions
    def initialize(form_template)
      @form_template = form_template
    end

    def call
      {
        status: FormSubmission.distinct.pluck(:status),
        filter_keys: @form_template.form_fields.distinct.pluck(:key),
        order: order_options
      }
    end

    private

    def order_options
      FilterSubmissionsQuery::ALLOWED_ORDER_COLUMNS.flat_map do |column|
        [
          "#{column}"
        ]
      end
    end
  end
end
