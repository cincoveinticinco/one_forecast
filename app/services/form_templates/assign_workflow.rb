module FormTemplates
  class AssignWorkflow
    def initialize(form_template:, workflow:)
      @form_template = form_template
      @workflow = workflow
    end

    def call
      validate_same_tenant!
      form_template.update!(workflow: workflow)
    end

    private

    attr_reader :form_template, :workflow

    def validate_same_tenant!
        
      return if form_template.tenant_id == workflow.tenant_id
        
      raise ActiveRecord::RecordInvalid.new(form_template),
            'El workflow debe pertenecer al mismo tenant que el formulario'
    end
  end
end
