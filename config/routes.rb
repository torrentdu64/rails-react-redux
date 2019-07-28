Rails.application.routes.draw do

  devise_for :users
  root to: 'profiles#list'

  get '/list', to: 'profiles#list', as: 'list'
  resources :profiles, only: [:show]

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :profiles, only: [ :index, :show ]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
