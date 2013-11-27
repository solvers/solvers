Scisolvers::Application.routes.draw do
  devise_for :users

  resources :jobs

  root :to => 'jobs#index'

  get '/auth/:provider/callback' => 'authentication#create' #maybe?
end
