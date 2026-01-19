class FormTemplateSerializer
  def initialize(form_templates)
    @form_templates = form_templates
  end
  
  def as_json(*)
    if @form_templates.is_a?(ActiveRecord::Relation) || @form_templates.is_a?(Array)
      serialize_collection
    else
      serialize_single
    end
  end
  
  private

  def serialize_collection
    return @form_templates.map do |template|
      {
        id: template.id,
        name: template.name,
        status: template.status,
        template_type: template.template_type,
        published_at: template.published_at,
        archived_at: template.archived_at,
        tenant_slug: template.tenant.slug,
        template_slug: template.slug
      }
    end
  end
  def serialize_single
    {
      id: @form_templates.id,
      name: @form_templates.name,
      status: @form_templates.status,
      template_type: @form_templates.template_type,
      published_at: @form_templates.published_at,
      archived_at: @form_templates.archived_at,
      tenant_slug: @form_templates.tenant.slug,
      template_slug: @form_templates.slug
    }
  end
end
