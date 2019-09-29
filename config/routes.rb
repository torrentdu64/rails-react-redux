Rails.application.routes.draw do


  devise_scope :user do
     devise_for :users, :controllers => {
       registrations: 'registrations',
       sessions: 'sessions'
    }
    patch 'verif', to: 'registrations#create_code'
    patch 'confirm', to: 'registrations#verif_code'
  end
  root to: 'profiles#list'

  mount ActionCable.server => "/cable"


  #match '/sms' => 'api/v1/bookings#reply', :via => :get
  resources :profiles, only: [:show, :new, :create, :edit, :update, :destroy]

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      match '/sms' => 'bookings#reply', :via => :get

      resources :profiles, only: [ :index ] do

        resources :bookings, only: [ :create, :destroy ]
        get 'busy', to: "bookings#booking_time"
        get 'busy-now', to: "bookings#busy_till_now"
        post 'customer', to: "bookings#stripe_customer"
        get 'show_api', to: "bookings#show_api"
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # Sidekiq Web UI, only for admins.
  require "sidekiq/web"
  authenticate :user, lambda { |u| u.admin } do
    mount Sidekiq::Web => '/sidekiq'
  end

end
