class Api::V1::WorkflowsController < ApplicationController
  include Pagy::Backend
  before_action :set_tenant, only: [ :index ]
  before_action :set_workflow, only: [ :show, :update, :destroy ]

  # GET /api/v1/tenants/:tenant_id/workflows
  def index
    pagy, workflows = pagy(
      @tenant.workflows,
      page: params[:page]
    )
    render json: {
      data: WorkflowSerializer.new(workflows).as_json,
      pagination: pagination_data(pagy)
    }, status: :ok
  end

  # GET /api/v1/workflows/:id
  def show
    workflow = WorkflowSerializer.new(@workflow).as_json
    render json: workflow, status: :ok
  end

  # POST /api/v1/workflows
  def create
    workflow = Workflow.new(workflow_params)
    if workflow.save
      render json: WorkflowSerializer.new(workflow).as_json, status: :created
    else
      render json: { errors: workflow.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/workflows/:id
  def update
    if @workflow.update(workflow_params.except(:tenant_id))
      render json: WorkflowSerializer.new(@workflow).as_json, status: :ok
    else
      render json: { errors: @workflow.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/workflows/:id
  def destroy
    @workflow.destroy!
    head :no_content
  end

  private

  def set_tenant
    @tenant = Tenant.find(params[:tenant_id])
  end

  def set_workflow
    @workflow = Workflow.find(params[:id])
  end

  def workflow_params
    params.require(:workflow).permit(
      :name,
      :workflow_type,
      :status,
      :tenant_id
    )
  end
end
