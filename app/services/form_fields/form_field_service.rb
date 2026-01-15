# frozen_string_literal: true

module FormFields
  class FormFieldService
    
    def get_tree(template, form_submission = nil)
      @form_submission = form_submission
      @values_by_field_id = build_values_by_field_id

      fields = template.form_fields
                       .order(:parent_field_id, :order_index, :id)
                       .as_json
                       .map { |field| compact_hash(field) }

      @children_by_parent = fields.group_by { |f| f["parent_field_id"] }

      parents = Array(@children_by_parent[nil]).sort_by do |p|
        [p["order_index"].to_i, p["id"]]
      end

      parents.each { |parent| attach_children(parent) }

      parents
    end

    private

    attr_reader :form_submission

    def attach_children(node)
      attach_response(node)

      children = Array(@children_by_parent[node["id"]])
      return if children.empty?

      node["children"] = children.sort_by do |child|
        [child["order_index"].to_i, child["id"]]
      end

      node["children"].each { |child| attach_children(child) }
    end

    def attach_response(node)
      return unless form_submission

      node["response"] = @values_by_field_id[node["id"]]&.value
    end

    def build_values_by_field_id
      form_submission
        &.form_submission_values
        &.index_by(&:form_field_id) || {}
    end

    def compact_hash(hash)
      remove_columns = %w[
        mapping
        is_system
        is_active
        created_at
        updated_at
      ]

      hash.each_with_object({}) do |(key, value), acc|
        next if value.nil? || remove_columns.include?(key)

        acc[key] = value.is_a?(Hash) ? compact_hash(value) : value
      end
    end
  end
end
