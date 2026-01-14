class Api::V1::HelloController < ApplicationController
  def index
     render json: {
        status: "ok",
        environment: Rails.env,
        timestamp: Time.current
      }
  end
end
