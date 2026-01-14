class Api::V1::FormFieldsController < ApplicationController
  # GET /api/v1/form_templates/:form_template_id/form_fields
  def index
    template = current_tenant.form_templates.find(params[:form_template_id])
    fields = template.form_fields.order(:parent_field_id, :order_index, :id)
    render json: fields, status: :ok
  end
  # GET /api/v1/form_templates/:form_template_id/form_fields/tree
  def tree
    template = current_tenant.form_templates.find(params[:form_template_id])
    fields = template.form_fields.order(:parent_field_id, :order_index, :id)

    json = fields.as_json.map { |p| compact_hash(p) }
    children_by_parent = json.group_by { |f| f["parent_field_id"] }

    attach_children = lambda do |node|
      kids = Array(children_by_parent[node["id"]])
      return if kids.empty?

      node["children"] = kids.sort_by { |c| [ c["order_index"].to_i, c["id"] ] }
      node["children"].each { |child| attach_children.call(child) }
    end

    parents = Array(children_by_parent[nil]).sort_by { |p| [ p["order_index"].to_i, p["id"] ] }
    parents.each { |p| attach_children.call(p) }

    render json: parents, status: :ok
  end

  # POST /api/v1/form_templates/:form_template_id/form_fields
  def create
    template = current_tenant.form_templates.find(params[:form_template_id])
    return unless validate_template_modifiable(template)
    field = template.form_fields.new(form_field_params)

    field.is_system = false if field.respond_to?(:is_system=)

    if field.field_type == "block" && field.block_type.blank?
      return render json: { error: "block_type is required when field_type is 'block'" }, status: :unprocessable_entity
    end

    begin
      FormField.transaction do
        field.save!

        # URGENT: HERE ON FUTURE WE WILL ADD THE DEFOULT EXPANSION LOGIC FOR CERTAIN BLOCK TYPES THAT HAVE SYSTEM DATA legal_entity_vendor .
        # if form_field.field_type == "block" && form_field.block_type == "legal_entity"
        #   CREATE DEFAULT SUBFIELDS LOGIC HERE
        # end
      end
    render json: field, status: :created
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/form_templates/:form_template_id/form_fields/:id
  def destroy
    template = current_tenant.form_templates.find(params[:form_template_id])
    return unless validate_template_modifiable(template)
    field = template.form_fields.find(params[:id])
    field.destroy
    head :no_content
  end

  def update
    template = current_tenant.form_templates.find(params[:form_template_id])
    return unless validate_template_modifiable(template)
    field = template.form_fields.find(params[:id])
    if field.update(form_field_params)
      render json: field, status: :ok
    else
      render json: { errors: field.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def compact_hash(hash)
    remove_colums = [ "mapping", "is_system", "is_active", "created_at", "updated_at" ]
    hash.each_with_object({}) do |(k, v), acc|
      next if v.nil? || remove_colums.include?(k)
      acc[k] = v.is_a?(Hash) ? compact_hash(v) : v
    end
  end

  def form_field_params
    params.require(:form_field).permit(
      :parent_field_id,
      :key,
      :label,
      :field_type,
      :block_type,
      :required,
      :order_index,
      :placeholder,
      :help_text,
      :is_active,
      options: {},
      validations: {},
      visibility_rules: {},
      settings: {},
      mapping: {}
    )
  end
  def validate_template_modifiable(template)
    if template.status != "draft"
      render json: { error: "Only draft templates can be modified" }, status: :unprocessable_entity
      false
    else
      true
    end
  end
end
