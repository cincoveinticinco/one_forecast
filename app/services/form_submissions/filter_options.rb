module FormSubmissions
  class FilterOptions
    def initialize(form_template)
      @form_template = form_template
    end

    def call
      form_fields = @form_template.input_fields
      {
        form_template: {
          id: @form_template.id,
          name: @form_template.name
        },
        columns: serialized_columns(form_fields),
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

    def serialized_columns(form_fields)
      FormFieldSerializer.new(@form_template.input_fields).as_json
    end
  end
end
