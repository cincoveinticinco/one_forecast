class WorkflowStepSerializer
  def initialize(workflow_steps)
    @workflow_steps = workflow_steps
  end
  
  def as_json(*)
    if @workflow_steps.is_a?(ActiveRecord::Relation) || @workflow_steps.is_a?(Array)
      serialize_collection
    else
      serialize_single
    end
  end
  
  private

  def serialize_collection
    return @workflow_steps.map do |workflow_step|
      {
        id: workflow_step.id,
        workflow_id: workflow_step.workflow_id,
        name: workflow_step.name,
        step_type: workflow_step.step_type,
        color: workflow_step.color,
        order_index: workflow_step.order_index,
        assignees: workflow_step.assignees,
        actions_enabled: workflow_step.actions_enabled,
        actions: workflow_step.actions,
        form_template_id: workflow_step.form_template_id,
        file_upload_settings: workflow_step.file_upload_settings,
        created_at: workflow_step.created_at,
        updated_at: workflow_step.updated_at
      }
    end
  end

  def serialize_single
    {
      id: @workflow_steps.id,
      workflow_id: @workflow_steps.workflow_id,
      name: @workflow_steps.name,
      step_type: @workflow_steps.step_type,
      color: @workflow_steps.color,
      order_index: @workflow_steps.order_index,
      assignees: @workflow_steps.assignees,
      actions_enabled: @workflow_steps.actions_enabled,
      actions: @workflow_steps.actions,
      form_template_id: @workflow_steps.form_template_id,
      file_upload_settings: @workflow_steps.file_upload_settings,
      created_at: @workflow_steps.created_at,
      updated_at: @workflow_steps.updated_at
    }
  end
end
