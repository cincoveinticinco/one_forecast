class WorkflowSerializer
  def initialize(workflows)
    @workflows = workflows
  end
  
  def as_json(*)
    if @workflows.is_a?(ActiveRecord::Relation) || @workflows.is_a?(Array)
      serialize_collection
    else
      serialize_single
    end
  end
  
  private

  def serialize_collection
    return @workflows.map do |workflow|
      {
        id: workflow.id,
        name: workflow.name,
        workflow_type: workflow.workflow_type,
        status: workflow.status,
        tenant_id: workflow.tenant_id,
        created_at: workflow.created_at,
        updated_at: workflow.updated_at
      }
    end
  end

  def serialize_single
    {
      id: @workflows.id,
      name: @workflows.name,
      workflow_type: @workflows.workflow_type,
      status: @workflows.status,
      tenant_id: @workflows.tenant_id,
      created_at: @workflows.created_at,
      updated_at: @workflows.updated_at
    }
  end
end
