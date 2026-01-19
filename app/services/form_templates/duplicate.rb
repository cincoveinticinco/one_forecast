module FormTemplates
  class Duplicate
    def initialize(form_template)
      @form_template = form_template
    end

    def call
      ActiveRecord::Base.transaction do
        duplicate_template.tap do |template|
          duplicate_fields(template)
        end
      end
    end

    private

    attr_reader :form_template

    def duplicate_template
      FormTemplate.create!(
        tenant: form_template.tenant,
        name: duplicated_name,
        slug: duplicated_slug,
        template_type: form_template.template_type,
        access_type: form_template.access_type,
        status: :draft
      )
    end

    def duplicate_fields(new_template)
      form_template.form_fields.find_each do |field|
        new_template.form_fields.create!(
          field.attributes.except(
            "id",
            "form_template_id",
            "created_at",
            "updated_at"
          )
        )
      end
    end

    def duplicated_name
      "#{form_template.name} (Copy)"
    end

    def duplicated_slug
      base_slug = "#{form_template.slug}-copy"
      counter = 1
      new_slug = base_slug
      
      while FormTemplate.exists?(slug: new_slug, tenant: form_template.tenant)
      counter += 1
      new_slug = "#{base_slug}-#{counter}"
      end
      
      new_slug
    end
  end
end
