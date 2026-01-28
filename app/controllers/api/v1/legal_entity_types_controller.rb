class Api::V1::LegalEntityTypesController < ApplicationController
  include Pagy::Backend
  before_action :set_tenant, only: [ :index, :create ]
  before_action :set_legal_entity_type, only: [ :show, :update, :destroy ]

  # GET /api/v1/tenants/:tenant_id/legal_entity_types
  def index
    query = LegalEntityTypes::FilterQuery.new(
      scope: @tenant.legal_entity_types,
      params: params
    )
    pagy, types = pagy(
      query.call,
      page: params[:page],
      limit: params[:limit]
    )
    render json: {
      data: LegalEntityTypeSerializer.new(types).as_json,
      pagination: pagination_data(pagy)
    }, status: :ok
  end

  # GET /api/v1/legal_entity_types/:id
  def show
    render json: LegalEntityTypeSerializer.new(@legal_entity_type).as_json, status: :ok
  end

  # POST /api/v1/tenants/:tenant_id/legal_entity_types
  def create
    legal_entity_type = @tenant.legal_entity_types.build(legal_entity_type_params)

    if legal_entity_type.save
      render json: LegalEntityTypeSerializer.new(legal_entity_type).as_json, status: :created
    else
      render json: { errors: legal_entity_type.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/legal_entity_types/:id
  def update
    if @legal_entity_type.update(legal_entity_type_params.except(:tenant_id))
      render json: LegalEntityTypeSerializer.new(@legal_entity_type).as_json, status: :ok
    else
      render json: { errors: @legal_entity_type.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/legal_entity_types/:id
  def destroy
    if @legal_entity_type.destroy
      render json: { message: "Legal entity type deleted successfully" }, status: :ok
    else
      render json: { errors: @legal_entity_type.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_tenant
    @tenant = Tenant.find(params[:tenant_id])
  end

  def set_legal_entity_type
    @legal_entity_type = LegalEntityType.find(params[:id])
  end

  def legal_entity_type_params
    params.require(:legal_entity_type).permit(
      :key,
      :name,
      :status,
      :tenant_id,
      allowed_country_codes: [],
      not_allowed_country_codes: []
    )
  end
end
