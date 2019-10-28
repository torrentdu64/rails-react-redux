class ProfilesController < ApplicationController
  before_action :set_profile, only: [:show, :edit, :update, :destroy]
  # before_action :clean_unpay_booking, only: [:show]
  skip_before_action :authenticate_user!, only: [:index, :list , :show]
  skip_after_action :verify_authorized, only: [ :list, :show]


  def list

    session[:profile] = true
     @profiles = policy_scope(Profile)
  end

  def index

  end

  def show
    session[:profile] = false

    #clean_unpay_booking if current_user
    @profiles = policy_scope(Profile)

    #give booking from profile id and pass to a job
    # manage case user connect multy-tabs
    @booking = Booking.where(profile_id: @profile.id )
    #generate busy_till-now with move method to model ??


    @booking = @booking.to_json
    if @profile.present?
      respond_to do |format|

          format.html { }
          format.js  { render "profiles/show", booking: @booking }# <-- will render `app/views/reviews/create.js.erb`
        end
    else
      respond_to do |format|

        format.html {  }
        format.js  # <-- idem
      end
    end
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

   def clean_unpay_booking
    @booking = current_user.bookings.where(state: 'create')
    @booking.destroy_all
  end

end
