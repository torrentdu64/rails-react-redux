Rails.application.routes.draw do


  devise_scope :user do
    devise_for :users, :controllers => { registrations: 'registrations' }
    patch 'verif', to: 'registrations#create_code'
    patch 'confirm', to: 'registrations#verif_code'
  end
  root to: 'profiles#list'


  resources :profiles, only: [:show, :new, :create, :edit, :update, :destroy]

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :profiles, only: [ :index, :show ] do
        resources :bookings, only: [ :create ]
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
