class ProfilesController < ApplicationController
  before_action :set_profile, only: [:show, :edit, :update, :destroy]
  skip_before_action :authenticate_user!, only: [:index, :list , :show]
  skip_after_action :verify_authorized, only: [ :list, :show]


  def list
    session[:profile] = true
  end

  def index

  end

  def show
    session[:profile] = false
    @profiles = policy_scope(Profile)
  end

  def new

      @profile = Profile.new
      authorize @profile

  end

  def create

    @profile = current_user.profiles.build(profile_params)
    authorize @profile

    if @profile.save
      redirect_to profile_path(@profile)
    else
      render :new
    end
  end

  def edit
    if current_user.profile === true
       authorize @profile
    end
  end

  def update
    authorize @profile
     if @profile.update(profile_params)


      redirect_to profile_path(@profile)
    else
      render :edit
    end
  end

  def destroy
    authorize @profile
    @profile.destroy
    redirect_to root_path
  end

  private

    def profile_params
      params.require(:profile).permit(:name, :description, :phone, :photo, :price)
    end

   def set_profile
    @profile = Profile.find(params[:id])
   end
end
