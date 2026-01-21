class Api::V1::WorkflowStepsController < ApplicationController
  include Pagy::Backend
  before_action :set_workflow, only: [ :index, :create ]
  before_action :set_workflow_step, only: [ :show, :update, :destroy ]

  # GET /api/v1/workflows/:workflow_id/workflow_steps
  def index
    pagy, workflow_steps = pagy(
      @workflow.workflow_steps.order(:order_index),
      page: params[:page]
    )
    render json: {
      data: WorkflowStepSerializer.new(workflow_steps).as_json,
      pagination: pagination_data(pagy)
    }, status: :ok
  end

  # GET /api/v1/workflow_steps/:id
  def show
    workflow_step = WorkflowStepSerializer.new(@workflow_step).as_json
    render json: workflow_step, status: :ok
  end

  # POST /api/v1/workflows/:workflow_id/workflow_steps
  def create
    workflow_step = @workflow.workflow_steps.new(workflow_step_params)
    if workflow_step.save
      render json: WorkflowStepSerializer.new(workflow_step).as_json, status: :created
    else
      render json: { errors: workflow_step.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/workflow_steps/:id
  def update
    if @workflow_step.update(workflow_step_params.except(:workflow_id))
      render json: WorkflowStepSerializer.new(@workflow_step).as_json, status: :ok
    else
      render json: { errors: @workflow_step.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/workflow_steps/:id
  def destroy
    if @workflow_step.destroy
      render json: { message: 'Workflow step eliminado' }
    else
      render json: { errors: @workflow_step.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_workflow
    @workflow = Workflow.find(params[:workflow_id])
  end

  def set_workflow_step
    @workflow_step = WorkflowStep.find(params[:id])
  end

  def workflow_step_params
    permitted = params.require(:workflow_step).permit(
      :workflow_id,
      :name,
      :step_type,
      :color,
      :order_index,
      :form_template_id
    )
    
    # Permitir estructuras JSON complejas sin restricciones usando to_unsafe_h
    workflow_step_params = params[:workflow_step]
    permitted[:assignees] = workflow_step_params[:assignees].as_json if workflow_step_params[:assignees].present?
    permitted[:actions_enabled] = workflow_step_params[:actions_enabled].as_json if workflow_step_params[:actions_enabled].present?
    permitted[:actions] = workflow_step_params[:actions].as_json if workflow_step_params[:actions].present?
    permitted[:file_upload_settings] = workflow_step_params[:file_upload_settings].as_json if workflow_step_params[:file_upload_settings].present?
    
    permitted
  end
end
