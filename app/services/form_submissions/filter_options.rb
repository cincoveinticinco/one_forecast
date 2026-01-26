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
        order: order_options,
        filter_keys: serialized_keys,
        **form_field_options
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

    def serialized_keys
      @form_template.input_fields.map do |field|
        {
          key: field.key,
          field_type: field.field_type
        }
      end
    end

    def form_field_options
      @form_template.selectable_fields.each_with_object({}) do |field, hash|
        options = field.options
        next if options.blank? || options["items"].blank?

        hash[field.key] = options["items"].map { |item| item["value"] }
      end
    end
  end
end
