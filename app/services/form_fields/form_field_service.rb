module FormFields
  class FormFieldService

    def get_tree(fields, form_submission = nil)
      json = fields.as_json.map { |p| compact_hash(p) }
      children_by_parent = json.group_by { |f| f["parent_field_id"] }
      values_by_field_id =
        form_submission&.form_submission_values&.index_by(&:form_field_id) || {}

      attach_children = lambda do |node|
        node["response"] = values_by_field_id[node["id"]]&.value
        kids = Array(children_by_parent[node["id"]])
        return if kids.empty?
        node["children"] = kids.sort_by { |c| [ c["order_index"].to_i, c["id"] ] }
        node["children"].each { |child| attach_children.call(child) }
      end

      parents = Array(children_by_parent[nil]).sort_by { |p| [ p["order_index"].to_i, p["id"] ] }
      parents.each { |p| attach_children.call(p) }

      parents
    end

    private 

    def compact_hash(hash)
      remove_colums = [ "mapping", "is_system", "is_active", "created_at", "updated_at" ]
      hash.each_with_object({}) do |(k, v), acc|
        next if v.nil? || remove_colums.include?(k)
        acc[k] = v.is_a?(Hash) ? compact_hash(v) : v
      end
    end
  end
end