class Api::V1::LegalEntitiesController < ApplicationController
  include Pagy::Backend
  before_action :set_tenant, only: [ :index ]

  # GET /api/v1/tenants/:tenant_id/legal_entities
  def index
    query = LegalEntities::FilterQuery.new(
      scope: @tenant.legal_entities.includes(:legal_entity_type),
      params: params
    )
    pagy, entities = pagy(
      query.call,
      page: params[:page],
      limit: params[:limit]
    )
    render json: {
      data: LegalEntitySerializer.new(entities).as_json,
      pagination: pagination_data(pagy)
    }, status: :ok
  end

  private

  def set_tenant
    @tenant = Tenant.find(params[:tenant_id])
  end
end
