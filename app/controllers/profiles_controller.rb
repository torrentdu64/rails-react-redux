class ProfilesController < ApplicationController
  before_action :set_profile, only: [:show]
  skip_before_action :authenticate_user!, only: [:index, :list , :show]
  skip_after_action :verify_authorized, only: [ :list, :show]


  def list
  end

  def index
  end

  def show

  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

   def set_profile
    @profile = Profile.find(params[:id])
   end
end
