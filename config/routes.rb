Rails.application.routes.draw do
  get "health/show"
  namespace :api do
    namespace :v1 do
      get "hello/index"
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up", to: "health#show", as: :health_check
  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    namespace :v1 do
      resources :tenants, only: [ :index, :show, :create, :update, :destroy ] do
        resources :form_templates, only: [ :index ]
        resources :workflows, only: [ :index ]
      end
      resources :workflows, only: [ :show, :create, :update, :destroy ]
      resources :form_templates, only: [ :show, :create, :update, :destroy ] do
        collection do
          get :filter_options
        end
        member do
          post :publish
          post :unpublish
          post :archive
          post :restore
          post :duplicate
          post :assign_workflow
        end
        resources :form_fields, only: [ :index, :create, :update, :destroy ] do
          collection do
            get :tree
          end
        end
        resources :form_submissions, only: [ :index, :show, :create, :update, :destroy ] do
          member do
            get :tree
            post :submit
            post :reopen
          end
        end
        resources :form_submission_values, only: [ :index, :show, :create ]
      end
    end
  end
end
