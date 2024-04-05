
Rails.application.routes.draw do

  # root to: 'api/v1/projects#index' # Changed to point to the index action of the API v1 projects controller
  get '/api/v1/projects/bugs', to: 'api/v1/projects#bugs' # Updated to match the new controller namespace
  get '/api/v1/projects/users', to: 'api/v1/projects#users' # Updated to match the new controller namespace
  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :projects do # Updated to be within the API v1 namespace
        resources :bugs
      end
    end
  end

  match "*path", to: "errors#not_found", via: :all
end
