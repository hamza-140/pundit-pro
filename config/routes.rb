Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations",
             }
  devise_scope :user do
    get "/users/sign_out" => "devise/sessions#destroy"
  end

  namespace :api do
    namespace :v1 do
      get "recipes/index"
      get "projects/index"
      # get 'projects/:i/dbugs/index'
      # get '/project/:id/bugs/index', to: "projects#bugs"
      post "recipes/create"
      post "projects/create"
      post "project/:project_id/bug/create", to: "bugs#create"

      # get '/show/:id', to: 'recipes#show'
      get "/show/:id", to: "projects#show"
      get "project/:project_id/bug/:id", to: "bugs#show"
      get "/current_user_role", to: "projects#current_user_role"
      get "/users/:id", to: "projects#users"
      get "/current_user_email", to: "projects#current_user_email"
      get "/current_user_info", to: "projects#current_user_info"
      get "/developers", to: "projects#developers"
      get "/quality_assurance", to: "projects#quality_assurance"

      delete "/destroy/:id", to: "projects#destroy"
      delete "/project/:project_id/bug/destroy/:id", to: "bugs#destroy"
      # delete '/des', to: 'controller#method'
      put "/update/:id", to: "projects#update"
      patch "/update/:id", to: "projects#update"
      put "/project/:project_id/bug/update/:id", to: "bugs#update"
      patch "bug/update/:bug_id", to: "bugs#update"
    end
  end
  root "homepage#index"
  get "/*path" => "homepage#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
