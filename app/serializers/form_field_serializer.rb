class FormFieldSerializer
  def initialize(fields, view: :default)
    @fields = fields
    @view = view
  end

  def as_json(*)
    default_view
  end

  private

  def default_view
    @fields.map do |field|
      {
        id: field.id,
        key: field.key,
        label: field.label,
        field_type: field.field_type
      }
    end
  end
end
