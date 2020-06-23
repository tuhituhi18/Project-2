module.exports = function(sequelize, DataTypes) {
    const UserFavorite = sequelize.define("UserFavorite", {
        restaurantName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        foodName:{
            type: DataTypes.STRING,
            allowNull: false,  
        },
        geoLat:{
            type: DataTypes.INTEGER,
            allowNull: false,  
        },
        geoLon:{
            type: DataTypes.INTEGER,
            allowNull: false,  
        }


    });
        //bring in values from retaruant menu.js - foodApp, foodName, geoLat, geoLon

        // join with user
    UserFavorite.associate = function(models){
        // We're saying that a UserFavotite should belong to a User
        // A User Favorite can't be created without a User due to the foreign key constraint
        UserFavorite.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return UserFavorite;
};



