

class Api::RestaurantsController < ApplicationController

    
    def index
        @restaurants = Restaurant.includes(:reviews, :reservations, :favorites).all
    end

    def search
        if params[:query] == nil || params[:query][:name].length == 0
             @restaurants = Restaurant.all 
             @res = params[:res]
             return
        end
        params[:query].permit!
        # @restaurants = Restaurant.includes(:reservations).where(params[:query])
 
        @restaurants = Restaurant.joins(:location).where("restaurants.name = ?", params[:query][:name]).or(Restaurant.joins(:location).where("locations.name = ?", params[:query][:name]))

        @res = params[:res]
    end
    def feature
        @restaurants = Restaurant.limit(5).order("RANDOM()");
        render "api/restaurants/index"
    end

    def show
        @restaurant = Restaurant.includes(:reviews, reviews: [:user]).with_attached_photos.find(params[:id])
    end

    def create
        @restaurant = Restaurant.new(restaurant_params)
        @restaurant.hours
        if @restaurant.save
    
            render "api/restaurants/show"
        else
 
            render json: @restaurant.errors.full_messages, status: 422
        end
    end

    def update
        @restaurant = Restaurant.find(params[:id])

        if current_user.id == @restaurant.owner_id
            if @restaurant.update(restaurant_params)
                render "api/restaurants/show"
            else
                render json: @restaurant.errors.full_messages, status: 422
            end
        end
    end


    def destroy
        restaurant = current_user.restaurants.find(params[:id])
        if restaurant
            restaurant.destroy
            
        else
            render json: ["404 Not Found"], status: 404
        end
    end

    private

    def restaurant_params
        params.permit(
            :name,
            :address,
            :phone,
            :lat,
            :long,
            :owner_id, :location, :description, :website, :price_range, :capacity, :neighborhood, :hours_of_operation, :cuisines, :dining_style, :dress_code, :parking_details, :public_transit, :payment_options, :executive_chef, :additional
        )
    end

end